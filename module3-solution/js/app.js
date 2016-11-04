(function(){
	'use strict';

	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
		.service('MenuSearchService', MenuSearchService)
		.directive('foundItems', FoundItems);

		
		/**
		 * foundItems Directive function
		 * @return {html} display component html
		 */
		function FoundItems() {
			var ddo = {
				templateUrl: 'directive/foundItems.html',
				// template: '<ol><li ng-repeat="item in dirCtrl.found">{{item.short_name}}, {{item.description}} <button type="button" class="btn btn-md-primary" ng-click=""></button></li></ol>',
				scope: {
					found: '<',
					onRemove: '&'
				},
				controller: foundItemsDirectiveController,
				controllerAs: 'dirCtrl',
				bindToController: true
			};

			return ddo;
		}
		/**
		 * foundItemsDirectiveController controller directive
		 */
		function foundItemsDirectiveController() {
			var dirCtrl = this;


		}

		NarrowItDownController.$inject = ['MenuSearchService'];

		function NarrowItDownController(MenuSearchService) {
			var ctrl = this;

			ctrl.searchTerm = searchTerm;
			ctrl.removeItem = removeItem;
			ctrl.msgError = "";
			ctrl.found = [];

			function searchTerm(term) {
				MenuSearchService.getMatchedMenuItems(term).then(
			      function(response){
			          ctrl.found = response;
			          ctrl.msgError = "";
			      },
			      function(error){
			          ctrl.found = [];
			          ctrl.msgError = error;
			      });

			}

			function removeItem(index) {
				console.log(index);
			    ctrl.found.splice(index, 1);
			};
		}



		/**
		 * MenuSearchService Service and inject $http get callback for items
		 */
		MenuSearchService.$inject = ['$http', '$q'];

		function MenuSearchService($http, $q) {
			var service = this;
			

			service.getMatchedMenuItems = function(searchTerm) {
				var regExp = /\w/;
				if(!regExp.test(searchTerm)){
			      	return $q.reject('Empty text');
			    }
				return $http({
						method: 'GET',
						url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
					}).then(function(result) {
											
						var foundItems = [];
						angular.forEach(result.data.menu_items, function(item, index){
							if (item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
								foundItems.push(result.data.menu_items.splice(index,1)[0]);
							}
						});

						if (foundItems.length > 0) {
							return foundItems;
						}else {
							return $q.reject('Not Results!');
						}
					});
			}
		}
})();
