function formatDate(date) {
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	let dayIndex = date.getDay();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[dayIndex];

	return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
	document.querySelector("#city").innerHTML = response.data.name;
	document.querySelector("#temperature").innerHTML = Math.round(
		response.data.main.temp
	);
	document.querySelector("#humidity").innerHTML = response.data.main.humidity;
	document.querySelector("#wind").innerHTML = Math.round(
		response.data.wind.speed
	);
	document.querySelector("#description").innerHTML =
		response.data.weather[0].main;
}

function search(event) {
	event.preventDefault();
	let apiKey = "e5baedf46f3548204c948e15f6eb2609";
	let city = document.querySelector("#city-input").value;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
	let apiKey = "e5baedf46f3548204c948e15f6eb2609";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

	axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = 19;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
