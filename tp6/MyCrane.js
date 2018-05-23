/**
 * MyCrane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

const ARM1_LENGHT = 8;
const ARM2_LENGHT = 5;
const ARM_SIDE = 0.75;

const BASE_DIAMETER = 2;
const BASE_WIDTH = 1;

const IMAN_DIAMETER = 2;
const IMAN_WIDTH = 0.5;

const JOIN_DIAMETER = 2;
const JOIN_WIDTH = 1;

const CABLE_DIAMETER = 0.1;
const CABLE_LENGHT = 2;

class MyCrane extends CGFobject
{
	constructor(scene)
	{
    super(scene);
		this.baseAngleVer = -Math.PI/2;
		this.baseAngleHor = -Math.PI/6;
		this.joinAngle = Math.PI/5;

		this.cylinder = new MyCylinder(scene, 100, 1);
		this.cube = new MyUnitCubeQuad(scene);

		this.materialDefault = new CGFappearance(scene);

		this.state = 0;
	};


	update(currTime)
  {

		if(this.scene.isCarOnPad()){
			console.log("Car on pad");
			this.scene.vehicle.onCrane = true;
		}

		switch(this.state){
			case 0:
			this.joinAngle += 0.008;
			this.baseAngleVer += 0.01;
			if(this.baseAngleVer > 0){
				this.state = 1;
			}
			break;

			case 1:
			this.joinAngle -= 0.005;
			if(this.joinAngle < Math.PI/4){
				this.state = 2;
			}
			break;

			case 2:
			this.joinAngle += 0.005;
			this.baseAngleVer -= 0.01;
			if(this.baseAngleVer < -Math.PI){
				this.state = 1;
			}
			break;
		}

	};

	display()
	{
		this.materialDefault.apply();

		this.scene.rotate(this.baseAngleVer, 0, 1, 0);

		//Base
		this.scene.pushMatrix();
		this.scene.translate(0, BASE_WIDTH/2, 0);
		this.scene.scale(BASE_DIAMETER, BASE_WIDTH, BASE_DIAMETER);
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.cylinder.display();
		this.scene.popMatrix();

		this.scene.rotate(this.baseAngleHor, 1, 0, 0);

		//Arm 1
		this.scene.pushMatrix();
		this.scene.translate(0,ARM1_LENGHT/2 + BASE_WIDTH/2, 0);
		this.scene.scale(ARM_SIDE,ARM1_LENGHT,ARM_SIDE);
		this.cube.display();
		this.scene.popMatrix();


		//JOIN
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.translate(0, ARM1_LENGHT + BASE_WIDTH/2, 0);
		this.scene.scale(JOIN_DIAMETER, JOIN_DIAMETER, JOIN_WIDTH);
		this.cylinder.display();
		this.scene.popMatrix();

		//Iman
		this.scene.pushMatrix();

		this.scene.translate(0, BASE_WIDTH/2 + ARM1_LENGHT,0);
		this.scene.rotate(this.joinAngle, 1, 0, 0);
		this.scene.translate(0, -ARM2_LENGHT, 0);
		this.scene.rotate(Math.PI/2 - this.joinAngle - this.baseAngleHor, 1, 0, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);

		if(this.scene.vehicle.onCrane && this.onPad){
			this.scene.vehicle.position = [0,0,0];
			this.scene.vehicle.display();
		}

		this.materialDefault.apply();
		this.scene.scale(IMAN_DIAMETER, IMAN_DIAMETER, IMAN_WIDTH);
		this.cylinder.display();
		this.scene.popMatrix();

		//Cable
		this.scene.pushMatrix();
		this.scene.translate(0, BASE_WIDTH/2 + ARM1_LENGHT,0);
		this.scene.rotate(this.joinAngle, 1, 0, 0);
		this.scene.translate(0, -ARM2_LENGHT, 0);
		this.scene.rotate(Math.PI/2 - this.joinAngle - this.baseAngleHor, 1, 0, 0);
		this.scene.scale(CABLE_DIAMETER, CABLE_DIAMETER, CABLE_LENGHT);
		this.cylinder.display();
		this.scene.popMatrix();

		//Arm 2
		this.scene.pushMatrix();
		this.scene.translate(0, BASE_WIDTH/2 + ARM1_LENGHT,0);
		this.scene.rotate(this.joinAngle, 1, 0, 0);
		this.scene.translate(0, -ARM2_LENGHT/2, 0);
		this.scene.scale(ARM_SIDE,ARM2_LENGHT,ARM_SIDE);
		this.cube.display();
		this.scene.popMatrix();
	};

};
