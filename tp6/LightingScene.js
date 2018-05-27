class LightingScene extends CGFscene
{

	constructor()
	{
		super();
	};



	initObjs()
	{
		this.altimetry= [	[	8.0 , 11.0, 6.0, 0.0, 0.0, 0.0, 2.0, 6.0, 4.0],
											[ 11.0 , 14.0, 9.0, 0.0, 0.0, 0.0, 3.0, 7.0, 5.0],
											[ 9.0 , 12.0, 7.0, 0.0, 0.0, 0.0, 4.0, 8.0, 6.0],
											[	7.0 , 10.0, 5.0, 0.0, 0.0, 0.0, 7.0, 11.0, 9.0],
											[ 8.0 , 11.0, 6.0, 0.0, 0.0, 0.0, 6.0, 10.0, 8.0],
											[ 7.0 , 10.0, 5.0, 0.0, 0.0, 0.0, 6.0, 10.0, 8.0],
											[ 8.0 , 11.0, 6.0, 0.0, 0.0, 0.0, 8.0, 12.0, 10.0],
											[ 7.0 , 10.0, 5.0, 0.0, 0.0, 0.0, 7.0, 11.0, 9.0],
											[ 6.0 , 9.0, 4.0, 0.0, 0.0, 0.0, 6.0, 10.0, 8.0]
										];
		this.retrievingPad = new MyPad(this, 8, 5, 2.5);
		this.landingPad = new MyPad(this, 8, 5*2, 2.5*2);
		this.vehicle = new MyVehicle(this);
		this.terrain = new MyTerrain(this, 8, this.altimetry);
		this.crane = new MyCrane(this);
	};

	initAppearances(){
		this.materialDefault = new CGFappearance(this);

		this.blackMat = new CGFappearance(this);
		this.blackMat.setAmbient(0,0,0,1);
		this.blackMat.setDiffuse(0,0,0,1);
		this.blackMat.setSpecular(0,0,0,1);
		this.blackMat.setShininess(1);

		this.color_yellow = new CGFappearance(this);
		this.color_yellow.setAmbient(0.9,1,0.1,1);
		this.color_yellow.setDiffuse(0.9,1,0.1,1);
		this.color_yellow.setSpecular(0.9,1,0.1,1);
		this.color_yellow.setShininess(1);
	}

	initInterface(){
		this.interfaceObjs = {
			lights: [],
			axisEnable: true,
			vehicleAppearances: [this.color_yellow, this.materialDefault],
			vehicleAppearanceList: {'Yellow' :  0, 'Grey': 1},
			currVehicleAppearance: null,
		};
	}


	update(currTime)
	{
		this.vehicleAppearance = this.interfaceObjs.vehicleAppearances[this.interfaceObjs.vehicleAppearanceList[this.interfaceObjs.currVehicleAppearance]];

		this.checkKeys();
		if(!this.vehicle.onCrane){
			this.vehicle.update(currTime);
		}
		this.crane.update(currTime);
	};


	drawObjs()
	{
		//in case of the car not beeing on the Crane
		if(!this.vehicle.onCrane){
			this.pushMatrix();
			this.translate(0,0.5,0);
			this.vehicle.display();
			this.popMatrix();
		}

		this.pushMatrix();
		this.translate(0, 0.05, -5);
		this.retrievingPad.display();
		this.popMatrix();

		this.pushMatrix();
		this.translate(0, 0.05, 7);
		this.landingPad.display();
		this.popMatrix();

		this.terrain.display();

		this.crane.display();
		
	};


	isCarOnPad(){
		return (this.vehicle.position[0] < 2.5 && this.vehicle.position[0] > -2.5
				&& this.vehicle.position[2] < -3.75  && this.vehicle.position[2] > -3.75 - 2.5
				&& this.vehicle.velocity[0] < 0.5 &&	this.vehicle.velocity[2] < 0.5);
	}

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
		this.initAppearances();
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
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};


	initLights()
	{
		this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

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
		this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.interfaceObjs.lights[0] = true;

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.interfaceObjs.lights[1] = true;

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.interfaceObjs.lights[2] = true;

		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0, 1.0, 1.0, 1.0);
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
