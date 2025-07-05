const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// 👇 Tu clave API de OpenAI aquí (¡no la expongas públicamente!)
// const OPENAI_API_KEY = "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";

function appendMessage(sender, text) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(input) {
    appendMessage('user', input);

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "Responde como un experto histórico sobre la Ruta Libertadora de 1819 en Colombia. Usa un lenguaje claro y educativo." },
                    { role: "user", content: input }
                ]
            })
        });

        const data = await response.json();
        const mensaje = data.choices[0].message.content;
        appendMessage('bot', mensaje);
    } catch (error) {
        console.error(error);
        appendMessage('bot', 'Lo siento, no pude obtener respuesta del servidor.');
    }
}

function handleSend() {
    const text = userInput.value.trim();
    if (text !== '') {
        getBotResponse(text);
        userInput.value = '';
    }
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});

function mostrarTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = (tooltip.style.display === 'block') ? 'none' : 'block';
}
