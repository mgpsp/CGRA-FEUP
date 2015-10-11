function MyWheel(scene, material) {
 	CGFobject.call(this,scene);
	this.body = new MyCilinder(scene, 24,3, false, false, true);
	this.bottom = new MyCircle(scene,24);
	this.top = new MyCircle(scene,24);
	this.angle = 3;

	this.materialTop = new CGFappearance(this.scene);
	this.materialTop.setAmbient(.5,.5,.5,1);
	this.materialTop.setDiffuse(1,1,1,1);	
	this.materialTop.setSpecular(1,1,1,1);
	this.materialTop.setShininess(500);
	this.materialTop.loadTexture("../resources/images/wheel.png");

	this.materialSide = new CGFappearance(this.scene);
	this.materialSide.setAmbient(.5,.5,.5,1);
	this.materialSide.setDiffuse(1,1,1,1);	
	this.materialSide.setSpecular(1,1,1,1);
	this.materialSide.setShininess(500);
	this.materialSide.loadTexture("../resources/images/wheelside.png");
	
	this.material = material;
	/*this.materialDefault = new CGFappearance(this.scene);
	this.materialDefault.setAmbient(.5,.5,.5,1);
	this.materialDefault.setDiffuse(1,1,1,1);	
	this.materialDefault.setSpecular(1,1,1,1);
	this.materialDefault.setShininess(500);*/
 };

 MyWheel.prototype = Object.create(CGFobject.prototype);
 MyWheel.prototype.constructor = MyWheel;

 MyWheel.prototype.display = function() {
 	var height = .25;
 	var lift= 1;
	

	this.scene.pushMatrix();
		this.scene.rotate(this.angle, 0,1,0);
		this.scene.translate(0,lift,0);
		this.scene.scale(.5,height,.5);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.materialSide.apply();
		this.body.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(this.angle, 0,1,0);
		this.scene.translate(0,1,0);
		this.scene.scale(.5,height,.5);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.materialTop.apply();
		this.bottom.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(this.angle, 0,1,0);
		this.scene.translate(0,lift + height,0);
		this.scene.scale(.5,.5,.5);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.materialTop.apply();
		this.top.display();
	this.scene.popMatrix();
 }

 MyWheel.prototype.addAngle = function(add) {
 	this.angle += add;
 }

  MyWheel.prototype.setMaterial = function(material) {
	this.material = material;
 }