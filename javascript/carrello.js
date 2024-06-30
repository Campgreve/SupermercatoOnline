document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');
    const prodottiDiv = document.getElementById('lista-prodotti');
    const totaleSpesa = document.getElementById('totale-spesa');
    const prodotti = JSON.parse(localStorage.getItem('prodotti')) || [];

    if (Array.isArray(prodotti)) {
        prodotti.forEach((prodotto) => {
            prodottiDiv.innerHTML += `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${prodotto.nomeProdotto}</h5>
                        <img class="card-img-top" src="${prodotto.fotoProdotto}" alt="foto prodotto">
                        <p class="card-text">Prezzo: € ${prodotto.prezzoProdotto.toFixed(2)}</p>
                        <p class="card-text">Quantità: ${prodotto.quantità}</p>
                        <p class="card-text">Codice prodotto: ${prodotto.idProdotto}</p>
                        <button class="btn btn-danger" id="${prodotto.idProdotto}" onclick="rimuoviProdotto(this)">Cestino</button>
                    </div>
                </div>
            `;
        });

        totaleSpesa.innerHTML = `€ ${prodotti.reduce((totale, prodotto) => totale + (prodotto.prezzoProdotto * prodotto.quantità), 0).toFixed(2)}`;
    }

    container.style.display = 'block';
});

function rimuoviProdotto(button) {
    const idProdotto = button.id;
    let prodotti = JSON.parse(localStorage.getItem('prodotti')) || [];
    const index = prodotti.findIndex(prodotto => prodotto.idProdotto === idProdotto);
    if (index !== -1) {
        prodotti.splice(index, 1);
        localStorage.setItem('prodotti', JSON.stringify(prodotti));
        location.reload();
    }
}



const Oggetto = document.getElementById("Oggetto")

const aggiungiElemento = document.getElementById("aggiungiElemento")

aggiungiElemento.addEventListener("keyup",function (e) {
    if (e.key == "Enter" && e.target.value.trim()) {
        creaElemento(e.target.value);
        e.target.value = "";
    }

});

const creaElemento = (elemento) => {
    const elementoLista  = document.createElement("li");
    elementoLista.className = "list-group-item d-flex justify-content-between";
    elementoLista.innerHTML = <span>${elemento}</span><i class="bi bi-trash cestino"></i>;
    Oggetto.appendChild(elementoLista);
}

Oggetto.addEventListener("click", (e)=> {
    if(e.target.classList.contains("cestino")){
    e.target.parentElement.remove();
    }
});


