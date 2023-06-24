import React from "react";
import { Link } from "react-router-dom";
import RecordMessage from "./RecordMessage";

type FooterProps = {
  handleStop: (recordedBlob: Blob) => void;
};

const Footer: React.FC<FooterProps> = ({ handleStop }) => {
  return (
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
  );
};

export default Footer;