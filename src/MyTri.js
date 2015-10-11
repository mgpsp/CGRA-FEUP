function MyTri(scene, p1, p2, p3) {
 	CGFobject.call(this,scene);
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
	this.initBuffers();
 };

 MyTri.prototype = Object.create(CGFobject.prototype);
 MyTri.prototype.constructor = MyTri;

 MyTri.prototype.initBuffers = function() {
	var p1 = this.p1;
	var p2 = this.p2;
	var p3 = this.p3;
    this.vertices = [
			p1[0],p1[1], p1[2],
			p2[0],p2[1], p2[2],
			p3[0],p3[1], p3[2],
			p1[0],p1[1], p1[2],
			p2[0],p2[1], p2[2],
			p3[0],p3[1], p3[2],
			];

	this.indices = [0, 1, 2,
					3, 5, 4];
	var x = ((p2[1] - p1[1])*(p3[2] - p1[2]) - (p2[2] - p1[2])*(p3[1] - p1[1]))/Math.sqrt(Math.pow((p2[1] - p1[1])*(p3[2] - p1[2]) - (p2[2] - p1[2])*(p3[1] - p1[1]),2) + Math.pow((p2[2] - p1[2])*(p3[0] - p1[0]) - (p2[0] - p1[0]) * (p3[2] - p1[2]),2) + Math.pow((p2[0] - p1[0])*(p3[1] - p1[1]) - (p2[1] - p1[1])*(p3[0] - p1[0]),2));
    var y = ((p2[2] - p1[2])*(p3[0] - p1[0]) - (p2[0] - p1[0])*(p3[2] - p1[2]))/Math.sqrt(Math.pow((p2[1] - p1[1])*(p3[2] - p1[2]) - (p2[2] - p1[2])*(p3[1] - p1[1]), 2) + Math.pow((p2[2] - p1[2])*(p3[0] - p1[0]) - (p2[0] - p1[0])*(p3[2] - p1[2]),2) + Math.pow((p2[0] - p1[0])*(p3[1] - p1[1]) - (p2[1] - p1[1])*(p3[0] - p1[0]),2));
    var z = ((p2[0] - p1[0])*(p3[1] - p1[1]) - (p2[1] - p1[1])*(p3[0] - p1[0]))/Math.sqrt(Math.pow((p2[1] - p1[1])*(p3[2] - p1[2])- (p2[2] - p1[2])*(p3[1] - p1[1]), 2) + Math.pow((p2[2] - p1[2])*(p3[0] - p1[0]) - (p2[0] - p1[0])*(p3[2] - p1[2]),2) + Math.pow((p2[0] - p1[0])*(p3[1] - p1[1]) - (p2[1] - p1[1])*(p3[0] - p1[0]), 2));
    
    this.normals =[  x, y, z,
   					 x, y, z,
   					 x, y, z,
   					 -x, -y, -z,
   					 -x, -y, -z,
   					 -x, -y, -z,
    			];               
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

