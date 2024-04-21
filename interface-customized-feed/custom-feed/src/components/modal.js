import React, { useState } from "react";
import { postAlgorithmData } from "../services/api";
import {Tooltip, TooltipTrigger, TooltipContent, TooltipProvider} from "./ui/tooltip";

const Modal = ({ isOpen, close }) => {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [algorithm, setAlgorithm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // if (!systemPrompt || !algorithm) {
    //   setError("Please fill all fields");
    //   return;
    // }

    try {
      const fakeTweetData = generateFakeTweetData();
      const data = await postAlgorithmData(systemPrompt, algorithm, fakeTweetData);
      alert("Data sent successfully!");
      console.log("Response from backend:", data);
      close();
    } catch (error) {
      setError("Failed to submit data. Please try again later.");
      console.error(error);
    }
  };


  const generateFakeTweetData = () => {
    const tweetData = [
      {
        id: 1,
        author_id: 101,
        text: "I love the US Army",
        img: [
          { url: "https://pbs.twimg.com/media/GLmtammakAAt9b3?format=jpg&name=large", width: 800, height: 600 },
        ]
      },
      {
        id: 2,
        author_id: 102,
        text: "I love war. america,and guns",
        img: [
          { url: "https://pbs.twimg.com/media/GLoR593boAAsVEL?format=jpg&name=900x900", width: 1000, height: 800 }
        ]
      },
    ];
  
    return tweetData;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#434c55] bg-opacity-90">
    <div className="bg-[#212936] text-white rounded-lg p-8 max-w-md relative shadow-md" style={{ minWidth: "400px", minHeight: "400px" }}>
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold mb-4">Choose your feed</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-8">
            <label htmlFor="systemPrompt" className="block text-xl font-light mb-3">Prompt:</label>
            <input
              id="systemPrompt"
              type="text"
              placeholder="Ex: Exclude any NSFW content"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 text-black text-sm"
              style={{ height: "3rem", textAlign: "top" }}
            />
          </div>
          <div>
            <label className="block text-xl font-light mb-3">
              Algorithm
              <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                <span className="ml-1 text-blue-500 cursor-pointer inline-block relative" style={{ fontSize: "1.2rem" }}>
                  <span className="rounded-full border border-white bg-transparent w-4 h-4 ml-1 flex items-center justify-center">
                    <span className="text-xs text-white">i</span>
                  </span>
                </span>                
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose prioritize to show all content but prioritize based on query. Choose clean to remove anything unrelated to query.</p>
                </TooltipContent>
              </Tooltip>
              </TooltipProvider>
              </label>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="prioritize"
                name="prioritize"
                value="prioritize"
                checked={algorithm === "prioritize"}
                onChange={() => setAlgorithm("prioritize")}
                className="hidden"
              />
              <label htmlFor="prioritize" className="flex items-center cursor-pointer font-light text-xl">
                <span className={`w-4 h-4 border border-gray-400 rounded-full mr-2 flex-shrink-0 ${algorithm === "prioritize" ? 'bg-white' : ''}`}></span>
                Prioritize
              </label>
              <input
                type="radio"
                id="clean"
                name="clean"
                value="clean"
                checked={algorithm === "clean"}
                onChange={() => setAlgorithm("clean")}
                className="hidden"
              />
              <label htmlFor="clean" className="flex items-center cursor-pointer font-light text-xl">
                <span className={`w-4 h-4 border border-gray-400 rounded-full mr-2 flex-shrink-0 ${algorithm === "clean" ? 'bg-white' : ''}`}></span>
                Clean
              </label>
            </div>
          </div>
  
          {error && <div className="text-red-500">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            style={{ marginTop: "3rem" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default Modal;