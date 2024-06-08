const { exec } = require('child_process');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('GitHub Profile Customization Extension');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('/run-python', (req, res) => {
    exec(`/usr/bin/python3 main.py`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).send(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        res.send(`Python script output: ${stdout}`);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
