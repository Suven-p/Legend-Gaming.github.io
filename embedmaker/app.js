let testing = true;

const ui = new UI();
ui.enableDragNDropSort("#fields-table");

// Add new field
document.querySelector('#new-field-btn').addEventListener('click', (e) => {
    ui.addField();
    e.preventDefault();
});

// Clear Fields
document.querySelector('#clear-field-btn').addEventListener('click', (e) => {
    ui.clearFieldsTable();
    ui.hideFieldsTable();
    e.preventDefault();
});

// Delete field
document.querySelector('#fields-table').addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains("close-btn")) {
        ui.deleteField(e.target);
    }
    if (e.target.parentElement.classList.contains("field-inline")) {
        UI.setEmbedField();
    }
});

// Update field
document.querySelector('#fields-table').addEventListener('input', (e) => {
    UI.setEmbedField();
    validateFields();
});

$('input').blur(function (event) {
    // Only run if the field is in a form to be validated
    if (!event.target.form || !event.target.form.classList.contains('needs-validation')) {
        return;
    }
    // Validate the field
    if (event.target.value === '' && event.target.required === false) {
        return;
    }
    if (event.target.validity.valid) {
        event.target.classList.add('is-valid');
        event.target.classList.remove('is-invalid');
        event.target.setCustomValidity('');
    } else {
        event.target.classList.add('is-invalid');
        event.target.classList.remove('is-valid');
        event.target.parentElement.querySelector('.invalid-feedback').innerText = event.target.validationMessage;
    }
});

document.querySelector('#mG61Hd').addEventListener('submit', (e) => {
    if ((testing === true || grecaptcha.getResponse() !== '') && e.target.checkValidity() === true) {
        document.querySelector('.recaptcha-error').classList.remove("border");
        document.querySelector('.recaptcha-error-message').classList.add("d-none");
        let obj = {};
        document.querySelectorAll('#mG61Hd input').forEach((input) => {
            defaultValues = { 'color': "#33cc92" };
            if (input.type !== 'submit') {
                obj[input.name] = input.value;
                input.value = defaultValues[input.type] || '';
            }
        });
        grecaptcha.reset();
        ui.clearFieldsTable();

        const params = {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: (new URLSearchParams(obj)).toString()
        };
        const url = document.querySelector('form#mG61Hd').action;
        let result;
        fetch(url, params)
            .then(res => { console.log(res); result = res; })
            .catch(err => console.error(err));
        document.querySelectorAll('.alert').forEach((element) => element.remove());
        ui.showAlert('Form submitted successsfully.', 'card mb-3 rounded-3 border border-success text-center text-success');
        $('html, body').animate({
            scrollTop: $('body').offset().top
        }, 2000);
    }else if (grecaptcha.getResponse() === '') {
        e.preventDefault();
        e.stopPropagation();
        document.querySelector('.recaptcha-error').classList.add("border");
        document.querySelector('.recaptcha-error-message').classList.remove("d-none");
    } else if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();

        let errorElements = document.querySelectorAll(
            "input.form-control:invalid");
        $('html, body').animate({
            scrollTop: $(errorElements[0]).offset().top
        }, 2000);
        ui.showAlert('Please fill out all the fields marked with *', 'card mb-3 rounded-3 border border-danger text-center text-danger');
        e.target.classList.add('was-validated');
    }

    e.preventDefault();
});











