// Kodlarınız kullanıcı etkileşimi ve API isteklerini yönetecek
// ChatGPT API ile İletişim
function sendChatGPT() {
    const input = document.getElementById('chat-input').value;
    fetch('/generate-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('chat-output').textContent = data.response;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// DALL-E API ile İletişim
function sendDallE() {
    const input = document.getElementById('dalle-input').value;
    fetch('/generate-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
    })
    .then(response => response.json())
    .then(data => {
        // Yanıtı işleyin ve gösterin
        console.log(data); // Yanıtı konsola yazdırarak doğru veriyi aldığınızdan emin olun
        // Örnek olarak, yanıtı bir img elementi olarak gösterme
        const img = new Image();
        img.src = data.image_url; // Yanıttan dönen görüntü URL'sini varsayıyoruz
        document.getElementById('dalle-output').innerHTML = '';
        document.getElementById('dalle-output').appendChild(img);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


