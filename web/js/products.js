document.addEventListener('DOMContentLoaded', function() {
    // Hide add-to-cart buttons if not logged in
    if (!auth.isLoggedIn()) {
        const buttons = document.querySelectorAll('.add-to-cart-btn');
        buttons.forEach(btn => btn.style.display = 'none');
    }

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            e.preventDefault();
            if (!auth.isLoggedIn()) {
                window.location.href = 'signin.html';
                return;
            }
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