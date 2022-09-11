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
        $('#day1').text(DateTime.now().plus({ days: 1 }).setLocale('en-us').toLocaleString());
        $('#day2').text(DateTime.now().plus({ days: 2 }).setLocale('en-us').toLocaleString());
        $('#day3').text(DateTime.now().plus({ days: 3 }).setLocale('en-us').toLocaleString());
        $('#day4').text(DateTime.now().plus({ days: 4 }).setLocale('en-us').toLocaleString());
        $('#day5').text(DateTime.now().plus({ days: 5 }).setLocale('en-us').toLocaleString());
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

    const getCurrentWeather = async (location) => {
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
                return current;
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const getForcastWeather = async (location) => {
        const lat = location[1];
        const lon = location[0];
        const forcastEndpoint = `/data/2.5/forecast`;
        const requestParams = `?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const urlToFetch = `${baseUrl}${forcastEndpoint}${requestParams}`;
        try {
            const response = await fetch(urlToFetch);
            if (response.ok) {
                const jsonResponse = await response.json();
                const forecastList = jsonResponse.list;
                return forecastList;
            }
        } catch (error) {
            console.log(error.message);
        }

    }

    const renderCurrentWeather = (current) => {
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

    const renderForecastWeather = (forecastList) => {
        // to do :  add code to display the next five days forcast
        // to do :  add code to display the next five days forcast
        // to do :  add code to display the next five days forcast
    }

    const displayWeather = async () => {
        const city = await getCity()
        const location = await getLocation(city);
        const currentWeather = getCurrentWeather(location);
        const forecastWeather = getForcastWeather(location)
        renderCurrentWeather(currentWeather);
        renderForecastWeather(forecastWeather);
    }

    displayCurrentDate();
    displayFutureDate();
    $('.search-btn').on('click', (event) => {
        event.preventDefault();
        displayWeather();

    })
})


