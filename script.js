
// Get the button and the body element
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Check if dark mode is already set in localStorage
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  themeToggleButton.textContent = 'Dark Mode';
} else {
  body.classList.remove('dark-mode');
  themeToggleButton.textContent = 'Dark Mode';
}

// Toggle dark and light modes
themeToggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  // Save the current theme in localStorage so it persists across sessions
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    themeToggleButton.textContent = 'Dark Mode';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggleButton.textContent = 'Dark Mode';
  }
});

  // Check if the browser supports SpeechRecognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // You can change the language
    recognition.interimResults = true; // Show results even while speaking

    const startButton = document.getElementById('start-btn');
    const output = document.getElementById('output');

    startButton.addEventListener('click', () => {
      recognition.start(); // Start speech recognition
    });

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      // output.textContent = transcript; // Show the recognized text
     
    };
    recognition.onerror = (event) => {
      console.error('Speech Recognition Error:', event.error);
    };
  } else {
    console.log('Speech Recognition API is not supported in this browser.');
  }


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

