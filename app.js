let map;
let marker;

function initMap() {
    let loc = { lat: 10.82302, lng: 106.62965 }
    // Map
    map = new google.maps.Map(document.getElementById("map"), {
        center: loc,
        zoom: 10,
    });
    // Marker
    const icon = "./images/icon-location.svg";
    const infowindow = new google.maps.InfoWindow({
        content: '<h3>192.212.174.101</h3><p>Brooklyn, NY 10001</p>',
    });  
    marker = new google.maps.Marker({
        position: loc,
        map: map,
        icon: icon,
        animation: google.maps.Animation.DROP,
    });
    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }