/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks, bottom, texture) {
 	CGFobject.call(this,scene);

	bottom = typeof bottom !== 'undefined' ? bottom : false;
	texture = typeof texture !== 'undefined' ? texture : false;
	
	this.bottom = bottom;
	this.texture = texture;
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {
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
	if(this.texture){
		this.texCoords = [];
	}

	// variables
	var height = 1;
	var delta_long = 2*Math.PI/this.slices;
	var delta_lat = Math.PI/2/this.stacks;
	var r = 1;
	var acc = 0;
	var index = 0;

	/*for(var i = 0; i < this.stacks; i++){
		for(var j= 0; j < this.slices; j++){
			var teta = Math.PI/2-i*delta_lat;
			this.vertices.push(
			r * Math.sin(teta) * Math.cos(j*delta_long),
			r * Math.sin(teta) * Math.sin(j*delta_long),	
			r * Math.cos(teta)
			);
			this.normals.push(
				Math.sin(teta) * Math.cos(j*delta_long),
				Math.sin(teta) * Math.sin(j*delta_long),	
				Math.cos(teta)
			);
			index++;
		}
	}
	for(var i = 0; i < this.stacks-1; i++){
		acc = 0;
		for(var j = 0; j < this.slices; j++){
			if(j == this.slices - 1){
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

	/*for(var i = 0; i < this.stacks; i++){
		for(var j= 0; j <= this.slices; j++){
			var teta = Math.PI/2-i*delta_lat;
			this.vertices.push(
			r * Math.sin(teta) * Math.cos(j*delta_long),
			r * Math.sin(teta) * Math.sin(j*delta_long),	
			r * Math.cos(teta)
			);
			this.normals.push(
				Math.sin(teta) * Math.cos(j*delta_long),
				Math.sin(teta) * Math.sin(j*delta_long),	
				Math.cos(teta)
			);
			if (this.texture)
			this.texCoords.push(
				.5*r * Math.sin(teta) * Math.cos(j*delta_long) +.5,
				.5*r * Math.sin(teta) * Math.sin(j*delta_long)+.5
			);
			this.texCoords.push(
				1-  j/this.slices,
				1 - i/this.stacks
			);
			index++;
		}
	}
	this.texCoords.push(
				1, 1
			);
	for(var i = 0; i < this.stacks; i++){
		acc = 0;
		for(var j = 0; j < this.slices; j++){

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
	var highcenter = index++;
	this.vertices.push(
		0,
		0,
		r
	);
	this.normals.push(
		0,
		0,
		1

	);
	for(var j = 0; j <= this.slices; j++){
		 this.indices.push(
				(this.stacks-1)*this.slices+j,
				(this.stacks-1)*this.slices+(j+1),
				highcenter
			);
	}
	*/

	for(var i = 0; i <= this.stacks; i++){
		for(var j= 0; j <= this.slices; j++){
			var teta = Math.PI/2-i*delta_lat;
			this.vertices.push(
			r * Math.sin(teta) * Math.cos(j*delta_long),
			r * Math.sin(teta) * Math.sin(j*delta_long),	
			r * Math.cos(teta)
			);
			this.normals.push(
				Math.sin(teta) * Math.cos(j*delta_long),
				Math.sin(teta) * Math.sin(j*delta_long),	
				Math.cos(teta)
			);
			if (this.texture)
			this.texCoords.push(
				1-  j/this.slices,
				1 - i/this.stacks
			);
			index++;
		}
	}
	for(var i = 0; i <= this.stacks; i++){
		acc = 0;
		for(var j = 0; j < this.slices; j++){

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

	//top
	/*for(var j = 0; j < this.slices; j++){
		if(j == this.slices-1){
			this.indices.push(
				(this.stacks-1)*this.slices+j,
				(this.stacks-1)*this.slices,
				highcenter
			);
		}
		else this.indices.push(
				(this.stacks-1)*this.slices+j,
				(this.stacks-1)*this.slices+(j+1),
				highcenter
			);
	}*/
	


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
	var storedindex = index;
	//bottom
	
	for(var j= 0; j < this.slices-1; j++){
		this.vertices.push(
			r * Math.cos((j)*delta_long),
			r * Math.sin((j)*delta_long),
			0
			);
		this.vertices.push(
			r * Math.cos((j+1)*delta_long),
			r * Math.sin((j+1)*delta_long),
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
 }
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };