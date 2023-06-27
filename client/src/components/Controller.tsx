import { useState, useEffect } from "react";
import Title from "./Title";
import RecordMessage from "./RecordMessage";
import axios from "axios";
import { Link, useNavigate  } from "react-router-dom";

function Controller() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  // const [blob, setBlob] = useState("");
  const history = useNavigate();






  // Fetch initial messages from the backend
// useEffect(() => {
//   fetchMessages();
// }, []);

// const fetchMessages = async () => {
//   try {
//     const response = await axios.get("http://localhost:8000/messages");
//     setMessages(response.data);
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//   }
// };
// cut off----------------







  const createBlobUrl = (data: any) => {
    const blob = new Blob([data], { type: "audio/mpeg" });
    const url = window.URL.createObjectURL(blob);
    return url;
  };

  const handleStop = async (blobUrl: string) => {
    setIsLoading(true);

    //append my recorded message to messages
    const myMessage = { sender: "me", blobUrl };
    const messagesArr = [...messages, myMessage];

    //convert blob url to blob object
    fetch(blobUrl)
      .then((res) => res.blob())
      .then(async (blob) => {
        //construct audio to send file
        const formData = new FormData();
        formData.append("file", blob, "myfile.wav");

        //send for data to api endpoint
        await axios
          .post("http://localhost:8000/post-audio", formData, {
            headers: { "Content-Type": "audio/mpeg" },
            responseType: "arraybuffer",
          })
          .then((res: any) => {
            const blob = res.data;
            const audio = new Audio();
            audio.src = createBlobUrl(blob);

            //append to audio
            const amaraMessage = { sender: "amara", blobUrl: audio.src };
            messagesArr.push(amaraMessage);
            setMessages(messagesArr);

            //play Audio
            setIsLoading(false);
            audio.play();

            // Analyze the AI response for specific commands
            // const userCommand = res.data
            // const aiResponse = get_chat_response(userCommand); // Replace "" with the actual user input
            // handleCommand(aiResponse);



          })
          .catch((err) => {
            console.error(err.message);
            setIsLoading(false);
          });
      });
  };





  // Handle specific commands
  // const handleCommand = (command: string) => {
  //   if (command === "open task page") {
  //     history("/tasks");
  //     console.log("Opening task page...");
  //   } else if (command === "create new task") {
  //     // placeholder for create new task
  //     console.log("Creating new task...");
  //   }
  // }







  return (
    <div className="h-screen overflow-y-hidden">
      <Title setMessages={{ setMessages }} />
      <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
        {/* <audio src={blob} controls /> */}

        {/* conversation log */}
        <div className="mt-5 px-5">
          {messages.map((audio, index) => {
            return (
              <div
                key={index + audio.sender}
                className={
                  "flex flex-col " +
                  (audio.sender == "amara" && "flex items-end ")
                }
              >
                {/* Sender */}
                <div className="mt-4">
                  <p
                    className={
                      audio.sender == "amara"
                        ? "text-right mr-2 italic text-green-500"
                        : "ml-2 italic text-blue-500"
                    }
                  >
                    {audio.sender}
                  </p>

                  {/* audio message */}
                  <audio
                    src={audio.blobUrl}
                    className="appearance-none"
                    controls
                  />
                </div>
              </div>
            );
          })}

          {messages.length == 0 && !isLoading && (
            <div className="text-center font-light italic mt-10">
              Amara is waiting....
            </div>
          )}

          {isLoading && (
            <div className="text-center font-light italic mt-10 animate-pulse">
              Gathering my thoughts...
            </div>
          )}
        </div>

        {/* Recorder */}
        <div className="fixed bottom-0 w-full py-6 border-t text-center bg-gradient-to-r from-yellow-500 to-pink-500">
          <div className="flex justify-center item-center w-full">
          <Link to="/tasks" className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 19a2 2 0 01-2 2H7a2 2 0 01-2-2V7c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v12z"
              />
            </svg>
          </Link>
            <RecordMessage handleStop={handleStop} />
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Controller;
