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
    if (e.target.checkValidity() === true && validateFields(document.querySelector('#fields-table tbody').querySelectorAll('tr'))) {
        if (testing === true || grecaptcha.getResponse() !== '') {
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
            document.querySelectorAll('input').forEach((element) => element.classList.remove('is-valid', 'is-invalid'));
            e.target.classList.remove('was-validated');
            ui.showAlert('Form submitted successsfully.', 'card mb-3 rounded-3 border border-success text-center text-success');
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 2000);
        } else if (grecaptcha.getResponse() === '') {
            e.preventDefault();
            e.stopPropagation();
            document.querySelector('.recaptcha-error').classList.add("border");
            document.querySelector('.recaptcha-error-message').classList.remove("d-none");
        }
    } else if (!validateFields(document.querySelector('#fields-table tbody').querySelectorAll('tr'))) {
        setFieldsTableErrorMessage();
        $('html, body').animate({
            scrollTop: $('#fields-table').parent().offset().top
        }, 2000);
    } else {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.checkValidity() === false) {
            let errorElements = document.querySelectorAll(
                "input.form-control:invalid");
            $('html, body').animate({
                scrollTop: $(errorElements[0]).offset().top
            }, 2000);
            ui.showAlert('Please fill out all the fields marked with *', 'card mb-3 rounded-3 border border-danger text-center text-danger');
            e.target.classList.add('was-validated');
        }
    }

    e.preventDefault();
});

function validateFields(rowsList) {
    if (rowsList.length === 0) return true;
    isValid = true;
    let embedFieldsUI = document.querySelector('#embed-fields');
    rowsList.forEach(row => {
        let name = row.querySelector('.field-names').textContent.trim(),
            value = row.querySelector('.field-values').textContent.trim();
        if (name === null) name = '';
        if (value === null) value = '';
        if ((name === '' && value !== '') || (value === '' && name != '')) {
            isValid = false;
            row.valid = false;
        } else {
            row.valid = true;
        }
    });
    if (isValid) {
        embedFieldsUI.setCustomValidity('');
    } else {
        embedFieldsUI.setCustomValidity('Please fill both name and values.');
    }
    return isValid;
}

function setFieldsTableErrorMessage() {
    let embedFieldsUI = document.querySelector('#embed-fields');
    if (embedFieldsUI.validationMessage !== '') {
        document.querySelector('#table-message-top').classList.remove("d-none");
        document.querySelector('#table-message-top').classList.add("d-block");
        document.querySelector('#table-message-top').innerText = embedFieldsUI.validationMessage;
    } else {
        document.querySelector('#table-message-top').classList.add("d-none");
        document.querySelector('#table-message-top').classList.remove("d-block");
        document.querySelector('#table-message-top').innerText = embedFieldsUI.validationMessage;
    }
}











