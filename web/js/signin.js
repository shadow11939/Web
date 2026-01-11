// Sign In Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signin-form');

    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Basic validation
        if (!email || !password) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // For demo purposes, check localStorage
        // In a real app, this would be sent to a server
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Store current user session
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Đăng nhập thành công!');
            window.location.href = 'index.html';
        } else {
            alert('Email hoặc mật khẩu không đúng!');
        }
    });
});