const apiKey = "75240fcd7905d10784fe569eb920bdd4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

function back(data) {
    const map = {
        'Clouds' : 'linear-gradient(to bottom,rgb(101, 119, 137) 0%,rgb(244, 235, 139) 30%,rgb(247, 247, 139) 60%, #2f3b55 100%',
        'Clear' : 'linear-gradient(to right, #87CEEB, #FFF5B7)',
        'Rain' : 'linear-gradient(to right, #4e5461, #697280, #9daab5)',
        'Drizzle' : 'linear-gradient(to bottom, #a6b0c3, #c9d6df, #e0f7fa)',
        'Snow' : 'linear-gradient(to bottom, #e0f7fa, #b3e5fc, #81d4fa, #ffffff)',
        'Mist' : 'linear-gradient(to right, #cfd8dc, #eceff1, #d7ccc8)',
        'default' : 'linear-gradient(135deg, #00feba, #5b548a)'
    };

    const color = map[data] || map['default'];
    document.querySelector(".card").style.background = color;
    return color;
}

async function check(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }

    else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        document.querySelector(".actual").innerHTML = data.weather[0].main;

        if (data.weather[0].main === "Clouds"){
            weatherIcon.src = "img/clouds.png";
        } if (data.weather[0].main === "Clear") {
            weatherIcon.src = "img/clear.png";
        } if (data.weather[0].main === "Rain") {
            weatherIcon.src = "img/rain.png";
        } if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "img/drizzle.png";
        } if (data.weather[0].main === "Mist") {
            weatherIcon.src = "img/mist.png";
        } if (data.weather[0].main === "Snow") {
            weatherIcon.src = "img/snow.png";
        } 


        back(data.weather[0].main);
        
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    }
}

searchButton.addEventListener("click", () => {
    check(searchBox.value);
});



