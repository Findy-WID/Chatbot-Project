document.addEventListener("DOMContentLoaded", loadChatHistory);

const chatContainer = document.getElementById("chat-container");
const inputField = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const API_KEY = ""; // Replace with your OpenAI API key

sendBtn.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    let message = inputField.value.trim();
    if (message === "") return;

    // Display User Message
    displayMessage("user", message);
    saveMessage("user", message);

    inputField.value = ""; // Clear input

    // Show Typing Animation
    showTypingAnimation();

    // Fetch AI Response
    setTimeout(() => {
        getChatResponse(message);
    }, 1000);
}

function displayMessage(role, message) {
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("chat", role);

    messageDiv.innerHTML = `
        <div class="chat-content">
            <div class="chat-details">
                <img src="${role === 'user' ? './user.jpg' : './ninjabotgirl.jpg'}" alt="${role}">
                <p>${message}</p>
            </div>
        </div>
    `;

    if (role === "bot") {
        let copyBtn = document.createElement("button");
        copyBtn.classList.add("copy-btn");
        copyBtn.innerHTML = "📋";
        copyBtn.onclick = () => copyText(message);
        messageDiv.querySelector(".chat-details").appendChild(copyBtn);
    }

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll
}

function saveMessage(role, message) {
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistory.push({ role, message });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
}

function loadChatHistory() {
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistory.forEach(chat => displayMessage(chat.role, chat.message));
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    }).catch(err => {
        console.error("Error copying text: ", err);
    });
}

// OpenAI API Call
function getChatResponse(userText) {
    const API_URL = "https://api.openai.com/v1/completions";
    
    fetch(API_URL, {
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
    })
    .then(response => response.json())
    .then(data => {
        let botResponse = data.choices[0].text.trim();
        displayMessage("bot", botResponse);
        saveMessage("bot", botResponse);
    })
    .catch(error => console.error("Error:", error));
}

// Typing Animation
function showTypingAnimation() {
    let typingDiv = document.createElement("div");
    typingDiv.classList.add("chat", "incoming");

    typingDiv.innerHTML = `
        <div class="chat-content">
            <div class="chat-details">
                <img src="./ninjabotgirl.jpg" alt="ninjabot">
                <div class="typing-animation">
                    <div class="typing-dot" style="--delay: 0.2s"></div>
                    <div class="typing-dot" style="--delay: 0.3s"></div>
                    <div class="typing-dot" style="--delay: 0.4s"></div>
                </div>
            </div>
        </div>
    `;

    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    setTimeout(() => {
        typingDiv.remove();
    }, 1000);
}
