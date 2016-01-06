/**
* This is a Test for the Group status
**/
var port = 4444;

describe('status test', function() {
  var rally_name = 'testRally';
  describe('start a new rally', function() {
    it('start new riddle', function() {
      browser.get('http://localhost:'+port);
    });
    it('name', function() {
        element(by.model('data.groupName')).sendKeys(rally_name);
    });
    it('start', function() {
        element(by.id('Submit')).click();
    });
  });
  describe('status test', function() {
    it('test', function() {
      console.log('Start status test');
      browser.get('http://localhost:'+port+'/admin');
    });
    it('', function() {
      element(by.id('Status')).click();
    });
    it('', function() {
      browser.pause();
    });
  });
})
