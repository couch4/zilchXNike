import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

export function fetchModel(modelUrl: string): Promise<GLTF> {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("draco/gltf/");

    loader.setDRACOLoader(dracoLoader);

    dracoLoader.preload();

    loader.load(
      modelUrl,
      (gltf: GLTF) => {
        resolve(gltf);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.log("An error happened", error);
        reject(error);
      }
    );
  });
}
