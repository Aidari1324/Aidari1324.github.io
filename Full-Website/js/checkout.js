document.addEventListener('DOMContentLoaded', function () {
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const originalData = JSON.parse(localStorage.getItem('originalData'));

    const productTitleElement = document.getElementById('product-title');
    const productAmountElement = document.getElementById('product-amount');
    const productPriceElement = document.getElementById('product-price');
    const productTotalElement = document.getElementById('product-total');
    const totaalPrijsElement = document.getElementById('totaal-prijs');
    const checkoutBtn = document.getElementById('checkout-btn');

    const totalAmounts = {};

    // telt de aantal in cart op
    cartItems.forEach(function (itemId) {
        totalAmounts[itemId] = (totalAmounts[itemId] || 0) + 1;
    });

    let totalPrice = 0;

    // loopts door origineel data en zet product informatie
    originalData
        // Filter alleen de product in de cart
        .filter(product => cartItems.includes(product.id))
        .forEach(product => {
            // hoeveelheid van elk product
            const amount = totalAmounts[product.id] || 0;
            // calculatie voor het totaal prijs van alles bij elkaar
            const total = amount * product.price;

            // producten naar html
            productTitleElement.innerHTML += `<p>${product.name}</p>`;
            productAmountElement.innerHTML += `<p>${amount}</p>`;
            productPriceElement.innerHTML += `<p>€ ${product.price}</p>`;
            productTotalElement.innerHTML += `<p>€ ${total.toFixed(2)}</p>`;

            totalPrice += total;
        });

    totaalPrijsElement.textContent = totalPrice.toFixed(2);

    checkoutBtn.addEventListener('click', function () {
        // verwijderd de cart items van localstorage
        localStorage.removeItem('cartItems');
        // stuur door naar andere website
        window.location.href = '../html/Checkout-end.html';
    });
});