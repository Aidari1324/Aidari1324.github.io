document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

function fetchData() {
    const originalData = JSON.parse(localStorage.getItem('originalData'));
    renderData(originalData);
}


function renderData(data) {
    const ID = document.getElementById('id-input');
    const NAME = document.getElementById('name-input');
    const PRICE = document.getElementById('price-input');
    const LINK = document.getElementById('link-input');
    const EDIT = document.getElementById('edit-input');
    const REMOVE = document.getElementById('remove-input');

    // Verwijder vorige inhoud
    ID.innerHTML = '';
    NAME.innerHTML = '';
    PRICE.innerHTML = '';
    LINK.innerHTML = '';
    EDIT.innerHTML = '';
    REMOVE.innerHTML = '';

    data.forEach(product => {
        if (!isRemoved(product.id)) {
            const idElement = document.createElement('p');
            idElement.textContent = product.id;
            ID.appendChild(idElement);

            const nameElement = document.createElement('p');
            nameElement.textContent = product.name;
            NAME.appendChild(nameElement);

            const priceElement = document.createElement('p');
            priceElement.textContent = `€ ` + product.price;
            PRICE.appendChild(priceElement);

            const linkElement = document.createElement('p');
            linkElement.textContent = product.link;
            LINK.appendChild(linkElement);

            createbtns(product, EDIT, REMOVE);
        }
    });
}

function isRemoved(productId) {
    const removedIds = JSON.parse(localStorage.getItem('removedIds')) || [];
    return removedIds.includes(productId);
}

function addProduct(product) {
    const originalData = JSON.parse(localStorage.getItem('originalData')) || [];
    originalData.push(product);
    localStorage.setItem('originalData', JSON.stringify(originalData));
    renderData(originalData);
}

function editProduct(productId, updatedProduct) {
    const originalData = JSON.parse(localStorage.getItem('originalData')) || [];
    const updatedData = originalData.map(product => {
        if (product.id === productId) {
            return updatedProduct;
        }
        return product;
    });
    localStorage.setItem('originalData', JSON.stringify(updatedData));
    renderData(updatedData);
}

function createbtns(product, EDIT, REMOVE) {
    const editBtn = document.createElement('button');
    editBtn.textContent = 'edit';
    editBtn.addEventListener('click', () => {
    window.location.href = `../html/admin-edit.html?id=${product.id}`; // ${} dient voor de ID mee te geven naar de volgende pagina
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'remove';
    removeBtn.addEventListener('click', () => {
        removeProduct(product.id);
    });

    EDIT.appendChild(editBtn);
    REMOVE.appendChild(removeBtn);
}

function removeProduct(productId) {
    // Retrieve original data
    let originalData = JSON.parse(localStorage.getItem('originalData')) || [];

    // Filter out the removed product
    originalData = originalData.filter(product => product.id !== productId);

    // Save updated original data
    localStorage.setItem('originalData', JSON.stringify(originalData));

    // Retrieve removed product IDs
    let removedIds = JSON.parse(localStorage.getItem('removedIds')) || [];
    
    // Add the removed product ID
    removedIds.push(productId);

    // Save updated removed IDs
    localStorage.setItem('removedIds', JSON.stringify(removedIds));

    // Render updated data
    renderData(originalData);
}


const resetBtn = document.getElementById('reset-btn').addEventListener('click', () => {
    fetch('../js/JSON/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('originalData', JSON.stringify(data));
            
            localStorage.removeItem('removedIds');

            renderData(data);
        })
        .catch(error => {
            console.error(error);
        });
});