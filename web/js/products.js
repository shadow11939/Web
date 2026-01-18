document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            e.preventDefault();
            const button = e.target;
            const productCard = button.closest('.product-card');

            const product = {
                id: parseInt(productCard.dataset.id),
                name: productCard.dataset.name,
                price: parseInt(productCard.dataset.price),
                image: productCard.dataset.image
            };

            cartManager.addItem(product);
        }
    });
});