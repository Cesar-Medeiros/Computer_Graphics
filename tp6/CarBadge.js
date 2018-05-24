/**
 * CarBadge
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class CarBadge extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		//left bottom
		this.badge0 = new MyTextQuad(scene,	0,		0,
											-0.5,	0.5,
											0,		0.5,

									0,0.5,0.5,1);

		//left top
		this.badge1 = new MyTextQuad(scene,	0.4,0,
											-0.1,0.5,
											0.4,0.5,
									0.1,0.5,0.1,0.5);

		
		this.badge2 = new MyTextQuad(scene,1,0,0,1,1,1,
									0,1,0,1);

		this.initBuffers();
	};

	display(){

		this.scene.lamboMat.apply();

		this.scene.pushMatrix();
			this.badge0.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-0.4,0.5,0);
			this.badge1.display();
		this.scene.popMatrix();
	}
};
