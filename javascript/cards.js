async function createCard(){
    const request = await fetch(`http://127.0.0.1:8000/api/prodotti`)
    const risposta = await request.json()


    const catalogo = document.getElementById("catalogo")
    catalogo.innerHTML = ''
    for(let i = 0; i < risposta.length; i++){
        let card = document.createElement("div")
        card.classList.add("card", "mb-3")
        card.innerHTML = `
                    <img class="card-img-top" src="${risposta[i].fotoProdotto}" alt="foto prodotto">
                    <div class="card-body">
                        <h5 class="card-title">${risposta[i].nomeProdotto}</h5>
                        <p class="card-text">Quantità: <span class="card-text" id="quantità${risposta[i].idProdotto}">${risposta[i].quantità}</span></p>
                        <p class="card-text" id="idProdotto${risposta[i].idProdotto}" style="display: none">${risposta[i].idProdotto}</p>
                        <p class="card-text">Prezzo: <span class="card-text" id="prezzoProdotto${risposta[i].idProdotto}">${risposta[i].prezzoProdotto}</span></p>
                        <input type="number" class="form-control" id="quantitàAcquistata${risposta[i].idProdotto}" min="1" value="1">
                        <button class="btn btn-primary mt-3" onclick="acquista(${risposta[i].idProdotto})">Acquista</button>
                    </div>
                `
        catalogo.appendChild(card)
    }
}

createCard()

let value=[]

async function acquista(id){
    const quantitàAcquistata = document.getElementById(`quantitàAcquistata${id}`).value
    const quantità = document.getElementById(`quantità${id}`).innerText
    const idProdotto = document.getElementById(`idProdotto${id}`).innerText
    const prezzoProdotto = document.getElementById(`prezzoProdotto${id}`).innerText

    if (quantitàAcquistata > quantità){
        alert('Quantità non valida')
    }
    else{
        const request = await fetch(`http://127.0.0.1:8000/api/modificaProdotto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quantitàAcquistata: quantitàAcquistata,
                quantità: quantità,
                idProdotto: idProdotto,
                prezzoProdotto: prezzoProdotto
            })
        })
        const risposta = await request.json()
        console.log(risposta)
        value.push(risposta)
        localStorage.setItem('prodotti', JSON.stringify(value))
        createCard()
    }
}

