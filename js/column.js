function Column(id, name) {
	var self = this;
    this.id = id;
    this.name = name || 'No name given';
    this.element = createColumn();

	function createColumn() {
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var columnAddCard = $('<button class="column-add-card">Add card</button>');

		columnDelete.on('click', function() {
			self.removeColumn();
		});
	    columnAddCard.click(function(event) {
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

	    column.append(columnTitle)
	        .append(columnDelete)
	        .append(columnAddCard)
	        .append(columnCardList);

			return column;
	}
}

Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
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