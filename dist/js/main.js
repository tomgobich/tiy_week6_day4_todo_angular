'use strict';

(function () {

	'use strict';

	angular.module('app', []);
})();

$(document).ready(function () {

	$(document).scroll(function () {

		var yAxis = $(document).scrollTop(),
		    $nav = $('#navHeader'),
		    $content = $('#content');

		if (yAxis >= 75) {
			$nav.css({ position: "fixed", "top": "0", "left": "0" });
			$content.css({ marginTop: "60px" });
		} else {
			$nav.css("position", "relative");
			$content.css({ marginTop: "0px" });
		}
	});
});