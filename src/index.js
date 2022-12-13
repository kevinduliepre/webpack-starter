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
const geometry = new THREE.BufferGeometry();

const count = 500;
const positionArrays = new Float32Array(count * 3 * 3);
// Note: Each triangle is composed of 3 vertices and each vertex has 3 values (x, y, z)

// fill the array with random value
for (let i = 0; i < count * 3 * 3; i++) {
  positionArrays[i] = (Math.random() - 0.5) * 1.5;
}

const positionAttributes = new THREE.BufferAttribute(positionArrays, 3);
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
