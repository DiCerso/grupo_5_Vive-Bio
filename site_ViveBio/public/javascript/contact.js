function initMap(){
    var map = new google.maps.Map(document.getElementById('map'),{
        zoom: 10,
        center:  { lat:-34.662755, lng: -58.886236 },
    });
    var marker = new google.maps.Marker({
        position: { lat:-34.662755, lng: -58.886236 },
        map: map
    })
};

window.initMap = initMap;