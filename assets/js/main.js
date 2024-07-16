import SimpleForms from '../../SimpleForms/SimpleForms.js';

const form = new SimpleForms('#form', {
    validateOnSubmit: false,
});

document.querySelector('#form').addEventListener('submit', () => {
    console.log(form.getData);
});

document.querySelector('#reset-form-btn').addEventListener('click', () => {
    form.reset();
});
