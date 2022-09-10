$(document).ready(() => {
    const apiKey = `3b1ee469afef74f74a7531244d75f597`
    const baseUrl = `https://api.openweathermap.org`;
    let DateTime = luxon.DateTime;
    let cityName;

    const getCity = () => {
        cityName = $('input').val();
        $('input').val('')
        return cityName;
    }

    const displayDate = () => {
        const today = DateTime.now().setLocale('en-us').toLocaleString();
        $('#date').text(DateTime.now().toLocaleString());
    }

    const kelvinToFahrenheit = (k) => {
        return (k - 273) * 1.8 + 32
    }

    const getCityLocation = async (cityName) => {
        const locationEndpoint = `/data/2.5/weather`;
        const requestParams = `?q=${cityName}&appid=${apiKey}`
        const urlToFetch = `${baseUrl}${locationEndpoint}${requestParams}`;
        try {
            const response = await fetch(urlToFetch);
            if (response.ok) {
                const jsonResponse = await response.json();
                const lon = jsonResponse.coord.lon;
                const lat = jsonResponse.coord.lat;
                const location = [lon, lat];
                return location;
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const getCurrentWeather = async (location) => {
        const lon = location[0];
        const lat = location[1];
        const weatherEndpoint = `/data/2.5/weather`
        const requestParams = `?lat=${lat}&lon=${lon}&appid=${apiKey}`
        const urlToFetch = `${baseUrl}${weatherEndpoint}${requestParams}`
        try {
            const response = await fetch(urlToFetch);
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const renderCurrentWeather = (currentWeather) => {
        $('#cityname').text(currentWeather.name);
        $('#temp').text(kelvinToFahrenheit(currentWeather.main.temp).toFixed(2));
        $('#wind').text((currentWeather.wind.speed * 2.23693629).toFixed(2));
        $('#humidity').text(currentWeather.main.humidity);
        $('#icon').attr({
            "src": `http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`,
            "alt": "weather icon"
        });
    }

    const displayCurrentWeather = async () => {
        const city = await getCity()
        const location = await getCityLocation(city);
        const currentWeather = await getCurrentWeather(location);
        renderCurrentWeather(currentWeather)
    }



    displayDate();
    $('.search-btn').on('click', (event) => {
        event.preventDefault();
        displayCurrentWeather();

    })
})


