import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

  const url = `${config.backendEndpoint}/cities`;
  // console.log(`url is at fetchCities is == ${url}`)
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(`data is at try block is == ${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const cards = document.getElementById("data");
  let card = document.createElement("div");
  card.className = "col-lg-3 col-sm-6 mb-4";
  card.innerHTML = `<a href = "pages/adventures/?city=${id}" id = ${id}>
  <div class = "tile">
  <img src = ${image} href = "pages/adventures/?city=${id}" >
  <div class = "tile-text">
  <p> ${city}</p>
  <p> ${description}</p>
  </div>
  </div>
  </a>`;
  cards.append(card);
}

export { init, fetchCities, addCityToDOM };
