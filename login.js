function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    const _0x5a8c = (function() {
        const _0x2b9f = String.fromCharCode(83, 65, 72, 80, 95, 83, 101, 99, 114, 101, 116, 95, 75, 101, 121, 95, 50, 48, 50, 52);
        return _0x2b9f;
    })();
    
    const _0x7d3e = 'U2FsdGVkX1+8xJGhvKGZqK3mYWJvHGK5xKhvLmNpZHI=';
    const _0x9f2a = 'U2FsdGVkX1/xHvKmL3YwZhK8vLmYpqWxK2hvZnNwZHJ3';
    
    try {
        const _0x4c1b = CryptoJS.AES.decrypt(_0x7d3e, _0x5a8c).toString(CryptoJS.enc.Utf8);
        const _0x6e8d = CryptoJS.AES.decrypt(_0x9f2a, _0x5a8c).toString(CryptoJS.enc.Utf8);
        
        if (username === _0x4c1b && password === _0x6e8d) {
            sessionStorage.setItem('sahpAuthenticated', 'true');
            window.location.href = 'index.html';
            return false;
        } else {
            errorMessage.textContent = 'Invalid username or password. Please try again.';
            document.getElementById('password').value = '';
            return false;
        }
    } catch(e) {
        errorMessage.textContent = 'Authentication error. Please try again.';
        return false;
    }
}