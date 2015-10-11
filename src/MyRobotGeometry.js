function MyRobotGeometry(scene, material) {
 	CGFobject.call(this,scene);
	//this.initBuffers();
	this.body = new MyCilinder(scene, 24,3, false, false, true);
	this.bottom = new MyCircle(scene,24);
	this.head = new MyLamp(scene, 24, 24, false, true);
	this.leftwheel = new MyWheel(scene, material);
	this.rightwheel = new MyWheel(scene, material);
	this.leftarm = new MyRobotArm(scene, true, material);
	this.rightarm = new MyRobotArm(scene, false, material);

	this.leftwheel.setMaterial(this.material);
	this.rightwheel.setMaterial(this.material);
	this.leftarm.setMaterial(this.material);
	this.rightarm.setMaterial(this.material);
	
	this.eyecil = new MyCilinder(scene, 24, 3, false, false, true);
	this.eyetop = new MyCircle(scene, 24);

	this.turnRadius = .625+.25;
	this.wheelRadius = .25;
	this.material = material;

	this.materialB = new CGFappearance(scene);
	this.materialB.setAmbient(1,1,1,1);
	this.materialB.setDiffuse(1,1,1,1);
	this.materialB.setSpecular(1,1,1,1);	
	this.materialB.setShininess(120);
	this.materialB.loadTexture("../resources/images/robotlight.png");
 };

 MyRobotGeometry.prototype = Object.create(CGFobject.prototype);
 MyRobotGeometry.prototype.constructor = MyRobotGeometry;

 MyRobotGeometry.prototype.initBuffers = function() {
	this.vertices = [
		0.5, 0.3, 0, 
		-0.5, 0.3, 0,
		0, 0.3, 2,
	];        
	this.indices = [
		0,1,2,
	];     
	this.normals = [
		0,1,0,
		0,1,0,
		0,1,0,
	];
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 MyRobotGeometry.prototype.display = function() {

 	this.leftwheel.setMaterial(this.material);
	this.rightwheel.setMaterial(this.material);
	this.leftarm.setMaterial(this.material);
	this.rightarm.setMaterial(this.material);

 	var height = 1;
 	var lift= .25;
	
	this.scene.pushMatrix();
		this.scene.translate(0,lift,0);
		this.scene.scale(.5,height,.5);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.material.apply();
		this.body.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0,lift,0);
		this.scene.scale(.5,height,.5);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.material.apply();
		this.bottom.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0,lift + height,0);
		this.scene.scale(.5,.5,.5);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.material.apply();
		this.head.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.translate(0,lift,0);
		this.scene.scale(.5,.5,.5);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.material.apply();
		this.leftwheel.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.translate(0,lift,0);
		this.scene.scale(.5,.5,.5);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.material.apply();
		this.rightwheel.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		//this.scene.rotate(Math.PI/2,0,1,0);
		//this.scene.translate(0,lift,0);
		//this.scene.scale(.5,.5,.5);
		//this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.translate(-.625, height + .125, 0);
		this.material.apply();
		this.rightarm.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(.625, height + .125, 0);
		this.material.apply();
		this.leftarm.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(0, height + .45, .4);
		this.scene.scale(.1, .1,.1);
		this.material.apply();
		this.eyecil.display();
		this.scene.translate(0,0, 1);
		this.materialB.apply();
		this.eyetop.display();
	this.scene.popMatrix();


 }


 MyRobotGeometry.prototype.setMaterial = function(material) {
	this.material = material;
	this.leftwheel.setMaterial(this.material);
	this.rightwheel.setMaterial(this.material);
	this.leftarm.setMaterial(this.material);
	this.rightarm.setMaterial(this.material);
 }