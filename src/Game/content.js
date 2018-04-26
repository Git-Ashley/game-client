import * as THREE from 'three';

export default function content(canvasEle) {

      //RENDERER
  var renderer = new THREE.WebGLRenderer({canvas: canvasEle, antialias: true});
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  //renderer.setSize(800, 800);
  //CAMERA
  var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
  // var camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 3000);
  //SCENE
  var scene = new THREE.Scene();
  //LIGHTS
  var light1 = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light1);

  var light2 = new THREE.PointLight(0xffffff, 0.5);
  scene.add(light2);

  //Blender MODEL
  const loader = new THREE.JSONLoader();
  let mesh = null;
  loader.load('untitled.json', handleLoad);

  function handleLoad(geometry, materials) {
    //BASIC MESH
    const material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    mesh.position.z = -10;
  }

  var myGeometry = new THREE.BoxGeometry(100, 100, 100);
  var myMaterial = new THREE.MeshNormalMaterial();
  var myMesh = new THREE.Mesh(myGeometry, myMaterial);
  myMesh.position.set(300, 0, -1000);
  scene.add(myMesh);

  //RENDER LOOP
  requestAnimationFrame(render);
  function render() {

      if(mesh){
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
      }

      myMesh.rotation.x -= 0.01;
      myMesh.rotation.y -= 0.01;

      renderer.render(scene, camera);
      requestAnimationFrame(render);
  }
}
