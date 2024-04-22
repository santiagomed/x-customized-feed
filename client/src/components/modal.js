import React, { useState } from "react";
import { postAlgorithmData } from "../services/api";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./ui/tooltip";
import './modal.css';

const Modal = ({ isOpen, close, onIDsReceived, posts }) => {
    const [systemPrompt, setSystemPrompt] = useState("");
    const [algorithm, setAlgorithm] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const Spinner = () => <div className="spinner"></div>;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const formattedData = posts.map(post => ({
                id: post.id,
                text: post.content,
                img: post.mediaSrc ? [{ url: post.mediaSrc, width: 800, height: 600 }] : []
            }));
            const tweetIDs = await postAlgorithmData(systemPrompt, algorithm, formattedData);
            onIDsReceived(tweetIDs);
        } catch (error) {
            setError("Failed to submit data. Please try again later.");
            console.error(error);
        } finally {
            setIsLoading(false);
            close();
        }
    };

    if (!isOpen) return null;

    if (isLoading) {
      return (
          <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-gray-800 bg-opacity-90">
              <div className="quote">"Patience is not the ability to wait, but the ability to keep a good attitude while waiting." — Joyce Meyer</div>
              <Spinner />
          </div>
      );
  }
  

    return (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-90">
      <div className="relative bg-[#15202b] text-white rounded-lg p-8 max-w-md shadow-lg" style={{ minWidth: "400px", minHeight: "400px" }}>
          <button onClick={close} type="button" className="absolute top-4 right-4 text-gray-500 hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </button>
          <h1 className="text-2xl font-bold mb-4">Choose your feed</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-8">
                  <label htmlFor="systemPrompt" className="block text-xl font-normal mb-3">Prompt:</label>
                  <input
                      id="systemPrompt"
                      type="text"
                      placeholder="Ex: Exclude any NSFW content"
                      value={systemPrompt}
                      onChange={e => setSystemPrompt(e.target.value)}
                      className="w-full p-3 rounded-md border border-gray-300 bg-[#223344] focus:ring-2 focus:ring-blue-500 text-sm"
                  />
              </div>

              
          <div>
          <label className="block text-xl font-normal mb-3">
              Algorithm
              <TooltipProvider>
                  <Tooltip>
                      <TooltipTrigger>
                          <span className="rounded-full border border-white bg-transparent flex items-center justify-center ml-2" style={{ width: "20px", height: "20px" }}>
                              <span className="text-xs">i</span>
                          </span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-800 text-white text-sm p-3 rounded-lg shadow-md border border-gray-600">
                          <p>Choose 'prioritize' to show all content but prioritize based on query. Choose 'clean' to remove anything unrelated to query.</p>
                      </TooltipContent>
                  </Tooltip>
              </TooltipProvider>
          </label>
            <div className="flex items-center space-x-4">
              <RadioButton id="prioritize" name="algorithm" value="prioritize" label="Prioritize" checked={algorithm === "prioritize"} onChange={setAlgorithm} />
              <RadioButton id="clean" name="algorithm" value="clean" label="Clean" checked={algorithm === "clean"} onChange={setAlgorithm} />
            </div>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button
            type="submit"
            className="w-full bg-[#5480ab] hover:bg-[#3b5978] text-white py-2 rounded-lg transition-colors duration-150"
            style={{ marginTop: "3rem" }} 
          >
            Submit
          </button>
          {isLoading && <Spinner />}
        </form>
      </div>
    </div>
  );
  

  function RadioButton({ id, name, value, label, checked, onChange }) {
    return (
      <label htmlFor={id} className="flex items-center cursor-pointer text-xl font-light">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          className="hidden"
        />
        <span className={`mr-2 w-4 h-4 rounded-full border border-gray-400 flex-shrink-0 ${checked ? 'bg-white' : ''}`}></span>
        {label}
      </label>
    );
  }
  
  
  
  
};

export default Modal;