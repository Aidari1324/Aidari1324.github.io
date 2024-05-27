document.addEventListener('DOMContentLoaded', function () {
    // pakt alle benodigde informatie uit HTML/localstorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const originalData = JSON.parse(localStorage.getItem('originalData'));
    const totaalPrijsElement = document.getElementById('totaal-prijs');
    const checkoutBtn = document.getElementById('checkout-btn');
    const totalAmounts = {};

    // checkt zelfde ID's in cart zit en doet dan +1 het per overeenkomende ID
    cartItems.forEach(itemId => { totalAmounts[itemId] = (totalAmounts[itemId] || 0) + 1; });

    // pakt alle ID's voor de data plaatsing
    function updateCartDisplay() {
        const [productTitleElement, productAmountElement, productPriceElement, productTotalElement] =
            [
                'product-title',
                'product-amount',
                'product-price',
                'product-total',
            ].map(id => document.getElementById(id));
        let totalPrice = 0;

        [
            productTitleElement,
            productAmountElement,
            productPriceElement,
            productTotalElement,
        ].forEach(el => { el.innerHTML = ''; });

        originalData.forEach(product => {
            const amount = totalAmounts[product.id] || 0;
            const total = amount * product.price;
            totalPrice += total;

            if (amount > 0) {
                productTitleElement.innerHTML += `
                <div class="aligner">
                    <button class="remove-btn" data-id="${product.id}">x</button>
                    <p>${product.name}</p>
                </div>`;
                productAmountElement.innerHTML += `
                <div class="aligner">
                    <p>${amount}</p>
                </div>`;
                productPriceElement.innerHTML += `
                <div class="aligner">
                    <p>€ ${product.price}</p>
                </div>`;
                productTotalElement.innerHTML += `
                <div class="aligner">
                    <p>€ ${total.toFixed(2)}</p>
                </div>`;
            }
        });

        // zorgt voor geen raar gedrag met de totaal prijs
        totaalPrijsElement.textContent = totalPrice.toFixed(2);
    }

    // als op knop wordt gedrukt verwijderd die 1 en slaat verandering op in localstorage
    document.addEventListener('click', event => {
        if (event.target.classList.contains('remove-btn')) {
            const productId = event.target.dataset.id;
            if (totalAmounts[productId] && totalAmounts[productId] > 0) {
                totalAmounts[productId]--;
                localStorage.setItem('cartItems', JSON.stringify(cartItems.filter(id => id !== productId)));
                updateCartDisplay();
            }
        }
    });

    updateCartDisplay();

    // als checkout wordt alles leeg gemaakt
    checkoutBtn.addEventListener('click', () => {
        localStorage.removeItem('cartItems');
        window.location.href = '../html/Checkout-end.html';
    });
});