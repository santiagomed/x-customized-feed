preamble_with_img = """This is an assessment conversation performed by an AI assistant, designed to meticulously filter tweets based on a user prompt. The AI, has been programmed to respond with "Yes" or "No" to Human messages based on the relevancy and appropriateness of the content related to the user's interests. The conversation begins.

Human: Consider the guidelines provided in the prompt: "no explicit content". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with what you think the answer probably is. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "Hi there😅" and it has an image with the following description: "A woman in a black bikini top and straw hat stands confidently on a sandy beach, wearing a gold necklace and earrings.".<|separator|>

Assistant: The answer is:no<|separator|>

Human: Consider the guidelines provided in the prompt: "startups". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with what you think the answer probably is. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "Everyone thinks the paths to wealth are: Building a startup. Going into finance. Investing in real estate. Inheriting it. But there's an opportunity most overlook.. Buying a small business (yes, even a porta potty business...):" and it has an image with the following description: "urns of water, plants, and people working on laptops occupy a large room with a black and white checkered ceiling and white walls.".<|separator|>

Assistant: The answer is:yes<|separator|>

Human: Consider the guidelines provided in the prompt: "sports content". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with what you think the answer probably is. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "Excited for tonight's game!" and it has an image with the following description: "A basketball player in a red jersey with the number 24 is captured mid-air, reaching for a basketball, while a player in a blue jersey with the number 2 is in position to block the shot."<|separator|>

Assistant: The answer is:yes<|separator|>

Human: Consider the guidelines provided in the prompt: "no political content". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with what you think the answer probably is. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "This is the funniest picture of Obama ever!" and it has an image with the following description "A man in a suit stands on a scale in a hallway, while a man in a suit observes, with other men in suits and ties in the background."<|separator|>

Assistant: The answer is:no<|separator|>

Human: Consider the guidelines provided in the prompt: "travel and adventure". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with what you think the answer probably is. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "Just reached the summit of Mt. Everest! Feeling on top of the world." and it has an image with the following description: "A climber in red winter gear stands triumphantly at the peak of a snow-covered mountain with a clear blue sky in the background."<|separator|>

Assistant: The answer is:yes<|separator|>

Human: Consider the guidelines provided in the prompt: "vegetarian recipes only". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with what you think the answer probably is. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "Master the art of barbecue this weekend with our ultimate meat lover's guide!" and it has an image with the following description: "A detailed image showing various types of grilled meats including steaks, ribs, and sausages on a smoky grill."<|separator|>

Assistant: The answer is:no<|separator|>

Human: Consider the guidelines provided in the prompt: "I want to see dogs and tech conten". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with what you think the answer probably is. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "I love him!" and it has an image with the following description: "A black dog with a white patch on its nose and a white patch on its chest gazes at the camera, its eyes closed and mouth slightly open, with a blurred background of a road and trees."<|separator|>

Assistant: The answer is:yes<|separator|>

Human: Consider the guidelines provided in the prompt: "{prompt}". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with what you think the answer probably is. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "{text}" and it has an image with the following description: "{img_description}".<|separator|>

Assistant: The answer is:
"""

preamble_without_img = """This is an assessment task performed by an AI assistant, designed to meticulously filter tweets based on a user prompt. The AI named Grok, has been programmed to respond with "Yes" or "No" ONLY to Human messages based on the relevancy and appropriateness of the content related to the user's interests.

Human: Consider the guidelines provided in the prompt: "no explicit content". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with what you think the answer probably is. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "I gave my sister a kiss on the mouth.".<|separator|>

Assistant: The answer is probably no<|separator|>

Human: Consider the guidelines provided in the prompt: "no explicit content". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with what you think the answer probably is. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "I gave my daughter a kiss.".<|separator|>

Assistant: The answer is probably yes<|separator|>

Human: Consider the guidelines provided in the prompt: "sports content". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with what you think the answer probably is. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "Excited for tonight's game!".<|separator|>

Assistant: The answer is probably yes<|separator|>

Human: Consider the guidelines provided in the prompt: "no politics". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with what you think the answer probably is. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "Can't believe the new policy changes, totally unfair!".<|separator|>

Assistant: The answer is probably no<|separator|>

Human: Consider the guidelines provided in the prompt: "family-friendly content only". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with what you think the answer probably is. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "Check out this hilarious video of a cat falling off a table!".<|separator|>

Assistant:  The answer is probably yes<|separator|>

Human: Consider the guidelines provided in the prompt: "interest in technology news". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with what you think the answer probably is. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "Amazing breakthrough in AI development announced today!".<|separator|>

Assistant: The answer is probably yes<|separator|>

Human: Consider the guidelines provided in the prompt: "avoid celebrity gossip". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with what you think the answer probably is. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "Latest movie release dates leaked, including a big-name star!".<|separator|>

Assistant: The answer is probably no<|separator|>

Human: Consider the guidelines provided in the prompt: "likes gardening content". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with what you think the answer probably is. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "Discovered a great new way to repel pests naturally!".<|separator|>

Assistant: The answer is probably yes<|separator|>

Human: Consider the guidelines provided in the prompt: "{prompt}". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with what you think the answer probably is. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "{text}"<|separator|>

Assistant: The answer is probably 
"""
