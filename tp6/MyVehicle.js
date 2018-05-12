/**
 * MyVehicle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

const LENGHT = 4.0;
const AXIS = 3.0;
const DIAMETER = 1.0;
const WIDTH = 2.5;
const HEIGHT = 2.0;
const WEIGHT = 10.0;

const R_AIR = 0.4257;
const R_R = 12.8;
const R_WHEEL = 0.85;

const TURN = 0.1;
const ACELERATE_FRONT = 10;
const ACELERATE_BACK = 5;

class MyVehicle extends CGFobject
{
	constructor(scene)
	{
    super(scene);
    this.tire = new Tire(scene, 100, 1);
		this.engineForce = 0;

		this.position = [0, 0, 0];
		this.velocity = [0, 0, 0];
		this.direction = [0, 0, 0];
		this.angle = 0;

		this.vehicleAngle = 0;
		this.previousTime = 0;

		this.distance = 0;
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

		for(var i = 0; i < 3; i++){
			this.position[i] += deltaTime*this.velocity[i];
		}

		var R = LENGHT/Math.sin(this.angle);

		var speed = Math.sqrt(this.velocity[0]*this.velocity[0] + this.velocity[2]*this.velocity[2]);

		var angularVelocity = ((this.engineForce >= 0) ? 1 : -1 )*speed / R;
		this.vehicleAngle += deltaTime*angularVelocity;

		this.angle = this.angle*R_WHEEL ;

		this.distance += speed*deltaTime;
	}

	display()
	{
			this.scene.pushMatrix();

			this.scene.translate(this.position[0], this.position[1], this.position[2]);
			this.scene.rotate(this.vehicleAngle, 0, 1 ,0);

			//Back Right
      this.scene.pushMatrix();
      this.scene.translate(0,0,AXIS/2);
			this.scene.rotate(-this.distance, 0, 0, 1);
      this.scene.scale(DIAMETER,DIAMETER,0.5);
      this.tire.display();
      this.scene.popMatrix();


			//Back Left
      this.scene.pushMatrix();
      this.scene.translate(0,0,-AXIS/2);
      this.scene.rotate(Math.PI, 0, 0, 1);
      this.scene.rotate(Math.PI, 1, 0, 0);
			this.scene.rotate(this.distance, 0, 0, 1);
			this.scene.scale(DIAMETER,DIAMETER,0.5);
      this.tire.display();
      this.scene.popMatrix();

			//Front Right
      this.scene.pushMatrix();
      this.scene.translate(LENGHT,0,0);
      this.scene.translate(0,0,AXIS/2);
			this.scene.rotate(this.angle, 0, 1, 0);
			this.scene.rotate(-this.distance, 0, 0, 1);
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
			this.scene.rotate(this.distance, 0, 0, 1);
			this.scene.scale(DIAMETER,DIAMETER,0.5);
      this.tire.display();
      this.scene.popMatrix();

			this.scene.popMatrix();
	};

	isPositionValid(){
		var dimension = 50;
		var nrDivs = this.scene.altimetry.length;

		var posX = this.position[0] + dimension/2;
		var posZ = this.position[2] + dimension/2;

		if(posX > dimension || posZ > dimension || posX < 0 || posZ < 0){
			return false;
		}

		var indexX = posX / dimension * nrDivs;
		var indexZ = posZ / dimension * nrDivs;

		console.log("Z: " + Math.floor(indexZ));
		console.log("X: " + Math.floor(indexX));
		console.log("Value: " + this.scene.altimetry[Math.floor(indexZ) - 1][Math.floor(indexX) - 1]);
		return (this.scene.altimetry[Math.floor(indexZ) - 1][Math.floor(indexX) - 1] == 0);
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
