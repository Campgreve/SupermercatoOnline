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
