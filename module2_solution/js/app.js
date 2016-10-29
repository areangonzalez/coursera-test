(function (){
	'use strict';
	
	angular.module('ShoppingListCheckOff', [])
		.controller('ToBuyController', ToBuyController)
		.controller('AlreadyBoughtController', AlreadyBoughtController)
		.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

		ToBuyController.$inject = ['ShoppingListCheckOffService'];

		function ToBuyController(ShoppingListCheckOffService) {
			var toBuy = this;

			/**
			 * showList show list items to buy
			 * @type {array}

			 * buy fuction to buy item of itemsList
			 * @param  {integer} indexItem identificator number array
			 * @return {array}           list of items
			 */
			toBuy.showList = ShoppingListCheckOffService.getItemsList();
			toBuy.buy = buy;

			
			function buy(indexItem) {
				ShoppingListCheckOffService.buyItems(indexItem);
			}
		}

		AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

		function AlreadyBoughtController(ShoppingListCheckOffService) {
			var bought = this;
			/**
			 * showList list items bought
			 * @type {array}
			 */
			bought.showList = ShoppingListCheckOffService.getItemsBought();

		}

		function ShoppingListCheckOffService() {
			var service = this;

			/**
			 * itemsList list
			 * @type {Array}
			 */
			var itemsList = [
				{name: "cookies", quantity: 10},
				{name: "cookies", quantity: 10},
				{name: "cookies", quantity: 10},
				{name: "cookies", quantity: 10},
				{name: "cookies", quantity: 10}
			];

			/**
			 * itemsBought List
			 * @type {Array}
			 */
			var itemsBought = [];

			/**
			 * getItemsList get list itemsList
			 * @return {array} list items
			 */
			service.getItemsList = function(){
				return itemsList;
			};

			/**
			 * buyItems 
			 * @param  {integer} indexItem identification number array
			 * @return {array}            list items
			 */
			service.buyItems = function(indexItem) {
				// Splice function deletes the object itemsList and stores it in a variable
				var item = itemsList.splice(indexItem,1);
				// add the item stored in the list of itemsBought
				itemsBought.push(item);
				// return itemsList with an element less
				return itemsList;
			};

			/**
			 * getItemsBought get list itemsBought
			 * @return {array} return list itemsBought
			 */
			service.getItemsBought = function(){
				return itemsBought;
			};

		}
})();