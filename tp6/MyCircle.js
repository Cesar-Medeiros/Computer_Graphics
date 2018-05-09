/**
 * MyCircle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCircle extends CGFobject
{
	constructor(scene, slices)
	{
		super(scene);
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];
		this.slices = slices;
		this.angle = 2*Math.PI/slices;

		this.initBuffers();
	};

	initBuffers()
	{
		this.fillVertices();
		this.fillIndices();
		this.fillTextCoords();

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

	fillVertices()
	{
		for(var i = 0; i < this.slices; i++){
			var angleVertice = i*this.angle;
			var x = Math.cos(angleVertice);
			var y = Math.sin(angleVertice);
			this.vertices.push(x,y,0);
			this.normals.push(0,0,1);
		}
		this.vertices.push(0,0,0);
		this.normals.push(0,0,1);
	};

	fillIndices(){
		for(var i = 0; i < this.slices-1 ;i++){
			this.indices.push(i,i+1,this.slices);
		}
		this.indices.push(this.slices-1,0,this.slices);
	};

	fillTextCoords(){
		for(var i = 0; i < this.slices ; i++){
			var angleVertice = i*this.angle;
			var x = Math.cos(angleVertice);
			var y = Math.sin(angleVertice);
			this.texCoords.push(x/2+0.5,1-(y/2+0.5));
		}
		this.texCoords.push(0.5,0.5);
	};
};
