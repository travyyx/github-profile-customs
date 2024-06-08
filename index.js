const express = require('express');
const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    console.log("Service started.")
    res.send("")
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('/image/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const data = response.data;

        const width = 800;
        const height = 200;
        const canvas = createCanvas(width, height);
        const context = canvas.getContext('2d');

        // Draw background
        context.fillStyle = '#e0635a';
        context.fillRect(0, 0, width, height);

        // Draw username
        context.fillStyle = '#000000';
        context.font = 'bold 30px serif';
        context.fillText(data.login, 150, 70);

        // Draw bio
        context.font = '20px serif';
        context.fillText(data.bio || 'No bio available', 150, 100);

        // Draw avatar
        const avatar = await loadImage(data.avatar_url);
        context.drawImage(avatar, 20, 20, 100, 100);

        // Set response type and send image
        res.setHeader('Content-Type', 'image/png');
        canvas.pngStream().pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Error generating image' });
    }
});
