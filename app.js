// LOAD GOOGLE MAP
let map;
let marker;
let infowindow;
let loc;
const icon = {
    url: "./images/icon-location.svg",
    scaledSize: { width: 25, height: 32 }
};
let contentString = '<h3>8.8.8.8</h3><p>Mountain View, US 94035</p>';

function initMap() {
    let mapOptions = {
        center: new google.maps.LatLng(37.38605, -122.08385),
        zoom: 10,
        disableDefaultUI: true,
    };
    let markerOptions = {
        position: new google.maps.LatLng(37.38605, -122.08385),
        map: map,
        icon: icon,
        animation: google.maps.Animation.DROP,
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    marker = new google.maps.Marker(markerOptions);
    marker.setMap(map);
    infowindow = new google.maps.InfoWindow({
        content: contentString,
    });
    marker.addListener("click", () => {
        infowindow.open(map, marker);
        setTimeout(() => {infowindow.close()}, 2000);
    });
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


// INSERT DATA TO UI
const input = document.querySelector('.searchbar input');
const submitButton = document.querySelector('.searchbar button');
const ipAdd = document.querySelector('.ipAdd h2');
const geo = document.querySelector('.geo h2');
const timezone = document.querySelector('.timezone h2');
const isp = document.querySelector('.isp h2');

function getDataAndChangeLocation(){
    // Insert data to location display
    getIPGeo(input.value).then(data => {
        ipAdd.innerText = data.ip;
        geo.innerText = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
        timezone.innerText = `UTC ${data.location.timezone}`;
        isp.innerText = data.isp;
        loc = { lat: data.location.lat, lng: data.location.lng };
        contentString = `<h3>${data.ip}</h3><p>${data.location.city}, ${data.location.country} ${data.location.postalCode}</p>`;
        return loc, contentString;
    }).then(data => {
        // Display on map
        map.setCenter(loc);
        marker.setPosition(loc);
        infowindow.setContent(contentString);
    })
}


// EVENT LISTENER
input.addEventListener('keyup', (ev) => {
    if (ev.which === 13) { 
        getDataAndChangeLocation();
    }
});

submitButton.addEventListener('click', () => {
    getDataAndChangeLocation();
});
