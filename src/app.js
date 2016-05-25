/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');

var Light = require('ui/light');

var refreshIntervalId = 0;
var countDown = function(i, uiCard, callback) {
  Light.on();
  
  // Must have this here otherwise it waits 1 second to update the Ui
  // because it immediately enters the setInterval
  uiCard.text(i);
  i--;
  
  refreshIntervalId = setInterval(function() {
      if (i >= 0) {
        uiCard.text(i);
        i--;
      } else {
        // clearInterval is working but is giving a warning in cloudPebble
        clearInterval(refreshIntervalId);
        Light.auto();
        console.log('Calling callback');
        callback();
      }
  }, 1000);
};

var testCircle = function(callback) {
  console.log('Entering testCircle');
  
  var secs = 15;
  
  var wind = new UI.Window({
    backgroundColor: 'black',
    fullscreen: false
  });
  var radial = new UI.Radial({
    size: new Vector2(80, 80),
    angle: 0,
    angle2: 360,
    radius: 10,
    backgroundColor: 'orange',
    borderColor: 'orange',
    borderWidth: 1,
  });
  var textfield = new UI.Text({
    size: new Vector2(80, 40),
    font: 'gothic-24-bold',
    text: secs,
    textAlign: 'center'
  });
  var windSize = wind.size();
  // Center the radial in the window
  var radialPos = radial.position()
      .addSelf(windSize)
      .subSelf(radial.size())
      .multiplyScalar(0.5);
  radial.position(radialPos);
  // Center the textfield in the window
  var textfieldPos = textfield.position()
      .addSelf(windSize)
      .subSelf(textfield.size())
      .multiplyScalar(0.5);
  textfield.position(textfieldPos);
  wind.add(radial);
  countDown(secs, textfield, callback);
  wind.add(textfield);
  wind.show();
  console.log('Exiting testCircle');
};

var newCircle = function() {
  console.log('Entering newCircle');
  
  var secs = 15;
  
  var wind = new UI.Window({
    backgroundColor: 'black',
    fullscreen: false
  });
  var radial = new UI.Radial({
    size: new Vector2(80, 80),
    angle: 0,
    angle2: 360,
    radius: 10,
    backgroundColor: 'blue',
    borderColor: 'blue',
    borderWidth: 1,
  });
  var textfield = new UI.Text({
    size: new Vector2(80, 40),
    font: 'gothic-24-bold',
    text: secs,
    textAlign: 'center'
  });
  var windSize = wind.size();
  // Center the radial in the window
  var radialPos = radial.position()
      .addSelf(windSize)
      .subSelf(radial.size())
      .multiplyScalar(0.5);
  radial.position(radialPos);
  // Center the textfield in the window
  var textfieldPos = textfield.position()
      .addSelf(windSize)
      .subSelf(textfield.size())
      .multiplyScalar(0.5);
  textfield.position(textfieldPos);
  wind.add(radial);
  countDown(secs, textfield);
  wind.add(textfield);
  wind.show();
  console.log('Exiting newCircle');
};

var standardPour = function(callback) {
  testCircle(callback);
};

var standardStandard = function() {
  standardPour(newCircle);
};

var testTwo = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hack The World!',
  body: 'Press any button.',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

var mainMenu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Standard',
        subtitle: 'Standard'
      }, {
        title: 'Two Cup',
        subtitle: 'The Wren'
      }]
    }]
});
  
mainMenu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '-' + e.item.subtitle + '"');
    if (e.itemIndex === 0) {
      standardStandard();
    } else if (e.itemIndex === 1) {
      
    }
});
mainMenu.show();

var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

mainMenu.show();

mainMenu.on('click', 'select', function(e) {
  //countDown(5, test);
  //testFunc();
  testCircle();
});

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }, {
        title: 'Third Item',
      }, {
        title: 'Fourth Item',
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    backgroundColor: 'black'
  });
  var radial = new UI.Radial({
    size: new Vector2(140, 140),
    angle: 0,
    angle2: 300,
    radius: 20,
    backgroundColor: 'cyan',
    borderColor: 'celeste',
    borderWidth: 1,
  });
  var textfield = new UI.Text({
    size: new Vector2(140, 60),
    font: 'gothic-24-bold',
    text: 'Dynamic\nWindow',
    textAlign: 'center'
  });
  var windSize = wind.size();
  // Center the radial in the window
  var radialPos = radial.position()
      .addSelf(windSize)
      .subSelf(radial.size())
      .multiplyScalar(0.5);
  radial.position(radialPos);
  // Center the textfield in the window
  var textfieldPos = textfield.position()
      .addSelf(windSize)
      .subSelf(textfield.size())
      .multiplyScalar(0.5);
  textfield.position(textfieldPos);
  wind.add(radial);
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
