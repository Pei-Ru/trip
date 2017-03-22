var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 23.5, lng: 121},
    zoom: 6 });
    $('#tripAddr').change(function(){
    	var addr = $('#tripAddr').val();
		var url="https://maps.googleapis.com/maps/api/geocode/json?address="+addr;
		$.get(url,function(data){
			console.log(data);			
			var addrData = data;
			var addrLat = addrData.results[0].geometry.location.lat;
			var addrLng = addrData.results[0].geometry.location.lng;
			console.log(addrLat+" , "+addrLng);
			map.setCenter(new google.maps.LatLng({ lat: addrLat, lng: addrLng }));
			map.setZoom(15);			
		});
    });
}