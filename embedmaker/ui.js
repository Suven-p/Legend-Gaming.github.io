class UI {
    fixHelperModified(e, tr) {
        var $originals = tr.children();
        var $helper = tr.clone();
        $helper.children().each(function (index) {
            $(this).width($originals.eq(index).width());
        });
        return $helper;
    }
    updateIndex(e, ui) {
        $('td.index', ui.item.parent()).each(function (i) {
            $(this).html(i + 1);
        });
        this.setEmbedField();
    }

    enableDragNDropSort(tableID) {
        $(tableID + " tbody").sortable({
            helper: this.fixHelperModified,
            stop: this.updateIndex,
            cancel: "input,textarea,button,select,option,.field-names,.field-values"
        });
    }

    deleteField(target) {
        target.parentElement.parentElement.remove();
        document.querySelectorAll('#fields-table tbody tr').forEach((row, index) => {
            row.querySelector('.index').textContent = `${index + 1}`;
        });
        if (document.querySelectorAll('#fields-table tbody tr').length === 0) {
            this.hideFieldsTable();
        }
        this.setEmbedField();
    }

    addField() {
        this.displayFieldsTable();
        let table = document.querySelector('#fields-table tbody');
        let numRows = document.querySelectorAll('#fields-table tbody tr').length;
        if (numRows === 25) {
            document.querySelector('#table-message').classList.remove("d-none");
            document.querySelector('#table-message').classList.add("d-block");
            setTimeout(() => {
                document.querySelector('#table-message').classList.add("d-none");
                document.querySelector('#table-message').classList.remove("d-block");
            }, 3000);
            return;
        }
        let row = document.createElement('tr');
        row.innerHTML = `
        <td class="index">${numRows + 1}</td>
        <td class="field-names" contenteditable="true"></td>
        <td class="field-values" contenteditable="true"></td>
        <td class="field-inline"> <input type="checkbox"> </td>
        <td class="close-btn text-center"><i class="fas fa-times" aria-label="Close"></i></td>
        `;
        table.appendChild(row);
    }

    clearFieldsTable() {
        let table = document.querySelector('#fields-table tbody');
        table.innerHTML = '';
    }

    displayFieldsTable() {
        document.getElementById('fields-table').classList.remove('d-none');
    }

    hideFieldsTable() {
        document.getElementById('fields-table').classList.add('d-none');
    }

    // set value of hidder embed field to json from table
    setEmbedField() {
        const rows = document.querySelector('#fields-table tbody').querySelectorAll('tr');
        let fields = [], name = "", value = "", i = 0;
        rows.forEach((row) => {
            name = row.querySelector('.field-names').textContent;
            value = row.querySelector('.field-values').textContent;
            if (name && value) {
                fields[i++] = {
                    name: name,
                    value: value,
                    inline: row.querySelector('.field-inline input').checked,
                };
            }
        });
        document.querySelector('#embed-fields').value = JSON.stringify(fields);
    }

    getResponses() {
        let obj = {};
        obj.discordName = document.querySelector('#discord-name').value;
        obj.embedTitleText = document.querySelector('#embed-title-text').value;
        obj.embedTitleUrl = document.querySelector('#embed-title-url').value;
        obj.embedDescription = document.querySelector('#embed-description').value;
        obj.embedColor = document.querySelector('#embed-color').value;
        obj.footerText = document.querySelector('#footer-text').value;
        obj.footerIconUrl = document.querySelector('#footer-icon-url').value;
        obj.thumbnailUrl = document.querySelector('#thumbnail-url').value;
        obj.imageUrl = document.querySelector('#image-url').value;
        obj.authorName = document.querySelector('#author-name').value;
        obj.authorIconUrl = document.querySelector('#author-icon-url').value;
        obj.authorUrl = document.querySelector('#author-url').value;
        obj.fields = document.querySelector('#embed-fields').value;
        obj.token = grecaptcha.getResponse();
        return obj;
    }

    showAlert(msg, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(msg));
        const main = document.querySelector('#main');
        const form = document.querySelector('#mG61Hd');
        main.insertBefore(div, form);
    }
}