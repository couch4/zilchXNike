import {
  AnimationMixer,
  Camera,
  Clock,
  Group,
  LoopOnce,
  Mesh,
  Scene,
  TextureLoader,
  WebGLRenderer,
  Vector2,
} from "three";
import { GLTF } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let card: Mesh | null = null;
let shoe: Group | null = null;
let isAnimating = true;

export default function animateScene(
  gltf: GLTF,
  scene: Scene,
  camera: Camera,
  renderer: WebGLRenderer
) {
  const isDesktop = window.innerWidth > 700;
  const animScene = gltf.scene;
  scene.add(animScene);
  const mouse = new Vector2();
  const shoeHover = document.querySelector("#hover-area");
  isDesktop ?? window.addEventListener("mousemove", mouseMove);
  isDesktop ??
    shoeHover?.addEventListener("mouseenter", () => handleBannerHover(true));
  isDesktop ??
    shoeHover?.addEventListener("mouseleave", () => handleBannerHover(false));

  // load ambient occlusion layer
  const textureLoader = new TextureLoader();
  const AOTex = textureLoader.load("3D/tex/globalAO.jpg");
  AOTex.flipY = false;

  // iterate through scene objects and perform different postprocessing bits on them
  animScene.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      const mat = child.material;
      if (mat.name === "creditCard") {
        card = child;
      } else {
        mat.aoMap = AOTex;
        mat.aoMapIntensity = 2;
      }
    }
    if (child instanceof Group && child.name === "zilchNikeShoe001") {
      shoe = child;
    }
  });

  function handleAnimComplete() {
    isAnimating = false;

    gsap.to(document.querySelector(".zilch-intro .holder-content"), {
      opacity: 1,
      y: 0,
      duration: 2,
    });
  }

  function mouseMove(event: MouseEvent) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    gsap.to(animScene.rotation, {
      duration: 3,
      y: mouse.x * 0.05,
      ease: "expo.out",
    });
  }

  function handleBannerHover(isHovered: boolean) {
    if (shoe) {
      if (isHovered) {
        gsap.to(shoe.position, {
          duration: 1,
          y: 0.5,
          ease: "expo.out",
          overwrite: true,
        });
        gsap.to(shoe.rotation, {
          duration: 2,
          x: 0.2,
          y: -0.2,
          z: 0.1,
          ease: "expo.out",
          overwrite: true,
        });
      } else {
        gsap.to(shoe.position, {
          duration: 0.5,
          y: 0,
          ease: "bounce.out",
          overwrite: true,
        });
        gsap.to(shoe.rotation, {
          duration: 0.5,
          x: 0,
          y: 0,
          z: 0,
          ease: "expo.out",
          overwrite: true,
        });
      }
    }
  }

  if (shoe) {
    const bannerDimensions = document
      .querySelector(".zilch-banner")!
      .getBoundingClientRect();
    const introDimensions = document
      .querySelector(".zilch-intro")!
      .getBoundingClientRect();

    const introTop = introDimensions.top;
    const bannerTop = bannerDimensions.top;
    const bannerEnd = bannerDimensions.top + bannerDimensions.height;

    const shoeScroll = gsap.timeline({
      scrollTrigger: {
        trigger: ".zilch-intro",
        start: `top ${introTop}`,
        end: `top ${bannerEnd}`,
        scrub: true,
      },
    });

    shoeScroll.to(camera.position, {
      y: 0,
      z: 10,
      duration: 1,
    });

    gsap.to(animScene.position, {
      y: 4,
      duration: 1,
      scrollTrigger: {
        trigger: ".zilch-intro",
        start: `top ${bannerEnd}`,
        end: `top ${bannerTop}`,
        scrub: true,
      },
      overwrite: true,
      paused: true,
    });
  }

  // setup initial GLTF animation
  const animationClip = gltf.animations[0];
  const mixer = new AnimationMixer(animScene);
  const action = mixer.clipAction(animationClip);
  action.setLoop(LoopOnce, 0);
  action.clampWhenFinished = true;
  action.enabled = true;
  action.timeScale = 0.7;
  action.play();
  mixer.addEventListener("finished", handleAnimComplete);

  animScene.position.x = -2;

  const clock = new Clock();
  const controls = new OrbitControls(camera, renderer.domElement);

  // scene animation loop
  function animate() {
    requestAnimationFrame(animate);
    if (animScene) mixer.update(clock.getDelta());

    isAnimating ?? controls.update();
    camera.lookAt(0, 0, 0);

    //floating card
    if (card && isDesktop) {
      card.position.y = 2.5 + Math.sin(Date.now() * 0.0003) * 0.4;
      card.rotation.z = Math.sin(Date.now() * 0.0005) * 0.1;
      card.rotation.x = Math.PI * 0.5 + Math.sin(Date.now() * 0.0002) * 0.1;
    }

    renderer.render(scene, camera);
  }

  animate();
}
