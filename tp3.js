"use strict";
import * as THREE from 'three';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
// TODO: importer les modules nécessaires

let scene, camera, renderer;  // Bases pour le rendu Three.js
// TODO: ajouter les variables nécessaires

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
    // TODO: Créez et ajoutez les différents éléments constitutifs de la scène
}

function createMaterial(vertShader, fragShader){
    // TODO: Création du ShaderMaterial et des variables uniformes à transmettre au shaders.
    meshMaterial = null;
    return meshMaterial;
}

function animate() {
    // TODO: modifiez la ligne suivante pour utiliser le post-processing demandé
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
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

    // TODO: Importation des textures de la skybox

    // Création de la scène 3D
    createScene();

    // Création du shaderMaterial
    const vertexShaderSource = loadFile("./tp3.vert");
    const fragmentShaderSource = loadFile("./tp3.frag");
    let material = createMaterial(vertexShaderSource, fragmentShaderSource);

    // TODO: Importation du modèle 3D

    // TODO: Ajout de l'interactivité avec la souris

    // TODO: Création du postprocessing

    // Animation de la scène (sera appelée toutes les 30 ms)
    animate();
}

init();
