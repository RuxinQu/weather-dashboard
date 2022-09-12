$(document).ready(() => {
    const renderLocalCity = () => {
        // get the data from local storage and convert it to an array with objects inside
        const city = JSON.parse(localStorage.getItem('city'));
        /* if  variable has local data, go through the array and return each value to the key initial and score
        otherwise return an empty string */
        if (city) {
            $('#city-list').append(city.map((cityItem) => {
                const cityEl = $(`<li class="city-item"> ${cityItem} </li>`);
                cityEl.attr('id', `${cityItem}`);
                return cityEl;
            }))
        } else {
            return '';
        }
    }
    renderLocalCity();

})