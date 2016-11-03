'use strict';

(function () {

	'use strict';

	angular.module('app').factory('DeckFactory', function (API, LocalStorage) {

		var DECK_IN_LOCALSTORAGE = 'deck';

		(function () {
			var deck = void 0;
			var dealerCards = void 0;
			var userCards = void 0;

			if (!localStorage.getItem(DECK_IN_LOCALSTORAGE)) {
				var newDeck = API.getNewDeck();

				newDeck.then(function (response) {
					deck = {
						id: response.data.deck_id,
						remaining: response.data.remaining
					};

					LocalStorage.set(DECK_IN_LOCALSTORAGE, deck);
				});
			} else {
				deck = LocalStorage.get(DECK_IN_LOCALSTORAGE);
			}

			var newCards = API.getCards(deck.id, 2);
		})();

		return {};
	});
})();