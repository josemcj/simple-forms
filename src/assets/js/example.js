import SimpleForms from '../lib/SimpleForms.js';

const resultContainer = document.querySelector('#result');
const form = document.querySelector('#tw-form');

function renderResult(obj = null) {
  resultContainer.textContent = JSON.stringify(obj ? obj : {}, null, 2);
}

function renderMethodName(name = '') {
  const methodNameSpan = document.querySelector('#method-name');
  methodNameSpan.textContent = name;
}

renderResult();

/**
 * Creamos una instancia de SimpleForms.
 */
const sfForm = new SimpleForms('#tw-form', {
  isValidClass: 'border-green-600',
  isInvalidClass: 'border-red-500',
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  sfForm.validate();

  const obj = sfForm.getData;
  renderResult(obj);
  renderMethodName('getData');
});
