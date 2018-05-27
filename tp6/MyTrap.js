/**
 * MyTrap
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrap extends CGFobject {
    constructor(scene, x1, y1, z1, x3, y3, z3, x2, y2, z2, n) {
        super(scene);

        this.vertices = [];
        this.indices = [];
        this.normals = [];

        this.x1 = x1;
        this.y1 = y1;
        this.z1 = z1;

        this.x2 = x2;
        this.y2 = y2;
        this.z2 = z2;

        this.x3 = x3;
        this.y3 = y3;
        this.z3 = z3;

        this.n = n;
        this.initBuffers();
    }
    ;
    initBuffers() {
        this.preProcessValues();
        this.fillVerticesAndNormals();
        this.fillIndexes();

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    ;
    fillVerticesAndNormals() {

        for (var vertLayer = 0; vertLayer < this.n + 1; vertLayer++) {
            //for each layer
            //find the increment vector
            this.startPoint = {
                x: this.incLeftVec.x * vertLayer,
                y: this.incLeftVec.y * vertLayer,
                z: this.incLeftVec.z * vertLayer
            }


            this.endPoint = {
                x: this.x1 + this.incRightVec.x * vertLayer,
                y: this.y1 + this.incRightVec.y * vertLayer,
                z: this.z1 + this.incRightVec.z * vertLayer
            }


            this.incBaseVec = {
                x: (this.endPoint.x - this.startPoint.x) / this.n,
                y: (this.endPoint.y - this.startPoint.y) / this.n,
                z: (this.endPoint.z - this.startPoint.z) / this.n
            }

           


            //preencher os valores
            for (var i = 0; i < this.n + 1; i++) {
                //vertices
                this.vertices.push(this.startPoint.x + i * this.incBaseVec.x, this.startPoint.y + i * this.incBaseVec.y, this.startPoint.z + i * this.incBaseVec.z);

                //normais
                this.normals.push(this.vecNormal.x, this.vecNormal.y, this.vecNormal.z);
            }
        }
    }

    fillIndexes() {
        var buffer = 0;

        for (var height = 0; height < this.n; height++) {
            for (var width = 0; width < this.n; width++) {

                buffer = width + (this.n + 1) * height;

                this.indices.push(buffer, buffer + 1, buffer + this.n + 1);
                this.indices.push(buffer + 1, buffer + 2 + this.n, buffer + this.n + 1);

            }
        }
    }

    preProcessValues() {
        //vector that conects P0 with P1 and P3 to P2 (normalized)
        this.vecLengthBase = this.distanceBetween(this.x1, this.y2, this.z1, 0, 0, 0);
        this.vecLengthLeft = this.distanceBetween(this.x3, this.y3, this.z3, 0, 0, 0);
        this.vecLengthRight = this.distanceBetween(this.x2, this.y2, this.z2, this.x1, this.y1, this.z1);

        var vecXRight = this.x2 - this.x1;
        var vecYRight = this.y2 - this.y1;
        var vecZRight = this.z2 - this.z1;

        //normalized vectors of all important sides
        this.incBase = {
            x: this.x1 / this.vecLengthBase,
            y: this.y1 / this.vecLengthBase,
            z: this.z1 / this.vecLengthBase
        }

        this.incLeftVec = {
            x: this.x3 / this.n,
            y: this.y3 / this.n,
            z: this.z3 / this.n,
            length: (this.vecLengthLeft / this.n)
        }

        this.incRightVec = {
            x: vecXRight / this.n,
            y: vecYRight / this.n,
            z: vecZRight / this.n,
            length: this.vecLengthRight / this.n
        }

        this.vecNormal = {
            x: this.incBase.y * this.incLeftVec.z - this.incBase.z * this.incLeftVec.y,
            y: this.incBase.z * this.incLeftVec.x - this.incBase.x * this.incLeftVec.z,
            z: this.incBase.x * this.incLeftVec.y - this.incBase.y * this.incLeftVec.x
        }
    }

    distanceBetween(x1, y1, z1, x2, y2, z2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
    }
}
;