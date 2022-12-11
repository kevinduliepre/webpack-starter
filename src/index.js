import "./styles/styles.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Variables
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const canvas = document.querySelector(".webgl");

// Creating a scene
const scene = new THREE.Scene();

// Creating the object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

// Creating a custom bufferGeometry
const positionArrays = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
const positionAttributes = new THREE.BufferAttribute(positionArrays, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionAttributes);

const material = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Creating camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 2;
// controls.update();

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
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  // camera.lookAt(mesh.position);

  // Update controls
  controls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};

tick();
