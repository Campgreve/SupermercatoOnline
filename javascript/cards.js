async function createCard(){
    const request = await fetch(`http://127.0.0.1:8000/api/prodotti`)
    const risposta = await request.json()

    console.log(risposta)

    const catalogo = document.getElementById("catalogo")
    catalogo.innerHTML = ''
    for(let i = 0; i < risposta.length; i++){
        let card = document.createElement("div")
        card.classList.add("card", "mb-3")
        card.innerHTML = `
                    <img class="card-img-top" src="${risposta[i].fotoProdotto}" alt="foto prodotto">
                    <div class="card-body">
                        <h5 class="card-title">${risposta[i].nomeProdotto}</h5>
                        <p class="card-text">Quantità: <span class="card-text" id="quantità">${risposta[i].quantità}</span></p>
                        <p class="card-text" id="idProdotto${risposta[i].idProdotto}" style="display: none">${risposta[i].idProdotto}</p>
                        <p class="card-text">Prezzo: ${risposta[i].prezzoProdotto} €</p>
                        <input type="number" class="form-control" id="quantitàAcquistata" min="1" value="1">
                        <button class="btn btn-primary mt-3" onclick="verifica(${risposta[i].idProdotto})">Acquista</button>
                    </div>
                `
        catalogo.appendChild(card)
    }
}

createCard()


function verifica(id){
    let quantitàAcquistata = document.getElementById(`quantitàAcquistata`).value
    let quantità = document.getElementById(`quantità`).innerText
    let idProdotto = document.getElementById(`idProdotto${id}`).innerText

    parseInt(quantitàAcquistata)
    parseInt(quantità)
    
    if (quantitàAcquistata > quantità){
        alert('Quantità non valida')
    }else{
        acquista(id)
    }
}


async function acquista(id){
    const quantitàAcquistata = document.getElementById(`quantitàAcquistata`).value
    const quantità = document.getElementById(`quantità`).innerText
    const idProdotto = document.getElementById(`idProdotto${id}`).innerText

    if (quantitàAcquistata > quantità){
        alert('Quantità non valida')
        return
    }
    else{
        console.log(quantitàAcquistata)
        console.log(quantità)
        console.log(idProdotto)
        const request = await fetch(`http://127.0.0.1:8000/api/modificaProdotto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quantitàAcquistata: quantitàAcquistata,
                quantità: quantità,
                idProdotto: idProdotto
            })
        })
        const risposta = await request.json()
        console.log(risposta)
        createCard()
    }
}