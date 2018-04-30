var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
};

 $('.create-column')
 	.click(function() {
		var columnName = prompt('Enter a column name');
		board.createColumn(new Column(columnName));
	});

function initSortable() {
   $('.column-card-list').sortable({
     connectWith: '.column-card-list',  				
     placeholder: 'card-placeholder'
   }).disableSelection();
 }


$('.create-column')
	.click(function() {
		var columnName = prompt('Enter a column name');
		$.ajaxSetup({
			headers: myHeaders
		});
		$.ajax({
			url: baseUrl + '/column',
			method: 'POST',
			data: {
		    	name: columnName
			},
			success: function(response){
				var column = new Column(response.id, columnName);
				board.createColumn(column);
		  	}
		});
	});