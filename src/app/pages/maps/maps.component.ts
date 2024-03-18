import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PlaceService } from 'src/app/place.service';
import { Order } from '../other';
import { OrderService } from 'src/app/order.service';
declare const L: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  userId = 3; // Replace with the actual user ID

  orders: Order[] = []

  constructor(private http: HttpClient,private formBuilder: FormBuilder, private placeService:PlaceService, private orderService: OrderService) { }

  ngOnInit() {

  //--------------------------Get user's Location ---------------------
if (!navigator.geolocation) {
  console.log('location is not supported');
}

navigator.geolocation.getCurrentPosition((position) => {
  const coords = position.coords;
  const latLong = [coords.latitude, coords.longitude];
  console.log(
    `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
  );
  let mymap = L.map('map').setView(latLong, 13);
  //this.watchPosition();
  

  // Add a base layer
   var osm= L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
osm.addTo(mymap);
L.Control.geocoder().addTo(mymap);

// Define the circle with center at your current location
/*const circle = L.circle([36.7230724, 10.3441758], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 5000 // in meters
}).addTo(mymap);
*/
  let marker = L.marker(latLong).addTo(mymap);
  
  
  // Create an array of coordinates
  const circle1 = L.circle(latLong, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 75 // in meters
  }).addTo(mymap);
  const locations = [ 
    [23.7807716,90.3367087],
    [40.4380981,-3.844688],
    [14.5965777,120.9382742],
    [25.0174463,121.3412243],
    [27.7090302,85.2848473],
    [28.527554,77.0438319],
    [-15.7213696,-48.1025118],
    [-16.5205315,-68.2066505],
    [34.7164258, 10.696165],
    [36.7949919,10.060705],
    [36.9145409,10.2901152],
    [36.9455989,8.7276504],
    [36.7230724,10.3441758],//ma localisation actuelle
   
  ];

  // Loop through the array and add markers to the map

  locations.forEach(location => {
    L.marker(location).addTo(mymap).bindPopup('<iframe width="560" height="315" src="https://www.youtube.com/embed/5OTq_F5BNZo?start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> ');
    L.popup();
    L.circle(location).addTo(mymap)
  });
  
  // Loop through the bank locations and add markers within the circle
 /* locations.forEach(location => {
  const marker = L.marker(location);
  const distance = mymap.distance(circle.getLatLng(), marker.getLatLng());
  if (distance <= circle.getRadius()) {
    marker.addTo(mymap);
  }
});*/
// Rooting with Leaflet
let routingControl: any;

//map click event
mymap.on('click', function(e: { latlng: any; }) {
if (routingControl) {
  mymap.removeControl(routingControl);
}

routingControl = L.Routing.control({
 
     
  showAlternatives: true,
  lineOptions: {styles: [{color: '#242c81', weight: 7}]},
  fitSelectedRoutes: true,
  altLineOptions: {styles: [{color: '#ed6852', weight: 7}]},

  routeWhileDragging: true,
  waypoints: [
      L.latLng(latLong),
      e.latlng
  ]
}).addTo(mymap);
})


this.placeService.getAll().subscribe(places => {
  places.forEach(place => {
    const location = [place.place_lat, place.place_lng];
    L.marker(location).addTo(mymap).bindPopup('<iframe width="560" height="315" src="https://www.youtube.com/embed/5OTq_F5BNZo?start=3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> ');
   L.popup()
  .setContent(place.place_name)
  
  L.circle(location).addTo(mymap)
  });
  
});


/*
L.Routing.control({
  waypoints: [
    L.latLng(57.74, 11.94),
    L.latLng(57.6792, 11.949)
  ]
}).addTo(mymap);
*/
// research

//--------------------------------------------------

 marker.bindPopup('<b>Hi</b>').openPopup();

  let popup = L.popup()
    .setLatLng(latLong)
    .setContent('I am Franck')
    .openOn(mymap);
});

this.fetchOrders();

  }


  fetchOrders(): void {
    this.orderService.getAllOrdersByUserId(this.userId).subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

}
