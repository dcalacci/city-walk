// var accessToken = 'pk.eyJ1IjoiZGNhbGFjY2kiLCJhIjoiYmFlOTZkZDhhOTZjMjNkMWM4YWJmODY1ZWYwNjlhMzQifQ.LnFkmeqYRhEztIwR3693LA';
// // Replace 'mapbox.streets' with your map id.
// var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + accessToken, {
//     attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
// });


// var map = L.map('map', {
//     doubleClickZoom: false
// }).setView([42.356761, -71.093531], 13)
//     .addLayer(mapboxTiles);


L.mapbox.accessToken = 'pk.eyJ1IjoiZGNhbGFjY2kiLCJhIjoiYmFlOTZkZDhhOTZjMjNkMWM4YWJmODY1ZWYwNjlhMzQifQ.LnFkmeqYRhEztIwR3693LA';
// Create a map in the div #map
L.mapbox.map('map', 'mapbox.streets').setView([42.356761, -71.093531], 9);
