function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    const _0x4a2b = ['YWRtaW4=', 'YWRtaW4xMjM='];
    const _0x3f1c = atob(_0x4a2b[0]);
    const _0x8d5e = atob(_0x4a2b[1]);
    
    if (username === _0x3f1c && password === _0x8d5e) {
        sessionStorage.setItem('sahpAuthenticated', 'true');
        window.location.href = 'index.html';
        return false;
    } else {
        errorMessage.textContent = 'You typed the wrong info fuckhead, you must be LSPD';
        document.getElementById('password').value = '';
        return false;
    }
}