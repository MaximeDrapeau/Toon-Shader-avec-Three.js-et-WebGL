//Rappel : Certains attributs/uniformes sont disponibles par défaut (voir https://archive.threejs.org/docs/#api/en/renderers/webgl/WebGLProgram)

out vec3 interpolatedNormal;
out vec3 interpolatedLight;

void main() {
    vec4 eyeCoords = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * eyeCoords;
    interpolatedNormal = normalize( normalMatrix * normal );
    interpolatedLight = vec3(0.0, 0.0, 1.0);
}