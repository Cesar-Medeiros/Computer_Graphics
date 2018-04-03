/**
 * myTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTable extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.cube = new MyUnitCubeQuad(scene);
    this.cube.initBuffers();

		this.materialT = new CGFappearance(this.scene);
		this.materialT.setAmbient(0.521568627,0.368627451,0.258823529,1);
		this.materialT.setDiffuse(0.521568627,0.368627451,0.258823529,1);
		this.materialT.setSpecular(0,0,0,1);
		this.materialT.setShininess(1);
		this.materialT.loadTexture("resources/images/table.png");

		this.materialP = new CGFappearance(this.scene);
		this.materialP.setAmbient(0.23125,0.23125,0.23125,1);
		this.materialP.setDiffuse(0.2775,0.2775,0.2775,1);
		this.materialP.setSpecular(0.773911,0.773911,0.773911,1);
		this.materialP.setShininess(89.6);

		this.materialDefault = new CGFappearance(this.scene);
	};

  display(){

		this.materialT.apply();


    this.scene.pushMatrix();
    this.scene.translate(0, 3.5/2, 0);


    //Tampo
    this.scene.pushMatrix();
    this.scene.translate(0, 0.3/2, 0);
    this.scene.translate(0, 3.5/2, 0);
    this.scene.scale(5, 0.3, 3);
    this.cube.display();
    this.scene.popMatrix();

		this.materialP.apply();

		//Perna 1
    this.scene.pushMatrix();
    this.scene.translate(0.3/2, 0, 0.3/2);
    this.scene.translate(-5/2, 0, -3/2);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

		//Perna 2
    this.scene.pushMatrix();
    this.scene.translate(-0.3/2, 0, -0.3/2);
    this.scene.translate(5/2, 0, 3/2);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

		//Perna 3
    this.scene.pushMatrix();
    this.scene.translate(-0.3/2, 0, 0.3/2);
    this.scene.translate(5/2, 0, -3/2);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

		//Perna 4
    this.scene.pushMatrix();
    this.scene.translate(0.3/2, 0, -0.3/2);
    this.scene.translate(-5/2, 0, 3/2);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
		this.materialDefault.apply();
  }

};
