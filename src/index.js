import "./styles/styles.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "dat.gui";

console.log(gsap);

// Variables
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Debug
const gui = new dat.GUI();

const parameters = {
  color: 0x0000ff,
  spin: () => {
    gsap.to(mesh.rotation, {
      duration: 1,
      y: mesh.rotation.y + Math.PI * 2,
      x: mesh.rotation.x + Math.PI * 2,
    });
  },
};

const canvas = document.querySelector(".webgl");

// Creating a scene
const scene = new THREE.Scene();

// Creating the geometry and material
const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  color: parameters.color,
});

// Creating the cube
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

// Debug
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
gui.add(material, "wireframe");

gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});

gui.add(parameters, "spin");
