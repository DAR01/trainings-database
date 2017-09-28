jQuery(document).ready(function() {

	jQuery.ajax({
		url: "data/trainings.json",
	})
  .done(function(result) {

		var table = jQuery('#trainings').DataTable();
		for (var index = 0; index < result.length; index++) {
			node = result[index];
			table.row.add([
				'<a href="' + node.document_link + '" target="_blank">' + node.title + '</a>',
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
