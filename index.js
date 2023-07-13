const express = require('express');
const axios = require('axios');
const app = express();

// Configuração do EJS como mecanismo de visualização
app.set('view engine', 'ejs');

// Rota principal
app.get('/', async (req, res) => {
  try {
    const weatherData = await fetchWeatherData();
    res.render('index', { weatherData });
  } catch (error) {
    console.error('Erro ao obter dados de temperatura:', error);
    res.status(500).send('Erro ao obter dados de temperatura');
  }
});

// Rota para exibir o formulário de consulta
app.get('/consulta', (req, res) => {
  res.render('consulta');
});

// Rota para processar o formulário de consulta
app.post('/consulta', async (req, res) => {
  const { capital, data } = req.body;
  try {
    const weatherData = await fetchWeatherDataByCityAndDate(capital, data);
    res.render('resultado', { weatherData });
  } catch (error) {
    console.error('Erro ao obter dados de temperatura:', error);
    res.status(500).send('Erro ao obter dados de temperatura');
  }
});

// Função para buscar os dados de temperatura das capitais na data atual
async function fetchWeatherData() {
  const capitals = ['Brasília', 'Rio de Janeiro', 'São Paulo', 'Salvador', 'Belo Horizonte', 'Curitiba', 'Fortaleza', 'Manaus', 'Recife', 'Porto Alegre'];
  const weatherData = [];

  for (const capital of capitals) {
    const response = await axios.get(`https://apitempo.inmet.gov.br/estacao/diaria/undefined/${capital}`);
    const { data } = response.data;
    const { Tmin, Tmax } = data[0];
    weatherData.push({ capital, temp_min: Tmin, temp_max: Tmax });
  }

  return weatherData;
}

// Função para buscar os dados de temperatura de uma capital em uma data específica
async function fetchWeatherDataByCityAndDate(city, date) {
  const response = await axios.get(`https://apitempo.inmet.gov.br/estacao/diaria/undefined/${city}/${date}`);
  const { data } = response.data;
  const { Tmin, Tmax } = data[0];
  return { city, date, temp_min: Tmin, temp_max: Tmax };
}

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
