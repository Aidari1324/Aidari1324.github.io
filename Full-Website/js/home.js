let cartItems = [];

// Pakt de data van local storage
const storedProducts = localStorage.getItem('originalData');
if (storedProducts) {
    const products = JSON.parse(storedProducts);
    PrintToCards(products);
    // checkt elk 1 seconde
    setInterval(checkForDataChanges, 1000);
} else {
    console.error('No products found in local storage');
}

const storedCartItems = localStorage.getItem('cartItems');
if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
}

// Dient voor info naar de html
function PrintToCards(products) {
    const cardsContainer = document.getElementById('cards-container');
    // verwijder alle inhoud in de cardcontainer
    cardsContainer.innerHTML = '';

    // per product doet die dit
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

        // Knop m en stuurt data ID naar local storage bij click
        const button = document.createElement('button');
        button.textContent = 'Voeg toe aan winkelmandje';
        button.classList.add('card-button');
        button.addEventListener('click', () => {
            // Product ID toevoegen aan array van cartItems
            const productId = product.id;
            cartItems.push(productId);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Update de num in de cart
            const iconElement = document.querySelector('.icon');
            iconElement.textContent = cartItems.length;
        });

        card.appendChild(button);

        cardsContainer.appendChild(card);
    });
}

// pakt de num of ID's in cart
const iconElement = document.querySelector('.icon');
iconElement.textContent = cartItems.length;

// checkt als er iets aangepast is 
function checkForDataChanges() {
    const currentProducts = localStorage.getItem('originalData');
    if (currentProducts !== storedProducts) {
        window.location.reload();
    }
}