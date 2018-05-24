/**
 * CarFront
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class CarFront extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.N = 5;
		this.scene = scene;

		this.p1 = new MyTrap(scene,0,0,-0.5,
							 -3,3,-1,
							 -3,3,-1.5,this.N);

		this.p2 = new MyTrap(scene,4.5,0,0,
									0,0,-0.5,
									4.5,0,-0.5, this.N);

		this.p3 = new MyTrap(scene, 0,0,-0.5,
									-3,3,1,
									-3,3,0.5, this.N);
	
		this.p4 = new MyTrap(scene,0,0,7,
									4.5,0,0,
									4.5,0,7,this.N);
						
		this.p5 = new MyTrap(scene,3,0,0,
									0,4.5,0,
									3,3,0,this.N);

		this.p6 = new MyTrap(scene,0,0,-8,
									-3,1.5,0,
									-3,1.5,-8,this.N);

		this.p7 = new MyTrap(scene,0,0,-8,
									0,3,0,
									0,3,-8,this.N);

		this.p8 = new MyTrap(scene,-3,0,0,
									0,3,0,
									-3,4.5,0,this.N);

		this.p9 = new MyTrap(scene,0,0,-5.5 ,
									-0.5,0.5,0,
									-0.5,0.5,-5.5,this.N);


		this.frontWindow1 = new MyTrap(scene,0.5,0,-0.75-1.5,
											-2.5,2.5,-0.75,
											-2.5,2.5,-0.75-1.5,this.N);

		this.frontWindow2 = new MyTrap(scene,0,0,-2.5,
											-3,2.5,0,
											-3,2.5,-2.5,this.N);

		this.frontWindow3 = new MyTrap(scene,-0.5,0,-2.25,
												-3,2.5,0,
												-3,2.5,-1.5,this.N);
	
	};

	display()
	{

		

		
		this.scene.blackMat.apply();

		this.scene.pushMatrix();
			this.scene.translate(8,3.5,3.5);
			this.frontWindow1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(8.5,3.5,1.25);
			this.frontWindow2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(8.5,3.5,1.25-2.5);
			this.frontWindow3.display();
		this.scene.popMatrix();


		// ======================== | CHANGE TEXTURE FROM INTERFACE | ======================
		this.scene.color_yellow.apply();
		// ======================== | CHANGE TEXTURE FROM INTERFACE | ======================


		
		
		//braço esquerda do vidro
		this.scene.pushMatrix();
			this.scene.translate(8,3.5,4);
			this.p1.display();
		this.scene.popMatrix();

		//braço em cima do pneu esquerdo
		this.scene.pushMatrix();
			this.scene.translate(8,3.5,4);
			this.p2.display();
		this.scene.popMatrix();

		//braço em cima do pneu direito
		this.scene.pushMatrix();
			this.scene.translate(8,3.5,-3.5);
			this.p2.display();
		this.scene.popMatrix();

		//braco direito do vidro
		this.scene.pushMatrix();
			this.scene.translate(8,3.5,-3.5);
			this.p3.display();
		this.scene.popMatrix();

		//capo
		this.scene.pushMatrix();
			this.scene.translate(8,3.5,-3.5);
			this.p4.display();
		this.scene.popMatrix();

		//frente do pneu esquerdo
		this.scene.pushMatrix();
			this.scene.translate(8+4.5,-1,4);
			this.p5.display();
		this.scene.popMatrix();

		//parte da frente inclinada
		this.scene.pushMatrix();
			this.scene.translate(15.5,2,4);
			this.p6.display();
		this.scene.popMatrix();

		//fparte da frente na vertical
		this.scene.pushMatrix();
			this.scene.translate(15.5,-1,4);
			this.p7.display();
		this.scene.popMatrix();

		//frente do pneu direito
		this.scene.pushMatrix();
			this.scene.translate(15.5,-1,-4);
			this.p8.display();
		this.scene.popMatrix();

		//parte cima do vidro
		this.scene.pushMatrix();
			this.scene.translate(5.5,6,2.5+1/3);
			this.p9.display();
		this.scene.popMatrix();

	
	};

};
