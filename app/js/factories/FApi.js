(() => {

	'use strict';

	angular.module('app')
		.factory('FApi', function($http)
		{



			// ------------------------------------------------------------
			// Name: getNewDeck
			// Abstract: Gets a new card deck
			// ------------------------------------------------------------
			const getNewDeck = function(deckCount)
			{
				let newDeck = $http({
					method: 'GET',
					url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
				});

				return newDeck;
			}



			const getCards = function(deckID, cardCount)
			{
				let cards = $http({
					method: 'GET',
					url: `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=${cardCount}`
				});
			}



			return {
				getNewDeck,
				getCards
			}
		})
})();
