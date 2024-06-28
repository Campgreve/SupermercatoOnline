$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });

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
        password: password
    })
})
const risposta = await request.json()
document.getElementById("risposta").innerHTML = risposta.msg
}


async function login(){
    const username_login = document.getElementById("username_login").value

    const request = await fetch(`http://127.0.0.1:8000/api/user/${username_login}`)
    const risposta = await request.json();

    if (risposta.username == username_login){
        localStorage.setItem('username', username_login)
        window.location.href = 'page.html'
    }
}