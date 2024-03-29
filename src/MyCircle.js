
/**
 * MyCircle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyCircle(scene,slices, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);
	minS = typeof minS !== 'undefined' ? minS : 0.0;
	maxS = typeof maxS !== 'undefined' ? maxS : 1.0;
	minT = typeof minT !== 'undefined' ? minT : 0.0;
	maxT = typeof maxT !== 'undefined' ? maxT : 1.0;
	this.slices = slices;
	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;
	this.initBuffers();
};

MyCircle.prototype = Object.create(CGFobject.prototype);
MyCircle.prototype.constructor=MyCircle;

MyCircle.prototype.initBuffers = function () {
	
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
	
	var delta_rad = 2*Math.PI/this.slices;
	var r = 1;
	var height = 0;
	var index = 0;
	var highcenter = index++;
	this.vertices.push(
		0,
		0,
		height
	);
	this.normals.push(
		0,
		0,
		1
	);
	this.texCoords.push(
				.5,
				.5
		);
 
	storedindex = index;
	//top
	for(var j= 0; j < this.slices-1; j++){
		this.vertices.push(
			r * Math.cos((j)*delta_rad),
			r * Math.sin((j)*delta_rad),
			height
			);
		this.vertices.push(
			r * Math.cos((j+1)*delta_rad),
			r * Math.sin((j+1)*delta_rad),
			height
			);
		this.texCoords.push(
				.5 *  Math.cos((j)*delta_rad) +.5,
				.5 * Math.sin((j)*delta_rad)+.5
		);
		this.texCoords.push(
				.5 * Math.cos((j+1)*delta_rad) +.5,
				.5 * Math.sin((j+1)*delta_rad)+.5
		);
		this.indices.push(
		highcenter, index, index+1
		);
		for(var rep = 0; rep < 2 ; rep++){
			this.normals.push(0,0,1);
		}
		index+=2;	
	}
	this.indices.push(index-1,storedindex,highcenter);
	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};