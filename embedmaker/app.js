// If testing is true, form is submitted even if recaptcha is not filled out.
// However, the server disregards forms without valid recaptcha token.
let testing = true;

const ui = new UI();
ui.enableDragNDropSort("#fields-table");

// Add new field to #fields-table table
document.querySelector('#new-field-btn').addEventListener('click', (e) => {
    ui.addField();
    e.preventDefault();
});

// Clear all fields in #fields-table table
document.querySelector('#clear-field-btn').addEventListener('click', (e) => {
    ui.clearFieldsTable();
    ui.hideFieldsTable();
    e.preventDefault();
});

// Delete a row when user clicks on X button
document.querySelector('#fields-table').addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains("close-btn")) {
        ui.deleteField(e.target);
    }
    if (e.target.parentElement.classList.contains("field-inline")) {
        UI.setEmbedField();
    }
});

// Update hidden field #embed-fields with json representation every time fields are edited
document.querySelector('#fields-table').addEventListener('input', (e) => {
    UI.setEmbedField();
});

// Validate input fields on blur
document.addEventListener('blur', function (event) {
    // Only run if the field is in a form to be validated
    if (event.target.form && event.target.form.classList.contains('needs-validation')) {
        // If a empty field is not a required field, don't mark it as valid or invalid
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
    } else if (event.target.parentElement.parentElement.id === 'sortable') {
        // If blur event is from td element in #fields-table, validate all rows above current row and set the message
        let rowsAbove = [];
        for (let rowAbove = event.target.parentElement.previousElementSibling; rowAbove != null; rowAbove = rowAbove.previousElementSibling) {
            rowsAbove.push(rowAbove);
        }
        validateFields(rowsAbove);
        ui.showTableTopAlert();
    }
}, true);

document.querySelector('#mG61Hd').addEventListener('submit', (e) => {
    if (e.target.checkValidity() === true && validateFields(document.querySelector('#fields-table tbody').querySelectorAll('tr'))) {
        if (testing === true || grecaptcha.getResponse() !== '') {
            // Encode and send data
            let obj = {};
            document.querySelectorAll('#mG61Hd input').forEach((input) => {
                if (input.type !== 'submit') {
                    obj[input.name] = input.value;
                }
            });
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

            // Reset the form
            e.target.classList.remove('was-validated');
            let defaultValues = { 'color': "#33cc92" };
            document.querySelectorAll('.alert').forEach((element) => element.remove());
            document.querySelectorAll('input').forEach((element) => {
                element.classList.remove('is-valid', 'is-invalid');
                input.value = defaultValues[input.type] || '';
            });
            ui.clearFieldsTable();
            grecaptcha.reset();
            document.querySelector('.recaptcha-error').classList.remove("border");
            document.querySelector('.recaptcha-error-message').classList.add("d-none");

            // Notify successful form submission
            ui.showFormAlert('Form submitted successsfully.', 'card mb-3 rounded-3 border border-success text-center text-success');
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 2000);
        } else if (grecaptcha.getResponse() === '') {
            document.querySelector('.recaptcha-error').classList.add("border");
            document.querySelector('.recaptcha-error-message').classList.remove("d-none");
            e.stopPropagation();
        }
    } else if (!validateFields(document.querySelector('#fields-table tbody').querySelectorAll('tr'))) {
        ui.showTableTopAlert();
        $('html, body').animate({
            scrollTop: $('#fields-table').parent().offset().top
        }, 2000);
        e.stopPropagation();
    } else if (e.target.checkValidity() === false) {
        e.target.classList.add('was-validated');
        let errorElements = document.querySelectorAll(
            "input.form-control:invalid");
        $('html, body').animate({
            scrollTop: $(errorElements[0]).offset().top
        }, 2000);
        ui.showFormAlert('Please fill out all the fields marked with *', 'card mb-3 rounded-3 border border-danger text-center text-danger');
        e.stopPropagation();
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

