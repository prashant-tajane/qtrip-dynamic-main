import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  // console.log(`params are == ${params.get("adventure")}`);
  return params.get("adventure");

  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  const url =
    config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  // console.log(`adventure at addAdventureDetailsToDom is == ${JSON.stringify(adventure)}`)

  document.getElementById("adventure-name").innerHTML = adventure.name;

  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;

  //loading the images

  adventure.images.map((image) => {
    let ele = document.createElement("div");
    ele.className = "col-lg-12";
    ele.innerHTML = `<img src=${image} alt = "" class="activity-card-image pb-3 pb-md-0"/>`;

    document.getElementById("photo-gallery").appendChild(ele);
  });

  document.getElementById('adventure-content').innerText = adventure.content
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images


document.getElementById('photo-gallery').innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div class="carousel-inner" id="carousel-inner">
  
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>`

images.map((image, index) => {

  let ele = document.createElement('div')
  ele.className = `carousel-item ${index === 0 ? "active" : ""}`;
  ele.innerHTML = `<img src=${image} alt = "" class="activity-card-image pb-3 pb-md-0"/>`;

  document.getElementById("carousel-inner").appendChild(ele)

})


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(`adventure details are == ${JSON.stringify(adventure)}`)

  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none"
    document.getElementById("reservation-panel-available").style.display = "block"
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead
  } else{
    document.getElementById("reservation-panel-sold-out").style.display = "block"
    document.getElementById("reservation-panel-available").style.display = "none"
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  
  // console.log(`persons are at calculateReservationCostAndUpdateDom == ${persons}`)
  
  document.getElementById("reservation-cost").innerHTML = adventure.costPerHead * persons

  return adventure.costPerHead * persons
}


//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".


  const form = document.getElementById("myForm")
  const url = config.backendEndpoint + `/reservations/new`

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const name = form.elements["name"].value
    const date = new Date(form.elements["date"].value);
    // console.log(`date is == ${date}`)

    const person = form.elements['person'].value
    // console.log(`person is == ${person}`)
    const total = adventure.costPerHead * person
    // console.log(`adventure details is == ${JSON.stringify(adventure)}`)

    const newAdventure = {
      name:name, date: date, person: person, adventure: adventure.id
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify(newAdventure),
      };

    fetch(url, options).then(data => {
      if(!data.ok){
        throw Error(data.status)
      }
      // console.log(`data after post is -- ${JSON.stringify(data)}`)
      window.alert('Success')
      return data.json()
    }).then(newAdventure => console.log(`newAdventure details are == ${JSON.stringify(newAdventure)}`))
      window.alert('Fail')

  })

  
}




//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // console.log(`adventure is == ${JSON.stringify(adventure)}`)
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block"
  }else{
    document.getElementById("reserved-banner").style.display = "none"
  }
}



export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
