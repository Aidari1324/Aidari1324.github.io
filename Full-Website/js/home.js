// Geeft de local storage door
let cartItems = [];

// Pakt de data van local storage en parsed het
const storedProducts = localStorage.getItem('originalData');
if (storedProducts) {
    const products = JSON.parse(storedProducts);
    PrintToCards(products);
    // Start periodic check for changes in originalData
    setInterval(checkForDataChanges, 1000); // Check every second
} else {
    console.error('No products found in local storage');
}

// Check for existing cart items in local storage
const storedCartItems = localStorage.getItem('cartItems');
if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
}

// Dient voor datahandelingen naar html
function PrintToCards(products) {
    const cardsContainer = document.getElementById('cards-container');
    // Remove all existing cards
    cardsContainer.innerHTML = '';

    // Loop through products and create card elements
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

        // Knop maken en stuurt data ID naar local storage bij click
        const button = document.createElement('button');
        button.textContent = 'Voeg toe aan winkelmandje';
        button.classList.add('card-button');
        button.addEventListener('click', () => {
            // Product ID toevoegen aan cartItems array
            const productId = product.id;
            cartItems.push(productId);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Update the number of items in the cart
            const iconElement = document.querySelector('.icon');
            iconElement.textContent = cartItems.length;
        });

        card.appendChild(button);

        cardsContainer.appendChild(card);
    });
}

// Update the cart icon with the number of items on page load
const iconElement = document.querySelector('.icon');
iconElement.textContent = cartItems.length;

// Function to check for changes in originalData
function checkForDataChanges() {
    const currentProducts = localStorage.getItem('originalData');
    if (currentProducts !== storedProducts) {
        // Data has changed, refresh the page
        window.location.reload();
    }
}