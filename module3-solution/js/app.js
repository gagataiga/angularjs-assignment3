(function (module) {
  // module
  module.controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .constant("ApiPath", "https://davids-restaurant.herokuapp.com")
    .directive("foundItems", foundItems);
  
  // angularでのconstantの意味
  // 共通管理用の値をここで保持しサービスとして切り出す
  
  // ddo
  function foundItems() { 

  }

  // injection
  NarrowItDownController.$inject = ["MenuSearchService"];

  // NarrowItDownController (with controller as syntax) that will wrap your search textbox and button as well as the list of found items.
  function NarrowItDownController(MenuSearchService) { 
    let menu = this;
    menu.searchItem = "";
    menu.search = function () {
      let promise = MenuSearchService.getMatchedMenuItems(menu.searchItem);
    } 

  }

  // injection
  MenuSearchService.$inject = ["$http","ApiPath"];
  // That method will be responsible for reaching out to the server (using the $http service) to retrieve the list of all the menu items.
  function MenuSearchService($http, ApiPath) {
    let service = this;

    // get jsondata
    service.getMatchedMenuItems = function (searchItem) {
      // httpメソッドを使って外部のJSONデータを取得
      let response = $http({
        method: "GET",
        url: (ApiPath + "/menu_items.json")
      });
      // レスポンス情報を返す
      return response.then(function sucuse(result) { 
        // 
        console.log(result.data.menu_items);
        let foundItems = [];
        let menuItems = result.data.menu_items;
        // レスポンスだめだったら空で返す
        if (!result || !result.data) { return foundItems}
        // search description
        for (let i = 0; i < menuItems.length; i++) { 
          console.log(menuItems[i]);
        }


        return foundItem;
      }).catch(function callBackError(error) { 
        return error;
      })
    }
  }

})(angular.module("NarrowItDownApp", []));