class LightingScene extends CGFscene
{

	constructor()
	{
		super();
	};



	initObjs()
	{
		this.vehicle = new MyVehicle(this);
	};


	update(currTime)
	{

	};


	drawObjs()
	{
		this.vehicle.display();
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
		this.initObjs();
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};


	initLights()
	{
		//this.setGlobalAmbientLight(1, 1, 1, 1.0);

		// Positions for four lights
		this.lights[0].setPosition(15, 5, 10, 1);
		this.lights[0].setVisible(false);
		
		this.lights[1].setPosition(15, 5, -10, 1);
		this.lights[1].setVisible(false);


		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 0.0, 1.0);
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setSpecular(1.0, 1.0, 0.0, 1.0);
		this.lights[1].enable();
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
		this.axis.display();
		// ---- END Background, camera and axis setup

		//drawing section
		this.drawObjs();
	};


	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	};

};
