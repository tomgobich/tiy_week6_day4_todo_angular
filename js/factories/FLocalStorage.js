'use strict';

(function () {

	'use strict';

	angular.module('app').factory('FLocalStorage', function () {

		var set = function set(name, data) {
			if (data === '' || data === undefined || data === null) {
				console.log('ERROR: The data you were trying to save in localStorage is not complete');
			} else {
				localStorage.setItem(name, JSON.stringify(data));
			}
		};

		var get = function get(name) {
			return JSON.parse(localStorage.getItem(name));
		};

		return {
			set: set,
			get: get
		};
	});
})();