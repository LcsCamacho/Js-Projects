//VARIAVEIS E SELETORES
const APIKEY = '260e538fe6a761191f2da1caf7d30ee0'
const APIFLAGS = 'https://countryflagsapi.com/png/'
const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');
const cityElement = document.querySelector('#city');
const descElements = document.querySelector('.hide');


//FUNCTIONS

async function getWeaterData(city) {
    const APIWEATHERURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}&lang=pt_br`

    const res = await fetch(APIWEATHERURL)
    const resData = await res.json()
    console.log(resData)
    return resData;
};

const showWeatherData = async (city) => {
    const data = await getWeaterData(city);
    countryElement.setAttribute( "src" , APIFLAGS + data.sys.country ) 
    cityElement.innerText = data.name
    tempElement.innerText = parseInt(data.main.temp)
    descElement.innerText = data.weather[0].description
    weatherIconElement.setAttribute( "src" , `http://openweathermap.org/img/wn/${data.weather[0].icon}.png` )
    windElement.innerHTML = data.wind.speed + 'km/h'
    humidityElement.innerHTML = data.main.humidity + '%'
    descElements.className = ''
};

//EVENTS
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const city = cityInput.value
    showWeatherData(city)
    cityInput.value=''

});

