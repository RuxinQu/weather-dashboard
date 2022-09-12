$(document).ready(() => {
    const apiKey = `3b1ee469afef74f74a7531244d75f597`
    const baseUrl = `https://api.openweathermap.org`;
    let DateTime = luxon.DateTime;
    let cityName;

    const displayCurrentDate = () => {
        const today = DateTime.now().setLocale('en-us').toLocaleString();
        $('#date').text(DateTime.now().toLocaleString());
    }

    const displayFutureDate = () => {
        for (let x = 1; x < 6; x++) {
            $(`#day${x}`).text(DateTime.now().plus({ days: `${x}` }).setLocale('en-us').toLocaleString());
        }
    }

    const renderUvColor = (current) => {
        const uv = current.uvi;
        if (uv > 11) {
            $('#uv').css('backgroundColor', 'purple');
        } else if (uv > 8) {
            $('#uv').css('backgroundColor', 'red');
        } else if (uv > 6) {
            $('#uv').css('backgroundColor', 'orange');
        } else if (uv > 3) {
            $('#uv').css('backgroundColor', 'yellow');
        } else {
            $('#uv').css('backgroundColor', 'lightgreen');
        }
    }

    const getCity = () => {
        cityName = $('input').val();
        $('input').val('')
        return cityName;
    }

    const getLocation = async (cityName) => {
        const locationEndpoint = `/data/2.5/weather`;
        const requestParams = `?q=${cityName}&appid=${apiKey}`;
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

    const getWeather = async (location) => {
        const lat = location[1];
        const lon = location[0];
        const weatherEndpoint = `/data/3.0/onecall`;
        const requestParams = `?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
        const urlToFetch = `${baseUrl}${weatherEndpoint}${requestParams}`;
        try {
            const response = await fetch(urlToFetch);
            if (response.ok) {
                const jsonResponse = await response.json();
                const current = jsonResponse.current;
                const forecast = jsonResponse.daily;
                const weather = [current, forecast];
                return weather;
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const renderCurrentWeather = (current) => {
        displayCurrentDate();
        $('#temp').text(current.temp);
        $('#wind').text(current.wind_speed);
        $('#humidity').text(current.humidity);
        $('#icon').attr({
            "src": `http://openweathermap.org/img/w/${current.weather[0].icon}.png`,
            "alt": "weather icon"
        });
        $('#uv').text(current.uvi);
        renderUvColor(current)
    }

    const renderForecastWeather = (forecast) => {
        console.log(forecast);
        displayFutureDate();
        for (let x = 0; x < 5; x++) {
            $(`#temp${x+1}`).text(forecast[x].temp.day);
            $(`#wind${x+1}`).text(forecast[x].wind_speed);
            $(`#humidity${x+1}`).text(forecast[x].humidity);
            $(`#icon${x+1}`).attr({
                "src": `http://openweathermap.org/img/w/${forecast[x].weather[0].icon}.png`,
                "alt": "weather icon"
            });
        }
    }

    const displayWeather = async () => {
        const city = await getCity()
        const location = await getLocation(city);
        const weather = await getWeather(location)
        const currentWeather = weather[0];
        const forecastWeather = weather[1];
        renderCurrentWeather(currentWeather);
        renderForecastWeather(forecastWeather);
        $('.weather').show();
    }

    $('.weather').hide();
    $('.search-btn').on('click', (event) => {
        event.preventDefault();
        displayWeather();
    })
})


