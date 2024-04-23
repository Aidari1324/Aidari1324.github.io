// Wacht tot de pagina geladen is
document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', addNewData);

    const Preview = document.querySelector('.preview-btn');
    Preview.addEventListener('click', PreImg);
});

// Functie voor toevoegen nieuwe data
const addNewData = () => {
    // Haal waardes op van de invoervelden
    const NAME = document.getElementById('product-name').value;
    const PRICE = parseFloat(document.getElementById('product-price').value);
    const LINK = document.getElementById('product-link').value;

    // Valideer het formulier
    if (NAME === '' || isNaN(PRICE) || PRICE < 0 || LINK === '') {
        alert('Vul alle gegevens in');
        return;
    }

    // Haal originele data op, anders maak een lege array
    let originalData = JSON.parse(localStorage.getItem('originalData')) || [];

    // Genereer een uniek ID voor het nieuwe product
    const ProductId = generateUniqueID(originalData);

    // Maak een nieuw productobject
    const newProduct = {
        id: ProductId,
        name: NAME,
        price: PRICE,
        link: LINK
    };

    // Voeg het nieuwe product toe aan de originele data
    originalData.push(newProduct);

    // Sla de originele data op in de localStorage
    localStorage.setItem('originalData', JSON.stringify(originalData));

    // Navigeer naar een andere pagina
    navigateToPage();
};

// Functie voor het genereren van een uniek ID op basis van bestaande IDs
const generateUniqueID = (originalData) => {
    // Zoek het hoogste bestaande ID en voeg 1 toe
    return originalData.reduce((max, product) => Math.max(max, product.id), 0) + 1;
};

// Functie om naar een andere pagina te navigeren
const navigateToPage = () => {
    window.location.href = '../html/admin-p.html';
};

const PreImg = () => {
    const LINK = document.getElementById('product-link').value;
    const IMG = document.getElementById('preview-img');
    IMG.src = LINK;
}