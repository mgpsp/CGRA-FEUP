/**
 * MyChair
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyChair(scene) {
	CGFobject.call(this,scene);
	this.cube = new MyUnitCubeQuad(this.scene);
	this.materialTop = new CGFappearance(this.scene);
	this.materialTop.setAmbient(0.647,0.3216,0.1765,1);
	this.materialTop.setDiffuse(0.647,0.3216,0.1765,1);	
	this.materialTop.setSpecular(.05,.05,.05,1);
	this.materialTop.setShininess(50);
	this.materialTop.loadTexture("../resources/images/table.png");
	
	this.materialLeg = new CGFappearance(this.scene);
	this.materialLeg.setAmbient(.5,.5,.5,1);
	this.materialLeg.setDiffuse(.5,.5,.5,1);	
	this.materialLeg.setSpecular(1,1,1,1);
	this.materialLeg.setShininess(500);
};
MyChair.prototype = Object.create(CGFobject.prototype);
MyChair.prototype.constructor=MyChair;

MyChair.prototype.display = function() {
	this.scene.translate(0,-.25,0);
	this.scene.pushMatrix();
		this.scene.translate(1-.12,1.25,1-.12);
		this.scene.scale(.2,2,.2);
		this.materialLeg.apply();
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(1-.12,1.25,-1+.12);
		this.scene.scale(.2,2,.2);
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-1+.12,1.25,1-.12);
		this.scene.scale(.2,2,.2);
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-1+.12,1.25,-1+.12);
		this.scene.scale(.2,2,.2);
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0,2.25,0);
		this.scene.scale(2,.3,2);
		this.materialTop.apply();
		this.cube.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(0,3.75,1-.125);
		this.scene.scale(2,3,.25);
		this.materialTop.apply();
		this.cube.display();
	this.scene.popMatrix();
};



