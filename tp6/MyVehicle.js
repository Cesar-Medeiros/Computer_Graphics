/**
 * MyVehicle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

const LENGHT = 5;
const AXIS = 2.5;
const DIAMETER = 1.0;
const WIDTH = 2.5;
const HEIGHT = 2.0;

class MyVehicle extends CGFobject
{
	constructor(scene)
	{
        super(scene);
        this.tire = new Tire(scene, 100, 2);

				this.engineForce = 0;
				this.drag = 0.9;

				this.position = [0, 0, 0];
				this.velocity = [0, 0, 0];
				this.direction = [0, 0, 0];
				this.angle = Math.PI/2;

				this.vehicleAngle = 0;

				this.previousTime = 0;
	};

	update(currTime){

		var deltaTime = 60/1000;

		this.direction = [Math.cos(this.vehicleAngle), 0, Math.sin(this.vehicleAngle)];

		var traction = [];

		for(var i = 0; i < 3; i++){
			traction[i] = this.engineForce*this.direction[i];
		}


		var aceleration = [];

		for(var i = 0; i < 3; i++){
			aceleration[i] = traction[i]/10;
		}

		for(var i = 0; i < 3; i++){
			this.velocity[i] += deltaTime*aceleration[i];
			this.velocity[i] *= this.drag;
			console.log(this.velocity[i]);
		}

		for(var i = 0; i < 3; i++){
			this.position[i] += deltaTime*this.velocity[i];
		}


		this.R = LENGHT/Math.sin(Math.PI/2 - this.angle);

		var angularVelocity = Math.sqrt(this.velocity[0]*this.velocity[0] + this.velocity[2]*this.velocity[2]) / this.R;

		this.vehicleAngle += deltaTime*angularVelocity;
	}

	display()
	{
		var teste = Math.sqrt(this.velocity[0]*this.velocity[0] + this.velocity[2]*this.velocity[2]);

      this.scene.pushMatrix();
      this.scene.translate(0,0,AXIS/2);
      this.scene.scale(DIAMETER,DIAMETER,1);
			this.scene.rotate(-teste, 0, 0, 1);
      this.tire.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(0,0,-AXIS/2);
      this.scene.rotate(Math.PI, 0, 0, 1);
      this.scene.rotate(Math.PI, 1, 0, 0);
      this.scene.scale(DIAMETER,DIAMETER,1);
			this.scene.rotate(teste, 0, 0, 1);
      this.tire.display();
      this.scene.popMatrix();

			//Front Right
      this.scene.pushMatrix();
      this.scene.translate(LENGHT,0,0);
      this.scene.translate(0,0,AXIS/2);
      this.scene.scale(DIAMETER,DIAMETER,1);
			this.scene.rotate(-Math.PI/2 + this.angle, 0, 1, 0);
			this.scene.rotate(-teste, 0, 0, 1);
      this.tire.display();
      this.scene.popMatrix();

			//Front Left
      this.scene.pushMatrix();
      this.scene.translate(LENGHT,0,0);
      this.scene.translate(0,0,-AXIS/2);
      this.scene.rotate(Math.PI, 0, 0, 1);
      this.scene.rotate(Math.PI, 1, 0, 0);
      this.scene.scale(DIAMETER,DIAMETER,1);
			this.scene.rotate(-Math.PI/2 + this.angle, 0, 1, 0);
			this.scene.rotate(teste, 0, 0, 1);
      this.tire.display();
      this.scene.popMatrix();
	};
};
