from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = '@Mangoos12'


def bereken_nodig_cijfer(gewenst, weging, cijfers, wegingen):
    totaal = sum(c * w for c, w in zip(cijfers, wegingen))
    benodigde_score = ((gewenst * (sum(wegingen) + weging)) - totaal) / weging
    return round(benodigde_score, 1)


@app.route('/', methods=['GET', 'POST'])
def index():
    resultaat = None
    if request.method == 'POST':
        try:
            gewenst = float(request.form.get('gewenst'))
            weging = float(request.form.get('weging'))

            cijfers = request.form.getlist('vorige_cijfers')
            wegingen = request.form.getlist('vorige_wegingen')

            cijfers = [float(c) for c in cijfers if c.strip()]
            wegingen = [float(w) for w in wegingen if w.strip()]

            # Validatie checks met duidelijke foutmeldingen
            if len(cijfers) != len(wegingen):
                flash(f'Aantal cijfers ({len(cijfers)}) en wegingen ({len(wegingen)}) moeten overeenkomen.', 'error')
                return redirect(url_for('index'))

            if any(c < 0 or c > 10 for c in cijfers):
                flash('Cijfers moeten tussen 0 en 10 liggen.', 'error')
                return redirect(url_for('index'))

            if any(w <= 0 for w in wegingen):
                flash('Wegingen moeten groter zijn dan 0.', 'error')
                return redirect(url_for('index'))

            benodigd_cijfer = bereken_nodig_cijfer(gewenst, weging, cijfers, wegingen)

            if benodigd_cijfer > 10:
                flash('Het benodigde cijfer is hoger dan een 10: doel niet haalbaar.', 'error')
            elif benodigd_cijfer <= 0:
                flash('🎉 Je hebt jouw doel al behaald!', 'success')
                benodigd_cijfer = 0

            resultaat = {'nodig_cijfer': benodigd_cijfer}

        except ValueError:
            flash('Zorg ervoor dat alle velden correct en volledig zijn ingevuld met geldige getallen.', 'error')
            return redirect(url_for('index'))

    return render_template('index.html', resultaat=resultaat)


if __name__ == '__main__':
    app.run(debug=True)