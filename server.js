require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Carregar a chave da API a partir do arquivo .env
const apiKey = process.env.API_KEY;

// Configurar o diretório de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para obter notícias
app.get('/api/news', async (req, res) => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        res.json(response.data.articles);
    } catch (error) {
        res.status(500).send('Erro ao buscar notícias');
    }
});

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
