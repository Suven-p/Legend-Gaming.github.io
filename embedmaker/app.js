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
        ui.setEmbedField();
    }
});

// Update field
document.querySelector('#fields-table').addEventListener('keyup', (e) => {
    ui.setEmbedField();
});

(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();

                    var errorElements = document.querySelectorAll(
                        "input.form-control:invalid");
                    $('html, body').animate({
                        scrollTop: $(errorElements[0]).offset().top
                    }, 2000);
                    ui.showAlert('Please fill out all the fields marked with *', 'card mb-3 rounded-3 border border-danger text-center text-danger');
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

document.addEventListener('blur', function (event) {
    // Only run if the field is in a form to be validated
    if (!event.target.form.classList.contains('needs-validation')) return;
    // Validate the field
    if (event.target.validity.valid) {
        event.target.classList.add('is-valid');
        event.target.classList.remove('is-invalid');
        event.target.setCustomValidity('');
    }
    else {
        event.target.classList.add('is-invalid');
        event.target.classList.remove('is-valid');
        event.target.parentElement.querySelector('.invalid-feedback').innerText = event.target.validationMessage;
    }
}, true);

document.querySelector('#mG61Hd').addEventListener('submit', (e) => {
    if (grecaptcha.getResponse() === '' || testing) {
        document.querySelector('.recaptcha-error').classList.add("border");
        document.querySelector('.recaptcha-error-message').classList.remove("d-none");
    } else {
        document.querySelector('.recaptcha-error').classList.remove("border");
        document.querySelector('.recaptcha-error-message').classList.add("d-none");
        let obj = {};
        document.querySelectorAll('#mG61Hd input').forEach((input) => {
            defaultValues = { 'color': "#33cc92" };
            if (input.type !== 'submit') {
                obj[input.name] = input.value;
                // input.value = defaultValues[input.type] || '';
            }
        });
        grecaptcha.reset();
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
        // fetch(url, params)
        //     .then(res => { console.log(res); result = res; })
        //     .catch(err => console.error(err));
        ui.showAlert('Form submitted successsfully.', 'card mb-3 rounded-3 border border-success text-center text-success');
        document.querySelector('.alert').remove();
        $('html, body').animate({
            scrollTop: $('body').offset().top
        }, 2000);
    }

    e.preventDefault();
});











