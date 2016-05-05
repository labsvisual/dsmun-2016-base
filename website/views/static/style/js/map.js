$(document).ready(function($) {

  $("#map-canvas").addClass('map');

  function initialize() {
     var styles = [
  {
    "featureType": "water",
    "stylers": [
      { "weight": 0.1 },
      { "color": "#70a8bf" }
    ]
  },{
    "featureType": "landscape",
    "stylers": [
      { "color": "#000000" }
    ]
  },
  {
      featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      { visibility: "off" }
    ]
    },
    {
    "featureType": "administrative.country",
    "elementType": "labels.text",
    "stylers": [
      
      { "visibility": "off" }
    ]
  }
];



    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = new google.maps.StyledMapType(styles,
      {name: "Styled Map"});
    var myLatlng = new google.maps.LatLng(0.00000, 0.00000);
    var mapOptions = {
      zoom: 2,
      center: myLatlng,
      mapTypeControlOptions: {
        mapTypeIds: ['map_style']
      }, navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: false,
    scrollwheel: false,
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading" >The Tussle for Asian Supremacy</h1>'+
        '<div id="bodyContent" >'+
        '<p><b>JCC: Hindustan Cabinet, 2030</b><br>New Delhi, India</p>'+
        '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position:  new google.maps.LatLng(28.6171719, 77.2081301),
        map: map,
        title: 'Hindustan Cabinet, 2030'
    });
    google.maps.event.addListener(marker, 'mouseover', function() {
      infowindow.open(map,marker);
    });
    google.maps.event.addListener(marker, 'mouseout', function() {
      infowindow.close(map,marker);
    });

    var contentStringOne = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading" >The Tussle for Asian Supremacy</h1>'+
        '<div id="bodyContent" >'+
        '<p><b>JCC: Russian Union Cabinet, 2030</b><br>Moscow, Russia</p>'+
        '</div>'+
        '</div>';

    var infowindowOne = new google.maps.InfoWindow({
        content: contentStringOne
    });

    var markerOne = new google.maps.Marker({
        position:  new google.maps.LatLng(55.749792, 37.632495),
        map: map,
        title: 'Russian Union Cabinet, 2030'
    });
    google.maps.event.addListener(markerOne, 'mouseover', function() {
      infowindowOne.open(map,markerOne);
    });
    google.maps.event.addListener(markerOne, 'mouseout', function() {
      infowindowOne.close(map,markerOne);
    });

    var contentStringTwo = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading" >The Tussle for Asian Supremacy</h1>'+
        '<div id="bodyContent" >'+
        '<p><b>JCC: Chinese Cabinet, 2030</b><br>Beijing, China</p>'+
        '</div>'+
        '</div>';

    var infowindowTwo = new google.maps.InfoWindow({
        content: contentStringTwo
    });

    var markerTwo = new google.maps.Marker({
        position:  new google.maps.LatLng(39.9388838, 116.3974589),
        map: map,
        title: 'Chinese Cabinet, 2030'
    });
    google.maps.event.addListener(markerTwo, 'mouseover', function() {
      infowindowTwo.open(map,markerTwo);
    });
    google.maps.event.addListener(markerTwo, 'mouseout', function() {
      infowindowTwo.close(map,markerTwo);
    });

    var contentStringThree = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading" >LGBT Rights</h1>'+
        '<div id="bodyContent" >'+
        '<p><b>UN Human Rights Council</b><br>New York, USA - Birth Place of Harvey Milk</p>'+
        '</div>'+
        '</div>';

    var infowindowThree = new google.maps.InfoWindow({
        content: contentStringThree
    });

    var markerThree = new google.maps.Marker({
        position:  new google.maps.LatLng(40.7033127, -73.979681),
        map: map,
        title: 'UN Human Rights Council'
    });
    google.maps.event.addListener(markerThree, 'mouseover', function() {
      infowindowThree.open(map,markerThree);
    });
    google.maps.event.addListener(markerThree, 'mouseout', function() {
      infowindowThree.close(map,markerThree);
    });

    var contentStringFour = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading" >Black Sites</h1>'+
        '<div id="bodyContent" >'+
        '<p><b>UN Human Rights Council</b><br>Guantanamo Bay, Cuba</p>'+
        '</div>'+
        '</div>';

    var infowindowFour = new google.maps.InfoWindow({
        content: contentStringFour
    });

    var markerFour = new google.maps.Marker({
        position:  new google.maps.LatLng(19.902648, -75.100169),
        map: map,
        title: 'UN Human Rights Council'
    });
    google.maps.event.addListener(markerFour, 'mouseover', function() {
      infowindowFour.open(map,markerFour);
    });
    google.maps.event.addListener(markerFour, 'mouseout', function() {
      infowindowFour.close(map,markerFour);
    });

    var contentStringFive = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading" >Reportage of all committees</h1>'+
        '<div id="bodyContent" >'+
        '<p><b>International Press Corps</b><br>Paris, France - Charlie Hebdo</p>'+
        '</div>'+
        '</div>';

    var infowindowFive = new google.maps.InfoWindow({
        content: contentStringFive
    });

    var markerFive = new google.maps.Marker({
        position:  new google.maps.LatLng(48.859262, 2.370342),
        map: map,
        title: 'International Press Corps'
    });
    google.maps.event.addListener(markerFive, 'mouseover', function() {
      infowindowFive.open(map,markerFive);
    });
    google.maps.event.addListener(markerFive, 'mouseout', function() {
      infowindowFive.close(map,markerFive);
    });

    var contentStringSix = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading" >Foreign Military Bases</h1>'+
        '<div id="bodyContent" >'+
        '<p><b>Disarmament and International Security Committee</b><br>Gare Loch, Scotland - Trident Missile Base</p>'+
        '</div>'+
        '</div>';

    var infowindowSix = new google.maps.InfoWindow({
        content: contentStringSix
    });

    var markerSix = new google.maps.Marker({
        position:  new google.maps.LatLng(56.0459353, -4.8130483),
        map: map,
        title: 'Disarmament and International Security Committee'
    });
    google.maps.event.addListener(markerSix, 'mouseover', function() {
      infowindowSix.open(map,markerSix);
    });
    google.maps.event.addListener(markerSix, 'mouseout', function() {
      infowindowSix.close(map,markerSix);
    });

    var contentStringSeven = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading" >Separating Law and Religion</h1>'+
        '<div id="bodyContent" >'+
        '<p><b>Special Convention on Religion and Terror</b><br>Jerusalem, Israel</p>'+
        '</div>'+
        '</div>';

    var infowindowSeven = new google.maps.InfoWindow({
        content: contentStringSeven
    });

    var markerSeven = new google.maps.Marker({
        position:  new google.maps.LatLng(31.7963186, 35.175359),
        map: map,
        title: 'Special Convention on Religion and Terror'
    });
    google.maps.event.addListener(markerSeven, 'mouseover', function() {
      infowindowSeven.open(map,markerSeven);
    });
    google.maps.event.addListener(markerSeven, 'mouseout', function() {
      infowindowSeven.close(map,markerSeven);
    });

    var contentStringEight = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading" >Dwindling Oil Prices</h1>'+
        '<div id="bodyContent" >'+
        '<p><b>Futuristic Economic and Financial Committee, 2020</b><br>Riyadh, Saudi Arabia - Biggest Oil Producing Nation</p>'+
        '</div>'+
        '</div>';

    var infowindowEight = new google.maps.InfoWindow({
        content: contentStringEight
    });

    var markerEight = new google.maps.Marker({
        position:  new google.maps.LatLng(24.7251918, 46.8225288),
        map: map,
        title: 'Futuristic Economic and Financial Committee, 2020'
    });
    google.maps.event.addListener(markerEight, 'mouseover', function() {
      infowindowEight.open(map,markerEight);
    });
    google.maps.event.addListener(markerEight, 'mouseout', function() {
      infowindowEight.close(map,markerEight);
    });

    var contentStringNine = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading" >ISIL</h1>'+
        '<div id="bodyContent" >'+
        '<p><b>UN Security Council</b><br>Ar Raqqah, Syria - Administrative Base of ISIL</p>'+
        '</div>'+
        '</div>';

    var infowindowNine = new google.maps.InfoWindow({
        content: contentStringNine
    });

    var markerNine = new google.maps.Marker({
        position:  new google.maps.LatLng(35.9547296, 38.9970875),
        map: map,
        title: 'UN Security Council'
    });
    google.maps.event.addListener(markerNine, 'mouseover', function() {
      infowindowNine.open(map,markerNine);
    });
    google.maps.event.addListener(markerNine, 'mouseout', function() {
      infowindowNine.close(map,markerNine);
    });

    var contentStringTen = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading" >Somalia vs Kenya Maritime Border Dispute</h1>'+
        '<div id="bodyContent" >'+
        '<p><b>International Court of Justice</b><br>Somalia- Kenya Border- Area under dispute</p>'+
        '</div>'+
        '</div>';

    var infowindowTen = new google.maps.InfoWindow({
        content: contentStringTen
    });

    var markerTen = new google.maps.Marker({
        position:  new google.maps.LatLng(-1.2360296, 41.8778343),
        map: map,
        title: 'Interntional Court of Justice'
    });
    google.maps.event.addListener(markerTen, 'mouseover', function() {
      infowindowTen.open(map,markerTen);
    });
    google.maps.event.addListener(markerTen, 'mouseout', function() {
      infowindowTen.close(map,markerTen);
    });

    var contentStringEleven= '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading" >Marshall Islands vs India</h1>'+
        '<div id="bodyContent" >'+
        '<p><b>International Court of Justice</b><br>Marshall Islands - Prosecution</p>'+
        '</div>'+
        '</div>';

    var infowindowEleven = new google.maps.InfoWindow({
        content: contentStringEleven
    });

    var markerEleven = new google.maps.Marker({
        position:  new google.maps.LatLng(7.1373114, 171.2060643),
        map: map,
        title: 'Interntional Court of Justice'
    });
    google.maps.event.addListener(markerEleven, 'mouseover', function() {
      infowindowEleven.open(map,markerEleven);
    });
    google.maps.event.addListener(markerEleven, 'mouseout', function() {
      infowindowEleven.close(map,markerEleven);
    });

     var contentStringTwelve= '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading" >Iranian Revolution, 1978-79</h1>'+
        '<div id="bodyContent" >'+
        '<p><b>UN Historical Security Council, 1978-79</b><br>Tehran, Iran</p>'+
        '</div>'+
        '</div>';

    var infowindowTwelve = new google.maps.InfoWindow({
        content: contentStringTwelve
    });

    var markerTwelve = new google.maps.Marker({
        position:  new google.maps.LatLng(32.4207423, 53.6830157),
        map: map,
        title: 'Un Historical Security Council, 1978-79'
    });
    google.maps.event.addListener(markerTwelve, 'mouseover', function() {
      infowindowTwelve.open(map,markerTwelve);
    });
    google.maps.event.addListener(markerTwelve, 'mouseout', function() {
      infowindowTwelve.close(map,markerTwelve);
    });

     var contentStringThirteen= '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading" >Boko Haram</h1>'+
        '<div id="bodyContent" >'+
        '<p><b>UN Security Council</b><br>North- East Nigeria</p>'+
        '</div>'+
        '</div>';

    var infowindowThirteen = new google.maps.InfoWindow({
        content: contentStringThirteen
    });

    var markerThirteen = new google.maps.Marker({
        position:  new google.maps.LatLng(10.8252757, 10.9845858),
        map: map,
        title: 'Un Security Council'
    });
    google.maps.event.addListener(markerThirteen, 'mouseover', function() {
      infowindowThirteen.open(map,markerThirteen);
    });
    google.maps.event.addListener(markerThirteen, 'mouseout', function() {
      infowindowThirteen.close(map,markerThirteen);
    });

    var contentStringFourteen= '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading" >Non - State Actors</h1>'+
        '<div id="bodyContent" >'+
        '<p><b>Disarmament and International Security Committee</b><br>Sydney, Australia - Lindt Cafe</p>'+
        '</div>'+
        '</div>';

    var infowindowFourteen = new google.maps.InfoWindow({
        content: contentStringFourteen
    });

    var markerFourteen = new google.maps.Marker({
        position:  new google.maps.LatLng(-33.872321, 151.202183),
        map: map,
        title: 'Disarmament and International Security Committee'
    });
    google.maps.event.addListener(markerFourteen, 'mouseover', function() {
      infowindowFourteen.open(map,markerFourteen);
    });
    google.maps.event.addListener(markerFourteen, 'mouseout', function() {
      infowindowFourteen.close(map,markerFourteen);
    });

    var contentStringFifteen= '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading" >Indian Parliament - Lok Sabha</h1>'+
        '<div id="bodyContent" >'+
        '<p><b>Social Security Schemes</b><br><b>Education</b><br>Delhi, India - Parliament House</p>'+
        '</div>'+
        '</div>';

    var infowindowFifteen = new google.maps.InfoWindow({
        content: contentStringFifteen
    });

    var markerFifteen = new google.maps.Marker({
        position:  new google.maps.LatLng(28.7475327, 75.0049266),
        map: map,
        title: 'Lok Sabha'
    });
    google.maps.event.addListener(markerFifteen, 'mouseover', function() {
      infowindowFifteen.open(map,markerFifteen);
    });
    google.maps.event.addListener(markerFifteen, 'mouseout', function() {
      infowindowFifteen.close(map,markerFifteen);
    });

    var contentStringSixteen= '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading" >Russian Economic Crisis</h1>'+
        '<div id="bodyContent" >'+
        '<p><b>Futuristic Economic and Financial Committee, 2020</b><br>Moscow, Russia</p>'+
        '</div>'+
        '</div>';

    var infowindowSixteen = new google.maps.InfoWindow({
        content: contentStringSixteen
    });

    var markerSixteen = new google.maps.Marker({
        position:  new google.maps.LatLng(56.749792, 39.632495),
        map: map,
        title: 'Futuristic Economic and Financial Committee, 2020'
    });
    google.maps.event.addListener(markerSixteen, 'mouseover', function() {
      infowindowSixteen.open(map,markerSixteen);
    });
    google.maps.event.addListener(markerSixteen, 'mouseout', function() {
      infowindowSixteen.close(map,markerSixteen);
    });


  }

  google.maps.event.addDomListener(window, 'load', initialize);

});