# uvicorn main:app
# uvicorn main:app --reload

#main imports
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
import openai

# custom function imports
from functions.openai_requests import convert_audio_to_text, get_chat_response
from functions.database import store_messages, reset_messages
# Intiate App
app = FastAPI()


# CORS - Origins
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "http://localhost:4174",
    "http://localhost:3000",
]



# CORS - Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,
    allow_credentials= True, 
    allow_methods= ["*"], 
    allow_headers= ["*"], 
)


# Health Report
@app.get("/health")
async def check_health():
    return {"message": "Healthy"}

# Reset messages
@app.get("/reset")
async def reset_convo():
    reset_messages()
    return {"message": "reset successful"}

#get audio recording
@app.get("/post-audio-get/")
async def get_audio():
    
    #get saved audio rb=read bytes
    audio_input = open("voice.mp3", "rb")

    #decode audio
    message_decoded = convert_audio_to_text(audio_input)

    # gaurd: warning if decode fails
    if not message_decoded:
        return HTTPException(status_code=400, detail="Failed to decode audio")
    
    #get response
    chat_response = get_chat_response(message_decoded)
    print(chat_response)

    #store messages
    store_messages(message_decoded, chat_response)
    print(message_decoded)

    return "DONE"

# # Post bot response; uploads video 
# # Note: not playing in browser when using post request
# @app.post("/post-audio/")
# async def post_audio(file: UploadFile = File(...)):
    
#     print("hello")

