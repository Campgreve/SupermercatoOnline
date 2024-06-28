from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware
import hashlib

app = FastAPI()

config = {
    "host": "127.0.0.1",
    "port": "3306",
    "user": "root",
    "database": "supermercato_online"
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)

@app.post("/api/register")
class registrazione(BaseModel):
    email: str
    password: str  
    nome: str
    cognome: str
    ruolo: str

def registrazione_user(user : registrazione):
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()

    #converte la password in hash per una maggiore sicurezza
    passHash = hashlib.md5(user.password.encode()).hexdigest()
    
    cursor.execute(f"INSERT INTO users (email, password, nome, cognome, ruolo) VALUES ('{user.email}', '{passHash}', '{user.nome}', '{user.cognome}', '{user.ruolo}')")

    conn.commit()
    conn.close()
    return{
        "msg":"registrato con successo"
    }

#BaseModel per l'accesso
@app.post("/api/login")
class userLogin(BaseModel):
    email: str
    password: str

def login(user: userLogin):
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)

    passHash = hashlib.md5(user.password.encode()).hexdigest()

    cursor.execute(f"SELECT * FROM users WHERE email='{user.email}' AND password = '{passHash}'")
    user = cursor.fetchone()
    
    conn.close()
    if user:
        return user
    else:
        return{
            "msg":"errore"
        }
