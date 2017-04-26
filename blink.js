// GPIO Access and Interupt Detection Library
var onoff = require('onoff'); 

var 	Gpio = onoff.Gpio,
  	led = new Gpio(4, 'out'), // Set Pin#4 to be output pin
  	interval;

// This will be called every 1 second
interval = setInterval(function () { 
  // Synchronously read the value of Pin#4 and transform 1->0 or 0->1
  var value = (led.readSync() + 1) % 2;
  
  // Aysnchronously write the new value to Pin#4
  led.write(value, function() { //#E
    switch (value) {
	case 0:
		console.log("Changed LED state to OFF ("+ value +")");
		break;
	case 1: 
		console.log("Changed LED state to ON ("+ value + ")");
		break;
	default:
		console.log("default");
		break;
	}
  });
}, 1000);

// Listen for exit CTRL-C
process.on('SIGINT', function () {
  clearInterval(interval)
  led.writeSync(0); // Close GPIO pin before exiting
  led.unexport(); 
  console.log('Bye, bye!');
  process.exit();
});
