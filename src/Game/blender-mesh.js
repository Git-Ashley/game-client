//Blender MODEL
const loader = new THREE.JSONLoader();
let blenderMesh = null;
loader.load('untitled.json', handleLoad);

function handleLoad(blenderGeometry, materials) {
  //BASIC MESH
  const blenderMaterial = new THREE.MeshNormalMaterial();
  blenderMesh = new THREE.Mesh(blenderGeometry, blenderMaterial);
  scene.add(blenderMesh);
  blenderMesh.position.z = -500;
  blenderMesh.position.x = -300;
  blenderMesh.position.y = -50;
  blenderMesh.scale.set(50,50,50);
}
