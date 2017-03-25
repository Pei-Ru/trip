var map;
function initMap() {
	if(document.URL.indexOf("#")!=-1){
		location.hash = '';
		location.href = document.URL.replace("#","");
	}
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
			var addressComponentsNum =  addrData.results[0].address_components.length;
			var boundle = addrData.results[0].geometry.bounds;
			console.log(addrLat+" , "+addrLng);
			map.setCenter(new google.maps.LatLng({ lat: addrLat, lng: addrLng }));
			if(typeof boundle == undefined && addressComponentsNum==4 ){
				map.setZoom(getMapZoomFormula(6));
			}else{
				map.setZoom(getMapZoomFormula(addressComponentsNum));
			}		
		});
    }).click(function(){
    	location.hash = 'tripAddr';
    });
}
function getMapZoomFormula(num){
	var map = [4,5,8,11,14,17];
	return map[num-1];
}