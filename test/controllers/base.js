describe('Controller: BaseCtrl', function () {

	console.log("====start BaseCtrl====");
  // load the controller's module
  beforeEach(module('angularApp'));
  
  var scope,baseCtrl;
  
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    baseCtrl = $controller('BaseCtrl', {
      $scope: scope
    });
  }));
  
  it('notes has 3 items', function () {
    expect(scope.items.length).toEqual(3);
  });
});