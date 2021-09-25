(function (module) {
  // module
  module.controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .constant("ApiPath","https://davids-restaurant.herokuapp.com/menu_items.json")
  
  // angularでのconstantの意味
  // 共通管理用の値をここで保持しサービスとして切り出す
  
  // injection
  NarrowItDownController.$inject = ["MenuSearchService"];

  // NarrowItDownController (with controller as syntax) that will wrap your search textbox and button as well as the list of found items.
  function NarrowItDownController(MenuSearchService) { 
    let narrowCtrl = this;

    let promise = MenuSearchService.getMenus();

    console.log(promise);
  }

  // injection
  MenuSearchService.$inject = ["$http","ApiPath"];
  // That method will be responsible for reaching out to the server (using the $http service) to retrieve the list of all the menu items.
  function MenuSearchService($http,ApiPath) { 
    let service = this;

    // get jsondata
    service.getMenus = function () { 
      // httpメソッドを使って外部のJSONデータを取得
      let response = $http({
        method: "GET",
        url: (ApiPath)
      });
      // レスポンス情報を返す
      return response;
    }

  }



})(angular.module("NarrowItDownApp", []));