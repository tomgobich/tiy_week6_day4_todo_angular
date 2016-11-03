describe('my app', function() {
  beforeEach(module('app'));

  describe('user service', function() {
    var $httpBackend, userService;

    beforeEach(inject(function(_$httpBackend_, user) {
      userService = user;
      $httpBackend = _$httpBackend_;

      $httpBackend
        .whenPOST('/login')
        .respond({
          id: 13,
          name: 'Jordan'
        });
    }));

    it('should be able to log in a user', function(done) {
      var result = userService.login({ email: '...', password: '...' });
      result.should.be.a.object;
      result.then.should.be.a.function;

      result
        .then(function(user) {
          user.should.be.a.object;
          user.id.should.equal(13);
          done();
        })
        .catch(done);

      $httpBackend.flush();
    });

  });
});
