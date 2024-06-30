const Oggetto = JSON.parse(localStorage.getItem('prodotti')) || [];

const creaElemento = (elemento) => {
    const elementoLista  = document.createElement("li");
    elementoLista.className = "list-group-item d-flex justify-content-between";
    elementoLista.innerHTML = `<span>${elemento.nomeProdotto} x${elemento.quantitàAcquistata}    ${elemento.prezzoTotale}€</span><i class="bi bi-trash cestino"></i>`;
    document.getElementById("Oggetto").appendChild(elementoLista);
}

for(let i = 0; i < Oggetto.length; i++){
    creaElemento(Oggetto[i]);
}


Oggetto.addEventListener("click", (e)=> {
    if(e.target.classList.contains("cestino")){
    e.target.parentElement.remove();
    }
});

async function rimuoviTutto(){
    localStorage.removeItem('prodotti');
    window.location.reload();
}

async function confermaOrdine(){
    alert('Ordine confermato!')
    localStorage.removeItem('prodotti');
    window.location.reload();
}