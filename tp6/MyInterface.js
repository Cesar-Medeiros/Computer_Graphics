
class MyInterface extends CGFinterface {


	/**
	 * MyInterface
	 * @constructor
	 */
 	constructor () {
 		super();
 	}

	/**
	 * init
	 * @param {CGFapplication} application
	 */
	init(application) {
		super.init(application);

		this.gui = new dat.GUI();

		var groupLights=this.gui.addFolder("Luzes");
		groupLights.open();
    Object.keys(this.scene.interfaceObjs.lights).forEach((key) => {
    	groupLights.add(this.scene.interfaceObjs.lights, key).name("Luz " + key);
    });


		this.gui.add(this.scene.interfaceObjs, 'axisEnable').name("Eixo");

    this.scene.interfaceObjs.currVehicleAppearance = Object.keys(this.scene.interfaceObjs.vehicleAppearanceList)[0];
    this.gui.add(this.scene.interfaceObjs, 'currVehicleAppearance', Object.keys(this.scene.interfaceObjs.vehicleAppearanceList)).name("Textura carro");

	

    this.initKeys();
		return true;
	};

	/**
	 * processKeyboard
	 * @param event {Event}
	 */

   initKeys() {
     this.scene.gui=this;
     this.processKeyboard=function(){};
     this.activeKeys={};
   }

   processKeyDown(event) {
     this.activeKeys[event.code]=true;
   };

   processKeyUp(event) {
     this.activeKeys[event.code]=false;
   };

   isKeyPressed(keyCode) {
     return this.activeKeys[keyCode] || false;
   }
};
