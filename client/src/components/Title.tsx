import {useState} from 'react';
import axios from 'axios';

type Props = {    
setMessages: any;
};

function Title({ setMessages }: Props) {
    const [isResetting, setIsResetting] = useState(false);
    
    // reset the conversation
    const resetConversation = async () => {
        setIsResetting(true);

        await axios.get("http://localhost:8000/reset").then((res) => {
            if (res.status == 200) {
                setMessages([])
            } else {
                console.error("there was an error with api request to backend")
            }
        })
        .catch((err) => {
            console.error(err.message);
        })

        setIsResetting(false)
    };

    return <div> <button onClick={resetConversation}  className="bg-indigo-500 p-5"> Reset</button> </div>

}


// function Title() {
    
  
//     return (
//     <div>
      
//     </div>
//   );
// }

export default Title;
