// import React, { useState } from "react";
// import { postAlgorithmData } from "../services/api";

// const AlgorithmFormPage = () => {
//   const [systemPrompt, setSystemPrompt] = useState("");
//   const [algorithm, setAlgorithm] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError("");

//     if(!systemPrompt || !algorithm){
//         setError("fill all fields");
//         return;
//     }

//     try {
//       const data = await postAlgorithmData(systemPrompt, algorithm);
//       console.log(data);
//     } catch (error) {
//      setError("Failed to submit data. Please try again later.");
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Submit Your Prompt</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="systemPrompt">System Prompt:</label>
//           <input
//             id="systemPrompt"
//             type="text"
//             value={systemPrompt}
//             onChange={(e) => setSystemPrompt(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="algorithmChoice">Algorithm Choice:</label>
//           <select
//             id="algorithmChoice"
//             value={algorithm}
//             onChange={(e) => setAlgorithm(e.target.value)}
//           >
//             <option value="">Select an algorithm</option>
//             <option value="algorithm1">Algorithm 1</option>
//             <option value="algorithm2">Algorithm 2</option>
//           </select>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AlgorithmFormPage;
