/**
 * MyTerrain
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTerrain extends CGFobject
{
	constructor(scene, nrDivs, altimetry)
	{
        super(scene);
        this.plane = new Plane(scene, nrDivs, altimetry, -5,5, -5,5);

        this.terrainAppearance = new CGFappearance(this.scene);
        this.terrainAppearance.setAmbient(0.2,0.2,0.2,1);
        this.terrainAppearance.setDiffuse(0.9,0.9,0.9,1);
        this.terrainAppearance.setSpecular(0.1,0.1,0.1,1);
        this.terrainAppearance.setShininess(1);
        this.terrainAppearance.loadTexture("resources/images/grass.jpg");
        this.terrainAppearance.setTextureWrap('REPEAT','REPEAT');

        this.materialDefault = new CGFappearance(this.scene);
	};

	display()
	{
        this.terrainAppearance.apply();
        this.scene.pushMatrix();
        this.scene.scale(50, 1, 50);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();
        this.materialDefault.apply();
	};
};
