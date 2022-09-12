$(document).ready(() => {
    const apiKey = `3b1ee469afef74f74a7531244d75f597`
    const baseUrl = `https://api.openweathermap.org`;
    let DateTime = luxon.DateTime;
    let cityName;
    let cityArr = JSON.parse(localStorage.getItem('city')) || [];

    // autocomplete 385 American citys
    $(function () {
        var availableCity = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];
        $("#city").autocomplete({
            source: availableCity
        });
    });

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

    const getCity = (event) => {
        cityName = $('input').val() || $(event.currentTarget).attr('id');
        $('input').val('');
        return cityName;
    }

    const saveCity = (cityName) => {
        $('#cityname').text(cityName)
        if (cityArr.includes(cityName)) {
            return ''
        } else {
            cityArr.push(cityName);
            const cityEl = $(`<li class="city-item"> ${cityName} </li>`);
            cityEl.attr('id', `${cityName}`);
            $('#city-list').append(cityEl)
            localStorage.setItem('city', JSON.stringify(cityArr));
        }
    }

    const getLocation = async (cityName) => {
        const locationEndpoint = `/data/2.5/weather`;
        const requestParams = `?q=${cityName}&appid=${apiKey}`;
        const urlToFetch = `${baseUrl}${locationEndpoint}${requestParams}`;
        try {
            const response = await fetch(urlToFetch);
            if (response.ok) {
                const jsonResponse = await response.json();
                saveCity(jsonResponse.name)
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
        displayFutureDate();
        for (let x = 0; x < 5; x++) {
            $(`#temp${x + 1}`).text(forecast[x].temp.day);
            $(`#wind${x + 1}`).text(forecast[x].wind_speed);
            $(`#humidity${x + 1}`).text(forecast[x].humidity);
            $(`#icon${x + 1}`).attr({
                "src": `http://openweathermap.org/img/w/${forecast[x].weather[0].icon}.png`,
                "alt": "weather icon"
            });
        }
    }

    const displayWeather = async (event) => {
        const city = getCity(event);
        const location = await getLocation(city);
        const weather = await getWeather(location);
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

    $('#city-list').on('click', '.city-item', displayWeather)
})


