// alert('hello');

function randomString() {
	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	var str = '';
	for (i = 0; i < 10; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
};

function Column(name) {
	var self = this;
	this.id = randomString();
	this.name = name || 'New column';
	this.$element = createColumn();

	function createColumn () {
		// creating components of columns:
		var $column = $('<div>').addClass('column col-sm-3');
		var $columnTitle = $('<h2>').addClass('column-title text-center').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete btn-default btn-column').text('x');
		var $columnAddCard = $('<button>').addClass('add-card btn-default').text('Add a card');

		// delete a column:
		$columnDelete.click(function () {
			self.removeColumn();
		});

		// add a note:
		$columnAddCard.click(function() {
			event.preventDefault();
			self.addCard(new Card(prompt("Enter the content of the card")));
		});

		// contruction column element:
		$column.append($columnTitle)
				.append($columnDelete)
				.append($columnAddCard)
				.append($columnCardList);

		// return of the created column:
		return $column;
	}	
};

Column.prototype = {
	addCard: function(card) {
		this.$element.children('ul').append(card.$element);
	},
	removeColumn: function() {
		this.$element.remove();
	}
};

function Card(description) {
	var self = this;

	this.id = randomString();
	this.description = description || "This is a new task...";
	this.$element = createCard();

	function createCard() {
		// creating the blocks
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		var $cardDelete = $('<button>').addClass('btn-delete btn-default').text('x');

		// delete a card:
		$cardDelete.click(function(){
			self.removeCard();
		});

		// construct card element:
		$card.append($cardDelete)
				.append($cardDescription);

		// return of the created card:
		if (description === "") {
			return $card;
		} else if (description) {
			return $card;
		} else {
			return false;
		}
	}
};

Card.prototype = {
	removeCard: function() {
		this.$element.remove();
	}
}

var board = {
	name: 'Kanban Board',
	addColumn: function(column) {
		this.$element.append(column.$element);
		initSortable();
	},
	$element: $('#board .column-container')
};

function initSortable() {
	$('.column-card-list').sortable({
		connectWith: '.column-card-list',
		placeholder: 'card-placeholder'
	}).disableSelection();
}

$('.create-column')
	.click(function(){
		var name = prompt('Enter a column name');
		var column = new Column(name);

		if (name === "") { 
			board.addColumn(column);
		} else if (name) {
			board.addColumn(column);
		} else {
			return false;
		}
	});

// creating columns
var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');

// adding columns
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

// creating new cards
var card1 = new Card('This is a new task...');
var card2 = new Card('Creating kanban boards.');
var card3 = new Card('This is done!');

// adding cards to the column
todoColumn.addCard(card1);
doingColumn.addCard(card2);
doneColumn.addCard(card3);
