const axios = require('axios');
require('dotenv').config();  

if (!process.env.API_KEY) {
    console.error('Erro: A chave de API não foi definida. Verifique o arquivo .env.');
    process.exit(1);
}

async function getCoordinates(city) {
    const apiKey = process.env.API_KEY;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.length === 0) {
            console.error('Cidade não encontrada.');
            return null;
        }
        const data = response.data[0];
        return { lat: data.lat, lon: data.lon };
    } catch (error) {
        console.error('Erro ao obter coordenadas:', error.message);
        return null;
    }
}

async function main() {
    const city = 'São Paulo';  
    console.log(`Consultando coordenadas para a cidade: ${city}`);
    
    const coords = await getCoordinates(city);
    if (coords) {
        console.log(`Coordenadas encontradas: Latitude ${coords.lat}, Longitude ${coords.lon}`);
    }
}

main();