class LightingScene extends CGFscene
{

	constructor()
	{
		super();
	};



	initObjs()
	{
		this.altimetry= [	[	8.0 , 11.0 , 6.0, 0.0, 0.0, 0.0, 2.0, 6.0, 4.0],
											[ 11.0 , 14.0 , 9.0, 0.0, 0.0, 0.0, 3.0, 7.0, 5.0],
											[ 9.0 , 12.0 , 7.0, 0.0, 0.0, 0.0, 4.0, 8.0, 6.0],
											[	7.0 , 10.0 , 5.0, 0.0, 4.0, 0.0, 7.0, 11.0, 9.0],
											[ 8.0 , 11.0 , 6.0, 0.0, 4.0, 0.0, 6.0, 10.0, 8.0],
											[ 7.0 , 10.0 , 5.0, 0.0, 0.0, 0.0, 6.0, 10.0, 8.0],
											[ 8.0 , 11.0 , 6.0, 0.0, 0.0, 0.0, 8.0, 12.0, 10.0],
											[ 7.0 , 10.0 , 5.0, 0.0, 0.0, 0.0, 7.0, 11.0, 9.0],
											[ 6.0 , 9.0 , 4.0, 0.0, 0.0, 0.0, 6.0, 10.0, 8.0]
										];

		this.vehicle = new MyVehicle(this);
		this.terrain = new MyTerrain(this, 8, this.altimetry);
	};

	initInterface(){
		this.interfaceObjs = {
			lights: [],
			axisEnable: true,
			vehicleAppearances: [],
			vehicleAppearanceList: {'Textura 1' :  0, 'Textura 2': 1},
			currVehicleAppearance: null,
		};
	}


	update(currTime)
	{
		this.vehicle.update(currTime);
		this.checkKeys();
	};


	drawObjs()
	{
		this.pushMatrix();
		this.translate(0, 0.5, 15);
		this.vehicle.display();
		this.popMatrix();

		this.terrain.display();
	};

	checkKeys()
	{
		var speedKeysPressed = false;

		if (this.gui.isKeyPressed("KeyW"))
		{
			speedKeysPressed = true;
			this.vehicle.acelerate_front();
		}

		if (this.gui.isKeyPressed("KeyS"))
		{
			speedKeysPressed = true;
			this.vehicle.acelerate_back();
		}

		if (this.gui.isKeyPressed("KeyA"))
		{
			this.vehicle.turnLeft();
		}

		if (this.gui.isKeyPressed("KeyD"))
		{
			this.vehicle.turnRight();
		}

		if(!speedKeysPressed){
				this.vehicle.engineForce = 0;
		}
	}

	init(application)
	{
		super.init(application);
		this.enableTextures(true);
		this.initCameras();
		this.initInterface();
		this.initLights();

		this.gl.clearColor(135/255, 206/255, 235/255, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		this.initObjs();
		this.setUpdatePeriod(60);
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.6, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};


	initLights()
	{
		//this.setGlobalAmbientLight(1, 1, 1, 1.0);

		// Positions for four lights
		this.lights[0].setPosition(50, 50, 50, 1);
		this.lights[0].setVisible(false);

		this.lights[1].setPosition(-50, 50, 50, 1);
		this.lights[1].setVisible(false);

		this.lights[2].setPosition(50, 50, -50, 1);
		this.lights[2].setVisible(false);

		this.lights[3].setPosition(-50, 50, -50, 1);
		this.lights[3].setVisible(false);

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 0.0, 1.0);
		this.interfaceObjs.lights[0] = true;

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setSpecular(1.0, 1.0, 0.0, 1.0);
		this.interfaceObjs.lights[1] = true;

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 0.0, 1.0);
		this.interfaceObjs.lights[2] = true;

		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0, 1.0, 0.0, 1.0);
		this.interfaceObjs.lights[3] = true;
	};


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
		if(this.interfaceObjs.axisEnable){
			this.axis.display();
		}

		// ---- END Background, camera and axis setup

		//drawing section
		this.drawObjs();
	};


	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++){

			if(this.interfaceObjs.lights[i] === true){
				this.lights[i].enable();
			}
			else{
				this.lights[i].disable();
			}

			this.lights[i].update();
		}

	};

};
