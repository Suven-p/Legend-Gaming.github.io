let defaultClassList = "form-control mt-4 border-top-0 border-left-0 border-right-0 border-bottom-1 shadow-none";

let fields = [
    {
        id: "discord-name",
        name: "entry.185946926",
        title: "Discord Name",
        description: "Your discord username",
        type: "text",
        classList: defaultClassList,
        validation: "",
        required: true,
        invalidFeedback: "Please fill out this field"
    },
    {
        id: "embed-title-text",
        name: "entry.266382793",
        title: "Title text",
        description: "Title of the embed",
        type: "text",
        classList: defaultClassList,
        validation: "maxlength=256",
        required: false,
        invalidFeedback: "Input must contain between 0 and 256 characters."
    },
    {
        id: "embed-title-url",
        name: "entry.1700637903",
        title: "Title url",
        description: "Link to go to when clicking on title",
        type: "url",
        classList: defaultClassList,
        validation: "",
        required: false,
        invalidFeedback: "Please enter a valid url"
    },
    {
        id: "embed-description",
        name: "entry.144633956",
        title: "Description",
        description: "Text shown below title",
        type: "text",
        classList: defaultClassList,
        validation: "maxlength=2048",
        required: false,
        invalidFeedback: "Input must contain between 0 and 2048 characters."
    },
    {
        id: "embed-color",
        name: "entry.770246387",
        title: "Color",
        description: "Color of the embed",
        type: "color",
        classList: "form-control mt-4 border-0 shadow-none",
        validation: 'value="#33cc92"',
        required: false,
    },
    {
        id: "footer-text",
        name: "entry.1886470204",
        title: "Footer",
        description: "Small text at end of embed",
        type: "text",
        classList: defaultClassList,
        validation: "maxlength=2048",
        required: false,
        invalidFeedback: "Input must contain between 0 and 2048 characters."
    },
    {
        id: "footer-icon-url",
        name: "entry.330314733",
        title: "Footer Icon",
        description: "Icon shown at footer",
        type: "url",
        classList: defaultClassList,
        validation: "",
        required: false,
        invalidFeedback: "Please enter a valid url"
    },
    {
        id: "thumbnail-url",
        name: "entry.671118872",
        title: "Thumbnail URL",
        description: "Link to image shown in top right corner",
        type: "url",
        classList: defaultClassList,
        validation: "",
        required: false,
        invalidFeedback: "Please enter a valid url"
    },
    {
        id: "image-url",
        name: "entry.361318682",
        title: "Image URL",
        description: "Link to image shown below contents of embed",
        type: "url",
        classList: defaultClassList,
        validation: "",
        required: false,
        invalidFeedback: "Please enter a valid url"
    },
    {
        id: "author-name",
        name: "entry.864406723",
        title: "Author Name",
        description: "Author's name to be shown above title",
        type: "text",
        classList: defaultClassList,
        validation: "maxlength=256",
        required: false,
        invalidFeedback: "Input must contain between 0 and 256 characters."
    },
    {
        id: "author-icon-url",
        name: "entry.254049616",
        title: "Author Icon URL",
        description: "Link to image shown besides author's name",
        type: "url",
        classList: defaultClassList,
        validation: "",
        required: false,
        invalidFeedback: "Please enter a valid url"
    },
    {
        id: "author-url",
        name: "entry.1257823805",
        title: "Author URL",
        description: "Link to go to when clicking on author's name",
        type: "url",
        classList: defaultClassList,
        validation: "",
        required: false,
        invalidFeedback: "Please enter a valid url"
    },
];

let divs = '';
fields.forEach((data) => {
    divs += `
        <div class="card mb-3 rounded-3">
            <div class="card-body">
                <h4 class="card-title">${data.title} <span class="text-danger">${(data.required) ? "*" : ""}</span></h4>
                <small class="text-muted d-block">${data.description}</small>
                <input type="${data.type}" name="${data.name}"
                    class="${data.classList}"
                    id="${data.id}" ${data.validation || ''} ${(data.required) ? "required" : ""}
                    aria-label="${data.title}">
                <div class="invalid-feedback">${(data.invalidFeedback) || ''}</div>
                <div class="valid-feedback"></div>
            </div>
        </div>
    `;
});

let format = `
    <form
        action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSer-QDRNEIeu2wLtR7EP1hq6uNgntH3vJBpqe5SpNZBAw_hUA/formResponse"
        target="_self" method="POST" id="mG61Hd" class="needs-validation" novalidate>
        ${divs}

        <div class="card mb-3 rounded-3 table-container">
            <div class="card-body">
                <h4 class="card-title">Fields:</h4>
                <small class="text-muted d-block">Fields to display in embed</small>
                <input type="text" name="entry.394621290"
                    class="form-control d-none"
                    id="embed-fields">
                <div class="invalid-feedback"></div>
                <div class="valid-feedback"></div>
                <div id="table-message-top" class="alert border border-danger text-danger text-center m-2 d-none">
				</div>
                <table class="table table-hover table-bordered mt-4 d-none" id="fields-table">
                    <thead class="thead-light">
                        <tr>
                            <th data-field="id" class="index">#</th>
                            <th data-sortable="true">Name</th>
                            <th data-sortable="true">Value</th>
                            <th> Inline </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="sortable">
                    </tbody>
                </table>
                <div class="">&nbsp;</div>
                <div id="table-message" class="alert border border-danger text-danger text-center m-2 d-none">
                </div>
                <button class="btn btn-primary mt-2" id="new-field-btn">Add new field</button>
                <button class="btn btn-primary mt-2" id="clear-field-btn">Clear all fields</button>
            </div>
        </div>
		<script>
            function onRecaptchaValidate(response) {
                document.querySelector('#recaptcha-token').value = grecaptcha.getResponse();
                document.querySelector('.recaptcha-error').classList.remove("border");
                document.querySelector('.recaptcha-error-message').classList.add("d-none");
            }
        </script>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
        <div class="recaptcha-error border-danger col-6 p-2">
            <div class="g-recaptcha" id="recaptcha" data-sitekey="6LdNuxcaAAAAACsdu3riJrYbw8lSZWkYfANuWdLe"
                data-callback="onRecaptchaValidate"></div>
            <div class="recaptcha-error-message text-danger d-none">Please verify that you are not a robot.
            </div>
        </div>
        <input type="hidden" name="entry.1200061975" id="recaptcha-token">
        <input type="submit" value="Submit" class="btn btn-primary mx-auto text-center mt-3">
    </form>
`;
console.clear();
console.log(format);