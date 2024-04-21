# prompt = """
# Is the following tweet, "{tweet}", relevant to the prompt, "{prompt}"? Respond with "Yes" or "No" only.
# """
prompt_with_image = """
Consider the guidelines provided in the user's prompt: "{prompt}". Based on these guidelines, determine if the tweet description below should be shown in the user's Twitter feed. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

The tweet's text is "{text}" and it has an image with the following description: "{img_description}".
"""

prompt = """
Consider the guidelines provided in the user's prompt: "{prompt}". Based on these guidelines, determine if the tweet below should be shown in the user's Twitter feed. Respond with "No" if the tweet contains any content that the user wants to avoid or if it does not align with the user's interests as specified. Respond with "Yes" if it is relevant and aligns with the user's interests without violating any exclusion criteria.

Tweet: "{text}".
"""
