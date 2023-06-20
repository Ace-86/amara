import { useState} from 'react';

function Controller() {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);

    const createBlobUrl = (data: any) => {};

    const handleStop = async () => {}
    
  
    return (
    <div>
      Controller
    </div>
  );
}

export default Controller;
