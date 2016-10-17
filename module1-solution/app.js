(function (){
	'use strict';

	angular.module('LunchCheck', [])
		.controller('LunchCheckController', LunchCheckController);

		LunchCheckController.$inject = ['$scope'];

		function LunchCheckController($scope) {

			/**
			 * Declarations of variables
			 * 
			 * item: variable that stores the value of the textbox
			 * var String
			 * 
			 * message: 
			 * var String
			 *
			 * countItem: function that has text that is stored in the varible items
			 * function 
			 *
			 */
			$scope.item = "";
			$scope.message = "";
			$scope.countItem = countItem;

			/**
			 * function that has text that is stored in the varible items
			 * @param String itemText [description]
			 * @return String         Message
			 */
			function countItem(itemText) {
				var itemArray = [];
				var count = 0;
				var regExp = /\w/;

				// regular expression identifies the field contains at least one letter
				if (regExp.test(itemText)) { 
					itemArray = itemText.split(",");

					for (var i = 0; i<itemArray.length;i++) {
						// verify that this value is not blank or empty
						if (regExp.test(itemArray[i]) === true) {
							// high values that are not empty 	
							count++;
						}
					}

					// I apply the return message type
					if (count <= 3) { // Enjoy
						return $scope.message = "Enjoy!";
					}else if (count > 3) { // Too much!
						return $scope.message = "Too much!";
					}
				}else{ // Please enter data first
					return $scope.message = "Please enter data first";
				}
			}
		}
})();