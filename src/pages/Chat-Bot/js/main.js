const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const respuestas = [
    {
        keywords: ['hola', 'buenas'],
        response: '¡Hola! Estoy aquí para contarte sobre la Ruta Libertadora de 1819. ¿Qué quieres saber?'
    },
    {
        keywords: ['batalla', 'boyacá'],
        response: 'La Batalla de Boyacá fue decisiva para la independencia de Colombia y ocurrió el 7 de agosto de 1819.'
    },
    {
        keywords: ['ruta', 'libertadora'],
        response: 'La Ruta Libertadora fue el recorrido liderado por Simón Bolívar desde los llanos venezolanos hasta Bogotá para liberar el país del dominio español.'
    },
    {
        keywords: ['bolívar'],
        response: 'Simón Bolívar comandó el ejército patriota en esta épica campaña libertadora.'
    },
    {
        keywords: ['adiós', 'gracias'],
        response: '¡Hasta pronto! Si quieres saber más sobre la Ruta Libertadora, aquí estaré.'
    },
    {
        keywords: ['independencia', 'colombia'],
        response: 'La independencia de Colombia fue un proceso crucial que culminó con la Batalla de Boyacá en 1819, parte de la Ruta Libertadora liderada por Bolívar.'
    }
];

function getBotResponse(input) {
    input = input.toLowerCase();
    for (let pair of respuestas) {
        if (pair.keywords.some(keyword => input.includes(keyword))) {
            return pair.response;
        }
    }
    return 'No tengo información sobre eso. Pregúntame sobre la Ruta Libertadora, batallas, Bolívar, etc.';
}

function appendMessage(sender, text) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleSend() {
    const text = userInput.value.trim();
    if (text !== '') {
        appendMessage('user', text);
        const botResponse = getBotResponse(text);
        setTimeout(() => appendMessage('bot', botResponse), 600);
        userInput.value = '';
    }
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});

// btn chat-info
function mostrarTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip.style.display === 'block') {
        tooltip.style.display = 'none';
    } else {
        tooltip.style.display = 'block';
        tooltip.style.animation = 'slideUp 0.5s forwards';
    }
}