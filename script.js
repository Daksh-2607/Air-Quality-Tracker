const API_TOKEN = 'b15bd083006551f197a1c640fbc3d671c4778da6'; 

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const resultDiv = document.getElementById('result');
const errorMessage = document.getElementById('errorMessage');
const cityName = document.getElementById('cityName');
const aqiValue = document.getElementById('aqiValue');
const aqiStatus = document.getElementById('aqiStatus');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getAQIData(city);
    }
});

async function getAQIData(city) {
    resultDiv.classList.add('hidden');
    errorMessage.classList.add('hidden');
    try {
        const url = `https://api.waqi.info/feed/${city}/?token=${API_TOKEN}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === "ok") {
            const aqi = data.data.aqi;
            cityName.textContent = data.data.city.name;
            aqiValue.textContent = aqi;
           
            setAQIStatus(aqi);
            
            resultDiv.classList.remove('hidden');
        } else {
            errorMessage.classList.remove('hidden');
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        errorMessage.textContent = "Network error. Please try again later.";
        errorMessage.classList.remove('hidden');
    }
}

function setAQIStatus(aqi) {
    aqiValue.style.backgroundColor = "";
    aqiValue.style.color = "black";

    if (aqi <= 50) {
        aqiStatus.textContent = "Good";
        aqiValue.style.backgroundColor = "#a8e6cf"; 
    } else if (aqi <= 100) {
        aqiStatus.textContent = "Moderate";
        aqiValue.style.backgroundColor = "#ffd3b6";
    } else if (aqi <= 150) {
        aqiStatus.textContent = "Unhealthy for Sensitive Groups";
        aqiValue.style.backgroundColor = "#ffaaa5";
    } else {
        aqiStatus.textContent = "Unhealthy / Hazardous";
        aqiValue.style.backgroundColor = "#ff8b94";
        aqiValue.style.color = "white";
    }
}