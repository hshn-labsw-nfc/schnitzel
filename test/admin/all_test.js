/**
  This is a Test to add, edit and delete a Location
**/
describe('Location Admin View', function() {
  var rows = 0;
  var new_rows = 0;
  var elements;
  var editText = 'Edited Text';
  var location_name = 'TestLocation'
  describe('Add Location', function() {
    it('Go to Locations', function() {
      console.log('Start Add Test');
      browser.get('http://localhost:1099/admin');
    });
    it('Go to Locations', function() {
      element(by.id('Orte')).click();
    });
    it('Count Rows', function() {
      elements = element.all(by.repeater('entry in data | filter:query'));
       elements.count().then(function(cRows){
          rows = cRows;
       });
    });
    it('Click Add Button', function() {
      elements = element(by.id('addButton'));
      elements.click();
    });
    it('insert Name', function() {
      element(by.model("data.name")).sendKeys(location_name);
    });
    it('Insert description', function() {
      element(by.model("data.description")).sendKeys("This is a automatet Test");
    });
    it('Set Checkbox = true', function() {
      element(by.model("data.isActive")).click();
    });
    it('Submit Form', function() {
      element(by.id("Submit")).click();
      console.log('End Add Test');
    });
    describe('Look if new Location is added', function() {
      it('go to Location List', function() {
      console.log('Start Test to Lookup new Location');
        browser.get('http://localhost:1099/admin/');
      });
      it('Click Location Button', function() {
        element(by.id('Orte')).click();
      });
      it('Count Rows', function() {
        elements = element.all(by.repeater('entry in data | filter:query'));
         elements.count().then(function(cRows){
            new_rows = cRows;
         });
      });
      it('test if table has more rows', function() {
         expect(new_rows).toEqual(rows+1);
         console.log('End Test to Lookup new Location');
      });
    });
  });
  describe('Edit a Location', function() {
    it('go to Location List', function() {
      console.log('Start Edit Test');
      browser.get('http://localhost:1099/admin/');
    });
    it('Click Location Button', function() {
      element(by.id('Orte')).click();
    });
    it('Click Edit Button', function() {
      element(by.id('btnEdit'+location_name)).click();
    });
    it('Edit description', function() {
      var elem = element(by.model('data.description'));
      elem.clear();
      elem.sendKeys(editText);
    });
    it('Submit Form', function() {
      element(by.id("Submit")).click();
    });
    it('Check last if Last Entry was Edited', function() {
      repeater = by.repeater('entry in data | filter:query');
      tasks = element.all( repeater );
      expect( tasks.count() ).not.toBe(0);
      expect(tasks.get(by.id(editText))).not.toBe(null);
      console.log('End Edit Test');
    });
  });
  describe('Delete Location', function() {
    it('go to Location List', function() {
      console.log('Start Delete Test');
      browser.get('http://localhost:1099/admin/');
    });
    it('Click Location Button', function() {
      element(by.id('Orte')).click();
      elements = element.all(by.repeater('entry in data | filter:query'));
      elements.count().then(function(cRows){
          rows = cRows;
      });
    });
    it('Click Delete Button', function() {
      element(by.id('btnDelete'+location_name)).click();
    });
    it('Click Modal OK Button', function() {
      element(by.className('btnModalDeleteOK')).click();
    });
    it('Count rows', function() {
      elements = element.all(by.repeater('entry in data | filter:query'));
      elements.count().then(function(cRows){
          new_rows = cRows;
      });
    });
    it('Check if rows match again', function() {
      expect(new_rows).toEqual(rows-1);
      console.log('End Delete Test');
    });
  });
});

/**
  This is a Test to add, edit and delete a Riddle
**/
describe('Riddle Admin View', function() {
  var rows = 0;
  var new_rows = 0;
  var riddle_name = 'TestRiddle';
  var riddle_edit_text = 'this is a edited automatet Test';
  var linked_location = 'a106'; //the location to be selected in the dropdown
  describe('Add Riddle', function() {
    it('Go to Riddle', function() {
      console.log('Start Add Test');
      browser.get('http://localhost:1099/admin');
    });
    it('press riddle button', function() {
      element(by.id('Rätsel')).click();
    });
    it('press add riddle button', function() {
      element(by.id('addButton')).click();
    });
    it('add name and description', function() {
      element(by.model('data.name')).sendKeys(riddle_name);
      element(by.model('data.description')).sendKeys('This is an automatet Riddle');
    });
    it('add answere and hint', function() {
      element(by.model('data.answer')).sendKeys('test');
      element(by.model('data.hint')).sendKeys('the answere is test');
    });
    it('select a location', function() {
      element(by.cssContainingText('option', linked_location)).click();
    });
    it('submit button click', function() {
      element(by.className('btn-success')).click();
      console.log('End Add Test');
    });
  });
  describe('Edit Riddle', function() {
    it('go to Riddle List', function() {
      console.log('Start Edit Test');
      browser.get('http://localhost:1099/admin/');
    });
    it('Click Riddle Button', function() {
      element(by.id('Rätsel')).click();
    });
    it('Click Edit Button', function() {
      element(by.id('btnEdit'+riddle_name)).click();
    });
    it('Edit description', function() {
      var elem = element(by.model('data.description'));
      elem.clear();
      elem.sendKeys(riddle_edit_text);
    });
    it('Submit Form', function() {
      element(by.className('btn-success')).click();
    });
    it('Check last if Last Entry was Edited', function() {
      repeater = by.repeater('entry in data | filter:query');
      tasks = element.all( repeater );
      expect( tasks.count() ).not.toBe(0);
      expect(tasks.get(by.id(riddle_edit_text))).not.toBe(null);
      console.log('End Edit Test');
    });
  });
  describe('Delete Riddle', function() {
      it('go to Riddle List', function() {
        console.log('Start Delete Test');
        browser.get('http://localhost:1099/admin/');
      });
      it('Click Riddle Button', function() {
        element(by.id('Rätsel')).click();
        elements = element.all(by.repeater('entry in data | filter:query'));
        elements.count().then(function(cRows){
            rows = cRows;
        });
      });
      it('Click Delete Button', function() {
        element(by.id('btnDelete'+riddle_name)).click();
      });
      it('Click Modal OK Button', function() {
        element(by.className('btnModalDeleteOK')).click();
      });
      it('Count rows', function() {
        elements = element.all(by.repeater('entry in data | filter:query'));
        elements.count().then(function(cRows){
            new_rows = cRows;
        });
      });
      it('Check if rows match again', function() {
        expect(new_rows).toEqual(rows-1);
        console.log('End Delete Test');
      });
  });
});

/**
  This is a Test to add, edit and delete a Tags
**/
describe('tag test', function() {
  var rows = 0;
  var new_rows = 0;
  var tag_id = 'testID';
  var linked_location = 'a106';
  var linked_edit_location = 'd713';
  var tag_edit_text = 'This is a automatet edited Test';
  describe ("Tag hinzufügen Oberflächen-Test", function(){
  		it ("Text in Tag", function(){
  			console.log('Start Add Test');
  			browser.get("http://localhost:1099/admin");
  			element(by.id("Tags")).click();
  		})
  		it ("Hinzufügen geklickt", function(){
  			element(by.id("addButton")).click();
  		})
  		it ("Texteingabe in TextID", function(){
  			element(by.model("data.tagID")).sendKeys(tag_id);
  		})
  		it ("Texteingabe Testbeispiel2", function(){
  	 		element(by.model("data.alias")).sendKeys("TestAlias");
  		})
  		//The following model is a dropdown-menu!
  		it ("spezifisches Testbeispiel3", function(){
  			//element(by.model('data.locationID')).$('[value="string:565f0837c83795cc2134dd92"]').click();
        element(by.cssContainingText('option', linked_location)).click();
  		})
  		//id="Subbed" changed in 'templates'->'modal'->'tagform.html
  		it ("spezifisches Testbeispiel1", function(){
  			element(by.className("btn-success")).click();
  		})
  });
  describe('Edit Tag Test', function() {
    it ("Text in Tag", function(){
      console.log('Start Add Test');
      browser.get("http://localhost:1099/admin");
      element(by.id("Tags")).click();
    })
    it ("Edit click on last row element", function(){
      elements = element.all(by.repeater('entry in data | filter:query'));
      elements.count().then(function(cRows){
          element(by.repeater('entry in data | filter:query').row(cRows-1)).element(by.className('btn-primary')).click();
      });
    })
    it ("edit alias", function(){
      element(by.model("data.alias")).sendKeys(tag_edit_text);
    })
    //The following model is a dropdown-menu!
    it ("spezifisches Testbeispiel3", function(){
      //element(by.model('data.locationID')).$('[value="string:565f0837c83795cc2134dd92"]').click();
      element(by.cssContainingText('option', linked_edit_location)).click();
    })
    //id="Subbed" changed in 'templates'->'modal'->'tagform.html
    it ("spezifisches Testbeispiel1", function(){
      element(by.className("btn-success")).click();
    })
  });
  describe('Tag delete Test', function() {
    it('go to Tag List', function() {
      console.log('Start Delete Test');
      browser.get('http://localhost:1099/admin/');
    });
    it('Click Riddle Button', function() {
      element(by.id('Tags')).click();
      elements = element.all(by.repeater('entry in data | filter:query'));
      elements.count().then(function(cRows){
          rows = cRows;
      });
    });
    it('Click Delete Button', function() {
      element(by.repeater('entry in data | filter:query').row(rows-1)).element(by.className('btn-danger')).click();
    });
    it('Click Modal OK Button', function() {
      element(by.className('btnModalDeleteOK')).click();
    });
    it('Count rows', function() {
      elements = element.all(by.repeater('entry in data | filter:query'));
      elements.count().then(function(cRows){
          new_rows = cRows;
      });
    });
    it('Check if rows match again', function() {
      expect(new_rows).toEqual(rows-1);
      console.log('End Delete Test');
    });
  });
});
