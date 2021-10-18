const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];


// Unsplash API
const count = 10;
const apiKey = '1bhtvrfjIDTiJ-6RZy424Tk4A0z3wDs9R1rVRQE-jTg';
const apiUrl =`https://api.unsplash.com/photos/ramdom/?client_id=${apiKey}&count=${count}`;


// Helper function to set Attributes on DOM Elements
function setAttribute(element, attributes) {
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements for links & photos, add to DOM
function displayPhotos(){
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttribute(img, {
            src: photo.url.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // put <img> inside <a>, then put both inside image Container Element</a>
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
    } catch (error) {
        // catch Error Here
    }
}


// On Load
getPhotos();
