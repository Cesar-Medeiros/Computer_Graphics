/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClockHand extends CGFobject
{
	constructor(scene,slices,stacks,length = 1,width = 0.05)
	{
		super(scene);
		this.angle = 0;
		this.setAngle(this.angle);
		this.length = length;
		this.width = width;

		
	
		//clock
		this.cylinder = new MyCylinder(scene,slices,stacks);
		this.circle = new MyCircle(scene,slices);
	};

	display()
	{
		this.scene.pushMatrix();
		this.scene.blackMat.apply();
		this.scene.rotate(this.angle,0,0,1);
		this.scene.scale(this.width,this.length,this.width);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.translate(0,0,1);
		this.scene.rotate(Math.PI,1,0,0);
		this.cylinder.display();
		//this.scene.materialClock.apply();
		this.scene.rotate(Math.PI,1,0,0);
		this.circle.display();
		this.scene.materialDefault.apply();
		this.scene.popMatrix();
	};

	setAngle(angle)
	{
		var angleInRad = angle*Math.PI/180;
		this.angle = - angleInRad;
	}

};
