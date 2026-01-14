const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(0.1, 0.1, 0.2); // deep night sky

  const camera = new BABYLON.ArcRotateCamera("Camera", 0, 1, 10, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
  light.intensity = 0.7;

  const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
  sphere.position.y = 1;

  const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

 // Billboard Text Banner
  const plane = BABYLON.MeshBuilder.CreatePlane("banner", {width: 6, height: 1.5}, scene);
  plane.position = new BABYLON.Vector3(0, 4, 0); // adjust height

  const dynamicTexture = new BABYLON.DynamicTexture("dynamic texture", {width:512, height:256}, scene);
  dynamicTexture.hasAlpha = true;
  const gl = new BABYLON.GlowLayer("glow", scene);

  
  const bannerMaterial = new BABYLON.StandardMaterial("bannerMat", scene);
  bannerMaterial.diffuseTexture = dynamicTexture;
  bannerMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1); // glow

  plane.material = bannerMaterial;
  plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;


  // Floating welcome text
  // const plane = BABYLON.MeshBuilder.CreatePlane("textPlane", {width: 5, height: 2}, scene);
  plane.position.y = 2;

  const texture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
  const textBlock = new BABYLON.GUI.TextBlock();
  textBlock.text = "🚀 Welcome to Routes & Rhythms";
  textBlock.color = "white";
  textBlock.fontSize = 48;
  texture.addControl(textBlock);

  return scene;
};

const scene = createScene();
engine.runRenderLoop(() => scene.render());
window.addEventListener("resize", () => engine.resize());

