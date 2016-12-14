describe('Home', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have <pw-home>', function () {
    var home = element(by.css('pw-app pw-home'));
    expect(home.isPresent()).toEqual(true);
    expect(home.getText()).toEqual("Home Works!");
  });

});
