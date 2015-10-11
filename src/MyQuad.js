
/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyQuad(scene, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);
	minS = typeof minS !== 'undefined' ? minS : 0.0;
	maxS = typeof maxS !== 'undefined' ? maxS : 1.0;
	minT = typeof minT !== 'undefined' ? minT : 0.0;
	maxT = typeof maxT !== 'undefined' ? maxT : 1.0;
	
	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;
	this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor=MyQuad;

MyQuad.prototype.initBuffers = function () {
	
	this.vertices = [
		.5,.5,0,
		.5,-.5,0,
		-.5,.5,0,
		-.5,-.5,0,
	];

	this.indices = [
		0,2,3,
		3,1,0,
	];
	this.normals = [
		0,0,1,
		0,0,1,
		0,0,1,
		0,0,1,
	];
	this.texCoords = [
		this.maxS,this.minT,
		this.maxS,this.maxT,
		this.minS,this.minT,
		this.minS,this.maxT
	];
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
