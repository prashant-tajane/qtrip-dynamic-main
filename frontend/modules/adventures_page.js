import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  // console.log(`params of getCityFromUrl is == ${params}`)

  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  // console.log(`city at fetchAdventures is == ${city}`)

  const url = `${config.backendEndpoint}/adventures?city=${city}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
  // console.log(`data after response of getAdventures is == ${JSON.stringify(data)}`)
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES

  const parent = document.getElementById("data");
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.map((x) => {
    // console.log(`adventures at addAdventureToDom is == ${JSON.stringify(x)}`)

    const div = document.createElement("div");
    div.classList.add("col-sm-6");
    div.classList.add("col-lg-3");
    div.classList.add("mb-4");

    const anchor = document.createElement("a");
    anchor.href = `detail/?adventure=${x.id}`;

    anchor.setAttribute("id", x.id);
    // console.log(anchor)
    anchor.innerHTML = `<div class="activity-card">
  <div class="category-banner">${x.category}</div>
  <img src=${x.image} class="activity-card img"/>
  <div style="height:40px; padding-top: 15px; margin-bottom: 5px; width: 100%; display: flex; flex-direction: row; justify-content: space-between; align-items: center;" class="px-2">
  <div style="flex: 0.7"><h5>${x.name}</h5></div>
        <div><p>₹ ${x.costPerHead}</p></div>
      </div>
      <div style="height:40px; width: 100%; display: flex; flex-direction: row; justify-content: space-between; align-items: center;" class="px-2">
  <h5>Duration</h5>
        <p>${x.duration} Hours</p>
      </div>
  </div>`;

    div.appendChild(anchor);

    parent.appendChild(div);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adven tures based on Duration and return filtered list
  // console.log(`list at filterByDuration is == ${JSON.stringify(list)}`)
  // console.log(`low and high at filterByDuration is == ${low} and ${high}`)
  let filtedList = [];
  list.map((item) => {
    if (low <= item.duration) {
      if (item.duration <= high) {
        filtedList.push(item);
      }
    }
  });

  // console.log(`item is in between low ${low} and high ${high} is == ${JSON.stringify(filtedList)}`)

  //sort list by property duration

  function compareDuration(a, b) {
    return a.duration - b.duration;
  }
  filtedList.sort(compareDuration);
  // console.log(`sorted list by duration is == ${JSON.stringify(filtedList)}`)
  // filtedList.map((item) => console.log(`duration is == ${item.duration}`))
  return filtedList;
}

//approach 1
// filteredList.filter(key => categoryList.inclues(key.category))

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // console.log(`list at filterByCategory is == ${JSON.stringify(list)}`)
  // console.log(`categoryList at filterByCategory is == ${JSON.stringify(categoryList)}`)

  let filCatList = [];

  categoryList.map((cat) => {
    let filteredCategoryAdventures = list.filter(
      (item) => item.category === cat
    );
    // console.log(`filteredCategoryAdventures are == ${JSON.stringify(filteredCategoryAdventures)}`)
    filteredCategoryAdventures.map((item) => filCatList.push(item));
  });

  // console.log(`filCatList is == ${JSON.stringify(filCatList)}`)
  return filCatList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // console.log(`list at filterFunction is == ${JSON.stringify(list)}`)
  // console.log(`filters at filterFunction is == ${JSON.stringify(filters.category)}`)

  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  if (filters.category.length && !filters.duration) {
    let filteredListByCategory = filterByCategory(list, filters.category);
    // console.log(`filteredByCategory is == ${JSON.stringify(filteredListByCategory)}`)
    return filteredListByCategory;
  }

  if (filters.duration && !filters.category.length) {
    // console.log(`filter by duration, and duration is == ${filters.duration}`)
    const text = filters.duration;
    let charArray = text.split("-");
    // console.log(`charArray is == ${charArray}`)
    let low = charArray[0];
    let high = charArray[1];
    // console.log(`low and high value is == ${low} and ${high}`)
    let filteredListByDuration = filterByDuration(list, low, high);
    // console.log(`filteredListByDuration at filterFunction is == ${JSON.stringify(filteredListByDuration)}`)
    return filteredListByDuration;
  }

  if (filters.category.length && filters.duration) {
    // console.log(`filterByCategory and filterByDuration both called`)

    let catFilteredList = filterByCategory(list, filters.category);
    // console.log(`catFilteredList is == ${JSON.stringify(catFilteredList)}`)

    const text = filters.duration;
    let charArray = text.split("-");
    // console.log(`charArray is == ${charArray}`)
    let low = charArray[0];
    let high = charArray[1];
    // console.log(`low and high value is == ${low} and ${high}`)
    let filteredListByDuration = filterByDuration(catFilteredList, low, high);
    // console.log(`filteredListByDuration after filterByCategory at filterFunction is == ${JSON.stringify(filteredListByDuration)}`)
    return filteredListByDuration;
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  // console.log(`filters at saveFiltersToLocalStorage is == ${JSON.stringify(filters)}`)
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  const filters = JSON.parse(localStorage.getItem("filters"));
  // console.log(`filters from localStorage is == ${JSON.stringify(filters)}`)

  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // console.log(`filters at generateFilterPillsAndUpdateDom is == ${JSON.stringify(filters)}`)
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  if (filters.category.length && !filters.duration) {
    filters.category.map((cat) => {
      const parent = document.getElementById("category-list");
      const catPill = document.createElement("div");
      catPill.setAttribute("class", "category-filter");

      // catPill.innerHTML = `<div style="height: 20px; width: 20px; border: 1px solid black;"></div>`
      // const crossDiv = document.createElement('div')
      // crossDiv.innerHTML = `<div style="height: 40px; width: 40px; display: flex; justify-content: center; align-items: center; border: 1px solid black;"><button title="remove"><h5>X</h5></button></div>`
      // console.log(`catPill is == ${catPill}`)
      catPill.innerText = cat;
      parent.appendChild(catPill);
    });
  }

  if (filters.duration && !filters.category.length) {
    const parent = document.getElementById("category-list");
    const duraPill = document.createElement("div");
    duraPill.setAttribute("class", "category-filter");

    duraPill.innerText = filters.duration;
    parent.appendChild(duraPill);
  }

  if (filters.duration && filters.category.length) {
    filters.category.map((cat) => {
      const parent = document.getElementById("category-list");
      const catPill = document.createElement("div");
      catPill.setAttribute("class", "category-filter");

      // catPill.innerHTML = `<div style="height: 20px; width: 20px; border: 1px solid black;"></div>`
      // const crossDiv = document.createElement('div')
      // crossDiv.innerHTML = `<div style="height: 40px; width: 40px; display: flex; justify-content: center; align-items: center; border: 1px solid black;"><button title="remove"><h5>X</h5></button></div>`
      // console.log(`catPill is == ${catPill}`)
      catPill.innerText = cat + " " + filters.duration;
      parent.appendChild(catPill);
    });
  }
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
