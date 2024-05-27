document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', addNewData);

    const Preview = document.querySelector('.preview-btn');
    Preview.addEventListener('click', PreImg);
});

// functie van toevoegen voor nieuwe games
const addNewData = () => {
    // pakt de waardes van de inputs
    const NAME = document.getElementById('product-name').value;
    const PRICE = parseFloat(document.getElementById('product-price').value);
    const LINK = document.getElementById('product-link').value;

    // checkt of het niet leeg is en alles een value heeft
    if (NAME === '' || Number.isNaN(PRICE) || PRICE < 0 || LINK === '') {
        alert('Vul alle gegevens in');
        return;
    }

    // pakt originele data anders maakt die een lege array
    let originalData = JSON.parse(localStorage.getItem('originalData')) || [];

    // creeert een uniek ID voor het product
    const ProductId = generateUniqueID(originalData);

    // maakt een nieuw productobject aan
    const newProduct = {
        id: ProductId,
        name: NAME,
        price: PRICE,
        link: LINK,
    };

    // voeg het nieuwe product toe aan originele data
    originalData.push(newProduct);

    // sla de originele data op in de localStorage
    localStorage.setItem('originalData', JSON.stringify(originalData));

    // terug naar vorige pagina
    navigateToPage();
};

// fucntie voor het genereren van een uniek ID op basis van de bestaande IDs
const generateUniqueID = (originalData) => originalData.reduce((max, product) => Math.max(max, product.id), 0) + 1;

const navigateToPage = () => {
    window.location.href = '../html/admin-p.html';
};

// pakt value uit input en weergeeft het in de img src
const PreImg = () => {
    const LINK = document.getElementById('product-link').value;
    const IMG = document.getElementById('preview-img');
    IMG.src = LINK;
};