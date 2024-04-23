// wanneer website ingeladen is fetch data
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

// pakt de data uit de localstorage
function fetchData() {
    const originalData = JSON.parse(localStorage.getItem('originalData'));
    renderData(originalData);
}

// functie voor het display naar HTML
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

    // voor elke product weergeeft die dit
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

// kijkt of het verwijderd is of niet
function isRemoved(productId) {
    // pakt array uit anders maak er een
    const removedIds = JSON.parse(localStorage.getItem('removedIds')) || [];

    // kijkt of er ergens in zit zo ja = true | zo niet = false
    return removedIds.includes(productId);
}

// creeer nieuwe product
function addProduct(product) {
    // haal original uit localstorage anders maak er een array
    const originalData = JSON.parse(localStorage.getItem('originalData')) || [];

    // gooit de data van product in de array
    originalData.push(product);

    // update de local
    localStorage.setItem('originalData', JSON.stringify(originalData));

    // render de data zodat het up to date is
    renderData(originalData);
}

// edit producten
function editProduct(productId, updatedProduct) {
    // pakt origineel data uit de local anders creeer een array
    const originalData = JSON.parse(localStorage.getItem('originalData')) || [];

    // maak updatedData door originalData te mappen en het product te vervangen als de ID's gelijk zijn
    const updatedData = originalData.map(product => {
        if (product.id === productId) {
            return updatedProduct;
        }
        return product;
    });

    // plaats de data terug in de localstorage
    localStorage.setItem('originalData', JSON.stringify(updatedData));

    // render de localstorage
    renderData(updatedData);
}

// maakt en plaats de knoppen ( edit en remove )
function createbtns(product, EDIT, REMOVE) {
    const editBtn = document.createElement('button');
    editBtn.classList = 'edit-style';
    editBtn.textContent = 'edit';
    editBtn.addEventListener('click', () => {
    window.location.href = `../html/admin-edit.html?id=${product.id}`; // ${} dient voor de ID mee te geven naar de volgende pagina
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'remove';
    removeBtn.classList = 'remove-style';
    removeBtn.addEventListener('click', () => {
        removeProduct(product.id);
    });

    EDIT.appendChild(editBtn);
    REMOVE.appendChild(removeBtn);
}

function removeProduct(productId) {
    // pakt origineel data
    let originalData = JSON.parse(localStorage.getItem('originalData')) || [];

    // Filter uit de weggehaalde producten
    originalData = originalData.filter(product => product.id !== productId);

    // slaat op
    localStorage.setItem('originalData', JSON.stringify(originalData));

    // haalt verwijderde IDs op
    let removedIds = JSON.parse(localStorage.getItem('removedIds')) || [];
    
    // voeg de verwijderde IDS naar product.Id
    removedIds.push(productId);

    // slaat opnieuw op
    localStorage.setItem('removedIds', JSON.stringify(removedIds));

    // Render data
    renderData(originalData);
}

// fetch de data uit de JSON dient voor het resetten
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