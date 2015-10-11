/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'doSomething');	

	// add a group of controls (and open/expand by defult)
	
	//var group=this.gui.addFolder("Options");
	//group.open();

	var group2 = this.gui.addFolder("Options");

	group2.add(this.scene, 'Light1');
	group2.add(this.scene, 'Light2');
	group2.add(this.scene, 'Light3');
	group2.add(this.scene, 'Light4');

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	//group.add(this.scene, 'option1');
	//group.add(this.scene, 'option2');
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	//this.gui.add(this.scene, 'speed', -5, 5);
	
	this.gui.add(this.scene, 'currRobotAppearance', { Texture0: 0, Texture1: 1, Texture2: 2, Texture3: 3, Texture4: 4} );
	

	this.gui.add(this.scene, 'alpha');
	return true;
};
MyInterface.prototype.setRobotAppearance = function(text) {
	this.scene.setRobotAppearance(text);
};
/**
 * processKeyboard
 * @param event {Event}
 */

MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case('w'.charCodeAt()):
			//this.scene.robot.moveForward(.1);
			this.scene.robot.pushForward(.05);
			break;
		case('a'.charCodeAt()):
			this.scene.robot.pushLeft(-.025);
			break;
		case('d'.charCodeAt()):
			this.scene.robot.pushRight(-.025);
			break;
		case('s'.charCodeAt()):
			this.scene.robot.pushBackward(.05);
			break;
		case('h'.charCodeAt()):
			console.log('h pressed');
			this.scene.robot.setWaving();
			break;
	};


};