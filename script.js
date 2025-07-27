const iniLogin = document.getElementById('iniLogin')
const iniRegister = document.getElementById('iniRegister')
const iniBerhasil = document.getElementById('iniBerhasil')

iniLogin === null ? '': loginSection()
iniRegister === null ? '' : registerSection()
iniBerhasil === null ? '' : berhasilSection()


// LOGIN

function loginSection(){
    let username = document.getElementById('loginUser')
    let passwords = document.getElementById('loginPassword')
    const emptyUser = document.getElementById('emptyUser')
    const emptyPassword = document.getElementById('emptyPassword')
    const btn = document.getElementById('loginBtn')


    btn.addEventListener('click', () => {
        username.value == ''? [emptyUser.style.display = 'block',emptyUser.innerHTML = '!Nama tidak Boleh Kosong'] : [emptyUser.style.display = 'none']
        passwords.value == '' ? [emptyPassword.style.display = 'block',emptyPassword.innerHTML='!Password tidak boleh kosong'] : [emptyPassword.style.display = 'none']

        const nama = localStorage.getItem('nama')
        const password = localStorage.getItem('password')
    
        if(username.value !== nama || passwords.value !== password){
            emptyUser.style.display = 'block'
            emptyPassword.style.display = 'block'
            emptyUser.innerHTML = '!Nama Tidak ditemukan'
            emptyPassword.innerHTML = '!Password Tidak ditemukan'
        } else {
            window.location.href = 'berhasil.html'
        }

    })
}


// REGISTER

function registerSection() {
    let username = document.getElementById('username')
    let password = document.getElementById('password')
    const emptyUser = document.getElementById('emptyUser')
    const emptyPassword = document.getElementById('emptyPassword')
    const btn = document.getElementById('registerBtn')

    
    btn.addEventListener('click', () => {
        username.value == '' ? [emptyUser.style.display = 'block', emptyUser.innerHTML = 'Nama tidak boleh kosong']      : [emptyUser.style.display = 'none']
        password.value == '' ? [emptyPassword.style.display = 'block', emptyPassword.innerHTML = 'Password tidak boleh kosong']  : [emptyPassword.style.display ='none',passLength()]
    })
}

function passLength() {
    password.value.length < 8 ? [emptyPassword.style.display = 'block', emptyPassword.innerHTML = 'Password minimal 8 karakter'] : dataMasuk()
}

function dataMasuk() {
        if(username.value !== '' && password.value !== ''){
            localStorage.setItem('nama', username.value)
            localStorage.setItem('password', password.value)
            window.location.href = 'login.html'
        }
}

function berhasilSection() {
    const text = document.getElementById('haloUser')
    const textPass = document.getElementById('haloPass')

    textPass.innerHTML = `Password Kamu : ${localStorage.getItem('password')}`
    text.innerHTML = `Halo, ${localStorage.getItem('nama')}`
}



// localStorage.clear()
