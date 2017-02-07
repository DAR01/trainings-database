function nano(template, data) {
  /* Nano Templates - https://github.com/trix/nano */

  return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
    var keys = key.split("."), v = data[keys.shift()];
    for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
    return (typeof v !== "undefined" && v !== null) ? v : "";
  });

}

jQuery(document).ready(function() {

	var curitiba = [-25.4296, -49.2721];
	var popupTemplate = jQuery('#popup-template').html();

	var map = L.map('mapa-feiras').setView(curitiba, 13);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(map);

	jQuery.ajax({
		url: "data/feiras-organicas-curitiba.json",
	})
  .done(function(result) {

		var table = jQuery('#tabela-feiras').DataTable({paging: false});

		for (var index = 0; index < result.length; index++) {
			node = result[index];
			var marker = L.marker([node.latitude, node.longitude]);
			marker.addTo(map);
      marker.bindPopup(nano(popupTemplate, node));

      table.row.add([node.nome,
                     node.bairro,
                     node.dia_da_semana + " de " + node.horario,
                     '<a target="_blank" href="https://www.google.com.br/maps/place/' + node.endereco + '">' + node.endereco + '</a>'])
				.draw();
		}
	})
	.fail(function(err) {
		var popup = L.popup()
					.setLatLng(curitiba)
					.setContent("Erro carregando os dados. :(")
					.openOn(map);
	});

	function onLocationFound(e) {
		var redIcon = new L.Icon({
			iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
			shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41]
});

			var radius = e.accuracy / 2;
			L.marker(e.latlng, {icon: redIcon}).addTo(map)
				.bindPopup("Você está em um raio de " + radius + " metros desse ponto.");
			L.circle(e.latlng, radius).addTo(map);
	}
	map.on('locationfound', onLocationFound);
  map.locate();

});
