const THREE = window.THREE;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let click = false;
mouse.clicked = false;
function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}
window.addEventListener( 'mousemove', onMouseMove, false );

export default function content(canvasEle) {

      //RENDERER
  const renderer = new THREE.WebGLRenderer({canvas: canvasEle, antialias: true});
  renderer.setClearColor(0x333333);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  //SCENE
  const scene = new THREE.Scene();



  //MATERIAL

  const material = new THREE.MeshLambertMaterial();
  const material2 = new THREE.MeshPhongMaterial();
  const material3 = new THREE.MeshStandardMaterial();


  //GEOMETRY

  const geometry = new THREE.BoxGeometry(100, 100, 100, 10, 10, 10);
  const geometry2 = new THREE.SphereGeometry(50, 20, 20);
  const geometry3 = new THREE.PlaneGeometry(10000, 10000, 100, 100);


  const cube = new THREE.Mesh(geometry, material);
  cube.position.z = 0;
  cube.position.x = 500;
  cube.position.y = -50;
  scene.add(cube);


  const ball = new THREE.Mesh(geometry2, material2);
  ball.position.z = 500;
  ball.position.x = 0;
  ball.position.y = -50;
  ball.castShadow = true;
  scene.add(ball);


  const mesh3 = new THREE.Mesh(geometry3, material3);
  mesh3.rotation.x = -90 * (Math.PI / 180);
  mesh3.position.y = -100;
  scene.add(mesh3);


  //LIGHTS

  //ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);


  // pointlight
  const light = new THREE.PointLight(0xffffff, 1.0, 1000);
  scene.add(light);
  const pointLightHelper = new THREE.PointLightHelper(light);
  scene.add(pointLightHelper);

  // directionallight
  // var light = new THREE.DirectionalLight(0xffffff, 2.0, 1000);
  // light.target = mesh;
  // scene.add(light);
  //
  // var directionalLightHelper = new THREE.DirectionalLightHelper(light, 100);
  // scene.add(directionalLightHelper);


  // spotlight
  /*var light = new THREE.SpotLight(0xffffff, 2.0, 1000);
  light.target = mesh;
  scene.add(light);
  var spotLightHelper = new THREE.SpotLightHelper(light);
  scene.add(spotLightHelper);
  */

  // hemisphere light
  // var light = new THREE.HemisphereLight(0xffffbb, 0x0808dd, 1);
  // scene.add(light);
  //
  // var hemisphereLightHelper = new THREE.HemisphereLightHelper(light, 100);
  // scene.add(hemisphereLightHelper);


  //shadows
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  light.position.y = 100;
  light.position.z = -100;
  //light.target = mesh;
  light.castShadow = true;
  light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 90, 1, 1, 1000 ) );
  light.shadow.far = 1000;
  light.shadow.near = 1;
  //light.shadow.bias = 0.0001;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.dest = null;
  scene.add(light);

  cube.castShadow = true;
  mesh3.receiveShadow = true;
  //
  //
  // var shadowMapViewer = new THREE.ShadowMapViewer( light );
  // shadowMapViewer.position.x = 10;
  // shadowMapViewer.position.y = 10;
  // shadowMapViewer.size.width = 2048 / 4;
  // shadowMapViewer.size.height = 1024 / 4;
  // shadowMapViewer.update();



  //cameras


  //perspective camera
  const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 300, 10000 );
  const controls = new THREE.OrbitControls(camera);
  camera.position.set(0, 800, 0);
  camera.lookAt(light.position);
  controls.update();

  canvasEle.addEventListener('contextmenu', e => {
    e.preventDefault();
    mouse.clicked = true;
  });

  //RENDER LOOP
  let delta = 0;
  let lastTime = null;
  render();
  function render(time) {
    let deltaTime, multiplier;

    if(lastTime === null || lastTime === undefined) {
      multiplier = 0.5;
    } else {
      deltaTime = time - lastTime;
      multiplier = (deltaTime/1000);
    }
    const speed = 50;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );
    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects( scene.children );
  	for ( let i = 0; i < intersects.length; i++ ) {
      if (mouse.clicked) {
        light.dest = intersects[ i ].point;
        const dx = light.dest.x - light.position.x;
        const dz = light.position.z - light.dest.z;
        light.dx = dx;
        light.dz = dz;
        console.log(`
          Z: ${dz}
          X: ${dx}
        `);
        let θ;
        if(dx >= 0)
            θ = Math.atan(dz/dx);
        else
            θ = Math.PI + Math.atan(dz/dx);
        console.log(`θ: ${θ}`);
        light.vx = speed*Math.cos(θ);
        light.vz = (-1)*speed*Math.sin(θ);

        mouse.clicked = false;
      }
  	}

    if (light.dest && !isNaN(light.dest.x) && !isNaN(light.dest.z)) {
      const currentDx = light.dest.x - light.position.x;
      const currentDz = light.position.z - light.dest.z;
      if (currentDx*light.dx <= 0 && currentDz*light.dz <= 0) {
        light.dest = null;
        light.vx = 0;
        light.vz = 0;
        light.dx = 0;
        light.dz = 0;
      } else {
        light.position.x += multiplier*light.vx;
        light.position.z += multiplier*light.vz;
      }
    }


    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
}
