/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
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
MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function() {
	
	this.scene.pushMatrix();
		this.scene.translate(2.5-.16,1.75,1.5-.16);
		this.scene.scale(.3,3.5,.3);
		this.materialLeg.apply();
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(2.5-.16,1.75,-1.5+.16);
		this.scene.scale(.3,3.5,.3);
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-2.5+.16,1.75,1.5-.16);
		this.scene.scale(.3,3.5,.3);
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-2.5+.16,1.75,-1.5+.16);
		this.scene.scale(.3,3.5,.3);
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0,3.5,0);
		this.scene.scale(5,.3,3);
		this.materialTop.apply();
		this.cube.display();
	this.scene.popMatrix();
};



