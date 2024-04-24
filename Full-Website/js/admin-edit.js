// pakt de ID uit de URL voor de vergelijking
document.addEventListener('DOMContentLoaded', () => {
    const url = new URLSearchParams(window.location.search);
    const productId = url.get('id');
    if (productId) {
        editData(productId);
        document.getElementById('edit-btn').addEventListener('click', saveEditData);
        document.querySelector('.preview-btn').addEventListener('click', updateImg);
    }
});

// zet alles in de inputs
function editData(productId) {
    // haalt orgineel data uit de local
    const originalData = JSON.parse(localStorage.getItem('originalData'));
    // zoekt welke ID overeen komt
    const product = originalData.find(item => item.id == productId);
    // wanneer gevonden zet de informatie in de juiste plekken
    if (product) {
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-link').value = product.link;
    }
}

// slaat bewerkte gegevens op
function saveEditData() {
    // pak data uit input om later te checken
    const productId = new URLSearchParams(window.location.search).get('id');
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productLink = document.getElementById('product-link').value;

    // Checkt of alles een input heeft zo niet alert
    if (!productName || !productPrice || !productLink) {
        alert('Vul alles in');
        return;
    }

    // pakt orgineel data uit de local
    let originalData = JSON.parse(localStorage.getItem('originalData'));

    // copy de origineel data uit local voor als er iets niet veranderd wordt alsnog werkend is
    let updatedData = JSON.parse(JSON.stringify(originalData));

    // zoekt de ID die matched met de edit id
    const productIndex = updatedData.findIndex(product => product.id == productId);

    if (productIndex !== -1) {
        // Update de product data
        updatedData[productIndex].name = productName;
        updatedData[productIndex].price = productPrice;
        updatedData[productIndex].link = productLink;

        // Update het data in localStorage
        localStorage.setItem('originalData', JSON.stringify(updatedData));

        // terug naar overzicht
        window.location.href = '../html/admin-p.html';
    } else {
        console.error('Product niet gevonden.');
    }
}

// pakt afbeelding value en weergeeft het
function updateImg() {
    const productlink = document.getElementById('product-link').value;
    const previewImg = document.getElementById('preview-img');
    previewImg.src = productlink;
}