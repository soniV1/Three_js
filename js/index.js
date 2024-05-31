// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);

// Add a floor (assume room dimensions to fit 1000 sqft, e.g., 20ft x 50ft)
const floorGeometry = new THREE.PlaneGeometry(20, 50);
const floorMaterial = new THREE.MeshLambertMaterial({
  color: 0x808080,
  side: THREE.DoubleSide,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Add walls (4 walls)
const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const wallHeight = 10; // assume walls are 10ft high

const backWallGeometry = new THREE.PlaneGeometry(20, wallHeight);
const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
backWall.position.z = -25;
backWall.position.y = 5;
scene.add(backWall);

const frontWall = new THREE.Mesh(backWallGeometry, wallMaterial);
frontWall.position.z = 25;
frontWall.position.y = 5;
frontWall.rotation.y = Math.PI;
scene.add(frontWall);

const sideWallGeometry = new THREE.PlaneGeometry(50, wallHeight);
const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
leftWall.position.x = -10;
leftWall.position.y = 5;
leftWall.rotation.y = Math.PI / 2;
scene.add(leftWall);

const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
rightWall.position.x = 10;
rightWall.position.y = 5;
rightWall.rotation.y = -Math.PI / 2;
scene.add(rightWall);

// Function to create random interior objects
function createRandomObject() {
  const geometry = new THREE.BoxGeometry(
    Math.random() * 2 + 0.5,
    Math.random() * 2 + 0.5,
    Math.random() * 2 + 0.5
  );
  const material = new THREE.MeshLambertMaterial({
    color: Math.random() * 0xffffff,
  });
  const object = new THREE.Mesh(geometry, material);
  object.position.set(
    Math.random() * 20 - 10,
    Math.random() * 2,
    Math.random() * 50 - 25
  );
  scene.add(object);
}

// Add random objects
for (let i = 0; i < 10; i++) {
  // Change number to add more/less objects
  createRandomObject();
}

// Set camera position
camera.position.set(15, 15, 15);
camera.lookAt(0, 0, 0);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
