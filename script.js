document.addEventListener("DOMContentLoaded", loadChatHistory);

const chatContainer = document.getElementById("chat-container");
const inputField = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

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

    // Simulate Bot Response (Modify with actual AI logic if needed)
    setTimeout(() => {
        let botResponse = "This is a bot response!";
        displayMessage("bot", botResponse);
        saveMessage("bot", botResponse);
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
