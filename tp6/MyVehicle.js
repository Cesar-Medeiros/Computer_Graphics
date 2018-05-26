/**
 * MyVehicle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

//chassis size
const LENGHT = 3.1; //distance between axis (2.0-3.5)
const AXIS = 1.5;
const HEIGHT = 2.0;
//tyre size
const DIAMETER = 0.7;
const PERIMETER = 0.7*Math.PI;
const WIDTH = 2.5;			//nao esta a ser usado ?!
//physics
const WEIGHT = 10.0;

const R_AIR = 4.4257;
const R_R = 12.8;
const R_WHEEL = 0.85;

const TURN = 0.1;
const ACELERATE_FRONT = 10;
const ACELERATE_BACK = 5;

const WHEELROTATION = 0.3;

class MyVehicle extends CGFobject
{
	constructor(scene)
	{
    super(scene);
    	this.tire = new Tire(scene, 100, 1);

		this.carChassis = new Car(scene);

		this.engineForce = 0;

		this.position = [0, 0, 0];
		this.velocity = [0, 0, 0];
		this.direction = [0, 0, 0];
		this.angle = 0;

		this.vehicleAngle = 0;
		this.previousTime = 0;

		this.distance = 0;

		this.onCrane = false;

		//============================================== ZONA PARA TESTES ===============================================

		this.wheelRotationRadius = 0;


		//===============================================================================================================

	};

	update(currTime){



		var deltaTime = 60/1000;

		var direction = [Math.cos(this.vehicleAngle), 0, -Math.sin(this.vehicleAngle)];
		var traction = [];

		for(var i = 0; i < 3; i++){
			traction[i] = this.engineForce*direction[i] -  R_AIR*(Math.abs(this.velocity[i]) * this.velocity[i]) - R_R*this.velocity[i];
		}


		var aceleration = [];

		for(var i = 0; i < 3; i++){
			aceleration[i] = traction[i]/10;
		}

		for(var i = 0; i < 3; i++){
			this.velocity[i] += deltaTime*aceleration[i];
		}

		var positionTemp = [this.position[0], this.position[1], this.position[2]];
		for(var i = 0; i < 3; i++){
			positionTemp[i] += deltaTime*this.velocity[i];
		}

		if(!this.isPositionValid(positionTemp)) {
			this.velocity = [0,0,0];
			this.engineForce = -this.engineForce;
			return;
		}

		for(var i = 0; i < 3; i++){
			this.position[i] = positionTemp[i];
		}

		var R = LENGHT/Math.sin(this.angle);

		var speed = Math.sqrt(this.velocity[0]*this.velocity[0] + this.velocity[2]*this.velocity[2]);

		var scalarProduct = 0;

		for(var i = 0; i < 3; i++){
			scalarProduct += this.velocity[i] * direction[i];
		}

		this.forward = Math.sign(scalarProduct);

		var angularVelocity = this.forward*speed / R;

		this.vehicleAngle += deltaTime*angularVelocity;

		this.angle = this.angle*R_WHEEL;

		this.distance += speed*deltaTime;


		if(speed < 0.05)
		return;

		var amp = (this.vehicleAngle+2*Math.PI*1000)%(2*Math.PI);

		if(amp <= Math.PI/4 || amp >= Math.PI*(7/4))
		{
			//console.log("x pos");
			if(this.velocity[0] > 0)
			{
				this.incrementWheelAngle(true,speed*deltaTime);
			}
			else
			{
				this.incrementWheelAngle(false,speed*deltaTime);
			}
		}
		if(amp <= Math.PI*(5/4) && amp >= Math.PI*(3/4))
		{
			//console.log("x neg");
			if(this.velocity[0] < 0)
			{
				this.incrementWheelAngle(true,speed*deltaTime);
			}
			else
			{
				this.incrementWheelAngle(false,speed*deltaTime);
			}
		}
		if(amp <= Math.PI*(7/4) && amp >= Math.PI*(5/4))
		{
			//console.log("z pos");
			if(this.velocity[2] > 0)
			{
				this.incrementWheelAngle(true,speed*deltaTime);
			}
			else
			{
				this.incrementWheelAngle(false,speed*deltaTime);
			}
		}
		if(amp <= Math.PI*(3/4) && amp >= Math.PI*(1/4))
		{
			//console.log("z neg");
			if(this.velocity[2] < 0)
			{
				this.incrementWheelAngle(true,speed*deltaTime);
			}
			else
			{
				this.incrementWheelAngle(false,speed*deltaTime);
			}
		}



		//console.log(amp);


		//===============================================================================================================
	}

	incrementWheelAngle(isInc,dist)
	{
		var ang = 2*Math.PI*dist/PERIMETER;
		if(isInc)
		{
			this.wheelRotationRadius += ang;
		}
		else
		{
			this.wheelRotationRadius -= ang;
		}
	}

	display()
		{
			this.scene.pushMatrix();

			this.scene.translate(this.position[0], this.position[1], this.position[2]);
			this.scene.rotate(this.vehicleAngle, 0, 1 ,0);

			this.scene.pushMatrix();
			this.scene.translate(0.1,0.025,0);
			this.carChassis.display();
			this.scene.popMatrix();

			this.scene.translate(-LENGHT/2,0.025,0);


				//Back Right
	      this.scene.pushMatrix();
	      this.scene.translate(0,0,AXIS/2);
				this.scene.rotate(-this.wheelRotationRadius, 0, 0, 1);
	      this.scene.scale(DIAMETER,DIAMETER,0.5);
	      this.tire.display();
	      this.scene.popMatrix();


				//Back Left
	      this.scene.pushMatrix();
	      this.scene.translate(0,0,-AXIS/2);
	      this.scene.rotate(Math.PI, 0, 0, 1);
	      this.scene.rotate(Math.PI, 1, 0, 0);
				this.scene.rotate(this.wheelRotationRadius, 0, 0, 1);
				this.scene.scale(DIAMETER,DIAMETER,0.5);
	      this.tire.display();
	      this.scene.popMatrix();

				//Front Right
	      this.scene.pushMatrix();
	      this.scene.translate(LENGHT,0,0);
	      this.scene.translate(0,0,AXIS/2);
				this.scene.rotate(this.angle, 0, 1, 0);
				this.scene.rotate(-this.wheelRotationRadius, 0, 0, 1);
				this.scene.scale(DIAMETER,DIAMETER,0.5);
	      this.tire.display();
	      this.scene.popMatrix();

				//Front Left
	      this.scene.pushMatrix();
	      this.scene.translate(LENGHT,0,0);
	      this.scene.translate(0,0,-AXIS/2);
	      this.scene.rotate(Math.PI, 0, 0, 1);
	      this.scene.rotate(Math.PI, 1, 0, 0);
				this.scene.rotate(this.angle, 0, 1, 0);
				this.scene.rotate(this.wheelRotationRadius, 0, 0, 1);
				this.scene.scale(DIAMETER,DIAMETER,0.5);
	      this.tire.display();
	      this.scene.popMatrix();

				this.scene.popMatrix();

				this.scene.materialDefault.apply();
		};

	isPositionValid(positionTemp){
		var dimension = 50;
		var nrDivs = this.scene.altimetry.length;

		var posX = positionTemp[0] + dimension/2;
		var posZ = positionTemp[2] + dimension/2;


		if(posX > dimension || posZ > dimension || posX < 0 || posZ < 0){
			return false;
		}

		var indexX = posX / dimension * nrDivs;
		var indexZ = posZ / dimension * nrDivs;
		return (this.scene.altimetry[Math.floor(indexZ)][Math.floor(indexX)] == 0);
	}


	acelerate_front(){
		this.engineForce += ACELERATE_FRONT;
	}

	acelerate_back(){
		this.engineForce -= ACELERATE_BACK;

	}

	turnLeft(){
		this.angle += TURN;
	}

	turnRight(){
		this.angle -= TURN;
	}

};
