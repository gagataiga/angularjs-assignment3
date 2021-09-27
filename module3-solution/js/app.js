(function (module) {
  "use strict";
  // module
  module.controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .constant("ApiPath", "https://davids-restaurant.herokuapp.com")
    .directive("foundItems", FoundItems)
    .controller("FoundItemsListDirectiveController", FoundItemsListDirectiveController);
  //directive ("小文字から始まるdirective名(htmlで使用)",function())
  
  // angularでのconstantの意味
  // 共通管理用の値をここで保持しサービスとして切り出す
  
  // ddo
  function FoundItems() { 
    let ddo = {
      // template 先のhtml
      templateUrl: "foundItems.html",
      scope: {
        /**
         * = 双方バインド
         * @ 子scopeのみで使用できる値
         * & 関数指定(配列も指定可能)
         * < 
         * 
         */
        items: "<",
        onRemove: "&"
      },
      controller: "FoundItemsListDirectiveController",
      controllerAs: "list",
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsListDirectiveController() {
    let list = this;
    
   
  }

  // injection
  NarrowItDownController.$inject = ["MenuSearchService"];

  // NarrowItDownController (with controller as syntax) that will wrap your search textbox and button as well as the list of found items.
  function NarrowItDownController(MenuSearchService) { 
    let narrow = this;
    narrow.searchItem = "";

    narrow.search = function () {
      if (narrow.searchItem) {
        let promise = MenuSearchService.getMatchedMenuItems(narrow.searchItem);
        //なぜ配列で返ってこないのか
        // console.log("promis: ", promise);
        // なぜプロミスを使用するのか
        promise.then(function (response) {
          // narrow.found = jsonResultとなる
          narrow.found = response;
          console.log("success");
          console.log(narrow.found);
        }).catch(function (err) {
          console.log(err);
        });
      } else { 
        console.log("No search words");
        narrow.found = [];
      }
    } 

    // remove item specfic
    narrow.remove = function (index) { 
      console.log(index);
      narrow.found.splice(index, 1);
    }

  }

  // injection
  MenuSearchService.$inject = ["$http","ApiPath"];
  // That method will be responsible for reaching out to the server (using the $http service) to retrieve the list of all the menu items.
  function MenuSearchService($http, ApiPath) {
    let service = this;

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    };

    // get jsondata
    service.getMatchedMenuItems = function (searchItem) {
      if (!searchItem){return}
      // httpメソッドを使って外部のJSONデータを取得
      let response = $http({
        method: "GET",
        url: (ApiPath + "/menu_items.json")
      });
      // レスポンス情報を返す
      return response.then(function sucuse(result) { 
        let foundItems = [];
        let menuItems = result.data.menu_items;
        // レスポンスだめだったら空で返す
        if (!result || !result.data) { return foundItems }
        // search description
        for (let i = 0; i < menuItems.length; i++) { 
          // searching 
          if (menuItems[i].description.indexOf(searchItem) !== -1) { 
            foundItems.push(menuItems[i]);
          }
        }
        return foundItems;
      }).catch(function callBackError(error) { 
        console.log(error);
      })
    }
  }

})(angular.module("NarrowItDownApp", []));