import { useState } from "react";
import Title from "./Title";
import RecordMessage from "./RecordMessage";

function Controller() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [blob, setBlob] = useState("")

  const createBlobUrl = (data: any) => {};

  const handleStop = async (blobUrl: string) => {
    console.log(blobUrl)
    setBlob(blobUrl)
  };

  return (
    <div className="h-screen overflow-y-hidden">
      <Title setMessages={{ setMessages }} />
      <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
        <audio src={blob} controls  />
        {/* Recorder */}
        <div className="fixed bottom-0 w-full py-6 border-t text-center bg-gradient-to-r from-yellow-500 to-pink-500">
          <div className="flex justify-center item-center w-full">
            <RecordMessage handleStop={handleStop} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Controller;
