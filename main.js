import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});


renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
//sets the position of the camera along the z axis
camera.position.setZ(30);

renderer.render(scene, camera);

//adds a object to the scene
//const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const nebulaTexture = new THREE.TextureLoader().load('nebula.jpg');

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(10, 1, 18, 40),
    new THREE.MeshBasicMaterial({ color:  0xffff00})
);

scene.add(torus);

//configues the size of the mesh/object
torus.scale.x = 3;
torus.scale.y = 3;
torus.scale.z = 3;

//adds a planet to the scene and loads a texture onto the planet
const sunTexture = new THREE.TextureLoader().load('sun.jpg');
const sun = new THREE.Mesh(
    new THREE.SphereGeometry(3.5, 32, 32),
    new THREE.MeshBasicMaterial({ map: sunTexture })
);
scene.add(sun);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3.5, 32, 32),
    new THREE.MeshBasicMaterial({ map: moonTexture, normalMap: normalTexture })
);
moon.position.set(0, 0, 20)
scene.add(moon);

const vortexTexture = new THREE.TextureLoader().load('vortex.jpg');
const normalTexture2 = new THREE.TextureLoader().load('normal2.jpg');
const vortex = new THREE.Mesh(
    new THREE.SphereGeometry(3.5, 32, 32),
    new THREE.MeshBasicMaterial({ map: vortexTexture, normalMap: normalTexture2 })
);
vortex.position.set(0, 0, 12)
scene.add(vortex);
   
//adds light to the scene
const pointLight = new THREE.PointLight(0xffffff)
//sets the co-ordinates for the light
pointLight.position.set(20, 20, 1)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

//orbit controls gives users the ability to move around the scene
const controls = new OrbitControls(camera, renderer.domElement);

//uses a math function to randomly generate stars and populate my scene
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(200));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(300).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

function moveCamera() {
    const f = document.body.getBoundingClientRect().top;
//rotates the planets as the user scrolls down on the page
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    sun.rotation.y += 0.75;

    vortex.rotation.x += 0.08;
    vortex.rotation.y += 0.08;
    vortex.rotation.z += 0.08;

    camera.position.z = f * -0.01;
    camera.position.x = f * -0.0002;
    camera.position.y = f * -0.0002;
}

document.body.onscroll = moveCamera

function animate() {
    requestAnimationFrame(animate);

    //adjusts the rotation of the torus knot
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate()