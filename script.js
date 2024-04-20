// Create form elements
const form = document.createElement('form');
form.id = 'form';
const formGroupDiv = document.createElement('div');
formGroupDiv.classList.add('form-group');
const formFields = [
    { label: 'First Name:', type: 'text', id: 'first-name', name: 'firstName', required: true },
    { label: 'Last Name:', type: 'text', id: 'last-name', name: 'lastName', required: true },
    { label: 'Address:', type: 'text', id: 'address', name: 'address', required: true },
    { label: 'Pincode:', type: 'text', id: 'pincode', name: 'pincode', required: true },
    { label: 'Gender:', type: 'select', name: 'gender', options: ['Male', 'Female', 'Other'], required: true },
    { label: 'Choice of Food (select at least 2):', type: 'checkbox', name: 'food', options: ['Pizza', 'Burger', 'Pasta', 'Salad', 'Sushi'], required: true },
    { label: 'State:', type: 'text', id: 'state', name: 'state', required: true },
    { label: 'Country:', type: 'text', id: 'country', name: 'country', required: true }
];

formFields.forEach(field => {
    const label = document.createElement('label');
    label.textContent = field.label;
    formGroupDiv.appendChild(label);

    let input;
    let radioLabel;
    if (field.name === 'gender') {
        field.options.forEach(option => {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = field.name;
            radio.value = option.toLowerCase();
            formGroupDiv.appendChild(radio);
            radioLabel = document.createElement('label');
            radioLabel.textContent = option;
            
        },
        formGroupDiv.appendChild(radioLabel)
    );
    
    } else if (field.type === 'checkbox') {
        field.options.forEach(option => {
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.name = field.name;
            input.value = option.toLowerCase();
            
            const optionLabel = document.createElement('label');
            optionLabel.textContent = option;
            formGroupDiv.appendChild(input);
            formGroupDiv.appendChild(optionLabel);
        });
        input = null;
    } else {
        input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
    }
    if (input) {
        formGroupDiv.appendChild(input);
        form.appendChild(formGroupDiv)
    }

});

// Create submit button
const submitButton = document.createElement('input');
submitButton.id = "submit";
submitButton.type = 'submit';
submitButton.value = 'Submit';
// After creating the submit button
submitButton.classList.add('btn', 'btn-primary');

form.appendChild(submitButton);

// Create table
const tablediv = document.createElement('div');
tablediv.id = "tablediv";
const table = document.createElement('table');
table.id = 'dataTable';
table.classList.add('table');
const tableHeader = document.createElement('thead');
const headerRow = document.createElement('tr');
const headers = ['First Name', 'Last Name', 'Address', 'Pincode', 'Gender', 'Food', 'State', 'Country'];
headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
});
tableHeader.appendChild(headerRow);
table.appendChild(tableHeader);

// Create table body
const tableBody = document.createElement('tbody');
table.appendChild(tableBody);

// Append form and table to the document body
document.body.appendChild(form);
document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createElement('hr'));
tablediv.appendChild(table);
document.body.appendChild(tablediv);

// Form submission handler
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const rowData = [];
    formData.forEach((value, key) => {
        if (key === 'food') {
            value = Array.from(formData.getAll('food')).join(', ');
        }
        if (key === 'gender') {
            value = Array.from(formData.get('gender'));
        }
        rowData.push(value);
    });
    console.log('rowData', rowData);

    // Add data to table
    const newRow = document.createElement('tr');
    rowData.forEach(data => {
        const cell = document.createElement('td');
        cell.textContent = data;
        newRow.appendChild(cell);
    });
    tableBody.appendChild(newRow);

    // Clear form fields
    form.reset();
});
