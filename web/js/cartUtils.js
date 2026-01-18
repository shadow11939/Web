class CartManager {
    constructor() {
        this.storageKey = 'shoppingCart';
    }

    getCart() {
        const cart = localStorage.getItem(this.storageKey);
        return cart ? JSON.parse(cart) : [];
    }

    saveCart(cart) {
        localStorage.setItem(this.storageKey, JSON.stringify(cart));
    }

    // Add item to cart
    addItem(product) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.saveCart(cart);
        this.showNotification(`${product.name} đã được thêm vào giỏ hàng!`);
    }

    updateQuantity(id, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(id);
            } else {
                this.saveCart(cart);
            }
        }
    }
    removeItem(id) {
        const cart = this.getCart();
        const filteredCart = cart.filter(item => item.id !== id);
        this.saveCart(filteredCart);
    }
    getTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    getCount() {
        const cart = this.getCart();
        return cart.reduce((count, item) => count + item.quantity, 0);
    }
    clearCart() {
        localStorage.removeItem(this.storageKey);
    }
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

const cartManager = new CartManager();