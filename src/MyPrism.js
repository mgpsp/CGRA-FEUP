/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks, top, bottom) {
 	CGFobject.call(this,scene);
	
	top = typeof top !== 'undefined' ? top : false;
	bottom = typeof bottom !== 'undefined' ? bottom : false;
	this.top = top;
	this.bottom = bottom;

	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
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
	// variables
	var height = 1;
	var delta_rad = 2*Math.PI/this.slices;
	var delta_z = height/this.stacks;
	var r = 1;
	var acc = 0;
	var index = 0;

	//sides
	for(var i = 0; i <= this.stacks; i++){
		acc = 0;
		for(var j = 0; j < this.slices; j++){
			/*
			this.vertices.push(
			r * Math.cos(j*delta_rad),
			r * Math.sin(j*delta_rad),	
			i*delta_z
			);
			
			this.vertices.push(
			r * Math.cos((j+1)*delta_rad),
			r * Math.sin((j+1)*delta_rad),
			i*delta_z
			);

			this.vertices.push(
			r * Math.cos((j+1)*delta_rad),
			r * Math.sin((j+1)*delta_rad),
			(i+1)*delta_z
			);

			this.vertices.push(
			r * Math.cos(j*delta_rad),
			r * Math.sin(j*delta_rad),
			(i+1)*delta_z
			);
			this.indices.push(
			index, index+1, index+2
			);
			this.indices.push(
			index+2,index+3,index
			);
			for(var rep = 0; rep < 4; rep++){
			this.normals.push(Math.cos(acc+delta_rad*.5),
				Math.sin(acc-delta_rad*.5),
				0);
			}
			acc+= delta_rad;
			index+=4;*/

			this.vertices.push(
			r * Math.cos(j*delta_rad),
			r * Math.sin(j*delta_rad),	
			i*delta_z
			);
			this.vertices.push(
			r * Math.cos((j+1)*delta_rad),
			r * Math.sin((j+1)*delta_rad),
			i*delta_z
			);
			if(i!= 0){
				this.indices.push(
					index-(2*this.slices), index-(2*this.slices)+1, index+1
				);
				this.indices.push(
					index+1,index, index-(2*this.slices)
				);
			}
			for(var rep = 0; rep < 2; rep++){
			this.normals.push(Math.cos(acc+delta_rad*.5),
				Math.sin(acc-delta_rad*.5),
				0);
			}
			acc+= delta_rad;
			index+=2;
		}
	}
	//centers
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
	for(var j= 0; j < this.slices-1; j++){
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

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
