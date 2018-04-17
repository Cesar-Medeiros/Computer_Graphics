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
		this.hour = 3;
		this.min = 30;
		this.sec = 45;
		this.mil = 0;

		//clock
		this.cylinder = new MyCylinder(scene,slices,stacks);
		this.circle = new MyCircle(scene,slices);
		this.hourH = new MyClockHand(scene,slices,stacks,0.6,0.03);
		this.minH = new MyClockHand(scene,slices,stacks,0.75,0.02);
		this.secH = new MyClockHand(scene,slices,stacks,0.8,0.01);
	};

	display()
	{
		this.scene.pushMatrix();

		this.scene.scale(1,1,1/5);
		//this.scene.translate(0,0,1);
		//this.scene.rotate(Math.PI,1,0,0);
		this.cylinder.display();
		this.scene.materialClock.apply();
		//this.scene.rotate(Math.PI,1,0,0);
		this.scene.translate(0,0,1);
		this.circle.display();
		this.scene.materialDefault.apply();
		this.hourH.display();
		this.minH.display();
		this.secH.display();
		this.scene.popMatrix();

	};

	update(milisec)
	{
		this.increment(milisec);
		this.hourH.setAngle(0.5*(60*this.hour+this.min));
		this.minH.setAngle(6*this.min);
		this.secH.setAngle(6*this.sec);
	}

	increment(milisec)
	{
		this.mil += milisec;
		if(this.mil >= 1000)
		{
			this.mil = 0;
			this.sec += 1;
		}
		if(this.sec >= 60)
		{
			this.sec = 0;
			this.min += 1;
		}
		if(this.min >= 60)
		{
			this.min = 0;
			this.hour += 1;
		}
		this.hour %= 12;
	}

};
