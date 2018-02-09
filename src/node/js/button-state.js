const fs = require('fs');

const jsonFilePath = "./src/node/txt/switch-state.json";

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
	setButton: setButton
}