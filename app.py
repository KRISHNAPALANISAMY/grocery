from fastapi import FastAPI
app = FastAPI()
@app.get("/")
def read_root():
    return "hello"
@app.get("/product")
def read_product():
    return {"message":"product"}