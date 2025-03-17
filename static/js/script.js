document.addEventListener('DOMContentLoaded',function(){const addGradeButton=document.getElementById('addGrade');const gradesContainer=document.getElementById('vorige-cijfers');function addCijferVelden(event){event.preventDefault();const cijferContainer=document.createElement('div');cijferContainer.className='row g-2 align-items-center  mb-2';cijferContainer.innerHTML=`
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
            </div>`;cijferContainer.innerHTML=`
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
        `;document.getElementById('vorige-cijfers').appendChild(cijferContainer)}
function removeCijferVelden(event){if(event.target.closest('.bi-trash-fill')){event.preventDefault();event.target.closest('.row').remove()}}
function validateInputField(input){if(input.validity.valid&&input.value.trim()!==''){input.classList.add('is-valid');input.classList.remove('is-invalid')}else{input.classList.add('is-invalid');input.classList.remove('is-valid')}}
document.addEventListener('click',function(event){if(event.target.closest('#addGrade')){addCijferVelden(event)}
if(event.target.closest('.bi-trash-fill')){event.target.closest('.row').remove()}});document.addEventListener('input',function(event){if(event.target.matches('.form-control')){validateForm()}});function validateForm(){const inputs=document.querySelectorAll('.form-control');inputs.forEach(input=>{if(input.value.trim()){input.classList.remove('is-invalid')}})}
const form=document.querySelector('form');form.addEventListener('submit',function(e){const inputs=document.querySelectorAll('.form-control[required]');let valid=!0;inputs.forEach(input=>{if(!input.value.trim()){input.classList.add('is-invalid');valid=!1}else{input.classList.remove('is-invalid')}});if(!valid){e.preventDefault();e.stopPropagation();alert('Controleer aub alle velden voordat je verder gaat.')}})
document.getElementById('vorige-cijfers').addEventListener('click',event=>{if(event.target.closest('.bi-trash-fill')){event.target.closest('.row').remove()}})})