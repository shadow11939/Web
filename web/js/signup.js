// Sign Up Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Basic validation
        if (!fullname || !email || !password || !confirmPassword) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (password !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp!');
            return;
        }

        if (password.length < 6) {
            alert('Mật khẩu phải có ít nhất 6 ký tự!');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Email không hợp lệ!');
            return;
        }

        // For demo purposes, store in localStorage
        // In a real app, this would be sent to a server
        const user = {
            fullname: fullname,
            email: email,
            password: password // In real app, never store plain password
        };

        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = existingUsers.find(u => u.email === email);

        if (userExists) {
            alert('Email đã được sử dụng!');
            return;
        }

        // Save user
        existingUsers.push(user);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        window.location.href = 'signin.html';
    });
});