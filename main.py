from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware
import hashlib

app = FastAPI()