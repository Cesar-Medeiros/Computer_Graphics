/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject
{
	constructor(scene, slices, stacks)
	{
    super(scene);

    //N Arestas base
    this.slices = slices;
    this.stacks = stacks;
    this.indices = [];
    this.vertices = [];
    this.normals = [];
    this.h = 1/stacks;
    this.angle = 2*Math.PI/slices;
    this.initBuffers();
	};

	initBuffers()
	{
    this.fillVertices();
    this.fillIndex();

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};


  fillVertices(){

		for(var i = 0; i < this.slices; i++){
			var angleVertice = i*this.angle;
			var angleNormal = angleVertice + this.angle/2;

			var x1 = Math.cos(angleVertice);
			var y1 = Math.sin(angleVertice);

			var x2 = Math.cos(angleVertice + this.angle);
			var y2 = Math.sin(angleVertice + this.angle);

			var xNormal = Math.cos(angleNormal);
			var yNormal = Math.sin(angleNormal);

			for(var j = 0; j < this.stacks + 1; j++){
				this.vertices.push(x1, y1, this.h*j);
				this.normals.push(xNormal, yNormal, 0);
			}

			for(var j = 0; j < this.stacks + 1; j++){
				this.vertices.push(x2, y2, this.h*j);
				this.normals.push(xNormal, yNormal, 0);
			}

		}
  };

  fillIndex(){

			var V = 2*(this.stacks + 1);

			for(var i = 0; i < this.slices; i++){

				var baseV = i*V;

				for(var j = 0; j < this.stacks; j++){

					var currentV = baseV + j;

					this.indices.push(currentV, currentV + V/2, currentV + 1);
					this.indices.push(currentV + 1, currentV + V/2, currentV + V/2 + 1);
				}

			}

	};

};
