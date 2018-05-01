function Card(id, name) {
	var self = this;
	this.id = id;
	this.name = name || 'No name given';
    this.element = createCard();

    function createCard() {
    	var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');

	    cardDeleteBtn.on('click', function(){
		    self.removeCard();
		});

		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription);
		return card;

	}
	    
}

Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajaxSetup({
			headers: myHeaders
		});
	    $.ajax({
	      url: baseUrl + '/card/' + self.id,
	      method: 'DELETE',
	      success: function(){
	        self.element.remove();
	      }
		});

	}
};

function input() {
	var $cardInput = $('#card-input').val();	
    return $cardInput;
}

$('#card-input').keydown(function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
    }
});

$('#card-input').tooltip({
	content: '<p style=\"color:white;">Enter name of the card and click "Add a card"</p>',
});