'use strict';

(function () {

	'use strict';

	angular.module('app').factory('FApi', function ($http) {

		// ------------------------------------------------------------
		// Name: getNewDeck
		// Abstract: Gets a new card deck
		// ------------------------------------------------------------
		var getNewDeck = function getNewDeck(deckCount) {
			var newDeck = $http({
				method: 'GET',
				url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
			});

			return newDeck;
		};

		var getCards = function getCards(deckID, cardCount) {
			var cards = $http({
				method: 'GET',
				url: 'https://deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=' + cardCount
			});
		};

		return {
			getNewDeck: getNewDeck,
			getCards: getCards
		};
	});
})();