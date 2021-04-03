// LOAD GOOGLE MAP
let loc = { lat: 37.38605, lng: -122.08385 };
let contentString = '<h3>8.8.8.8</h3><p>Mountain View, US 94035</p>';
const icon = "./images/icon-location.svg";

class IPMap {
    constructor(){
        this.map = new google.maps.Map(document.getElementById("map"), {
            center: loc,
            zoom: 10
        });
        this.marker = new google.maps.Marker({
            position: loc,
            map: this.map,
            icon: icon,
            animation: google.maps.Animation.DROP,
        });
    }
    visualizeMap(coords, content){
        this.map.setCenter(coords);
        // Marker
        const infowindow = new google.maps.InfoWindow({
            content: content,
        });  
        this.marker.setPosition(coords);
        this.marker.addListener("click", () => {
            infowindow.open(this.map, this.marker);
        });
    }
}

function initMap() {
    const ipMap = new IPMap;
    ipMap.visualizeMap(loc, contentString);
};


// GET IP GEOLOCATION FROM IP ADDRESS
async function getIPGeo(ip){
    const apiKey = 'at_6y2KkguAxO0gedMsJRQvZBMRRhNbU';
    try {
        const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ip}`);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}

function getData(){
    getIPGeo(input.value).then(data => {
        ipAdd.innerText = data.ip;
        geo.innerText = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
        timezone.innerText = `UTC ${data.location.timezone}`;
        isp.innerText = data.isp;
        loc = { lat: data.location.lat, lng: data.location.lng };
        contentString = `<h3>${data.ip}</h3><p>${data.location.city}, ${data.location.country} ${data.location.postalCode}</p>`;
    });
}


const input = document.querySelector('.searchbar input');
const submitButton = document.querySelector('.searchbar a');
const ipAdd = document.querySelector('.ipAdd h2');
const geo = document.querySelector('.geo h2');
const timezone = document.querySelector('.timezone h2');
const isp = document.querySelector('.isp h2');


// EVENT LISTENER
input.addEventListener('keyup', (ev) => {
    if (ev.which === 13) { 
        getData();
        initMap();
    }
});

submitButton.addEventListener('click', () => {
    getData();
    initMap();
});