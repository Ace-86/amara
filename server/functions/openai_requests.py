import openai
from decouple import config

#import custom functions
from functions.database import get_recent_messages

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
    

#ai chat 
#get response to our message
def get_chat_response(message_input):
    
    messages = get_recent_messages()

    user_message = {"role": "user", "content": message_input}
    messages.append(user_message)

    print(messages)

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages = messages
        )
        print(response)
        message_text = response["choices"][0]["message"]["content"]
        
        
        # Analyze the response for specific keywords and trigger events
        if "opening task" in response["content"]:
            print("Success!!!")
            # You can use a WebSocket or an API call to communicate with your frontend

        # if "create new task" in message_text:
            # Trigger event to create a new task in your frontend
            # You can use a WebSocket or an API call to communicate with your frontend

        # Other keyword checks and corresponding events...
        
        
        return message_text
    except Exception as e:
        print(e)
        return "Done"