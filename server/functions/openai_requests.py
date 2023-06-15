import openai
from decouple import config


# retrieve env variables
openai.organization = config("OPEN_AI_ORG")
openai.api_key = config("OPEN_AI_KEY")

#Open AI - Whisper
#Converts audio to text per documentation at openai
def convert_audio_to_text(audio_file):
    try:
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        message_text = transcript["text"]
        return message_text 
    except Exception as e:
        print(f"Error occurred during transcription: {str(e)}")
        return