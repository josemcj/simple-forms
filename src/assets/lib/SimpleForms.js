export default class SimpleForms {
    #form;
    #formElements;
    #isValidClass;
    #isInvalidClass;
    #ignore;

    constructor(selector, options = {}) {
        this.#form = document.querySelector(selector);
        this.#formElements = Array.from(this.#form.elements);

        this.#isValidClass = options?.isValidClass ?? 'is-valid';
        this.#isInvalidClass = options?.isInvalidClass ?? 'is-invalid';
        this.#ignore = options?.ignore ?? [];

        const applyLiveValidation = options?.liveValidation ?? true;
        if (applyLiveValidation) this.#liveValidation();

        this.#form.addEventListener('submit', (e) => {
            e.preventDefault();

            const applyValidationOnSubmit = options?.validateOnSubmit ?? true;
            if (applyValidationOnSubmit) this.validate();
        });
    }

    get getData() {
        return Object.fromEntries(new FormData(this.#form));
    }

    set setData(obj = {}) {
        for (let key in obj) {
            const element = this.#form.querySelector(`[name="${key}"]`);

            if (element) {
                element.value = obj[key];
            }
        }
    }

    hasEmptyFields() {
        let isEmpty = false;
        const data = this.getData;

        for (let key in data) {
            if (!this.#ignore.includes(key)) {
                if (data[key] instanceof File && data[key].size === 0) {
                    isEmpty = true;
                } else if (!data[key] instanceof File && data[key].trim().length === 0) {
                    isEmpty = true;
                }
            }
        }

        return isEmpty;
    }

    validate() {
        this.#formElements.forEach((element) => {
            if (element.hasAttribute('name') && !this.#ignore.includes(element.name)) {
                this.#addValidationClasses(element);
            }
        });
    }

    #liveValidation() {
        this.#formElements.forEach((element) => {
            if (element.hasAttribute('name') && !this.#ignore.includes(element.name)) {
                element.addEventListener('input', (e) => {
                    this.#addValidationClasses(e.target);
                });
            }
        });
    }

    #addValidationClasses(element) {
        const notAllowedTypes = ['checkbox', 'radio'];

        if (!notAllowedTypes.includes(element.type)) {
            if (element.value.trim() === '') {
                element.classList.remove(this.#isValidClass);
                element.classList.add(this.#isInvalidClass);
            } else {
                element.classList.remove(this.#isInvalidClass);
                element.classList.add(this.#isValidClass);
            }
        }
    }

    #removeAllValidationClasses() {
        this.#formElements.forEach((element) => {
            element.classList.remove('is-valid');
            element.classList.remove('is-invalid');
        });
    }

    reset() {
        this.#form.reset();
        this.#removeAllValidationClasses();
    }
}
