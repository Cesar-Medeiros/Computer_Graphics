/**
 * Tire
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class Tire extends CGFobject
{
	constructor(scene,slices,stacks)
	{
		super(scene);
	  this.cylinder = new MyCylinder(scene,slices,stacks, -5, 5);
    this.circle = new MyCircle(scene,slices);

    this.tireAppearance = new CGFappearance(this.scene);
    this.tireAppearance.setAmbient(0.2,0.2,0.2,1);
    this.tireAppearance.setDiffuse(0.9,0.9,0.9,1);
    this.tireAppearance.setSpecular(0.1,0.1,0.1,1);
    this.tireAppearance.setShininess(1);
    this.tireAppearance.loadTexture("resources/images/tire.png");
    this.tireAppearance.setTextureWrap('REPEAT','REPEAT');

    this.wheelAppearance = new CGFappearance(this.scene);
    this.wheelAppearance.setAmbient(0.2,0.2,0.2,1);
    this.wheelAppearance.setDiffuse(0.9,0.9,0.9,1);
    this.wheelAppearance.setSpecular(0.1,0.1,0.1,1);
    this.wheelAppearance.setShininess(1);
    this.wheelAppearance.loadTexture("resources/images/wheel.png");

    this.materialDefault = new CGFappearance(this.scene);
	};

	display()
	{

		this.scene.pushMatrix();
		this.wheelAppearance.apply();
		this.scene.translate(0,0,0.5);
		this.circle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.tireAppearance.apply();
		this.cylinder.display();
		this.scene.popMatrix();

	};

	update(milisec)
	{

	}
};
