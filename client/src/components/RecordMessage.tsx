import { ReactMediaRecorder } from "react-media-recorder";
// import RecordIcon from "./RecordIcon";

type Props = {
  handleStop: any;
};

function RecordMessage({ handleStop }: Props) {
  return (
    <ReactMediaRecorder
      audio
      onStop={handleStop}
      render={({ status, startRecording, stopRecording }) => (
        <div className="mt-2">
          <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            className="bg-white p-4 rounded-full"
          >
            
          </button>
          <p className="mt-2 text-white font-light">{status}</p>
        </div>
      )}
    />
  );
}

export default RecordMessage;