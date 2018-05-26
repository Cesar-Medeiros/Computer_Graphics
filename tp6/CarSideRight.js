/**
 * CarSideRight
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class CarSideRight extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.N = 5;

		this.part1 = new MyTrap(scene,7,-1,0,
									  0,3,1,
									  7,2,1,this.N);
		this.part2 = new MyTrap(scene, 7,-1,0,
										0,1,-1,
										7,0.5,-1,this.N);

		this.part3 = new MyTrap(scene, 3,-1,1,
										0,1,-1,
										3,0,0,this.N);

		this.part4 = new MyTrap(scene, 3,0,0,
										0,4,0,
										3,3,1,this.N);

		this.part11 = new MyTrap(scene, 7.3,0,0,
										0.3,1,0,
										7.3,0,0,this.N);

		this.part13 = new MyTrap(scene ,7,0,-0.75,
										-0.3,0,-0.75,
										7,0,-0.75,this.N);

		this.part14 = new MyTrap(scene,3,0,0.75,
										0,1,0,
										3,1,0,this.N);

		this.part15 = new MyTrap(scene,1,0,-1,
										0,1.5,-1,
										1,1.5,-1,this.N);

		this.part16 = new MyTrap(scene,1,0,0,
										0,3,1,
										1,3,0,this.N);


		this.part17 = new MyTrap(scene,1,0,0,
										-2,2.25,-1,
										-2,3,-1,this.N);

		this.part18 = new MyTrap(scene,8,0,0,
										0,0.75,0,
										8,0.75,0,this.N);

		this.part19 = new MyTrap(scene,0.5,-0.2,0.165,
										0,0.75,0,
										0.5,0.75,0,this.N);

		this.window1 = new MyTrap(scene, 7,-0.5,0,
										0,1.75,-1,
										5,1.75,-1,this.N);

		this.window2 = new MyTrap(scene, 2.5,-0.8,1-0.165,
											0,0.95,-0.165,
											2.75,0.95,-0.165,this.N);

		this.airVent = new MyTrap(scene,-0.3,0,-0.75,
											0,0,0,
											0,1,-0.75,this.N);

		this.mirrorArm = new MyCylinder(scene,8,20);

		this.mirrorCap = new MyHalfSphere(scene,20,20,0,1,0,1);

		this.mirror = new MyCircle(scene,20);



	};

	display()
	{
		this.scene.pushMatrix();

			this.scene.translate(1.5,3,-4);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.translate(-5,0,4.1);
			this.scene.scale(0.5,0.5,0.7);
			this.mirrorCap.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
			this.scene.translate(6,3,10);
			this.scene.scale(0.5,0.5,1);
			this.mirrorArm.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,-1,0.75);
			this.airVent.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.part1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,3,1);
			this.part2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-3,4,0);
			this.part3.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-3,0,0);
			this.part4.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-0.3,-1,0);
			this.part11.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,-1,0.75);
			this.part13.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-3,-1,0);
			this.part14.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(7,2,1);
			this.part15.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(7,-1,0);
			this.part16.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(7,3.5,0);
			this.part17.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-3,5.75,-1);
			this.part18.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-3,5,-1);
			this.part19.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-3,5,-1);
			this.part19.display();
		this.scene.popMatrix();

		//PRINT IN BLACK START =============================
		this.scene.blackMat.apply();

			this.scene.pushMatrix();
				this.scene.translate(0,4,0);
				this.window1.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(-2.5,5-0.2,-1+0.165);
				this.window2.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(5.6,3,1);
				this.scene.rotate(-Math.PI/2,0,1,0);
				this.scene.scale(1,1,1);
				this.mirror.display();
			this.scene.popMatrix();

	};

};
