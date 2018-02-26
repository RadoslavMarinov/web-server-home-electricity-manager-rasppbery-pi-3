const fs = require('fs');
var gpio = require("rpi-gpio")

const gpioMap = {
	buttons: {
		button1: 7,		// Relay1 - pin7
		button2: 11,   // Relay1 - pin11
		button3: 13,		// Relay1 - pin13		
		button4: 15		// Relay1 - pin15  /* <https://elinux.org/RPi_Low-level_peripherals>  find: "Model A+, B+ and B2" */
	},
	buttonState: {
		on: true,
		off: false	
	}
}


const jsonFilePath = "./src/node/txt/switch-state.json";

/* Initializes the switches states according to the JSON file being read. */
gpioInit = function () {
		var file = fs.readFileSync(jsonFilePath, "utf8");
	   var fileObj = JSON.parse(file);
		for (button in fileObj) {	
		 		let gpioPin = gpioMap.buttons[button];
				let switchState = fileObj[button].switchState;		      // from the file {on, off}
				let pinState = gpioMap.buttonState[switchState]; 	// from the gpioMap to comply GPIO library: {true, false}}
				gpio.setup(gpioPin, gpio.DIR_OUT, ()=> {
					gpio.write(gpioPin, pinState);						
				}) 
	 	}
}

gpioInit();


/*
 * Updates switches upon client button state 
 * The argument is an object that is being received
 * upon post "home-status". The object has the form:
 * {"buttonX":{"switchState":"Y"}} where X = {1...4} and Y = {"on", "off"}
 */
 
function changeSwitchState(postObj) {
		var button = Object.keys(postObj)[0];		
		var gpioPin = gpioMap.buttons[button];
		 var switchState = postObj[button].switchState;
		 var pinState = gpioMap.buttonState[switchState];
		 console.log(gpioPin, pinState);
		gpio.write(gpioPin, pinState);
}
/*
 Returns undefined 
 Accepts:
  buttton:<string> {"button1".."button4"}
  name: <string>
  switchState:<string> {"on", "off"}
*/
function setButton(button, name, switchState) {
	var file = fs.readFileSync(jsonFilePath, "utf8");
	var fileObj = JSON.parse(file);
	//== name
	if( name !== undefined ) {
		fileObj[button].name = name;
	}
	//== switchState
	if( switchState !== undefined )  {
		console.log("switchState: " + switchState)
		if( (switchState !== "off") && (switchState !== "on") ) { // the switchState must be either "on" or "off"
			throw "**** ERROR invalid argument for 'switchState'****";
		}  
		fileObj[button].switchState = switchState;
	}
	fs.writeFile(jsonFilePath, JSON.stringify(fileObj, null, 4), ()=> console.log("File Written!"));
}

module.exports = {
	setButton : setButton,
	changeSwitchState : changeSwitchState
}