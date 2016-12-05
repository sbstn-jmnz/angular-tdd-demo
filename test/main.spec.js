var assert = chai.assert;
var expect = chai.expect;

describe("The Address Book App", function(){
  describe("The contact service", function(){
    beforeEach(function(){
      module('AddressBook');
      inject(function($injector) {
        contactService = $injector.get('contactService');
        $httpBackend = $injector.get('$httpBackend');
      });
    });

    it('have a property contacts, an array', function(){
      expect(contactService.contacts).to.be.an('array');
    });

    it('calls the backend', function(){
      $httpBackend.expectGET('http://localhost:9001/contacts')
      .respond(200,[]);
      $httpBackend.flush();
    });
  });

  describe("The Conact controller", function(){
    beforeEach(function(){
      module('AddressBook');
      inject(function($injector, $rootScope){
      $scope = $rootScope.$new();
      contactService = $injector.get('contactService');
      $httpBackend = $injector.get('$httpBackend');
      $controller = $injector.get('$controller');
      });
    });

    it("Has store an array of contact in scope", function(){
      $controller('ContactController', { $scope:$scope, contactService:contactService});
      assert.isArray($scope.contacts);
    });
  });

});
