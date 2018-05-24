/**
 * CarTyreWrap
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class CarTyreWrap extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.N = 2;

		this.spacing = 0.08;

		this.p1 = new MyTrap(scene,0.13-this.spacing,0,0,
									0,0.1,0,
									0.1-this.spacing,0.1,0,this.N);

		this.p2 = new MyTrap(scene,0.1-this.spacing,0,0,
									0,0.1,0,
									0.09-this.spacing,0.1,0,this.N);

		this.p3 = new MyTrap(scene,0.09-this.spacing,0,0,
									0,0.1,0,
									0.095-this.spacing,0.1,0,this.N);

		this.p4 = new MyTrap(scene,0.095-this.spacing,0,0,
									0,0.1,0,
									0.115-this.spacing,0.1,0,this.N);

		this.p5 = new MyTrap(scene,0.115-this.spacing,0,0,
									0,0.1,0,
									0.155-this.spacing,0.1,0,this.N);

		this.p6 = new MyTrap(scene,0.155-this.spacing,0,0,
									0,0.1,0,
									0.225-this.spacing,0.1,0,this.N);

		this.p7 = new MyTrap(scene,0.225-this.spacing,0,0,
									0,0.1,0,
									0.35-this.spacing,0.1,0,this.N);

		this.p8 = new MyTrap(scene,0.35-this.spacing,0,0,
									0,0.04,0,
									0.5-this.spacing,0.04,0,this.N);

		this.p9 = new MyTrap(scene,0.5-this.spacing,0,0,
									0,0.06,0,
									0.5-this.spacing,0.06,0,this.N);

		this.p10 = new MyTrap(scene, 0.42-0.15,0,0,
									-0.15,0.04,0,
									0.42-0.15,0.04,0,this.N);

		this.p11 = new MyTrap(scene,0.145,0,0,
									-0.125,0.1,0,
									0.145,0.1,0,this.N);

		this.p12 = new MyTrap(scene,0.075,0,0,
									0.075-0.145,0.1,0,
									0.075,0.1,0,this.N);

		this.p13 = new MyTrap(scene,0.035,0,0,
									-0.04,0.1,0,
									0.035,0.1,0,this.N);

		this.p14 = new MyTrap(scene,0.02,0,0,
									-0.015,0.1,0,
									0.02,0.1,0,this.N);

		this.p15 = new MyTrap(scene, 0.01,0,0,
									-0.01,0.1,0,
									0.01,0.1,0,this.N);

		this.p16 = new MyTrap(scene,0.02,0,0,
									0.01,0.1,0,
									0.02,0.1,0,this.N);

		this.p17 = new MyTrap(scene,0.05,0,0,
									0.03,0.1,0,
									0.05,0.1,0,this.N);

		this.rim1 = new MyTrap(scene,0.08,0,0,
									0,0.8,0,
									0.08,0.8,0,this.N);

		this.rim2 = new MyTrap(scene,1,0,0,
									0,0.2,0,
									1,0.2,0,this.N);

		
		
	};

	display()
	{
		// ======================== | CHANGE TEXTURE FROM INTERFACE | ======================

		// ======================== | CHANGE TEXTURE FROM INTERFACE | ======================

		this.scene.translate(this.spacing,0,0);
		
		this.scene.pushMatrix();
			this.scene.translate(0,0,0);
			this.p1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,0.1,0);
			this.p2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,0.2,0);
			this.p3.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(0,0.3,0);
			this.p4.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,0.4,0);
			this.p5.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,0.5,0);
			this.p6.display();
		this.scene.popMatrix();
	
		this.scene.pushMatrix();
			this.scene.translate(0,0.6,0);
			this.p7.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,0.7,0);
			this.p8.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,0.74,0);
			this.p9.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.42,0.74,0);
			this.p9.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.42 + 0.15,0.7,0);
			this.p10.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.42 + 0.15 + 0.125,0.6,0);
			this.p11.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.42 + 0.15 + 0.125+0.07,0.5,0);
			this.p12.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.42 + 0.15 + 0.125+0.07+0.04,0.4,0);
			this.p13.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.42 + 0.15 + 0.125+0.07+0.04 + 0.015,0.3,0);
			this.p14.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.42 + 0.15 + 0.125+0.07+0.04 + 0.015 + 0.01,0.2,0);
			this.p15.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(0.42 + 0.15 + 0.125+0.07+0.04 + 0.015 + 0.005-0.005 ,0.1,0);
			this.p16.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.42 + 0.15 + 0.125+0.07+0.04 + 0.015 + 0.005-0.005-0.03 ,0,0);
			this.p17.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-0.08,0,0);
			this.rim1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.84,0,0);
			this.rim1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-0.08,0.8,0);
			this.rim2.display();
		this.scene.popMatrix();
	};

};
