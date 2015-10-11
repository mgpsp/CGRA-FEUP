function MyRobotArm(scene, direction, material) {
 	CGFobject.call(this,scene);
	this.body = new MyCilinder(scene, 24,3, false, false, true);
	this.bottom = new MyLamp(scene,24,24,false,true);
	this.top = new MyLamp(scene,24,24,false,true);
	this.angle1 = 0;
	this.angle2 = 0;

	this.nextAngle1 = 0;
	this.nextAngle2 = 0;
	
	this.material = material;
	/*
	this.materialDefault = new CGFappearance(this.scene);
	this.materialDefault.setAmbient(.5,.5,.5,1);
	this.materialDefault.setDiffuse(1,1,1,1);	
	this.materialDefault.setSpecular(1,1,1,1);
	this.materialDefault.setShininess(500);
	*/this.waving = false;
	this.direction = direction;
	this.state = 0;
	this.wavecount = 0;
	this.wavedirection = true;

 };

 MyRobotArm.prototype = Object.create(CGFobject.prototype);
 MyRobotArm.prototype.constructor = MyRobotArm;

 MyRobotArm.prototype.display = function() {
	this.scene.pushMatrix();
		//this.scene.translate(0,lift,0);
		this.applyangles();
		this.scene.scale(.125, .5,.125);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.material.apply();
		this.body.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.applyangles();
		this.scene.translate(0,-.5,0);
		this.scene.scale(.125,.125,.125);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.material.apply();
		this.bottom.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.applyangles();
		this.scene.translate(0,0,0);
		this.scene.scale(.125,.125,.125);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.material.apply();
		this.top.display();
	this.scene.popMatrix();
 }

 MyRobotArm.prototype.applyangles = function() {
 	this.scene.rotate(-this.angle1, 1,0,0);
 	this.scene.rotate(-this.angle2, 0,0,1);
 }

 MyRobotArm.prototype.updateNextAngles = function(dist){
	if(!this.waving){
		var moving = dist;
		if(this.direction)
			moving = -moving;
		this.nextAngle1 = moving;
		this.nextAngle2 = 0;
		if((this.angle1 > Math.PI/4 && !this.direction) || (this.angle1 < -Math.PI/4 && this.direction))
			this.direction = !this.direction;
	}
	else{
		this.nextAngle1 = 0;
		this.nextAngle2 = 0;
	}
 }

MyRobotArm.prototype.update = function(time){
	if(this.waving){
		if(this.state == 0){
			if(Math.abs(this.angle1) < 0.00001){
				this.state = 1;
				return;
			}
			this.angle1 -= this.angle1/60*time;
		}
		else if(this.state == 1){
			if(this.angle1 > Math.PI){

				this.state = 2;
				return;
			}
			this.angle1 += Math.PI/500*time;
		}
		else if(this.state == 2){
			if(this.wavecount>= 3){
				this.state = 3;
				return;
			}
			if(this.angle2 < 0 && !this.wavedirection)
				this.wavecount++;

			if((this.angle2 > Math.PI/4 && this.wavedirection) || (this.angle2 < 0 && !this.wavedirection))
				this.wavedirection = !this.wavedirection;

			var anglemove = Math.PI/4/500*time;
			if(!this.wavedirection)
				anglemove=-anglemove;
			
			this.angle2 += anglemove;
		}
		else if(this.state == 3){
			if(Math.abs(this.angle1) < 0.01){
				this.state = 0;
				this.waving = false;
				this.wavecount = 0;
				return;
			}
			this.angle1 -= this.angle1/500*time;
		}
	}
	this.angle1+=this.nextAngle1;
	this.angle2+=this.nextAngle2;
 }

 MyRobotArm.prototype.setMaterial = function(material) {
	this.material = material;
 }