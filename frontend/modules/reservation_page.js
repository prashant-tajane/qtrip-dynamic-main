import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  const url =
    config.backendEndpoint + `/reservations/`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    

    return data;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  if(reservations.length){
    document.getElementById('no-reservation-banner').style.display = "none"
    document.getElementById("reservation-table-parent").style.display = "block"
  }else{
    document.getElementById("reservation-table-parent").style.display = "none"
    document.getElementById('no-reservation-banner').style.display = "block"
  }

  
  //Conditionally render the no-reservation-banner and reservation-table-parent

  reservations.map((res) => {
    
    const url = `../detail/?adventure=${res.adventure}`

    const tableRow = document.createElement('tr')
    tableRow.innerHTML = `<td>${res.id}</td>
    <td>${res.name}</td>
    <td>${res.adventureName}</td>
    <td>${res.person}</td>
    <td>${new Date(res.date).toLocaleDateString("en-IN")}</td>
    <td>${res.price}</td>
    <td>${new Date(res.time).toLocaleString("en-IN", {
      year: "numeric",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    })}</td>
    <td><button class="reservation-visit-button" id="${res.id}"><a href="${url}";>Visit Adventure</a></button></td>`
    
    document.getElementById("reservation-table").appendChild(tableRow)  
  })

  

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
