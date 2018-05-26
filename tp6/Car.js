/**
 * Car
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class Car extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.carSideRight = new CarSideRight(scene);
		this.carTyreWrap = new CarTyreWrap(scene);
		this.carFront = new CarFront(scene);
		this.roof = new MyTrap(scene,8,0,0,
									 0,0,-6,
									 8,0,-6,4);

		this.carBack = new CarBack(scene);
		this.carSideLeft = new CarSideLeft(scene);

		this.carFloor = new CarBot(scene);

		this.headLight = new MyQuad(scene,1/10,9/10,1/3,2/3);
		this.flight = new CGFappearance(this.scene);
    	this.flight.setAmbient(0.5, 0.5, 0.5, 1);
    	this.flight.setDiffuse(1.0, 1.0, 1.0, 1);
    	this.flight.setSpecular(0.1, 0.1, 0.1, 1);
    	this.flight.setShininess(1);
    	this.flight.loadTexture("resources/images/flight.png");

    	this.plateObj = new MyQuad(scene,0,1,0,1);
			this.plateText = new CGFappearance(this.scene);
			this.plateText.setAmbient(0.5, 0.5, 0.5, 1);
			this.plateText.setDiffuse(1.0, 1.0, 1.0, 1);
			this.plateText.setSpecular(0.1, 0.1, 0.1, 1);
    	this.plateText.setShininess(1);
    	this.plateText.loadTexture("resources/images/plate.png");

	};

	display()
	{
		var WIDTH = 2.5;
		var LENGTH = 5;
		var HIGHT = 1.2;


		//to make the car fit in
		this.scene.scale(LENGTH/25,HIGHT/8.5,WIDTH/10);
		//center the car in the axis
		this.scene.translate(12.5-15.5,0,0);

		this.scene.pushMatrix();
			this.plateText.apply();
			this.scene.translate(15.55,0,0);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.scale(1.5,1,0);
			this.plateObj.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.plateText.apply();
			this.scene.translate(-9.55,0,0);
			this.scene.rotate(-Math.PI/2,0,1,0);
			this.scene.scale(1.5,1,0);
			this.plateObj.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
			this.flight.apply();
			this.scene.translate(15.55,1,-2.6);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.scale(2,1,0);
			this.headLight.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.flight.apply();
			this.scene.translate(15.55,1,2.6);
			this.scene.rotate(Math.PI,1,0,0);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.scale(2,1,0);
			this.headLight.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
			this.carFloor.display();
		this.scene.popMatrix();



		this.scene.pushMatrix();
			this.scene.vehicleAppearance.apply();
			this.scene.translate(0,0,-4);
			this.carSideLeft.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.vehicleAppearance.apply();
			this.scene.translate(0,0,4);
			this.carSideRight.display();
		this.scene.popMatrix();

		//front right
		this.scene.pushMatrix();
			this.scene.vehicleAppearance.apply();
			this.scene.translate(8,-1,4);
			this.scene.scale(4.5,4.5,1);
			this.carTyreWrap.display();
		this.scene.popMatrix();

		//back right
		this.scene.pushMatrix();
			this.scene.translate(-7.5,-1,4);
			this.scene.scale(4.5,4.5,1);
			this.carTyreWrap.display();
		this.scene.popMatrix();

		//left back
		this.scene.pushMatrix();
			this.scene.translate(-3,-1,-4);
			this.scene.scale(4.5,4.5,1);
			this.scene.rotate(Math.PI,0,1,0);
			this.carTyreWrap.display();
		this.scene.popMatrix();

		//front left
		this.scene.pushMatrix();
			this.scene.translate(12.5,-1,-4);
			this.scene.scale(4.5,4.5,1);
			this.scene.rotate(Math.PI,0,1,0);
			this.carTyreWrap.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
			this.scene.translate(-3,6.5,3);
			this.roof.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.carBack.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.carFront.display();
		this.scene.popMatrix();


	};
};
