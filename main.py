from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware
import hashlib

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)

# CREATE TABLE users(
# 	  username VARCHAR(40) PRIMARY KEY,
#     nome VARCHAR(20),
#     cognome VARCHAR(20),   
# 	  email VARCHAR(30),def
#     password VARCHAR(60),
#     ruolo VARCHAR(10)
# );


config = {
    "host": "127.0.0.1",
    "port": "3306",
    "user": "root",
    "database": "supermercato_online"
}



class utente(BaseModel):
    nome: str
    cognome: str
    username: str
    email: str
    password: str
    ruolo: str
    
@app.post("/api/register")
def registrazione(user : utente):
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()

    #converte la password in hash per una maggiore sicurezza
    passHash = hashlib.md5(user.password.encode()).hexdigest()
    
    cursor.execute(f"INSERT INTO users (nome, cognome, username, email, password, ruolo) VALUES ('{user.nome}', '{user.cognome}','{user.username}','{user.email}', '{passHash}', '{user.ruolo}')")

    conn.commit()
    conn.close()
    return{
        "msg":"registrato con successo"
    }

#BaseModel per l'accesso
class userLogin(BaseModel):
    username_login: str
    password_login: str
    
@app.post("/api/login")
def login(user : userLogin):
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)

    passHash = hashlib.md5(user.password_login.encode()).hexdigest()
    
    cursor.execute(f"SELECT * FROM users WHERE username='{user.username_login}' AND password='{passHash}' ")
    user = cursor.fetchone()
    
    conn.close()
    if user:
        return user
    else:
        return {
            "msg": "errore"
        }


# CREATE TABLE prodotti(
#       idProdotto INT(99) AUTO_INCREMENT PRIMARY KEY,
#       fotoProdotto VARCHAR(99),
#       nomeProdotto VARCHAR(20),
#       prezzoProdotto FLOAT(20),
#       quantità INT(99)
#   );
class prodotto(BaseModel):
    nomeProdotto: str
    fotoProdotto :str
    prezzoProdotto: float
    quantità: int


@app.post("/api/prodotto")
def prodotto(prod : prodotto):
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)

    cursor.execute(f"INSERT INTO prodotti(nomeProdotto, fotoProdotto, prezzoProdotto, quantità) VALUES ('{prod.nomeProdotto}','{prod.fotoProdotto}', {prod.prezzoProdotto}, {prod.quantità})")
    
    conn.commit()
    conn.close()



class modificaProdotto(BaseModel):
    quantitàAcquistata: int
    quantità: int
    idProdotto: int
    prezzoProdotto: float


@app.post("/api/modificaProdotto")
def modificaProdotto(prod : modificaProdotto):
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)

    if(prod.quantitàAcquistata > prod.quantità):
        conn.close()
        return {
            "msg": "errore"
        }
    else:
        cursor.execute(f"UPDATE prodotti SET quantità = {prod.quantità} - {prod.quantitàAcquistata} WHERE idProdotto = '{prod.idProdotto}'")
        cursor.execute(f"SELECT * FROM prodotti WHERE idProdotto = '{prod.idProdotto}'")
        prodotto = cursor.fetchone()
        prodotto["quantitàAcquistata"] = prod.quantitàAcquistata
        prodotto["prezzoTotale"] = prod.quantitàAcquistata*prod.prezzoProdotto
        
        conn.commit()
        conn.close()
        
        return prodotto
    
    
class aggiungiProdotto(BaseModel):
    quantitàAggiunta: int
    quantità: int
    nomeProdotto: str
@app.post("/api/aggiungiProdotto")
def aggiungiProdotto(prod : aggiungiProdotto):
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)

    cursor.execute(f"UPDATE prodotti SET quantità = {prod.quantità} + {prod.quantitàAggiunta} WHERE nomeProdotto = '{prod.nomeProdotto}'")
    
    conn.commit()
    conn.close()
        
    
    
    
@app.get("/api/prodotti")
def getProdotti():
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM prodotti ")
    prodotti = cursor.fetchall()

    conn.close()
    return prodotti


@app.get("/api/quantitaProdotto/{nomeProdotto}")
def getQuantitaProdotto(nomeProdotto: str):
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)

    cursor.execute(f"SELECT quantità FROM prodotti WHERE nomeProdotto = %s", (nomeProdotto,))

    quantita = cursor.fetchone()
    
    conn.close()

    return quantita

