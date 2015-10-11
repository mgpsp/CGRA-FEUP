/**
 * MyCilinder
 * @constructor
 */
 function MyCilinder(scene, slices, stacks, top, bottom, texture) {
 	CGFobject.call(this,scene);
	top = typeof top !== 'undefined' ? top : false;
	bottom = typeof bottom !== 'undefined' ? bottom : false;
	texture = typeof texture !== 'undefined' ? texture : false;
	this.top = top;
	this.bottom = bottom;
	this.texture = texture;
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyCilinder.prototype = Object.create(CGFobject.prototype);
 MyCilinder.prototype.constructor = MyCilinder;

 MyCilinder.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

	this.vertices = [];
	this.indices = [];
	this.normals = [];
	if(this.texture)
		this.texCoords = [];
	// variables
	var height = 1;
	var delta_rad = 2*Math.PI/this.slices;
	var delta_z = height/this.stacks;
	var r = 1;
	var acc = 0;
	var index = 0;

	//sides
	/*for(var i = 0; i <= this.stacks; i++){
		for(var j= 0; j < this.slices; j++){
			this.vertices.push(
			r * Math.cos(j*delta_rad),
			r * Math.sin(j*delta_rad),	
			i*delta_z
			);
			this.normals.push(
				r * Math.cos(j*delta_rad),
				r * Math.sin(j*delta_rad), 
				0);
			if(this.texture){
				this.texCoords.push(j/this.slices, i/this.stacks);
			}
			index++;
		}
	}
	for(var i = 0; i < this.stacks; i++){
		acc = 0;
		for(var j= 0; j < this.slices; j++){
			if(j == this.slices-1){
				this.indices.push(
					i*this.slices+j,
					i*this.slices,
					(i+1)*this.slices
				);

				this.indices.push(
					(i+1)*this.slices,
					(i+1)*this.slices+j,
					i*this.slices+j
				);
			}
			else {
			this.indices.push(
			i*this.slices+j,
			i*this.slices+(j+1),
			(i+1)*this.slices+(j+1)
			);
			this.indices.push(
			(i+1)*this.slices+(j+1),
			(i+1)*this.slices+j,
			i*this.slices+j
			);
			}
		}
	}*/
	for(var i = 0; i <= this.stacks; i++){
		for(var j= 0; j <= this.slices; j++){
			this.vertices.push(
				r * Math.cos(j*delta_rad),
				r * Math.sin(j*delta_rad),	
				i*delta_z
			);
			this.normals.push(
				r * Math.cos(j*delta_rad),
				r * Math.sin(j*delta_rad), 
				0);
			if(this.texture){
				this.texCoords.push(j/this.slices, i/this.stacks);
			}
			index++;
		}
	}
	for(var i = 0; i < this.stacks; i++){
		acc = 0;
		for(var j= 0; j <= this.slices+2; j++){

			this.indices.push(
				i*this.slices+j,
				i*this.slices+(j+1),
				(i+1)*this.slices+(j+1)
			);
			this.indices.push(
				(i+1)*this.slices+(j+1),
				(i+1)*this.slices+j,
				i*this.slices+j
			);
			
		}
	}
	//centers
	if(this.bottom){
	var lowcenter = index++;
	this.vertices.push(
		0,
		0,
		0
	);
	this.normals.push(
		0,
		0,
		-1
	);
	//store index of first vertex of top
	var storedindex = index;
	//bottom
	
	for(var j= 0; j < this.slces-1; j++){
		this.vertices.push(
			r * Math.cos((j)*delta_rad),
			r * Math.sin((j)*delta_rad),
			0
			);
		this.vertices.push(
			r * Math.cos((j+1)*delta_rad),
			r * Math.sin((j+1)*delta_rad),
			0
			);
		this.indices.push(
		lowcenter, index+1, index
		);
		for(var rep = 0; rep < 2 ; rep++){
			this.normals.push(0,0,-1);
		}

		index+=2;	
	}
	this.indices.push(storedindex,index-1,lowcenter);
	if(this.top){
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

 }
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
		this.indices.push(
		highcenter, index, index+1
		);
		for(var rep = 0; rep < 2 ; rep++){
			this.normals.push(0,0,1);
		}
		index+=2;	
	}
	this.indices.push(index-1,storedindex,highcenter);
	}
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
