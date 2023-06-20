import json
import random

#get recent messages
def get_recent_messages():

    #define the file name and leaning ai instructional prompts
    file_name = "stored_data.json"
    learn_instruction = {
        "role": "system",
        "content": "Your name is AMARA. You are the virtual assistant of the user. Ask short questions that are relevent to the organizing the user's life. The user is called Aaron. Keep ypur answers to under 30 words"
    }

    #Initialize messages
    messages = []

    # add random element
    x = random.uniform(0, 1)
    if x < 0.5:
        learn_instruction["content"] = learn_instruction["content"] + "Your response will include some sarcasm and witty humor."
    else:
        learn_instruction["content"] = learn_instruction["content"] + "Your response will include a some words of wisdom."

    # Append instruction to message
    messages.append(learn_instruction)

    #get last messages
    try:
        with open(file_name) as user_file:
            data = json.load(user_file)

            #append last 5 items 
            if data:
                #if data gets returned and data length is less than 5 we append everything
                if len(data) < 5:
                    for item in data:
                        messages.append(item)
                else:
                    # otherwise we go back 5 steps from end of our data and append the last 5 items of data
                    for item in data[-5:]:
                        messages.append(item)
    except Exception as e:
        print(e)
        pass
    
    #return    
    return messages