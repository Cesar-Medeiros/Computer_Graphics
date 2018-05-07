/**
 * MyPaperPlane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPaperPlane extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.triangle = new MyTriangle(scene);
	};


	display(){

		var angle = 15 * Math.PI / 180;

		this.scene.pushMatrix();
		this.scene.rotate(angle, 1, 0, 0);
		this.scene.scale(1, 0.35, 1);
		this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(-angle, 1, 0, 0);
		this.scene.scale(1, 0.35, 1);
		this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(1, 0, 0);
		this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.triangle.display();
		this.scene.popMatrix();
	}

};
