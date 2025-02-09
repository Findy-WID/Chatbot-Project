
const API_KEY = "";


const getChatResponse = () => {
    const API_URL = "https://api.openai.com/v1/completions";
    
    // Define the properties and data for the API request
    const requestOptions = {
        method: "POST",
        headers: {        
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: userText,
            max_tokens: 2048,
            temperature: 0.2,
            n: 1,
            stop: null
        })
    }
}

const showTyingAnimation = () => {
    const html = ` div class="chat-content">
                <div class="chat-details">
                    <img src="./ninjabotgirl.jpg" alt="ninjabot">
                     <div class="typing-animation">
                        <div class="typing-dot" style="--delay: 0.2s"></div>
                        <div class="typing-dot" style="--delay: 0.3s"></div>
                        <div class="typing-dot" style="--delay: 0.4s"></div>
                     </div>
                </div>
                <span class="material-symbols-rounded">content_copy</span>
            </div>`;

// Create an outgoing chat div with user's message and append it to chat container
const outgoingChatDiv = createElement(html, "incoming");
chatContainer.appendChild(outgoingChatDiv);
getChatResponse();
}

// Create an outgoing chat div with user's message and append it to chat container
setTimeout(showTyingAnimation, 500);

//Remove the typing animation, append the paragraph element and save the chats to local storage
incomingChatDiv.querySelector(".typing-animation").remove();