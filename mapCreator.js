//Setup of map
var map = L.map("map").setView([37.780508, -122.183204], 16);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 15,
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

//Put picture over mills area
var errorOverlayUrl = "https://cdn-icons-png.flaticon.com/512/110/110686.png";
var latLngBounds = L.latLngBounds([
    [37.784131, -122.188051],
    [37.775506, -122.175466],
]);

var imageOverlay = L.imageOverlay("static/images/campus.png", latLngBounds, {
    opacity: 1,
    errorOverlayUrl: errorOverlayUrl,
    interactive: true,
}).addTo(map);

var markers = [];

const csv_to_array = (data, delimiter = "|\t") =>
    data
        .slice(data.indexOf("\n") + 1)
        .split("\n")
        .map((v) => v.split(delimiter));

var markerInfo = "";
fetch("markers.tsv")
    .then((response) => response.text())
    .then((data) => {
        markerInfo += data;
    })
    .then(() => {
        markers = csv_to_array(markerInfo).reverse();
        console.log(markers);
        //Marker setup
        for (const i of markers) {
            let marker = L.marker([i[3], i[4]]).addTo(map);
            const nickname = i[5];
            marker.bindPopup(
                "<img class ='image' src=static/images/" +
                    nickname +
                    ".jpg> <h2>" +
                    i[0] +
                    "</h2>" +
                    i[1] +
                    "<br><br><b>Fun fact: </b>" +
                    i[2] +
                    "<br><br><a href=" +
                    nickname +
                    ".html>Read more here!</a>"
            ).openPopup();
        }
    });

// //Popup setup
// var popup = L.popup();
// function onMapClick(e) {
// popup
//     .setLatLng(e.latlng)
//     .setContent(e.latlng.toString())
//     .openOn(map);
// }
// map.on('click', onMapClick);
