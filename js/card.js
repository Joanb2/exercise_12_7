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


  	function Card(id, name) {
		this.id = id;
		this.name = name || 'No name given';
	    this.$element = createCard();

	    function createCard() {
	    	var $card = $('<li>').addClass('card');
		    var $cardDescription = $('<p>').addClass('card-description').text(self.name);
		    var $cardDelete = $('<button>').addClass('btn-delete').text('x');

		    $cardDelete.on('click', function(){
			        self.removeCard();
			});

			$card.append($cardDelete)
				.append($cardDescription);


				return $card;
		}
	    
	}

	Card.prototype = {
		removeCard: function() {
			var self = this;
		    $.ajax({
		      url: baseUrl + '/card/' + self.id,
		      method: 'DELETE',
		      success: function(){
		        self.$element.remove();
		      }
    		});
		}
	};