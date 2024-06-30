async function aggiungiProdotto(){
    const nome = document.getElementById("nome").value;
    const foto = document.getElementById("foto").value;
    const prezzo = parseFloat(document.getElementById("prezzo").value);
    const quantità = parseInt(document.getElementById("quantità").value);
    console.log(nome);
    console.log(foto);
    console.log(prezzo);
    console.log(quantità);

    const request = await fetch(`http://127.0.0.1:8000/api/prodotto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nomeProdotto: nome,
            fotoProdotto: foto,
            prezzoProdotto: prezzo,
            quantità: quantità
        })
    })

    const risposta = await request.json();
    console.log(risposta);
}

const nomeProdotto = document.getElementById("nomeProdotto").value


document.addEventListener("DOMContentLoaded", function() {
    fetch(`http://127.0.0.1:8000/api/prodotti`)
        .then(response => response.json())
        .then(data => {
            const nomiProdotti = data.map(prodotto => prodotto.nomeProdotto);
            console.log(nomiProdotti);

        for(let i = 0; i < nomiProdotti.length; i++){
            const option = document.createElement("option");
            option.value = nomiProdotti[i];
            option.text = nomiProdotti[i];
            document.getElementById("nomeProdotto").appendChild(option);
        }
        });
});

async function aggiungiQuantità(){
    const nomeProdotto = document.getElementById("nomeProdotto").value
    const quantitàAggiunta = document.getElementById("quantitàAggiunta").value

    const request = await fetch(`http://127.0.0.1:8000/api/quantitaProdotto/${nomeProdotto}`)
    const response = await request.json();

    const quantità = response.quantità

    await fetch(`http://127.0.0.1:8000/api/aggiungiProdotto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quantitàAggiunta: quantitàAggiunta,
            quantità: quantità,
            nomeProdotto: nomeProdotto
        })  

    })
}
