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
        checkout();
    });

    function checkout() {
        const cartItems = cartManager.getCart();
        if (cartItems.length === 0) {
            alert('Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi thanh toán.');
            return;
        }

        // Create checkout modal
        const modal = document.createElement('div');
        modal.id = 'checkout-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <h3>Thông Tin Thanh Toán</h3>
                    <form id="checkout-form">
                        <div class="form-group">
                            <label for="customer-name">Họ và tên:</label>
                            <input type="text" id="customer-name" required>
                        </div>
                        <div class="form-group">
                            <label for="customer-email">Email:</label>
                            <input type="email" id="customer-email" required>
                        </div>
                        <div class="form-group">
                            <label for="customer-phone">Số điện thoại:</label>
                            <input type="tel" id="customer-phone" required>
                        </div>
                        <div class="form-group">
                            <label for="customer-address">Địa chỉ giao hàng:</label>
                            <textarea id="customer-address" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="payment-method">Phương thức thanh toán:</label>
                            <select id="payment-method" required>
                                <option value="cod">Thanh toán khi nhận hàng</option>
                                <option value="card">Thẻ tín dụng</option>
                                <option value="bank">Chuyển khoản ngân hàng</option>
                            </select>
                        </div>
                        <div class="checkout-summary">
                            <h4>Tóm tắt đơn hàng</h4>
                            <p>Tổng sản phẩm: ${cartItems.length}</p>
                            <p>Tổng tiền: ${cartManager.getTotal().toLocaleString()} VND</p>
                        </div>
                        <div class="modal-buttons">
                            <button type="button" class="btn btn-secondary" id="cancel-checkout">Hủy</button>
                            <button type="submit" class="btn btn-primary">Xác Nhận Thanh Toán</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Handle form submission
        document.getElementById('checkout-form').addEventListener('submit', function(e) {
            e.preventDefault();
            processPayment();
        });

        // Handle cancel
        document.getElementById('cancel-checkout').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
    }

    function processPayment() {
        // Simulate payment processing
        const processingModal = document.createElement('div');
        processingModal.id = 'processing-modal';
        processingModal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <h3>Đang xử lý thanh toán...</h3>
                    <div class="loading-spinner"></div>
                    <p>Vui lòng đợi trong giây lát.</p>
                </div>
            </div>
        `;

        document.body.appendChild(processingModal);

        // Simulate API call delay
        setTimeout(() => {
            document.body.removeChild(processingModal);
            document.body.removeChild(document.getElementById('checkout-modal'));

            // Clear cart
            cartManager.clearCart();

            // Show success message
            const successModal = document.createElement('div');
            successModal.id = 'success-modal';
            successModal.innerHTML = `
                <div class="modal-overlay">
                    <div class="modal-content">
                        <h3>Thanh toán thành công!</h3>
                        <p>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn sẽ được xử lý trong vòng 24 giờ.</p>
                        <button class="btn btn-primary" id="continue-shopping">Tiếp tục mua sắm</button>
                    </div>
                </div>
            `;

            document.body.appendChild(successModal);

            // Re-render cart (should be empty now)
            renderCart();

            document.getElementById('continue-shopping').addEventListener('click', function() {
                document.body.removeChild(successModal);
                window.location.href = 'products.html';
            });
        }, 2000);
    }

    renderCart();
});