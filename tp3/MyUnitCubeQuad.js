/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCubeQuad extends CGFobject
{
	constructor(scene)
	{
		super(scene);
    this.quad = new MyQuad(scene);
    this.quad.initBuffers();
  };


  display(){

    //Z = +0.5
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.quad.display();
    this.scene.popMatrix();

    //Z = -0.5
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.5);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //X = +0.5
    this.scene.pushMatrix();
    this.scene.translate(0.5, 0, 0);
    this.scene.rotate(Math.PI/2, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //X = -0.5
    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0, 0);
    this.scene.rotate(-Math.PI/2, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //Y = +0.5
    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    //Y = -0.5
    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 0);
    this.scene.rotate(Math.PI/2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    }

};
