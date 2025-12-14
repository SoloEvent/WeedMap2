function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    if (username === 'admin' && password === 'admin123') {
        sessionStorage.setItem('sahpAuthenticated', 'true');
        window.location.href = 'index.html';
        return false;
    } else {
        errorMessage.textContent = 'Invalid username or password. Please try again.';
        document.getElementById('password').value = '';
        return false;
    }
}
