class LightingScene extends CGFscene
{

	constructor()
	{
		super();
	};



	initObjs()
	{
		this.vehicle = new MyVehicle(this);
		this.terrain = new MyTerrain(this);
	};


	update(currTime)
	{
		this.vehicle.update(currTime);
		this.checkKeys();
	};


	drawObjs()
	{
		this.pushMatrix();
		this.translate(this.vehicle.position[0], this.vehicle.position[1], this.vehicle.position[2]);
		this.rotate(-this.vehicle.vehicleAngle, 0, 1 ,0);
		this.translate(0, 1, 0);
		this.vehicle.display();
		this.popMatrix();
		this.terrain.display();
	};

	doSomething()
	{
		console.log("Doing something...");
	};

	checkKeys()
	{
		var keysPressed=false;
		var speedKeysPressed = false;

		if (this.gui.isKeyPressed("KeyW"))
		{
			keysPressed=true;
			speedKeysPressed = true;
			this.vehicle.engineForce += 5;
		}

		if (this.gui.isKeyPressed("KeyS"))
		{
			keysPressed=true;
			speedKeysPressed = true;
			this.vehicle.engineForce -= 5;
		}

		if (this.gui.isKeyPressed("KeyA"))
		{
			keysPressed=true;
			this.vehicle.angle += 0.1;
		}

		if (this.gui.isKeyPressed("KeyD"))
		{
			keysPressed=true;
			this.vehicle.angle -= 0.1;
		}

		if (keysPressed){
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
		this.initLights();

		this.gl.clearColor(135/255, 206/255, 235/255, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		this.initObjs();

		this.light0 = true;
		this.speed=3;

		this.setUpdatePeriod(60);
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};


	initLights()
	{
		//this.setGlobalAmbientLight(1, 1, 1, 1.0);

		// Positions for four lights
		this.lights[0].setPosition(0, 50, -10, 1);
		this.lights[0].setVisible(true);

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 0.0, 1.0);
		this.lights[0].disable();
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

		//Change light readyState

		if(this.light0 === true){
			this.lights[0].enable();
		}
		else{
				this.lights[0].disable();
		}

		// Update all lights used
		this.updateLights();

		// Draw axis
		this.axis.display();
		// ---- END Background, camera and axis setup

		//drawing section
		this.drawObjs();
	};


	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++){
			this.lights[i].update();
		}

	};

};
