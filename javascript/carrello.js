function stampaProdotti() {
    let prodotti = JSON.parse(localStorage.getItem("prodotti"));
    
    if (prodotti) {
        let listaProdotti = document.getElementById("lista-prodotti");
        listaProdotti.innerHTML = "";

        for (let i = 0; i < prodotti.length; i++) {
            let card = document.createElement("div");
            card.classList.add("card", "mb-3");
            card.innerHTML = `
                <img class="card-img-top" src="${prodotti[i].fotoProdotto}" alt="foto prodotto">
                <div class="card-body">
                    <h5 class="card-title">${prodotti[i].nomeProdotto}</h5>
                    <p class="card-text">Quantità: <span class="card-text" id="quantità${prodotti[i].idProdotto}">${prodotti[i].quantità}</span></p>
                    <p class="card-text" id="idProdotto${prodotti[i].idProdotto}" style="display: none">${prodotti[i].idProdotto}</p>
                    <p class="card-text">Prezzo: ${prodotti[i].prezzoProdotto} €</p>
                </div>
            `;

            listaProdotti.appendChild(card);
        }
    } else {
        console.log("Nessun prodotto nel localStorage");
    }
}

// Chiamata della funzione per stampare i prodotti
stampaProdotti();
