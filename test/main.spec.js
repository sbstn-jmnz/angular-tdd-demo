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

  describe("Proper filter",function(){
    beforeEach(function(){
      module("AddressBook");
      inject(function($injector){
        proper = $injector.get("$filter")("proper");
      });
    });
    it('Proper case a string', function(){
      expect(proper("ned stark")).to.equal("Ned Stark");
      expect(proper("cesrsei lamiester")).to.equal("Cesrsei Lamiester");
    });
    it( 'Turns a number into a string', function(){
      expect(proper(42)).to.equal('42');
    });
    it('Throws ab error on an incompatuble type', function(){
      assert.throws(function(){
        proper(undefined);
      });
    });
  });

  describe("Avatar", function(){
    beforeEach(function(){
      module("AddressBook");
    });

    it('Displays the capitalized first letter of a name', function(){
      inject(function($rootScope, $compile){
        $rootScope.contact = {name:'jhon arryn'};
        var element = $compile('<avatar name=contact.name/>')($rootScope);
        $rootScope.$digest();
        var dirText = element.text();
        expect(dirText).to.equal("J");
      });
    });
  });

});
