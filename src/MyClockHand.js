/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClockHand(scene) {
	CGFobject.call(this,scene);
	//this.hand = new MyUnitCubeQuad(this.scene);
	this.hand = new MyUnitCubeQuad(this.scene);
	this.materialHand = new CGFappearance(this.scene);
	this.materialHand.setAmbient(.5,.5,.5,1);
	this.materialHand.setDiffuse(.5,.5,.5,1);	
	this.materialHand.setSpecular(1,1,1,1);
	this.materialHand.setShininess(500);
	this.angle = 0;
};
MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.display = function() {
	this.scene.pushMatrix();
		//this.scene.scale(1,.25,.25);
		
		//this.scene.translate(.5,0,0);
		this.scene.rotate(-this.angle, 0,0,1);
		this.scene.translate(0,.5,0);
		this.scene.scale(.01,1,.01);
		this.materialHand.apply();
		this.hand.display();
	this.scene.popMatrix();
};
MyClockHand.prototype.setAngle = function(angle) {
	this.angle = angle* Math.PI/180;
}