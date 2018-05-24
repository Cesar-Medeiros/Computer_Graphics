/**
 * CarBack
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class CarBack extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.N = 5;

		this.p1 = new MyTrap(scene,0,0,6,
							 0,1.5,0,
							 0,1.5,6,this.N);

		this.p2 = new MyTrap(scene,0,0,8,
									0,1,1,
									0,1,7,this.N);

		//parte de baixo na vertical
		this.p3 = new MyTrap(scene,0,0,8,
									0,0.5,0,
									0,0.5,8,this.N);

		//parte de cima 
		this.p4 = new MyTrap(scene,0,0,8,
									6.5,0,0,
									6.5,0,8,this.N);


		this.p5 = new MyTrap(scene,2,0,0,
									0,4.5,0,
									2,4.5,0,this.N);

		this.p6 = new MyTrap(scene,0,0,8,
									0,4.5,0,
									0,4.5,8,this.N);
	};

	display()
	{
		// ======================== | CHANGE TEXTURE FROM INTERFACE | ======================

		this.scene.pushMatrix();
			this.scene.translate(-3,5,-3);
			this.p1.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(-3,4,-4);
			this.p2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-3,3.5,-4);
			this.p3.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-9.5,3.5,-4);
			this.p4.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-9.5,-1,4);
			this.p5.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-7.5,-1,-4);
			this.scene.rotate(Math.PI,0,1,0);
			this.p5.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-9.5,-1,-4);
			this.p6.display();
		this.scene.popMatrix();
	};

};
