/**
 * MyPaperPlane
 * @constructor
 */

 function MyPaperPlane(scene, x, y, z, a, b, c) {
 	CGFobject.call(this,scene);
	this.x = x;
	this.y = y;
	this.z = z;
	this.a = a;
	this.b = b;
	this.c = c;
	this.state = 0;
 	var back_bottom = [.1,0,0,];
	var tip = [1,.125,0,];
	var outer_wing = [0,.125,.3,];
	var inner_wing = [0.1,.125,.05,];
	this.wingleft = new MyTri(this.scene, outer_wing, inner_wing, tip);
	this.centerleft = new MyTri(this.scene, back_bottom, inner_wing, tip);
	this.time = 0;
 };

 MyPaperPlane.prototype = Object.create(CGFobject.prototype);
 MyPaperPlane.prototype.constructor = MyPaperPlane;

MyPaperPlane.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.translate(this.x, this.y,this.z);
		this.scene.rotate(this.a, 1,0,0);
		this.scene.rotate(this.b, 0,1,0);
		this.scene.rotate(this.c, 0,0,1);
		
		this.scene.pushMatrix();
			this.wingleft.display();
			this.centerleft.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.scale(1,1,-1);
			this.wingleft.display();
			this.centerleft.display();
		this.scene.popMatrix();
	this.scene.popMatrix();
};
MyPaperPlane.prototype.update = function(currTime) {
	if(this.time == 0){
		this.time = currTime;
		return;
	}else currTime -= this.time;
	
	if(currTime < 2500){
		this.state = 0;
	}else if(currTime < 5100)
	this.state = 1;
	else this.state = 2;

	if(this.state == 0 ){
		/*if(this.x < 1){
			this.state = 1;
			return;
		}*/
		//this.y += currTime * .00001;
		//this.x -= currTime * .0001;
		this.y = 3.65 + (5-3.65)/2500*currTime;
		this.x = 14 - (14-1)/2500*currTime;
	}
	else if(this.state == 1){
		//this.c-= currTime*.00001;
		//this.y-=currTime*.00001;
		//if(this.y < 0){
			//this.state = 2;
		//}
		this.x = 1;
		if(currTime < 5000)
		this.c = Math.PI - 3*Math.PI/2500*currTime;
		this.y = 5 - (5-.15)/2600*(currTime-2500);
	}
	else if(this.state == 2){
		this.c = Math.PI;
		this.y = .15;
	}
}