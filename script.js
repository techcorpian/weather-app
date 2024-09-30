const uri1 = "https://restcountries.com/v3.1/all";
const apiKey = "102ada8446f4fd02de0a96e6371834a3";
const weatherBaseUri = "https://api.openweathermap.org/data/2.5/weather";

// Fetch countries from the API
function fetchCountries() {
    fetch(uri1)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((countries) => displayCountries(countries))
        .catch((error) => console.log("Fetch error: ", error));
}

function fetchWeather(country) {
    // Construct the weather URL based on country data
    const weatherUrl = `${weatherBaseUri}?q=${country.name.common}&units=metric&appid=${apiKey}`;

    fetch(weatherUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((weather) => {
            // Display weather information
            alert(`Weather in ${country.name.common}: ${weather.weather[0].description}, ${weather.main.temp}°C`);
        })
        .catch((error) => {alert('Country Not Found');})
}

function displayCountries(countries) {
    // Get the container for country cards
    const countryCardsContainer = document.getElementById("country-cards");

    // Iterate through the countries and create cards
    countries.forEach((country) => {
        // Create a column div element
        const colDiv = document.createElement("div");
        colDiv.className = "col-12 col-sm-6 col-md-4 mb-4 d-flex align-items-stretch";

        // Create a card div element
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";

        // Create an image element for the flag
        const flagImg = document.createElement("img");
        flagImg.className = "card-img-top";
        flagImg.src = country.flags.svg;
        flagImg.alt = `${country.name.common} flag`;

        // Create a card body div element
        const cardBodyDiv = document.createElement("div");
        cardBodyDiv.className = "card-body d-flex flex-column justify-content-between";

        // Create a card title element
        const cardTitle = document.createElement("div");
        cardTitle.className = "card-title text-center py-2";
        cardTitle.textContent = country.name.common;

        // Create a card text element for additional information
        const cardText = document.createElement("div");
        cardText.className = "card-text";
        cardText.innerHTML = `
            <strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}<br>
            <strong>Lat/Lng:</strong> ${country.latlng ? country.latlng.join(", ") : "N/A"}<br>
            <strong>Region:</strong> ${country.region}<br>
            <strong>Country Codes:</strong> ${country.cca2}, ${country.cca3}, ${country.ccn3}<br>
        `;

        // Create Card Button
        const cardButton = document.createElement("button");
        cardButton.className = "btn btn-primary";
        cardButton.innerText = "See Weather";
        cardButton.onclick = () => fetchWeather(country);

        // Append elements to the card body
        cardDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardText);
        cardBodyDiv.appendChild(cardButton);

        // Append elements to the card
        cardDiv.appendChild(flagImg);
        cardDiv.appendChild(cardBodyDiv);

        // Append the card to the column
        colDiv.appendChild(cardDiv);

        // Append the column to the container
        countryCardsContainer.appendChild(colDiv);
    });
}

// Call the function to fetch countries and display them
fetchCountries();
