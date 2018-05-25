/**
 * CarBot
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class CarBot extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.N = 5;
		
		this.mainFrame = new MyTrap(scene,0,0,-4,
											25,0,0,
											25,0,-4,this.N);

		this.sideFrame = new MyTrap(scene,0,0,-2,
											12,0,0,
											12,0,-2,this.N);

		this.frontFrame = new MyTrap(scene,0,0,-2,
											3.5,0,0,
											3.5,0,-2,this.N);
		
		this.backFrame = new MyTrap(scene,0,0,-2,
											2.5,0,0,
											2.5,0,-2,this.N);

		this.leftTriangle = new MyTrap(scene,10,0,0,
										0,0,0,
										3,0,0.75,this.N);

		this.rightTriangle = new MyTrap(scene,
										0,0,0,
										10,0,0,
										3,0,-0.75,this.N);								

											
	};

	display()
	{
		//PRINT IN BLACK START =============================
		this.scene.blackMat.apply();

			this.scene.pushMatrix();
				this.scene.translate(-9.5,-1,2);
				this.mainFrame.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(-3.5,-1,-2);
				this.sideFrame.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(-3.5,-1,4);
				this.sideFrame.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(12,-1,4);
				this.frontFrame.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(12,-1,-2);
				this.frontFrame.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(-9.5,-1,-2);
				this.backFrame.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(-9.5,-1,4);
				this.backFrame.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(-3,-1,4);
				this.leftTriangle.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(-3,-1,-4);
				this.rightTriangle.display();
			this.scene.popMatrix();

		// ======================== | CHANGE TEXTURE FROM INTERFACE | ======================
		this.scene.color_yellow.apply();
		// ======================== | CHANGE TEXTURE FROM INTERFACE | ======================
		//PRINT IN BLACK END ===============================

	};

};
