/**
 *  Backend part of the DEFCON system; sets up GPIO pins with LED and button inputs
 *  Checks the current status of the verb MYSQL database and lights that LED
 *  When you click a button, this file runs a PHP script to update said database and lights the corresponding LED
 *  Uses *BCM* pin identifiers as defined below. 
 *  @memberof nodeButtons
 *  @version 1.0.0
**/

var Gpio = require('onoff').Gpio;
var mysql = require('mysql'); 
const exec = require('child_process').exec;

console.log("Script is running...")

var redLED = new Gpio(17, 'out'),
yellowLED = new Gpio(27, 'out'),
greenLED = new Gpio(22, 'out');

var leds = [redLED, yellowLED, greenLED];

var redButton = new Gpio(21, 'in', 'both'),
yellowButton = new Gpio(16, 'in', 'both'),
greenButton = new Gpio(20, 'in', 'both');

var con = mysql.createConnection({
    host: "localhost",
    user: "tom",
    password: "reverse",
    database: "verb"
});

console.log("Beggning connection to DB...")

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT statusCode FROM status ORDER BY id DESC LIMIT 1", function (err, result, fields) {
      if (err) throw err;
      console.log("SQL completed successfully")
      var string=JSON.stringify(result);
      var json =  JSON.parse(string);
      currentStatus = json[0].statusCode;
      if (currentStatus == "G") {
          console.log("Current status is GREEN")
          greenLED.writeSync(1);
      }else if (currentStatus == "Y") {
          console.log("Current status is YELLOW")
          yellowLED.writeSync(1);
      }else if (currentStatus == "R"){
          console.log("Current status is RED")
          redLED.writeSync(1);
      }
    });
});

redButton.watch(function (err, value) { 
    if (err) { 
        console.error('There was an error', err); 
        return;
    }
    leds.forEach(function(currentValue) { 
        currentValue.writeSync(0); 
    });
    redLED.writeSync(value);
    const redTrigger = exec('php /home/tom/projects/verbStatusPage/defcon.php r');
    redTrigger.stdout.on('data', function(data){
        console.log("RED: ", data);
        // sendBackInfo();
    });
});

yellowButton.watch(function (err, value) { 
    if (err) { 
        console.error('There was an error', err); 
        return;
    }
    leds.forEach(function(currentValue) { 
        currentValue.writeSync(0); 
    });
    yellowLED.writeSync(value);
    const yellowTrigger = exec('php /home/tom/projects/verbStatusPage/defcon.php y');
    yellowTrigger.stdout.on('data', function(data){
        console.log("YELLOW: ",data);
        // sendBackInfo();
    });
    
});

greenButton.watch(function (err, value) { 
    if (err) { 
        console.error('There was an error', err); 
        return;
    }
    leds.forEach(function(currentValue) { 
        currentValue.writeSync(0); 
    });
    greenLED.writeSync(value);
    const greenTrigger = exec('php /home/tom/projects/verbStatusPage/defcon.php g');
    greenTrigger.stdout.on('data', function(data){
        console.log("GREEN: ",data);
        // sendBackInfo();
    });
});

function unexportOnClose() { 
    leds.forEach(function(currentValue) { 
      currentValue.writeSync(0);
      currentValue.unexport(); 
    });
};
  
process.on('SIGINT', unexportOnClose);