import "./styles/styles.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";

import imageSrc from "../static/textures/minecraft.png";

// Variables
const canvas = document.querySelector(".webgl");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Debug
const gui = new GUI();
gui.close();

const parameters = {
  color: 0x00ffff,
  spin: () => {
    gsap.to(cubeMesh.rotation, {
      duration: 1,
      y: cubeMesh.rotation.y + Math.PI * 2,
      x: cubeMesh.rotation.x + Math.PI * 2,
    });
  },
};

// Loading the Texture
const loadingManager = new THREE.LoadingManager();

// loadingManager.onStart = () => {
//   console.log("onStart");
// };

// loadingManager.onLoad = () => {
//   console.log("onLoad");
// };

// loadingManager.onProgress = () => {
//   console.log("onProgress");
// };

// loadingManager.onError = () => {
//   console.log("onError");
// };

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load(imageSrc);

// Creating a scene
const scene = new THREE.Scene();

// Creating the geometry and material
const cube = new THREE.BoxGeometry(1, 1, 1);

const cubeMaterial = new THREE.MeshBasicMaterial({
  // color: parameters.color,
  map: colorTexture,
});

colorTexture.generateMipmaps = false;
// colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

// Creating the cube
const cubeMesh = new THREE.Mesh(cube, cubeMaterial);

scene.add(cubeMesh);

// Creating camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.z = 3;
camera.lookAt(cubeMesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Handle Resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //   Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //   Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const tick = () => {
  // Update controls
  controls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};

tick();

// Debug
gui
  .add(cubeMesh.position, "y")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("Cube Elevation Y");
gui.add(cubeMaterial, "wireframe");
gui.addColor(parameters, "color").onChange(() => {
  cubeMaterial.color.set(parameters.color);
});

gui.add(parameters, "spin");

gui
  .add(camera.position, "x")
  .min(-5)
  .max(5)
  .step(0.01)
  .name("Camera position X");

gui
  .add(camera.position, "y")
  .min(-5)
  .max(5)
  .step(0.01)
  .name("Camera position Y");
