// Dynamisch cijfers en wegingen toe laten voegen/leegmaken
document.addEventListener('DOMContentLoaded', function () {
    const addGradeButton = document.getElementById('addGrade');
    const gradesContainer = document.getElementById('vorige-cijfers');

    // Functie om nieuwe cijfer- en weging-velden toe te voegen
    function addCijferVelden(event) {
        event.preventDefault();

        const cijferContainer = document.createElement('div');
        cijferContainer.className = 'row g-2 align-items-center  mb-2';

        // HTML structuur voor velden
        cijferContainer.innerHTML = `
            <div class="col-md-5">
                <input type="number" step="0.1" min="0" max="10" name="vorige_cijfers"
                       placeholder="Cijfer" required class="form-control">
            </div>
            <div class="col-md-5">
                <input type="number" step="0.1" min="0.1"
                       name="vorige_wegingen" class="form-control"
                       placeholder="Weging" required>
            </div>
            <div class="col-md-2 text-center">
                <button class="btn btn-outline-danger btn-sm remove-btn" title="Verwijderen">
                    <i class="bi bi-trash"></i>
                </button>
            </div>`;

        cijferContainer.innerHTML = `
            <div class="col-md-5">
                <input type="number" step="0.1" min="0" max="10"
                       name="vorige_cijfers" class="form-control"
                       placeholder="Cijfer" required>
            </div>
            <div class="col-md-5">
                <input type="number" step="0.1" min="0.1"
                       name="vorige_wegingen" class="form-control"
                       placeholder="Weging" required>
            </div>
            <div class="col-md-2 text-center">
                <button class="btn btn-danger btn-sm remove-grade">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>
        `;

        document.getElementById('vorige-cijfers').appendChild(cijferContainer);
    }

    // Velden verwijderen
    function removeCijferVelden(event) {
        if (event.target.closest('.bi-trash-fill')) {
            event.preventDefault();
            event.target.closest('.row').remove();
        }
    }

    // Validatie van inputvelden in realtime
    function validateInputField(input) {
        if (input.validity.valid && input.value.trim() !== '') {
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
        } else {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
        }
    }

    document.addEventListener('click', function (event) {
        if (event.target.closest('#addGrade')) {
            addCijferVelden(event);
        }

        if (event.target.closest('.bi-trash-fill')) {
            event.target.closest('.row').remove();
        }
    });

    // Realtime validatie
    document.addEventListener('input', function (event) {
        if (event.target.matches('.form-control')) {
            validateForm();
        }
    });

    function validateForm() {
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            if (input.value.trim()) {
                input.classList.remove('is-invalid');
            }
        });
    }

    // Validatie voordat het formulier wordt verzonden
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        const inputs = document.querySelectorAll('.form-control[required]');
        let valid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                valid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });

        if (!valid) {
            e.preventDefault();
            e.stopPropagation();
            alert('Controleer aub alle velden voordat je verder gaat.');
        }
    })

    // Event listener voor verwijderen van cijfer-velden
    document.getElementById('vorige-cijfers').addEventListener('click', event => {
        if (event.target.closest('.bi-trash-fill')) {
            event.target.closest('.row').remove();
        }
    });
});