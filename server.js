const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/generate-image', async (req, res) => {
    try {
        const prompt = req.body.prompt; // Kullanıcıdan alınan prompt metni
        const response = await axios.post('YOUR_DALLE_API_ENDPOINT', {
            prompt: prompt
        }, {
            headers: {
                Authorization: `Bearer ${process.env.DALLE_API_KEY}`
            }
        });
        res.send(response.data);
    } catch (error) {
        console.error("DALL·E Image Generation Error:", error);
        res.status(500).send({ message: 'Error in generating image', error: error.message });
    }
});

app.post('/generate-text', async (req, res) => {
    try {
        const message = req.body.message; // Kullanıcıdan alınan metin
        const response = await axios.post('YOUR_CHATGPT_API_ENDPOINT', {
            model: "text-davinci-003", // Örnek model, kullanmak istediğiniz modele göre değiştirebilirsiniz.
            prompt: message,
            max_tokens: 150  // Maksimum token sayısı, ihtiyaca göre değiştirilebilir.
        }, {
            headers: {
                Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`
            }
        });
        res.send(response.data.choices[0].text);  // ChatGPT cevabını gönderme
    } catch (error) {
        console.error("ChatGPT Text Generation Error:", error);
        res.status(500).send({ message: 'Error in generating text', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
