import {
  AmbientLight,
  DirectionalLight,
  Scene,
  SpotLight,
  //   SpotLightHelper,
} from "three";
import { GUI } from "dat.gui";

export default function setupLighting(scene: Scene, gui: GUI) {
  const sun = new DirectionalLight(0xffffff, 2);
  sun.position.set(16, 100, 5);
  sun.castShadow = true; // Enable shadow casting
  sun.shadow.mapSize.width = 1024; // Set shadow map size
  sun.shadow.mapSize.height = 1024;
  sun.shadow.camera.near = 0.1; // Set shadow camera settings
  sun.shadow.camera.far = 200;
  sun.shadow.bias = -0.001;

  const ambient = new AmbientLight(0xece6d7, 0.6);

  const spotlight = new SpotLight(0xffffff, 100, 20, 0.8);
  spotlight.position.set(2, 2, 8);
  spotlight.target.position.set(5, 3, 0);
  spotlight.penumbra = 1;
  spotlight.castShadow = false;

  scene.add(sun, ambient, spotlight);

  // controls

  //   const spotLightHelper = new SpotLightHelper(spotlight, "red");
  //   scene.add(spotLightHelper);

  //   const sunFolder = gui.addFolder("sun");
  //   sunFolder.add(sun.position, "x", -100, 100);
  //   sunFolder.add(sun.position, "y", -100, 100);
  //   sunFolder.add(sun.position, "z", -100, 100);
  //   sunFolder
  //     .add({ intensity: 1 }, "intensity", 0, 20)
  //     .onChange(function (value: number) {
  //       sun.intensity = value;
  //     });
  //   gui
  //     .add({ ambientIntensity: 1 }, "ambientIntensity", 0, 20)
  //     .onChange(function (value: number) {
  //       ambient.intensity = value;
  //     });
  //   sunFolder.open();
  //   const spotFolder = gui.addFolder("spot");
  //   spotFolder.add(spotlight.position, "x", -2000, 2000);
  //   spotFolder.add(spotlight.position, "y", -2000, 2000);
  //   spotFolder.add(spotlight.position, "z", -2000, 2000);
  //   spotFolder
  //     .add({ intensity: 1 }, "intensity", 0, 100)
  //     .onChange(function (value: number) {
  //       spotlight.intensity = value;
  //     });
  //   spotFolder
  //     .add({ angle: 1 }, "angle", 0, Math.PI)
  //     .onChange(function (value: number) {
  //       spotlight.angle = value;
  //     });
  //   spotFolder
  //     .add({ distance: 1 }, "distance", 0, 100)
  //     .onChange(function (value: number) {
  //       spotlight.distance = value;
  //     });
  //   spotFolder.open();
}
