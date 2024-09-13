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

async function getWeather(lat, lon) {
    const apiKey = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        return {
            feels_like: data.main.feels_like,
            description: data.weather[0].description,
        };
    } catch (error) {
        console.error('Erro ao obter previsão do tempo:', error.message);
        return null;
    }
}

async function main() {
    const city = 'São Paulo';  // Substitua pela cidade desejada
    console.log(`Consultando coordenadas para a cidade: ${city}`);
    
    const coords = await getCoordinates(city);
    if (coords) {
        console.log(`Coordenadas encontradas: Latitude ${coords.lat}, Longitude ${coords.lon}`);
        
        const weather = await getWeather(coords.lat, coords.lon);
        if (weather) {
            console.log(`A sensação térmica em ${city} é de ${weather.feels_like}°C com ${weather.description}.`);
        }
    }
}

main();