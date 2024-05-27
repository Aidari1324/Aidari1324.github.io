document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

// checkt als data is gepakt anders haalt die het op
function fetchData() {
    if (!localStorage.getItem('originalData')) {
        fetcher();
    } else {
        const originalData = JSON.parse(localStorage.getItem('originalData'));
        renderData(originalData);
    }
}

// pakt data uit de JSON
function fetcher() {
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
}

// fetched de info voor localstorage en wanneer je reset drukt wordt alles weer opnieuw uitgehaald
const resetBtn = document.getElementById('reset-btn').addEventListener('click', () => {
    fetcher();
});

function renderData(data) {
    const ID = document.getElementById('id-input');
    const NAME = document.getElementById('name-input');
    const PRICE = document.getElementById('price-input');
    const LINK = document.getElementById('link-input');
    const EDIT = document.getElementById('edit-input');
    const REMOVE = document.getElementById('remove-input');

    // Verwijder inhoud
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

// slaat de verwijderde IDs op en anders creëert een array voor ids en slaat het daarin op
function isRemoved(productId) {
    const removedIds = JSON.parse(localStorage.getItem('removedIds')) || [];
    return removedIds.includes(productId);
}

// pakt origineel data op en zet daarin de toegevoegde product en creëert de data zodat het meteen zichtbaar is
function addProduct(product) {
    const originalData = JSON.parse(localStorage.getItem('originalData'));
    originalData.push(product);
    localStorage.setItem('originalData', JSON.stringify(originalData));
    renderData(originalData);
}

// wanneer je iets edit pak de huidig data op uit de local vergelijk tot dat je de ID hebt en push de veranderde gevens door anders doe niks
function editProduct(productId, updatedProduct) {
    const originalData = JSON.parse(localStorage.getItem('originalData'));
    const updatedData = originalData.map(product => {
        if (product.id === productId) {
            return updatedProduct;
        }
        return product;
    });
    localStorage.setItem('originalData', JSON.stringify(updatedData));
    renderData(updatedData);
}

// maakt button die bij de IDs/producten horen
function createbtns(product, EDIT, REMOVE) {
    const editBtn = document.createElement('button');
    editBtn.classList = 'edit-style';
    editBtn.textContent = 'edit';
    editBtn.addEventListener('click', () => {
        // de " ${} " dient voor de ID mee te geven naar de volgende pagina
        window.location.href = `../html/admin-edit.html?id=${product.id}`;
    });

    const removeBtn = document.createElement('button');
    removeBtn.classList = 'remove-style';
    removeBtn.textContent = 'remove';
    removeBtn.addEventListener('click', () => {
        removeProduct(product.id);
    });

    EDIT.appendChild(editBtn);
    REMOVE.appendChild(removeBtn);
}

// pakt data uit de local en filtered de verwijderde data weg en slaat die ids op en laat het weer weergeven
function removeProduct(productId) {
    // haalt origineel data op
    let originalData = JSON.parse(localStorage.getItem('originalData'));

    // Filter weg de verwijderde producten
    originalData = originalData.filter(product => product.id !== productId);

    // sla de veranderde data op in origineel
    localStorage.setItem('originalData', JSON.stringify(originalData));

    // pakt de verwijderde producten IDs op
    let removedIds = JSON.parse(localStorage.getItem('removedIds')) || [];

    // voegt de id toe
    removedIds.push(productId);

    // sla alles weer opnieuw op
    localStorage.setItem('removedIds', JSON.stringify(removedIds));

    // geeft de data opnieuw weer
    renderData(originalData);
}