// ======= ROUTES & RHYTHMS: Clean Starter =======

// 1️⃣ Canvas & Engine
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// 2️⃣ Camera
const camera = new BABYLON.ArcRotateCamera(
  "ArcCam",
  BABYLON.Tools.ToRadians(0),
  BABYLON.Tools.ToRadians(75),
  250, // big enough!
  new BABYLON.Vector3(0, 0, 0),
  scene
);
camera.attachControl(canvas, true);

// 3️⃣ Light
const light = new BABYLON.HemisphericLight(
  "light",
  new BABYLON.Vector3(1, 1, 0),
  scene
);
light.intensity = 1;

// 4️⃣ Sky Dome
const skyDome = BABYLON.MeshBuilder.CreateSphere("skyDome", {
  segments: 32,
  diameter: 1000
}, scene);
skyDome.scaling.y = -1;

const skyMat = new BABYLON.StandardMaterial("skyMat", scene);
skyMat.backFaceCulling = false;
skyMat.diffuseTexture = new BABYLON.Texture("img/sky.jpeg", scene);
skyMat.diffuseTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
// fallback color for test:
skyMat.diffuseColor = new BABYLON.Color3(0.1, 0.4, 0.9);
skyDome.material = skyMat;

// 5️⃣ Ground with grass
const ground = BABYLON.MeshBuilder.CreateGround("ground", {
  width: 100,
  height: 200,
}, scene);
const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
groundMat.diffuseTexture = new BABYLON.Texture("img/grass.jpeg", scene);
groundMat.diffuseTexture.uScale = 10;
groundMat.diffuseTexture.vScale = 10;
ground.material = groundMat;

// 6️⃣ Cozy Hammock
const pole1 = BABYLON.MeshBuilder.CreateCylinder("pole1", {
  diameter: 0.1, height: 2
}, scene);
pole1.position = new BABYLON.Vector3(-1.2, 1, -5);

const pole2 = BABYLON.MeshBuilder.CreateCylinder("pole2", {
  diameter: 0.1, height: 2
}, scene);
pole2.position = new BABYLON.Vector3(1.2, 1, -5);

const hammock = BABYLON.MeshBuilder.CreatePlane("hammock", {
  width: 2.4, height: 0.5
}, scene);
hammock.position = new BABYLON.Vector3(0, 0.8, -5);
hammock.rotation.x = BABYLON.Tools.ToRadians(90);

const hammockMat = new BABYLON.StandardMaterial("hammockMat", scene);
hammockMat.diffuseColor = new BABYLON.Color3(0.9, 0.85, 0.7);
hammock.material = hammockMat;

// Blanket
const blanket = BABYLON.MeshBuilder.CreateGround("blanket", {
  width: 2, height: 2
}, scene);
blanket.position = new BABYLON.Vector3(0, 0.01, -6.5);
const blanketMat = new BABYLON.StandardMaterial("blanketMat", scene);
blanketMat.diffuseTexture = new BABYLON.Texture("img/blanket.jpeg", scene);
blanket.material = blanketMat;

// Cup
const cup = BABYLON.MeshBuilder.CreateCylinder("cup", {
  diameter: 0.1, height: 0.2
}, scene);
cup.position = new BABYLON.Vector3(0.3, 0.1, -6.5);
const cupMat = new BABYLON.StandardMaterial("cupMat", scene);
cupMat.diffuseColor = new BABYLON.Color3(0.8, 0.8, 1);
cup.material = cupMat;

// 7️⃣ Roads
const mainRoad = BABYLON.MeshBuilder.CreateGround("mainRoad", {
  width: 2,
  height: 20
}, scene);
const mainRoadMat = new BABYLON.StandardMaterial("mainRoadMat", scene);
mainRoadMat.diffuseTexture = new BABYLON.Texture("img/tarmac.jpeg", scene);
mainRoad.material = mainRoadMat;
mainRoad.position = new BABYLON.Vector3(0, 0.02, 5);

const roughRoad = BABYLON.MeshBuilder.CreateGround("roughRoad", {
  width: 1.5,
  height: 6
}, scene);
const roughRoadMat = new BABYLON.StandardMaterial("roughRoadMat", scene);
roughRoadMat.diffuseTexture = new BABYLON.Texture("img/gravel.jpeg", scene);
roughRoad.material = roughRoadMat;
roughRoad.rotation.y = BABYLON.Tools.ToRadians(45);
roughRoad.position = new BABYLON.Vector3(1.5, 0.02, 10);

// 🔟 Back Button
document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "/index.html"; // assumes Corporate Baddie is at root!
});

// Render loop
engine.runRenderLoop(() => {
  scene.render();
});
window.addEventListener("resize", () => {
  engine.resize();
});

