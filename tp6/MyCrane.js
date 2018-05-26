/**
 * MyCrane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

const ARM1_LENGHT = 8;
const ARM2_LENGHT = 6;
const ARM_SIDE = 0.75;

const BASE_DIAMETER = 2;
const BASE_WIDTH = 1;

const IMAN_DIAMETER = 2;
const IMAN_WIDTH = 0.5;

const JOIN_DIAMETER = 2;
const JOIN_WIDTH = 1;

const CABLE_DIAMETER = 0.1;
const CABLE_LENGHT = 1.5;

class MyCrane extends CGFobject
{
	constructor(scene)
	{
    super(scene);
		this.baseAngleVer = -Math.PI;
		this.baseAngleHor = -Math.PI/12;
		this.joinAngle = Math.PI/3;

		this.cylinder = new MyCylinder(scene, 100, 1);
		this.cube = new MyUnitCubeQuad(scene);
		this.circle = new MyCircle(scene, 100);

		this.materialDefault = new CGFappearance(scene);

		this.state = -1;
		this.carOnPad = false;
		this.carFalling = false;
	};


	update(currTime)
  {

		this.posZ = ARM2_LENGHT * -Math.sin(this.joinAngle + this.baseAngleHor) +
		ARM1_LENGHT * Math.cos(Math.PI/2 - this.baseAngleHor);

		this.posY = ARM2_LENGHT * -Math.cos(this.joinAngle + this.baseAngleHor) +
		ARM1_LENGHT * Math.sin(Math.PI/2 - this.baseAngleHor);



		if(!this.scene.vehicle.onCrane){

			if(this.scene.isCarOnPad()){
				if(!this.carOnPad){
					this.carOnPad = true;
					this.initialAngle = this.scene.vehicle.vehicleAngle;
					this.activate();
				}
			}
			else {
				this.carOnPad = false;
				this.deactivate();
			}

		}
		else{
			if(!this.carFalling){
				this.scene.vehicle.vehicleAngle = this.initialAngle + this.baseAngleVer;
				this.scene.vehicle.position = [this.posZ*Math.sin(this.baseAngleVer), this.posY - 2.2, this.posZ*Math.cos(this.baseAngleVer)]
			}
		}



		switch(this.state){

			case 0:
			this.joinAngle += 0.05;
			if(this.joinAngle > Math.PI/2){
				this.state = 1;
			}
			break;

			case 1:
			this.baseAngleVer += 0.04;
			if(this.baseAngleVer > 0){
				this.state = 2;
			}
			break;

			case 2:
			this.joinAngle -= 0.01;
			if(this.joinAngle < Math.PI/4){
				this.state = 3;
				this.scene.vehicle.onCrane = true;
			}
			break;

			case 3:
			this.joinAngle += 0.025;
			if(this.joinAngle > Math.PI/2){
				this.state = 4;
			}
			break;

			case 4:
			this.baseAngleVer -= 0.03;
			if(this.baseAngleVer < -Math.PI){
				this.state = 5;
			}
			break;

			case 5:
			this.joinAngle -= 0.025;
			if(this.joinAngle < Math.PI/2){
				this.state = 6;
			}
			break;


			case 6:
			this.carFalling = true;
			this.scene.vehicle.position[1] -= 0.2;
			if(this.scene.vehicle.position[1] < 0.2*2){
				this.state = -1;
				this.carFalling = false;
				this.scene.vehicle.onCrane = false;
			}
			break;
		}

	};

	display()
	{
		this.materialDefault.apply();

		//Car
		if(this.scene.vehicle.onCrane){
			this.scene.pushMatrix();
			this.scene.vehicle.display();
			this.scene.popMatrix();
		}


		this.scene.rotate(this.baseAngleVer, 0, 1, 0);

		//Base
		this.scene.pushMatrix();
		this.scene.translate(0, BASE_WIDTH/2, 0);
		this.scene.scale(BASE_DIAMETER, BASE_WIDTH, BASE_DIAMETER);
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.cylinder.display();
		this.scene.translate(0, 0, BASE_WIDTH/2);
		this.circle.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();

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
			this.scene.translate(0, 0, JOIN_WIDTH/2);
			this.circle.display();
			this.scene.translate(0, 0, -JOIN_WIDTH);
			this.scene.rotate(Math.PI, 1, 0, 0);
			this.circle.display();
			this.scene.popMatrix();

			//Arm 2
			this.scene.pushMatrix();
			this.scene.translate(0, BASE_WIDTH/2 + ARM1_LENGHT,0);
			this.scene.rotate(this.joinAngle, 1, 0, 0);
			this.scene.translate(0, -ARM2_LENGHT/2, 0);
			this.scene.scale(ARM_SIDE,ARM2_LENGHT,ARM_SIDE);
			this.cube.display();
			this.scene.popMatrix();

		this.scene.popMatrix();


		this.scene.pushMatrix();

			this.scene.translate(0, this.posY, this.posZ);

			//Iman
			this.scene.pushMatrix();
			this.scene.translate(0, -1, 0);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(IMAN_DIAMETER, IMAN_DIAMETER, IMAN_WIDTH);
			this.cylinder.display();
			this.scene.translate(0, 0, IMAN_WIDTH);
			this.circle.display();

			this.scene.translate(0, 0, -2*IMAN_WIDTH);
			this.scene.rotate(Math.PI, 1, 0, 0);
			this.circle.display();
			this.scene.popMatrix();

			//Cable
			this.scene.pushMatrix();
			this.scene.translate(0, -0.5, 0);
			this.scene.rotate(Math.PI/2, 1, 0, 0);
			this.scene.scale(CABLE_DIAMETER, CABLE_DIAMETER, CABLE_LENGHT);
			this.cylinder.display();
			this.scene.popMatrix();

		this.scene.popMatrix();

	};

	activate(){
		this.state = 0;
	}

	deactivate(){
		this.state = -1;
	}
};
