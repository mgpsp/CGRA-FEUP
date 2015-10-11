
function MyWindow(scene, nrDivs, minS, maxS, minT, maxT, xi, yi, width,height, centered) {
	CGFobject.call(this,scene);

	// nrDivs = 1 if not provided
	nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
	minS = typeof minS !== 'undefined' ? minS : 0.0;
	maxS = typeof maxS !== 'undefined' ? maxS : 1.0;
	minT = typeof minT !== 'undefined' ? minT : 0.0;
	maxT = typeof maxT !== 'undefined' ? maxT : 1.0;
	centered = typeof maxT !== 'undefined' ? centered : false;

	this.nrDivs = nrDivs;
	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;
	this.patchLength = 1.0 / nrDivs;
	this.xi = xi;
	this.yi = yi;
	this.width = width;
	this.height = height;
	var ds = this.maxS - this.minS;
	var dt = this.maxT -this.minT;
	console.log(this.minS+this.xi*ds + "= " + this.minS + "+" + this.xi + "*" + ds);
	this.left = new Plane(this.scene, this.nrDivs, this.minS,this.minS+this.xi*ds,
													this.minT, this.maxT);

	this.top = new Plane(this.scene, this.nrDivs, this.minS+this.xi*ds,this.minS+(this.xi+this.width)*ds,
													this.minT, this.minT + this.yi*dt);

	this.right = new Plane(this.scene, this.nrDivs, this.minS+(this.xi+this.width)*ds,this.maxS,
													this.minT, this.maxT);
	//this.right = new Plane(this.scene, this.nrDivs,0,1,0,1);
	this.bottom = new Plane(this.scene, this.nrDivs,  this.minS+this.xi*ds,this.minS+(this.xi+this.width)*ds,
													this.minT + (this.yi + this.height)*dt, this.maxT);
};

MyWindow.prototype = Object.create(CGFobject.prototype);
MyWindow.prototype.constructor = MyWindow;

MyWindow.prototype.display = function() {

	this.scene.pushMatrix();
	this.scene.translate(-.5,-.5,0);

	this.scene.pushMatrix();
		this.scene.scale(this.xi, 1, 1);
		this.scene.translate(.5,.5,0);
		this.left.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(this.xi, 1- this.yi,0);
		this.scene.scale(this.width, this.yi,1);
		this.scene.translate(.5,.5,0);
		this.top.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(this.xi + this.width, 0,0);
		this.scene.scale(1-this.xi-this.width,1, 1);
		this.scene.translate(.5,.5,0);
		this.right.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(this.xi,0,0);
		this.scene.scale(this.width, 1-this.yi-this.height,1);
		this.scene.translate(.5,.5,0);
		this.bottom.display();
	this.scene.popMatrix();

	this.scene.popMatrix();
}
