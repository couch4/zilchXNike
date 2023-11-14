import { Mesh, ShadowMaterial, PlaneGeometry } from "three";
import setupRenderer from "./setupRenderer";
import setupLighting from "./setupLighting";
import animateScene from "./animateScene";
import { fetchModel } from "./loader";
import { GUI } from "dat.gui";
import gsap from "gsap";

export async function setupHero(element: HTMLDivElement) {
  const { camera, renderer, scene } = setupRenderer(element);
  const gui = new GUI();
  setupLighting(scene, gui);

  // setup shadow catcher
  const planeGeom = new PlaneGeometry(100, 100);
  const groundMat = new ShadowMaterial({ opacity: 0 });
  const plane = new Mesh(planeGeom, groundMat);
  plane.receiveShadow = true;
  plane.position.set(0, 0, 0);
  plane.rotation.x = -Math.PI / 2;

  const gltf = await fetchModel("3D/zilchNike2.glb");

  setTimeout(function () {
    animateScene(gltf, scene, camera, renderer);
    gsap.to(groundMat, { duration: 2, opacity: 0.2 });
  }, 1000);

  scene.add(plane);
}
