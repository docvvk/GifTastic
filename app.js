$(function() {
    var options = ['Toronto', 'Bruce Lee', 'Leonardo DiCaprio', 'Roger Federer'];
    
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
// Click celeb buttons for their giphys and info
// $(document).on("click", '.celeb', function() {
//     $(this).attr('data-name', ($(".celeb-name").val().trim()));
// });

$(document).on("click", '.celeb', getInfo);

// get data about the query 
function getInfo() {
    var query = $(".celeb-name").val().trim();
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
        for (var i = 0; i < info.length; i++) {
            
            var img = $("<img class='gif'>").attr('src',info[i].images.fixed_height_still.url);
            img.attr('data-state', 'still');
            img.attr('data-still', info[i].images.fixed_height_still.url);
            img.attr('data-animate', info[i].images.fixed_height.url);
           
            var rating = $("<p class='newsItems text-secondary'>").html('<a class="newsItems text-info" target="_blank" href=' + info[i].images.original.url + '>' + info[i].title + '</a><br> Rating: ' + info[i].rating);

            $(".images").prepend(img,  rating);

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

// Click submit button for adding your celeb
$('.submit').on("click", function(event) {
    event.preventDefault();
    var input = $(".celeb-name").val().trim();
    options.push(input);
    displayButtons();
    getInfo();
    getLocation();
    getWeather();
    getNews();
    $(".celeb-name").val('');
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
// getting weather data on screen
function getWeather() {
    var q = $(".celeb-name").val().trim();
    var url = "https://api.openweathermap.org/data/2.5/weather"

    url += '?' + $.param({
        'q'   : q,
        'appid' : 'c955338aae699873b4b189b3b1e36c15',
        'mode' : 'html',
        'units'  : 'metric'
    })
    console.log(url);
    $.ajax({
        url: url,
        method: 'GET'
    }).then(function(data) {
        $(".weather").html(data);
    })
}

//get news data
function getNews() {
    var query = $(".celeb-name").val().trim();
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'q' : query,
      'api-key': "4aff0dd88c3d462287ad3a77ad96c599",
      'begin_date': "20180627",
      'end_date': "20180628",
      'sort': "newest",
      'page': 0
    });
    $.ajax({
        url: url,
        method: 'GET'
    }).done(function(response) {
        console.log(response);

        var info = response.response.docs;
        console.log(info.length);

        for (var i = 0; i < info.length; i++) {
            
            var headline =  $("<h5 class='newsItems'>").text(info[i].headline.main); 
            var snippet = $("<p class='newsItems'>").text(info[i].snippet);
            var link = $("<a class='newsItems'>").attr('href', info[i].web_url);
            link.text("CLICK HERE TO READ MORE");
            
            $(".news").append(headline, snippet, link);  
        }
    }).fail(function(err) {
        throw err;
    });
}




