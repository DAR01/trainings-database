jQuery(document).ready(function() {

	jQuery.ajax({
		url: "data/trainings.json",
	})
  .done(function(result) {

		var table = jQuery('#trainings').DataTable();
		for (var index = 0; index < result.length; index++) {
			node = result[index];
			table.row.add([
				node.title,
				node.data_pipeline,
				node.audience_level,
				node.tags
			]);
		}
		table.draw();
	})
	.fail(function(err) {
		document.write('error loading data');
	});

});
