/**
 * Author Maxime Drapeau DRAM89110108
 */


import * as THREE from 'three';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { ArcballControls } from 'three/addons/controls/ArcballControls.js';

let scene, camera, renderer;  // Bases pour le rendu Three.js

let environment = null;

let skybox_texture = null;

let controls;

let effect = null;

let camera_light = null;

let material = null;

function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
        result = xmlhttp.responseText;
    }
    return result;
}

/* Création de la scène 3D */
function createScene() {
    scene = new THREE.Scene();


    camera = new THREE.PerspectiveCamera(45, canvas.width/canvas.height, 0.1, 100);
    controls = new ArcballControls(camera, renderer.domElement);
    camera.position.x = 10;
    camera.position.y = 0;
    camera.position.z = 0;
    controls.update();
    camera.lookAt(0,0,0);
    scene.add(camera);

    let ambient_light = new THREE.AmbientLight("white", 0.5);
    scene.add( ambient_light );

    camera_light = new THREE.DirectionalLight("white", 0.5);
    camera.add(camera_light);

    scene.background = skybox_texture;


    renderer.render(scene, camera);
    

}

function createMaterial(vertShader, fragShader){
    const meshMaterial = new THREE.ShaderMaterial( {
	    uniforms: {
            diffuseColor:  { value: new THREE.Vector3(0.9, 0.2, 0.2) }
	    },
            vertexShader: vertShader,
	        fragmentShader: fragShader,
    } );
    return meshMaterial;
}

function animate() {
    controls.update();


	effect.render( scene, camera );

    requestAnimationFrame(animate);
}

function load_trike(material) {
    const STL_loader = new STLLoader();;
    STL_loader.load("Cute_triceratops.stl",
        (geometry) => {    
            geometry.computeBoundingBox();
            geometry.center();        
            const trike = new THREE.Mesh(geometry, material);
            trike.scale.set(0.1, 0.1, 0.1);
            scene.add(trike);
        },
        undefined,
        (error) => { console.error("Failed:", error); }
    );
}

function init() {
    try {
        canvas = document.getElementById("canvas");
        renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
        renderer.setSize( canvas.clientWidth, canvas.clientHeight );
    }
    catch (e) {
        document.getElementById("canvas-holder").innerHTML="<p><b>Sorry, an error occurred:<br>" +
            e + "</b></p>";
        return;
    }

    // Importation des textures de la skybox
    const loader = new THREE.CubeTextureLoader();
    loader.setPath( 'LarnacaCastle/' );
    skybox_texture = loader.load( [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg'] );


    // Création de la scène 3D
    createScene();

    // Création du shaderMaterial
    const vertexShaderSource = loadFile("./tp3.vert");
    const fragmentShaderSource = loadFile("./tp3.frag");
    material = createMaterial(vertexShaderSource, fragmentShaderSource);

    // Importation du modèle 3D
    load_trike(material);
    

    effect = new OutlineEffect( renderer, { defaultThickness : 0.01} );

    // Animation de la scène (sera appelée toutes les 30 ms)
    animate();
}

init();
