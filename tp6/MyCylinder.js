/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
{
	constructor(scene, slices, stacks, minS = 0, maxS = 1, minT = 0, maxT = 1)
	{
    super(scene);

    //N Arestas base
    this.slices = slices;
    this.stacks = stacks;
    this.indices = [];
    this.vertices = [];
    this.normals = [];
		this.texCoords = [];

		this.minS = minS;
		this.maxS = maxS;
		this.minT = minT;
		this.maxT = maxT;

		this.ds = (this.maxS - this.minS) / this.slices;
		this.dt = (this.maxT - this.minT) / this.stacks;
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

			var x = Math.cos(angleVertice)/2;
			var y = Math.sin(angleVertice)/2;

			for(var j = 0; j <= this.stacks; j++){
				this.vertices.push(x, y, this.h*j-this.stacks/2);
				this.texCoords.push(this.ds*i, this.dt*j);
				this.normals.push(x, y, 0);
			}
		}
  };

  fillIndex(){
  	for(var i = 0; i < this.slices; i++){
  		for(var j = 0; j < this.stacks; j++){
        var v1,v2,v3,v4;
        var ind = (this.stacks + 1)*i + j;

        if(i + 1 != this.slices){
  				v1 = ind;
  				v2 = ind + this.stacks + 1;
  				v3 = ind + this.stacks + 2;
  				v4 = ind + 1;
        }
        else{
          v1 = ind;
					v2 = j
  				v3 = j + 1;
          v4 = ind + 1;
        }

        this.indices.push(v1, v2, v3);
        this.indices.push(v3, v4, v1);
      }
    }
  };
};
