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

// get data about the celeb 
function getInfo() {
    var query = $(this).attr('data-name');
    var url = 'https://api.giphy.com/v1/gifs/search'
    url += '?' + $.param({
        'q'       : query,
        'api_key' : 'nru2bYnEeyxA6QGklDE7nMQ4je3pIaHg',
        'limit'   : 5,
    })
    console.log(url);

    $.ajax({
        url: url,
        method: 'GET',
    }).done(function(response) {
        var info = response.data;
        for (var i = 0; i < info.length; i ++) {
            var img = $("<img class='i'>").attr('src', info[i].images.fixed_width.url);
            var rating = $("<p class='r'>").html('<a class="link" target="_blank" href=' + info[i].images.original.url + '>' + info[i].title + '</a><br> Rating: ' + info[i].rating);
            // var title = $("<p class='t'>").text(info[i].title);
            $(".images").prepend(img,  rating);
            // $(".images").prepend();
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
});
displayButtons();
    
console.log(options);

})

// getting location from geocoding data
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

        console.log(location)
        return location;
    })

    return location;

}
// getLocation();


var lat;
var lng;


// getting map on screen

// var lat = location.results[0].geometry.location.lat;
// console.log(lat);
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: parseInt(lat) , lng: parseInt(lng) },
        zoom: 8
    });
}


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





