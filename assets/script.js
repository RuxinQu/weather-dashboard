/* ====================================================================================================================================
Description: 
1. This project is a weather dashboard. The weather data is fetched from OpenWeather API. The luxon.js library is used to display date. 
2. Autocomplete of 385 American cities is added to the input field to make the search easier. 
3. Each city name can appear in the search history once, repeated name is prevented. 
4. The city name on the page will always have the first letter capical regardless of the user input for consistency.
==================================================================================================================================== */

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

    //display the current date
    const displayCurrentDate = () => {
        const today = DateTime.now().setLocale('en-us').toLocaleString();
        $('#date').text(today);
    }

    //display the 5 days in the future
    const displayFutureDate = () => {
        for (let x = 1; x < 6; x++) {
            $(`#day${x}`).text(DateTime.now().plus({ days: `${x}` }).setLocale('en-us').toLocaleString());
        }
    }

    //set the background of UV index based on the severity
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

    //the city name can either from user input or from search history
    const getCity = (event) => {
        cityName = $('input').val() || $(event.currentTarget).attr('id');
        $('input').val('');
        return cityName;
    }

    //save the city name to local storage and prevent repeated names
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

    //fetch lon and lat based on the cityname
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
                const locationArr = [lon, lat];
                return locationArr;
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    //fetch the current and future weather data based on the lon and lat
    const getWeather = async (locationArr) => {
        const lat = locationArr[1];
        const lon = locationArr[0];
        const weatherEndpoint = `/data/3.0/onecall`;
        const requestParams = `?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
        const urlToFetch = `${baseUrl}${weatherEndpoint}${requestParams}`;
        try {
            const response = await fetch(urlToFetch);
            if (response.ok) {
                const jsonResponse = await response.json();
                const current = jsonResponse.current;
                const forecast = jsonResponse.daily;
                const weatherArr = [current, forecast];
                return weatherArr;
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    //render the current weather related info to the page
    const renderCurrentWeather = (current) => {
        displayCurrentDate();
        $('#temp').text(current.temp);
        $('#wind').text(current.wind_speed);
        $('#humidity').text(current.humidity);
        $('#icon').attr({
            "src": `https://openweathermap.org/img/w/${current.weather[0].icon}.png`,
            "alt": "weather icon"
        });
        $('#uv').text(current.uvi);
        renderUvColor(current)
    }

    //render the future weather related info to the page
    const renderForecastWeather = (forecast) => {
        displayFutureDate();
        for (let x = 0; x < 5; x++) {
            $(`#temp${x + 1}`).text(forecast[x].temp.day);
            $(`#wind${x + 1}`).text(forecast[x].wind_speed);
            $(`#humidity${x + 1}`).text(forecast[x].humidity);
            $(`#icon${x + 1}`).attr({
                "src": `https://openweathermap.org/img/w/${forecast[x].weather[0].icon}.png`,
                "alt": "weather icon"
            });
        }
    }

    //the asynchronous function that holds all the callback functions and processes all the data
    const displayWeather = async (event) => {
        const city = getCity(event);
        const locationArr = await getLocation(city);
        const weatherArr = await getWeather(locationArr);
        const currentWeather = weatherArr[0];
        const forecastWeather = weatherArr[1];
        renderCurrentWeather(currentWeather);
        renderForecastWeather(forecastWeather);
        $('.weather').show();
    }

    //hide the weather container before a user click search
    $('.weather').hide();

    //add event listener to the search button
    $('.search-btn').on('click', (event) => {
        event.preventDefault();
        displayWeather();
    })

    //add event listener to the search history list
    $('#city-list').on('click', '.city-item', displayWeather)
})


