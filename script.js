const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
const count = 5;
const apiKey = 'YOUR API KEY';
let apiUrl =`https://api.unsplash.com/photos/ramdom/?client_id=${apiKey}&count=${count}`;

// Picture Update
function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/ramdom/?client_id=${apiKey}&count=${count}`;
}

// check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}


// Helper function to set Attributes on DOM Elements
function setAttribute(element, attributes) {
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements for links & photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;

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
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

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
        displayPhotos();
        if (isInitialLoad) {
            updateAPIURLWithNewCount(30);
            isInitialLoad = false;
        }
    } catch (error) {
        // catch Error Here
    }
}

//check to see if scrolling near buttom of page, load More Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});


// On Load
getPhotos();
