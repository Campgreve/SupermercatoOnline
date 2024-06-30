
 async function registrazione(){
    const username = document.getElementById("username").value
    const nome = document.getElementById("nome").value
    const cognome = document.getElementById("cognome").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const request = await fetch("http://127.0.0.1:8000/api/register", {
    method : 'POST',
    headers : {
        "Content-Type" : 'application/json'
    },
    body: JSON.stringify({
        nome: nome,
        cognome: cognome,
        username: username,
        email: email,
        password: password,
        ruolo: "utente"
    })
})

const risposta = await request.json()
document.getElementById("risposta").innerHTML = risposta.msg
}


async function login(){
    const username_login = document.getElementById("username_login").value
    const password_login = document.getElementById("password_login").value

    const request = await fetch(`http://127.0.0.1:8000/api/login`, {
        method : 'POST',
        headers : {
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify({
            username_login: username_login,
            password_login: password_login
        })
    })
    const risposta = await request.json()
    console.log(risposta)

    if(risposta){
        localStorage.setItem('username', risposta.username)
        localStorage.setItem('ruolo', risposta.ruolo)
        window.location.href='catalogo.html'
    }
}


async function logout(){
    localStorage.removeItem('username')
    localStorage.removeItem('ruolo')
    window.location.href='intro.html'
}