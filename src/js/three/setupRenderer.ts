import {
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

export default function setupRenderer(element: HTMLDivElement) {
  const scene = new Scene();
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  // renderer.setPixelRatio(window.devicePixelRatio);
  element.appendChild(renderer.domElement);

  const startWidth = 1800;
  const startHeight = 1300;

  renderer.setSize(startWidth, startHeight);

  window.addEventListener("resize", handleResize);

  const camera = new PerspectiveCamera(75, startWidth / startHeight, 0.1, 1000);
  camera.position.set(4, 5, 6.5);

  function handleResize() {
    if (window.innerWidth < 1500) {
      camera.position.z = (1500 / window.innerWidth) * 6;
      camera.position.x = (1500 / window.innerWidth) * 4;
      element.style.top = "50%";
    }
  }

  handleResize();

  scene.add(camera);
  renderer.render(scene, camera);

  return { renderer, scene, camera };
}
