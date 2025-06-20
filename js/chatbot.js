const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const API_KEY = 'AIzaSyAtfPlnEgNqKF04ZnDRmMyV3SUNidGJ4cQ'; // Replace with your Gemini API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

sendBtn.addEventListener('click', async () => {
    const message = messageInput.value.trim();
    if (!message) return;

    const userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user-message');
    userMessage.textContent = message;
    chatBox.appendChild(userMessage);

    const thinkingMessage = document.createElement('div');
    thinkingMessage.classList.add('chat-message', 'bot-message');
    thinkingMessage.textContent = 'Thinking...';
    chatBox.appendChild(thinkingMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });
        const data = await response.json();
        thinkingMessage.textContent = data.candidates[0].content.parts[0].text;
    } catch (error) {
        thinkingMessage.textContent = 'Error: Could not connect to Gemini API';
    }
    chatBox.scrollTop = chatBox.scrollHeight;
    messageInput.value = '';
});