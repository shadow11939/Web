document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    function renderCart() {
        const cartItems = cartManager.getCart();
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
            totalPriceElement.textContent = '0';
            return;
        }

        cartItems.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString()} VND</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                    <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
                </div>
                <button class="remove-btn" data-id="${item.id}">Xóa</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        totalPriceElement.textContent = total.toLocaleString();
    }

    cartItemsContainer.addEventListener('click', function(e) {
        const target = e.target;
        const id = parseInt(target.dataset.id);

        if (target.classList.contains('quantity-btn')) {
            const currentItem = cartManager.getCart().find(item => item.id === id);
            if (target.dataset.action === 'increase') {
                cartManager.updateQuantity(id, currentItem.quantity + 1);
            } else if (target.dataset.action === 'decrease' && currentItem.quantity > 1) {
                cartManager.updateQuantity(id, currentItem.quantity - 1);
            }
            renderCart();
        } else if (target.classList.contains('remove-btn')) {
            cartManager.removeItem(id);
            renderCart();
        }
    });

    cartItemsContainer.addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const id = parseInt(e.target.dataset.id);
            const newQuantity = parseInt(e.target.value);
            if (newQuantity > 0) {
                cartManager.updateQuantity(id, newQuantity);
                renderCart();
            }
        }
    });

    document.getElementById('checkout-btn').addEventListener('click', function() {
        const cartItems = cartManager.getCart();
        if (cartItems.length > 0) {
            alert('Chức năng thanh toán sẽ được triển khai sau!');
        } else {
            alert('Giỏ hàng trống!');
        }
    });

    renderCart();
});