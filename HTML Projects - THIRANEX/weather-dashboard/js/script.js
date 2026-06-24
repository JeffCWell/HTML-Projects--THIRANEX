const apiKey = "bae1ad33a65165d6e2b543f385f64811";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

const weatherCard = document.getElementById("weather-card");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weather-icon");

const feelsLike = document.getElementById("feels-like");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const currentDate = document.getElementById("current-date");

const loader = document.getElementById("loader");
const errorMessage = document.getElementById("error-message");

async function getWeather(city) {

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        loader.classList.remove("hidden");
        weatherCard.classList.add("hidden");
        errorMessage.classList.add("hidden");

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        displayWeather(data);

    } catch (error) {

        errorMessage.textContent =
            "❌ " + error.message;

        errorMessage.classList.remove("hidden");

    } finally {

        loader.classList.add("hidden");

    }
}

function displayWeather(data) {

    currentDate.textContent =
        new Date().toLocaleString();

    cityName.textContent = data.name;

    temperature.textContent =
        `${Math.round(data.main.temp)}°C`;

    feelsLike.textContent =
        `${Math.round(data.main.feels_like)}°C`;

    humidity.textContent =
        `${data.main.humidity}%`;

    windSpeed.textContent =
        `${data.wind.speed} m/s`;

    pressure.textContent =
        `${data.main.pressure} hPa`;

    visibility.textContent =
        `${(data.visibility / 1000).toFixed(1)} km`;

    description.textContent =
        data.weather[0].description;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const condition =
        data.weather[0].main.toLowerCase();

    if (condition.includes("clear")) {

        document.body.style.background =
            "linear-gradient(135deg,#f59e0b,#f97316)";

    } else if (condition.includes("cloud")) {

        document.body.style.background =
            "linear-gradient(135deg,#64748b,#334155)";

    } else if (condition.includes("rain")) {

        document.body.style.background =
            "linear-gradient(135deg,#1e3a8a,#0f172a)";

    } else if (condition.includes("snow")) {

        document.body.style.background =
            "linear-gradient(135deg,#dbeafe,#93c5fd)";

    }

    weatherCard.classList.remove("hidden");
}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city !== "") {
        getWeather(city);
    }

});

cityInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {

        const city = cityInput.value.trim();

        if (city !== "") {
            getWeather(city);
        }

    }

});