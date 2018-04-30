function Column(id, name) {
	var self = this;
    this.id = id;
    this.name = name || 'No name given';
    this.element = createColumn();

	function createColumn() {
		var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete').text('x');
		var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

		$columnDelete.on('click', function() {
			self.removeColumn();
		});
	    $columnAddCard.click(function(event) {
		    var cardName = input();
		    $.ajaxSetup({
				headers: myHeaders
			});
		    $.ajax({
			    url: baseUrl + '/card',
			    method: 'POST',
			    data: {
			    name: cardName,
			    bootcamp_kanban_column_id: self.id
			    },
			    success: function(response) {
			        var card = new Card(response.id, cardName);
			        self.createCard(card);
			    }
			});
		});

	    $column.append($columnTitle)
	        .append($columnDelete)
	        .append($columnAddCard)
	        .append($columnCardList);

			return $column;
	}
}

Column.prototype = {
	addCard: function(card) {
	  this.$element.children('ul').append(card.$element);
	},
	removeColumn: function() {
	   var self = this;
	   $.ajaxSetup({
			headers: myHeaders
		});
	    $.ajax({
	      url: baseUrl + '/column/' + self.id,
	      method: 'DELETE',
	      success: function(response){
	        self.element.remove();
	      }
		});
	}
};