var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;



LightingScene.prototype.init = function(application) {
	


	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();
	
	/*this.tableappearance = new CFGappearance(this);
	this.tableappearance.setAmbient(0.647,0.3216,0.1765,1);
	this.tableappearance.setDiffuse(0.647,0.3216,0.1765,1);	
	this.tableappearance.setSpecular(.05,.05,.05,1);
	this.tableappearance.setShininess(50);
	this.tableappearance.loadTexture("../resources/images/table.png");*/

	/*this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	


	this.enableTextures(true);
	this.gl.enable(this.gl.BLEND);
	this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
	
	this.gl.depthFunc(this.gl.LEQUAL);
	this.gl.depthMask(true);*/
	
	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	 this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
	 this.gl.enable(this.gl.BLEND);
	
	this.enableTextures(true);
    //this.gl.disable(this.gl.DEPTH_TEST);
    
     

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new Plane(this);
	this.landscape = new Plane(this);
	this.window = new MyQuad(this, -.75, 1.75, -.25, 1.25);
	var windowHeight = .613;
	var windowWidth = .37125;
	this.window2 = new MyWindow(this, 1, -.75, 1.75, -.25, 1.25,(1-windowWidth)/2,(1-windowHeight)/2,windowWidth,windowHeight);
	//this.window2 = new MyWindow(this, -.75, 1.75, -.25, 1.25, windowWidth, windowHeight);
	//this.window2 = new MyWindow(this,-.75, 1, -.25, 1.75, windowWidth, windowHeight);
	//this.window2 = new MyWindow(this, 1, 0,1, 0, 1, (1-.35)/2,.25, .35,.5);
	this.floor = new MyQuad(this, 0,10,0,12);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, -.1, 1.1, .1,.9);
	//this.boardA = new Plane(this, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);
	this.chair = new MyChair(this);
	this.column = new MyCilinder(this, 10,3, false, false, true);
	this.lamp = new MyLamp(this, 20,20, false, true);

	this.clock = new MyClock(this);
	this.paperplane  = new MyPaperPlane(this, 14, 3.65, 8,0,Math.PI,0);
	
	this.material0 = new CGFappearance(this);
	this.material0.setAmbient(.5,.5,.5,1);
	this.material0.setDiffuse(1,1,1,1);	
	this.material0.setSpecular(1,1,1,1);
	this.material0.setShininess(500);
	this.material0.loadTexture("../resources/images/robot0.png");

	this.material1 = new CGFappearance(this);
	this.material1.setAmbient(.5,.5,.5,1);
	this.material1.setDiffuse(1,1,1,1);	
	this.material1.setSpecular(1,1,1,1);
	this.material1.setShininess(500);
	this.material1.loadTexture("../resources/images/robot1.png");

	this.material2 = new CGFappearance(this);
	this.material2.setAmbient(.5,.5,.5,1);
	this.material2.setDiffuse(1,1,1,1);	
	this.material2.setSpecular(1,1,1,1);
	this.material2.setShininess(5);
	this.material2.loadTexture("../resources/images/robot2.png");

	this.material3 = new CGFappearance(this);
	this.material3.setAmbient(.5,.5,.5,1);
	this.material3.setDiffuse(1,1,1,1);	
	this.material3.setSpecular(1,1,1,1);
	this.material3.setShininess(500);
	this.material3.loadTexture("../resources/images/robot3.png");

	this.material4 = new CGFappearance(this);
	this.material4.setAmbient(.5,.5,.5,1);
	this.material4.setDiffuse(.25,1,.25,1);	
	this.material4.setSpecular(1,1,1,1);
	this.material4.setShininess(500);

	this.robotAppearances = [this.material0, this.material1, this.material2, this.material3, this.material4];
	this.matoptions = [ 'Texture 0', 'Texture 1'];
	this.currRobotAppearance = 0;
	this.robot= new MyRobot(this,7.5,0,6,0.0,Math.PI*1.1,0.0, this.robotAppearances[0]);

	//this.paperplane  = new MyPaperPlane(this, 1, 1, 1,0,Math.PI,0);
	// Materials
	this.materialDefault = new CGFappearance(this);
	
	
	this.matplane = new CGFappearance(this);
	this.matplane.setAmbient(0.8,0.8,0.8,1);
	this.matplane.setDiffuse(1,1,1,1);
	this.matplane.setSpecular(0,0.0,0.0,1);
	this.matplane.setShininess(120);


	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	//this.materialA.setSpecular(0.2,0.2,0.2,1);
	//this.materialA.setSpecular(0.8,0.8,0.8,1);	
	this.materialA.setSpecular(0,0.2,0.8,1);
	//this.materialA.setShininess(10);
	this.materialA.setShininess(120);

	this.materialSlide = new CGFappearance(this);
	this.materialSlide.setAmbient(0.3,0.3,0.3,1);
	this.materialSlide.setDiffuse(0.9,0.9,0.9,1);
	this.materialSlide.setSpecular(0.1,0.1,0.1,1);
	this.materialSlide.setShininess(10);
	this.materialSlide.loadTexture("../resources/images/Slides.png");
	this.materialSlide.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

	this.materialBoard = new CGFappearance(this);
	this.materialBoard.setAmbient(0.5,0.5,0.5,1);
	this.materialBoard.setDiffuse(0.75,0.75,0.75,1);
	this.materialBoard.setSpecular(0.9,0.9,0.9,1);
	this.materialBoard.setShininess(120);
	this.materialBoard.loadTexture("../resources/images/board.png");

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	this.materialWall = new CGFappearance(this);
	this.materialWall.setAmbient(0.8784,.7804,0.6235,1);
	this.materialWall.setDiffuse(0.8784,.7804,0.6235,1);	
	this.materialWall.setSpecular(.05,.05,.05,1);
	this.materialWall.setShininess(50);

	this.materialPillar = new CGFappearance(this);
	this.materialPillar.setAmbient(0.8784,.7804,0.6235,1);
	this.materialPillar.setDiffuse(0.8784,.7804,0.6235,1);	
	this.materialPillar.setSpecular(.05,.05,.05,1);
	this.materialPillar.setShininess(50);
	this.materialPillar.loadTexture("../resources/images/pillar.png");
	
	this.materialFloor = new CGFappearance(this);
	this.materialFloor.setAmbient(.45,.45,0.45,1);
	this.materialFloor.setDiffuse(.45,.45,0.45,1);	
	this.materialFloor.setSpecular(.5,.5,.5,1);
	this.materialFloor.setShininess(50);
	this.materialFloor.loadTexture("../resources/images/floor.png");


	this.materialWindow = new CGFappearance(this);
	this.materialWindow.setAmbient(0.8784,.7804,0.6235,1);
	this.materialWindow.setDiffuse(0.8784,.7804,0.6235,1);	
	this.materialWindow.setSpecular(.05,.05,.05,1);
	this.materialWindow.setShininess(50);
	this.materialWindow.loadTexture("../resources/images/newwindow.png");
	this.materialWindow.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

	this.materialLamp = new CGFappearance(this);
	this.materialLamp.setAmbient(0.8784,.7804,0.6235,1);
	this.materialLamp.setDiffuse(0.8784,.7804,0.6235,1);	
	this.materialLamp.setSpecular(.05,.05,.05,1);
	this.materialLamp.setShininess(50);
	this.materialLamp.loadTexture("../resources/images/lamp.png");


	this.materialLandscape = new CGFappearance(this);
	this.materialLandscape.setAmbient(1,1,1,1);
	this.materialLandscape.setDiffuse(0.8784,.7804,0.6235,1);	
	this.materialLandscape.setSpecular(.05,.05,.05,1);
	this.materialLandscape.setShininess(50);
	this.materialLandscape.loadTexture("../resources/images/landscape.png");

	this.setUpdatePeriod(10);
	
	//this.option1=true; 
	//this.option2=false; 
	//this.speed=3;
	this.Light1 = true;
	this.Light2 = true;
	this.Light3 = true;
	this.Light4 = true;
	this.paused = false;
	this.alpha = false;
	
};



LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);

	this.shader.bind();
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[3].setPosition(0, 4, 7.5, 1);

	this.lights[0].setAmbient(0.1, .1, .1, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	//this.lights[2].setConstantAttenuation(0.0);
	//this.lights[2].setLinearAttenuation(1.0);
	//this.lights[2].setQuadraticAttenuation(0.0);
	this.lights[2].enable();

	/*this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setConstantAttenuation(0.0);
	this.lights[3].setLinearAttenuation(0.0);
	this.lights[3].setQuadraticAttenuation(1);*/
	this.lights[3].setLinearAttenuation(1);
	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0,1.0,1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[3].enable();


	this.setGlobalAmbientLight(0,0,0);
	this.shader.unbind();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
	if(this.Light1)
		this.lights[0].enable();
	else this.lights[0].disable();
	if(this.Light2)
		this.lights[1].enable();
	else this.lights[1].disable();
	if(this.Light3)
		this.lights[2].enable();
	else this.lights[2].disable();
	if(this.Light4)
		this.lights[3].enable();
	else this.lights[3].disable();
}

LightingScene.prototype.update = function(currTime) {
	//console.log(this.currRobotAppearance);
	this.robot.setMaterial(this.robotAppearances[this.currRobotAppearance]);
	if(!this.paused){
	this.clock.update(currTime);
	this.paperplane.update(currTime);
	this.robot.update(currTime);
	}
	
};

LightingScene.prototype.display = function() {
	this.shader.bind();

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	

	this.pushMatrix();	
		this.robot.display();
	this.popMatrix();

	this.pushMatrix();
		this.materialDefault.apply();
		this.paperplane.display();
	this.popMatrix();

	this.pushMatrix();
		this.translate(7.25,7.5,0.2);
		this.clock.display();
	this.popMatrix();

	this.pushMatrix();
		this.translate(7.5, 8, 7.5);
		this.rotate(90 * degToRad, 1, 0, 0);
		//this.scale(15, 15, 0.2);
		this.materialLamp.apply();
		this.lamp.display();
	this.popMatrix();

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.materialFloor.apply();
		this.floor.display();
	this.popMatrix();



	// Left Wall
	this.pushMatrix();
		this.translate(-2, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		var num =2;
		this.scale(15 * num, 8*num, 0.2*num);
		this.materialLandscape.apply();
		this.landscape.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.materialWall.apply();
		this.wall.display();
	this.popMatrix();



	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		//this.materialA.apply();
		this.materialSlide.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		//this.materialB.apply();
		this.materialBoard.apply();
		this.boardB.display();
	this.popMatrix();
	

	this.pushMatrix();
		this.translate(5, 0, 10);
		this.chair.display();
	this.popMatrix();

	this.pushMatrix();
		this.translate(12, 0, 10);
		this.chair.display();
	this.popMatrix();
	
	this.pushMatrix();
		this.translate(8.5, 0, 12.5);
		this.scale(.5,8,.5);
		//this.rotate(-Math.PI/4, 0,1,0);
		this.rotate(-Math.PI/2, 1,0,0);
		this.materialPillar.apply();
		this.column.display();
	this.popMatrix();
	// ---- END Primitive drawing section
	
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.materialWall.apply();
		//this.wall.display();
		this.materialWindow.apply();
		if(this.alpha)
		this.window.display();
		else this.window2.display();
	this.popMatrix();
     
	this.shader.unbind();

};

LightingScene.prototype.doSomething = function ()
{ 
	this.paused = !this.paused;
	//this.robot.setMaterial(this.robotAppearances[1]);
};

LightingScene.prototype.setRobotAppearance = function(text) {
	//this.robot.setMaterial(this.robotAppearances[1]);
	//return;
	this.currRobotAppearance = 0;
	for(;this.currRobotAppearance < this.matoptions.length; this.currRobotAppearance++){
		if(this.matoptions[this.currRobotAppearance] == text)
		break;
	}
	if(this.currRobotAppearance != this.robotAppearances.length)
		this.robot.setMaterial(this.robotAppearances[1]);
	
	console.log(this.currRobotAppearance);
	
};