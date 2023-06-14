from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    print("ace")
    return {"message": "Hello World"}