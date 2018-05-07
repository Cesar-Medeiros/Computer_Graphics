/**
 * MyVehicle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

const LENGHT = 5;
const AXIS = 2.5;
const DIAMETER = 0.9;
const WIDTH = 2.5;
const HEIGHT = 2.0;

class MyVehicle extends CGFobject
{
	constructor(scene)
	{
        super(scene);
        this.tire = new Tire(scene, 100, 2);
	};

	display()
	{
        this.scene.pushMatrix();
        this.scene.translate(0,0,AXIS/2);
        this.scene.scale(DIAMETER,DIAMETER,1);
        this.tire.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0,0,-AXIS/2);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(DIAMETER,DIAMETER,1);
        this.tire.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(LENGHT,0,0);
        this.scene.translate(0,0,AXIS/2);
        this.scene.scale(DIAMETER,DIAMETER,1);
        this.tire.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(LENGHT,0,0);
        this.scene.translate(0,0,-AXIS/2);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(DIAMETER,DIAMETER,1);
        this.tire.display();
        this.scene.popMatrix();
	};
};
