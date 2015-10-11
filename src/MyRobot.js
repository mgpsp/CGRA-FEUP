/**
 * MyRobot
 * @constructor
 */

 function MyRobot(scene, x, y, z, a, b, c, material) {
 	CGFobject.call(this,scene);
	this.x = x;
	this.y = y;
	this.z = z;
	this.a = a;
	this.b = b;
	this.c = c;
	this.x1 = -0.0;
	this.y1 =-0.0;
	this.z1 =-0.0;
	this.speed = 0;
	this.angspeed = 0;

	this.geometry = new MyRobotGeometry(this.scene, material);
	this.time = 0;
	this.max_speed = .2;
	this.max_angspeed = 1;


 };

 MyRobot.prototype = Object.create(CGFobject.prototype);
 MyRobot.prototype.constructor = MyRobot;

MyRobot.prototype.display = function() {
	this.scene.pushMatrix();
		
		this.scene.translate(this.x, this.y,this.z);
		this.scene.rotate(this.a, 1,0,0);
		this.scene.rotate(this.b, 0,1,0);
		this.scene.rotate(this.c, 0,0,1);
		this.scene.scale(2,2,2);
		//this.scene.translate(this.x1, this.y1,this.z1);
		//this.scene.translate(0,0,-.5);
			this.geometry.display();
	this.scene.popMatrix();
};
MyRobot.prototype.update = function(currTime) {
	//this.z1 += .01;
	this.moveForward(this.speed);
	this.rotateRight(this.angspeed);
	this.speed *=.99;
	this.angspeed*=.925;
	if(this.time != 0){
	this.geometry.rightarm.update(currTime - this.time);
	this.geometry.leftarm.update(currTime - this.time);
	}
	this.time = currTime;
}

MyRobot.prototype.moveForward = function(amount) {
	//this.z1 += amount;
	
	var zvalue = amount * Math.cos(this.b);
	var xvalue = amount * Math.sin(this.b);
	
	var dist = Math.sqrt(zvalue * zvalue + xvalue* xvalue);
	if(amount > 0 )
	dist = -dist;

	this.geometry.leftwheel.addAngle(-dist/this.geometry.wheelRadius);
	this.geometry.rightwheel.addAngle(dist/this.geometry.wheelRadius);
	
	this.geometry.rightarm.updateNextAngles(Math.abs(dist));
	this.geometry.leftarm.updateNextAngles(Math.abs(dist));
	this.z+= zvalue;
	this.x+= xvalue;
}

MyRobot.prototype.pushForward = function(amount) {
	if(Math.abs(this.speed + amount) <= this.max_speed)
		this.speed+=amount;
	else if(this.speed > 0)
		this.speed = this.max_speed;
	else this.speed = -this.max_speed;
}

MyRobot.prototype.pushLeft = function(amount) {
	if(Math.abs(this.angspeed + amount) <= this.max_angspeed)
		this.angspeed+=amount;
	else if(this.angspeed > 0)
		this.angspeed = this.max_angspeed;
	else this.angspeed = -this.max_angspeed;
}
MyRobot.prototype.pushRight = function(amount) {
	this.pushLeft(-amount);
}

MyRobot.prototype.pushBackward = function(amount) {
	this.pushForward(-amount);
}

MyRobot.prototype.moveBackward = function(amount) {
	this.moveForward(-amount);
}

MyRobot.prototype.rotateLeft = function(amount) {
	
	this.b += amount;
}

MyRobot.prototype.rotateRight = function(amount) {

	var dist = amount / this.geometry.turnRadius;
	//if(amount > 0)
		//dist = -dist;

	this.geometry.leftwheel.addAngle(dist/this.geometry.wheelRadius);
	this.geometry.rightwheel.addAngle(dist/this.geometry.wheelRadius);
	this.rotateLeft(-amount);
}

MyRobot.prototype.setWaving = function() {
	this.geometry.rightarm.waving = true;
}

MyRobot.prototype.setMaterial = function(material) {
	this.geometry.setMaterial(material);
}