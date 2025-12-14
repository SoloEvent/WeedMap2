function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    const _0x1a = [0x61,0x64,0x6d,0x69,0x6e];
    const _0x2b = [0x61,0x64,0x6d,0x69,0x6e,0x31,0x32,0x33];
    const _0x3c = String.fromCharCode(..._0x1a);
    const _0x4d = String.fromCharCode(..._0x2b);
    
    const _0x5e = 'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec';
    const _0x6f = 'f3c0a78c6cc8acd1805c1e8e40d7e8c3a85bfee0ba4e4e7e0a5e8e0a8a8bce7a5c7e8e1a7f0cba2e3c5e7a4e9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9';
    
    const _0x7g = CryptoJS.SHA512(username + _0x3c.split('').reverse().join(''));
    const _0x8h = CryptoJS.SHA512(password + _0x4d.split('').reverse().join(''));
    
    const _0x9i = CryptoJS.SHA512(_0x3c + username).toString();
    const _0xaj = CryptoJS.SHA512(_0x4d + password).toString();
    
    if (_0x9i === _0x5e && _0xaj === _0x6f) {
        sessionStorage.setItem('sahpAuthenticated', 'true');
        window.location.href = 'index.html';
        return false;
    } else {
        errorMessage.textContent = 'Invalid username or password. Please try again.';
        document.getElementById('password').value = '';
        return false;
    }
}