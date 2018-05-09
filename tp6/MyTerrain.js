/**
 * MyTerrain
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTerrain extends CGFobject
{
	constructor(scene)
	{
        super(scene);
        this.plane = new Plane(scene, 100);

        this.terrainAppearance = new CGFappearance(this.scene);
        this.terrainAppearance.setAmbient(0.2,0.2,0.2,1);
        this.terrainAppearance.setDiffuse(0.9,0.9,0.9,1);
        this.terrainAppearance.setSpecular(0.1,0.1,0.1,1);
        this.terrainAppearance.setShininess(1);
        this.terrainAppearance.loadTexture("resources/images/road.png");
        this.terrainAppearance.setTextureWrap('REPEAT','REPEAT');

        this.materialDefault = new CGFappearance(this.scene);
	};

	display()
	{
        this.scene.pushMatrix();
        this.terrainAppearance.apply();
        this.scene.scale(50, 1, 50);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.plane.display();
        this.materialDefault.apply();
        this.scene.popMatrix();
	};
};
