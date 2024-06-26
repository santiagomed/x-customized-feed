import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000";

const postAlgorithmData = async (systemPrompt, algorithmChoice, tweetData) => {
  try {
    const requestData = {
      system_prompt: systemPrompt,
      algorithm: algorithmChoice,
      data: tweetData,
    };
    
    console.log("sending request data", requestData);
    const response = await axios.post('/', requestData);

    const tweetIDs = response.data;
    console.log("Received tweet IDs:", tweetIDs);

    return tweetIDs;
  } catch (error) {
    console.error("Error posting algorithm data:", error);
    throw error; 
  }
};

const fetchStaticTweets = async (source) => {
  const response = await fetch(`/static/${source}.json`)
  console.log('response', response);
  const res = await response.json();
  console.log('retrieved', res)
  return res
}

const fetchTweets = async () => {
  try {
    const response = await axios.get('/get_tweets', {
    params: {
      id: 805635117884575744
      // id: 1215441834412953600
    }
    });

    // console.log('results', response.data);
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
export { postAlgorithmData, fetchTweets, fetchStaticTweets };
