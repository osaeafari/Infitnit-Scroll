// Unsplash API
const count = 10;
const apiKey = '1bhtvrfjIDTiJ-6RZy424Tk4A0z3wDs9R1rVRQE-jTg';
const apiUrl =`https://api.unsplash.com/photos/ramdom/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        // catch Error Here
    }
}


// On Load
getPhotos();
