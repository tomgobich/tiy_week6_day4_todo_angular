(() => {

	'use strict';

	angular.module('app')
		.factory('FLocalStorage', function()
		{



			const set = function(name, data)
			{
				if(data === '' || data === undefined || data === null)
				{
					console.log('ERROR: The data you were trying to save in localStorage is not complete');
				}
				else
				{
					localStorage.setItem(name, JSON.stringify(data));
				}
			}



			const get = function(name)
			{
				return JSON.parse(localStorage.getItem(name));
			}



			return {
				set,
				get,
			}

		})
})();
