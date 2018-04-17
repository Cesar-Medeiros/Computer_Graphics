var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

class LightingScene extends CGFscene
{
	constructor()
	{
		super();
	};

	init(application)
	{
		super.init(application);
		this.enableTextures(true);
		this.initCameras();

		this.initLights();

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// Scene elements
		this.table = new MyTable(this);
		this.wall = new MyQuad(this, -0.46875, 1.46875, -	0.25, 1.25);
		this.floor = new MyQuad(this, 0, 10, 0, 12);
		this.prism = new MyPrism(this, 8, 20);
		this.cylinder = new MyCylinder(this, 8, 20);
		this.clock = new MyClock(this,8,20);
		this.clockHand = new MyClockHand(this,8,20);

		this.boardA = new Plane(this, BOARD_A_DIVISIONS,-0.166, 1.166, 0, 1);
		this.boardB = new Plane(this, BOARD_B_DIVISIONS);

		// Materials
		this.materialDefault = new CGFappearance(this);

		this.materialA = new CGFappearance(this);
		this.materialA.setAmbient(0.3,0.3,0.3,1);
		this.materialA.setDiffuse(0.6,0.6,0.6,1);
		this.materialA.setSpecular(0.0,0.2,0.8,1);
		this.materialA.setShininess(120);

		this.materialB = new CGFappearance(this);
		this.materialB.setAmbient(0.3,0.3,0.3,1);
		this.materialB.setDiffuse(0.6,0.6,0.6,1);
		this.materialB.setSpecular(0.8,0.8,0.8,1);
		this.materialB.setShininess(120);
		this.materialB.loadTexture("resources/images/board.png");

		this.materialF = new CGFappearance(this);
		this.materialF.setAmbient(0.3,0.3,0.3,1);
		this.materialF.setDiffuse(0.5,0.5,0.5,1);
		this.materialF.setSpecular(0.1,0.1,0.1,1);
		this.materialF.setShininess(20);
		this.materialF.loadTexture("resources/images/floor.png");
		this.materialF.setTextureWrap('REPEAT', 'REPEAT');

		this.materialWT = new CGFappearance(this);
		this.materialWT.setAmbient(0.3,0.3,0.3,1);
		this.materialWT.setDiffuse(0.7,0.7,0.7,1);
		this.materialWT.setSpecular(0.2,0.2,0.2,1);
		this.materialWT.setShininess(5);
		this.materialWT.loadTexture("resources/images/window.png");
		this.materialWT.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

		this.materialW = new CGFappearance(this);
		this.materialW.setAmbient(0.3,0.3,0.3,1);
		this.materialW.setDiffuse(0.7,0.7,0.7,1);
		this.materialW.setSpecular(0.2,0.2,0.2,1);
		this.materialW.setShininess(5);

		this.materialClock = new CGFappearance(this);
		this.materialClock.setAmbient(0.3,0.3,0.3,1);
		this.materialClock.setDiffuse(0.7,0.7,0.7,1);
		this.materialClock.setSpecular(0.2,0.2,0.2,1);
		this.materialClock.setShininess(5);
		this.materialClock.loadTexture("resources/images/clock.png");

		this.slidesAppearance = new CGFappearance(this);
		this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
		this.slidesAppearance.setDiffuse(0.9,0.9,0.9,1);
		this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);
		this.slidesAppearance.setShininess(5);
		this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
		this.slidesAppearance.loadTexture("resources/images/slides.png");

		this.boardAppearance = new CGFappearance(this);
		this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
		this.boardAppearance.setDiffuse(0.5,0.5,0.5,1);
		this.boardAppearance.setSpecular(0.8,0.8,0.8,1);
		this.boardAppearance.setShininess(120);
		this.boardAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
		this.boardAppearance.loadTexture("resources/images/board.png");

		this.columnAppearance = new CGFappearance(this);
		this.columnAppearance.setAmbient(0.3,0.3,0.3,1);
		this.columnAppearance.setDiffuse(0.5,0.5,0.5,1);
		this.columnAppearance.setSpecular(0.8,0.8,0.8,1);
		this.columnAppearance.setShininess(120);
		this.columnAppearance.loadTexture("resources/images/column.jpg");
	
		this.blackMat = new CGFappearance(this);
		this.blackMat.setAmbient(0,0,0,1);
		this.blackMat.setDiffuse(0,0,0,1);
		this.blackMat.setSpecular(0,0,0,1);
		this.blackMat.setShininess(0);
	
		//final do init
		this.setUpdatePeriod(100);
		this.prevTime = 0;
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		//this.setGlobalAmbientLight(1, 1, 1, 1.0);
		this.setGlobalAmbientLight(0.2, 0.2, 0, 1);


		// Positions for four lights
		this.lights[0].setPosition(4, 6, 1, 1);
		this.lights[0].setVisible(false); // show marker on light position (different from enabled)

		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[1].setVisible(false); // show marker on light position (different from enabled)

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		this.lights[2].setVisible(false); // show marker on light position (different from enabled)

		this.lights[3].setPosition(4, 6, 5, 1);
		this.lights[3].setVisible(false); // show marker on light position (different from enabled)

		this.lights[4].setPosition(-0.2, 4, 7.5, 1);
		this.lights[4].setVisible(true); // show marker on light position (different from enabled)

		//this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		//this.lights[1].setVisible(true); // show marker on light position (different from enabled)
		//this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		//this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 0.0, 1.0);
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(1);
		this.lights[2].setQuadraticAttenuation(0);
		this.lights[2].enable();


		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0, 1.0, 0.0, 1.0);
		this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation(0);
		this.lights[3].setQuadraticAttenuation(1);
		this.lights[3].enable();

		this.lights[4].setAmbient(0, 0, 0, 1);
		this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[4].enable();
	};

	update(currTime)
	{
		if(this.prevTime == 0)
		{
			this.prevTime = currTime;
			return;
		}
		
		this.clock.update(currTime-this.prevTime);
		this.prevTime = currTime;
	}

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}


	display()
	{
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

		// ---- END Background, camera and axis setup


		// ---- BEGIN Scene drawing section
			
		this.pushMatrix();
			this.materialDefault.apply();


			this.translate(7.25,7.25,0);
			this.scale(0.60,0.60,1);
			this.clock.display();
			this.materialDefault.apply();
		this.popMatrix();		

		//Cylinder
		this.pushMatrix();
			this.columnAppearance.apply();
			this.translate(10,0,4);
			this.scale(1, 5, 1);
			this.translate(0,1,0);
			this.rotate(Math.PI/2, 1,0,0);		
			this.cylinder.display();
			this.materialDefault.apply();
		this.popMatrix();

		//Prism
		this.pushMatrix();
			this.materialA.apply();
			this.translate(5,0,4);
			this.scale(1, 5, 1);
			this.translate(0,1,0);
			this.rotate(Math.PI/2, 1,0,0);
			this.prism.display();
			this.materialDefault.apply();
		this.popMatrix();


		//Floor
		this.pushMatrix();
			this.translate(7.5, 0, 7.5);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(15, 15, 0.2);
			this.materialF.apply();
			this.floor.display();
			this.materialDefault.apply();
		this.popMatrix();


		// Left Wall
		this.pushMatrix();
			this.translate(0, 4, 7.5);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(15, 8, 0.2);
			this.materialWT.apply();
			this.wall.display();
			this.materialDefault.apply();
		this.popMatrix();

		// Plane Wall
		this.pushMatrix();
			this.translate(7.5, 4, 0);
			this.scale(15, 8, 0.2);
			this.materialW.apply();
			this.wall.display();
			this.materialDefault.apply();
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
			this.slidesAppearance.apply();
			this.boardA.display();
			this.materialDefault.apply();
		this.popMatrix();

		// Board B
		this.pushMatrix();
			this.translate(10.5, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			this.boardAppearance.apply();
			this.boardB.display();
			this.materialDefault.apply();
		this.popMatrix();

		// ---- END Scene drawing section
	};
};
