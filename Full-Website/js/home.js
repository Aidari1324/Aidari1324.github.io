// geeft de local storage door
let cartItems = [];

// pakt de data van local storage en parsed het
const storedProducts = localStorage.getItem('originalData');
if (storedProducts) {
    const products = JSON.parse(storedProducts);
    PrintToCards(products);
    // Start checker voor verandering in originalData
    setInterval(checkForDataChanges, 1000); // elke 1 seconde
} else {
    console.error('Geen product gevonden in local');
}

// checkt of er items zijn in local en displayed ze
const storedCartItems = localStorage.getItem('cartItems');
if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
}

// dient voor datahandelingen naar html
function PrintToCards(products) {
    const cardsContainer = document.getElementById('cards-container');
    // verwijder alle cards
    cardsContainer.innerHTML = '';

    // voor elke ID print die dit uit
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardImg = document.createElement('img');
        cardImg.classList.add('img-card');
        cardImg.src = product.link;
        cardImg.alt = product.name;
        card.appendChild(cardImg);

        const h3Element = document.createElement('h3');
        h3Element.textContent = product.name;
        card.appendChild(h3Element);

        const pElement = document.createElement('p');
        pElement.textContent = '€ ' + product.price;
        card.appendChild(pElement);

        // knop maken en stuurt data ID naar local storage bij click
        const button = document.createElement('button');
        button.textContent = 'Voeg toe aan winkelmandje';
        button.classList.add('card-button');
        button.addEventListener('click', () => {
            // product ID toevoegen aan cartItems array
            const productId = product.id;
            cartItems.push(productId);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // update de numer van de checkout cart
            const iconElement = document.querySelector('.icon');
            iconElement.textContent = cartItems.length;
        });

        card.appendChild(button);

        cardsContainer.appendChild(card);
    });
}

// update de cart opnieuw na refresh met de huidige nummer
const iconElement = document.querySelector('.icon');
iconElement.textContent = cartItems.length;

// checkt voor veranderingen in origineel data
function checkForDataChanges() {
    const currentProducts = localStorage.getItem('originalData');
    if (currentProducts !== storedProducts) {
        // Data has changed, refresh the page
        window.location.reload();
    }
}