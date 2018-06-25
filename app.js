$(function() {
    var options = ['Steve Jobs', 'Bruce Lee', 'Leonardo DiCaprio', 'Roger Federer'];
    
// display buttons with celeb names on the screen      
function displayButtons() {
    $(".buttons").empty();
    for (var i = 0; i < options.length; i++) {
    var btn = $("<button class='celeb'>");
    btn.attr('data-name', options[i]);
    btn.text(options[i]);
    $(".buttons").prepend(btn);
    } 
}

// get data about the query 
function getInfo() {
    var query = $(this).attr('data-name');
    var url = 'https://api.giphy.com/v1/gifs/search'
    url += '?' + $.param({
        'q'       : query,
        'api_key' : 'nru2bYnEeyxA6QGklDE7nMQ4je3pIaHg',
        'limit'   : 10,
    })
    console.log(url);

    $.ajax({
        url: url,
        method: 'GET',
    }).done(function(response) {
        var info = response.data;
        for (var i = 0; i < info.length; i ++) {
            
            var img = $("<img class='gif'>").attr('src',info[i].images.fixed_height_still.url);
            img.attr('data-state', 'still');
            img.attr('data-still', info[i].images.fixed_height_still.url);
            img.attr('data-animate', info[i].images.fixed_height.url);
           
            var rating = $("<p class='r text-info'>").html('<a class="link" target="_blank" href=' + info[i].images.original.url + '>' + info[i].title + '</a><br> Rating: ' + info[i].rating);

            $(".images").prepend(img,  rating);
            // $(".images").slideDown(3000);



            // function to animate gif
            $(".gif").on('click', function () { 
                var state = $(this).attr('data-state');
                if (state == 'still') {
                    $(this).attr('src', $(this).attr('data-animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).attr('data-still'));
                    $(this).attr('data-state', 'still');
                }
             })
            console.log(response);
        }
    }).fail(function(err) {
        throw err;        
    })
}

// Click celeb buttons for their giphys and info
$(document).on("click", '.celeb', getInfo);

// Click submit button for adding your celeb
$('.submit').on("click", function(event) {
    event.preventDefault();
    var input = $(".celeb-name").val().trim();
    options.push(input);
    displayButtons();
    getInfo();
    getLocation();
    getWeather();
});
displayButtons();
    
console.log(options);

})

function getLocation() {

    var address = $(".celeb-name").val().trim();
    var url = 'https://maps.googleapis.com/maps/api/geocode/json';

    url += '?' + $.param({
        'address' : address,
        'key' : 'AIzaSyD0g1E3rBCb46ewHYGCVRvcIkKxY-TbAL0'
    })
    console.log(url)
    $.ajax({
        url: url,
        method: 'GET'
    }).then(function(location) {
        lat = location.results[0].geometry.location.lat;
        lng = location.results[0].geometry.location.lng;
        console.log(lat);
        console.log(lng);

        // console.log(location)
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: location.results[0].geometry.location.lat , lng: location.results[0].geometry.location.lng },
            zoom: 8
            });
   
    })

    return location;

}
// function initAutocomplete() {
//         var map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: -33.8688, lng: 151.2195},
//           zoom: 13,
//           mapTypeId: 'roadmap'
//         });

//         // Create the search box and link it to the UI element.
//         var input = document.getElementById('pac-input');
//         var searchBox = new google.maps.places.SearchBox(input);
//         map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//         // Bias the SearchBox results towards current map's viewport.
//         map.addListener('bounds_changed', function() {
//           searchBox.setBounds(map.getBounds());
//         });

//         var markers = [];
//         // Listen for the event fired when the user selects a prediction and retrieve
//         // more details for that place.
//         searchBox.addListener('places_changed', function() {
//           var places = searchBox.getPlaces();

//           if (places.length == 0) {
//             return;
//           }

//           // Clear out the old markers.
//           markers.forEach(function(marker) {
//             marker.setMap(null);
//           });
//           markers = [];

//           // For each place, get the icon, name and location.
//           var bounds = new google.maps.LatLngBounds();
//           places.forEach(function(place) {
//             if (!place.geometry) {
//               console.log("Returned place contains no geometry");
//               return;
//             }
//             var icon = {
//               url: place.icon,
//               size: new google.maps.Size(71, 71),
//               origin: new google.maps.Point(0, 0),
//               anchor: new google.maps.Point(17, 34),
//               scaledSize: new google.maps.Size(25, 25)
//             };

//             // Create a marker for each place.
//             markers.push(new google.maps.Marker({
//               map: map,
//               icon: icon,
//               title: place.name,
//               position: place.geometry.location
//             }));

//             if (place.geometry.viewport) {
//               // Only geocodes have viewport.
//               bounds.union(place.geometry.viewport);
//             } else {
//               bounds.extend(place.geometry.location);
//             }
//           });
//           map.fitBounds(bounds);
//         });
//       }


// // getting location from geocoding data
// function getLocation() {

//     var address = $(".celeb-name").val().trim();
//     var url = 'https://maps.googleapis.com/maps/api/geocode/json';

//     url += '?' + $.param({
//         'address' : address,
//         'key' : 'AIzaSyD0g1E3rBCb46ewHYGCVRvcIkKxY-TbAL0'
//     })
//     console.log(url)
//     $.ajax({
//         url: url,
//         method: 'GET'
//     }).then(function(location) {
//         lat = location.results[0].geometry.location.lat;
//         lng = location.results[0].geometry.location.lng;
//         console.log(lat);
//         console.log(lng);

//         console.log(location)
//         // return location;

   
//     })

//     return location;
//     return lat;
//     return lng;

// }
// // getLocation();
// console.log(lat);
// console.log(lng);
// console.log(location)




// var lat;
// var lng;

// var map;
// var url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBjxkJaU8O1vHZwmWL4t8W0AJUPJWW2-aI&callback=initMap'
// url += '?' + $.param({
//     'key' : 'AIzaSyBjxkJaU8O1vHZwmWL4t8W0AJUPJWW2-aI',
//     'callback' : 'initmap',
//     'q' : 'loc:' + lat + '+' + lng,
//     'mode' : 'html'
// })
// console.log(url);
// var latlng = { lat: parseInt(lat), lng: parseInt(lng)};
// // $.ajax({
// //     url: url,
// //     method: 'GET'
// // }).done(function(map) {
// //     console.log(map);
// // })
// function initMap() {
// map = new google.maps.Map(document.getElementById('map'), {
// center: latlng,
// zoom: 8
// });
// }



// getting weaher data on screen
function getWeather() {
    var q = $(".celeb-name").val().trim();
    var url = "https://api.openweathermap.org/data/2.5/weather"

    url += '?' + $.param({
        'q'   : q,
        'appid' : 'c955338aae699873b4b189b3b1e36c15',
        'mode' : 'html',
        'units'  : 'metric'
    })
    $.ajax({
        url: url,
        method: 'GET'
    }).then(function(data) {
        $(".weather").html(data);
        // console.log(data);
    })
}





