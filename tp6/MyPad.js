/**
 * MyPad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


class MyPad extends CGFobject
{
	constructor(scene, nrDivs, length , width)
	{
    super(scene);
    this.plane = new Plane(scene, nrDivs);
    this.length = length;
    this.width = width;
	};


	display()
	{
    this.scene.pushMatrix();
    this.scene.scale(this.length, 0, this.width);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.plane.display();
    this.scene.popMatrix();
	};

};
