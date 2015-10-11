/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClock(scene) {
	CGFobject.call(this,scene);
	this.sides = new MyCilinder(this.scene, 12,3, false, false, true);
	this.top = new MyCircle(this.scene, 12);
	this.seconds = new MyClockHand(this.scene);
	this.minutes = new MyClockHand(this.scene);
	this.hours = new MyClockHand(this.scene);
	this.materialTop = new CGFappearance(this.scene);
	this.time = 0;
	//this.seconds.setAngle(270);
	//this.minutes.setAngle(180);
	//this.hours.setAngle(90);
	
	this.materialTop.setAmbient(.5,.5,.5,1);
	this.materialTop.setDiffuse(1,1,1,1);	
	this.materialTop.setSpecular(1,1,1,1);
	this.materialTop.setShininess(500);
	this.materialTop.loadTexture("../resources/images/clock.png");
	
	this.materialSide = new CGFappearance(this.scene);
	this.materialSide.setAmbient(.5,.5,.5,1);
	this.materialSide.setDiffuse(.5,.5,.5,1);	
	this.materialSide.setSpecular(1,1,1,1);
	this.materialSide.setShininess(500);
};
MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor=MyClock;

MyClock.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.scale(.5,.5,.25);
		this.scene.translate(0,0,1);
		this.materialTop.apply();
		this.top.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.scale(.5,.5,.25);
		this.materialSide.apply();
		this.sides.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		
		this.scene.translate(0,0,.25);
		this.scene.rotate(-this.seconds.angle, 0,0,1);
		this.scene.scale(.75,.45,.75);
		this.scene.rotate(this.seconds.angle, 0,0,1);
		this.seconds.display();

	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0,0,.25);
		this.scene.rotate(-this.minutes.angle, 0,0,1);
		this.scene.scale(1,.35,1);
		this.scene.rotate(this.minutes.angle, 0,0,1);
		this.minutes.display();

	this.scene.popMatrix();

	this.scene.pushMatrix();

		this.scene.translate(0,0,.25);
		this.scene.rotate(-this.hours.angle, 0,0,1);
		this.scene.scale(1.25,.25,1.25);
		this.scene.rotate(this.hours.angle, 0,0,1);
		this.hours.display();

	this.scene.popMatrix();
};
/*MyClock.prototype.update = function(time) {
	//console.log(time);
	var hours = Math.floor(time / (1000*60*60));
	time -= hours;
	var minutes = Math.floor(time / (1000*60));
	time-=minutes;
	var seconds = Math.floor(time/(1000));
	//this.seconds.setAngle(time*360/1000);
	//this.minutes.setAngle(time*360/(1000*60));
	//this.hours.setAngle(time*360/(1000*60*60));
	this.seconds.setAngle(seconds*360 / 60);
	this.minutes.setAngle(minutes*360 / 60);
	this.hours.setAngle(hours*360 / 12);
	//this.seconds.setAngle((this.seconds.angle + time*2*Math.PI/1000)*180/Math.PI);
};*/
/*MyClock.prototype.update = function(currTime) {

 var newSeconds = (Math.floor((currTime/1000)%60) *360) /60;
 var newMinutes = (Math.floor((currTime/(1000*60))%60) *360)/ 60;
 var newHours =  (Math.floor((currTime/(1000*60*60))%12)*360)/60; 

  this.seconds.setAngle(newSeconds);

  this.minutes.setAngle(newMinutes);

  this.hours.setAngle(newHours);
   
};*/
MyClock.prototype.update = function(currTime) {
 	if(this.time = 0){
 		var newSeconds = (Math.floor((currTime/1000)%60)*360)/60;
 		var newMinutes = (Math.floor((currTime/(1000*60))%60)*360)/60;
 		var newHours = ((currTime/(1000*60*60)%12+1)*360)/12; 

  		this.seconds.setAngle(newSeconds);
  		this.minutes.setAngle(newMinutes);
 		this.hours.setAngle(newHours);
 		this.time = currTime;
	 }else{
	
	var deltime = currTime - this.time;
	var addSeconds = (Math.floor((deltime/1000)%60)*360)/60;
 	var addMinutes = (Math.floor((deltime/(1000*60))%60)*360)/60;
 	var addHours = ((deltime/(1000*60*60)%12+1)*360)/12;
 	this.seconds.setAngle(this.seconds.angle + addSeconds);
  	this.minutes.setAngle(this.minutes.angle + addMinutes);
 	this.hours.setAngle(this.hours.angle + addHours);
	}
};