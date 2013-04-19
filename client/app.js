angular.module('Shoppinglist', [])

.controller('ShoppinglistCtrl',
	function($scope) {

		$scope.items = [ ];

		$scope.newItem = {
			text: ''
		};

		$scope.createItem = function(data) {
			var item = {
				bought: false
			};
			var match = data.text.match(/ ([0-9]*?)((?![0-9]).*)$/);
			if (match && match.length > 2) {
				item.title = data.text.replace(match[0], '');
				item.amount = parseInt(match[1], 10);
				item.unit = match[2];
			} else {
				item.title = data.text;
			}
<<<<<<< HEAD
=======
			console.log(item);
>>>>>>> b5e43488b09fc334e87374ea60d01a05765fa5ef
			$scope.items.push(item);
			$scope.newItem = {
				text: ''
			};
		};

		$scope.removeItem = function(item) {
			$scope.items.splice($scope.items.indexOf(item), 1);
		};

	}
);
