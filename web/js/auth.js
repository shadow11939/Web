// Authentication utilities
const auth = {
    // Check if user is logged in
    isLoggedIn() {
        return localStorage.getItem('currentUser') !== null;
    },

    // Get current user
    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },

    // Logout user
    logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    },

    // Update navigation based on auth state
    updateNavigation() {
        const nav = document.querySelector('nav ul');
        if (!nav) return;

        const currentUser = this.getCurrentUser();

        if (currentUser) {
            // User is logged in - show logout and welcome message
            const signinLink = nav.querySelector('a[href="signin.html"]');
            const signupLink = nav.querySelector('a[href="signup.html"]');

            if (signinLink) signinLink.parentElement.remove();
            if (signupLink) signupLink.parentElement.remove();

            // Add welcome message and logout
            const welcomeLi = document.createElement('li');
            welcomeLi.innerHTML = `<span style="color: white; padding: 0.75rem 1.5rem;">Xin chào, ${currentUser.fullname}</span>`;
            nav.appendChild(welcomeLi);

            const logoutLi = document.createElement('li');
            logoutLi.innerHTML = `<a href="#" onclick="auth.logout()" style="color: white; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: 8px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); background: rgba(255, 255, 255, 0.1);">Đăng Xuất</a>`;
            nav.appendChild(logoutLi);
        } else {
            // User is not logged in - hide cart link
            const cartLink = nav.querySelector('a[href="cart.html"]');
            if (cartLink) cartLink.parentElement.remove();
        }
    }
};

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', function() {
    auth.updateNavigation();
});