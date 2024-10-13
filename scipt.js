const URL = "https://api.zippopotam.us/pk/25000"

let getPlace = async (con, code) => {
    try {
        let response = await fetch(`https://api.zippopotam.us/${con}/${code}`);
        
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error('Invalid zip code or country.');
        }

        let data = await response.json();
        displayData(data);
    } catch (error) {
        // Display error message
        document.querySelector("#state").innerText = "Error: " + error.message;
        let div = document.querySelector("#result");
        div.innerHTML = "";
    }
}

function displayData(data) {
    // Check if the places array is not empty
    if (data.places && data.places.length > 0) {
        let state = data.places[0]["state"];
        document.querySelector("#state").innerText = state;
        let div = document.querySelector("#result");
        div.innerHTML = ""; // Clear previous results
        data.places.forEach(place => {
            let p = document.createElement("p");
            p.innerText = place["place name"];
            div.append(p);
        });
    } else {
        document.querySelector("#state").innerText = "No data found.";
        document.querySelector("#result").innerHTML = ""; // Clear previous results
    }
}

function getData() {
    let con = document.querySelector("#con").value.trim(); // Trim whitespace
    let code = document.querySelector("#code").value.trim(); // Trim whitespace

    // Check if input fields are empty
    if (!con || !code) {
        alert("Please enter both country and zip code.");
        return; // Exit the function if inputs are not provided
    }

    getPlace(con, code);
}

// Event listener for the submit button
document.querySelector("#submit").addEventListener("click", getData);
