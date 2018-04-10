/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClock extends CGFobject
{
	constructor(scene,slices,stacks)
	{
		super(scene);
		//this.slices = slices;
		//this.stacks = stacks;

		//clock
		this.cylinder = new MyCylinder(scene,slices,stacks);
		this.circle = new MyCircle(scene,slices);
	};

	display()
	{
		this.scene.pushMatrix();

		this.scene.scale(1,1,1/5);
		this.scene.translate(0,0,1);
		this.scene.rotate(Math.PI,1,0,0);
		this.cylinder.display();
		this.scene.materialClock.apply();
		this.scene.rotate(Math.PI,1,0,0);
		this.circle.display();
		this.scene.popMatrix();
	};
};
