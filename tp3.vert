//Rappel : Certains attributs/uniformes sont disponibles par défaut (voir https://archive.threejs.org/docs/#api/en/renderers/webgl/WebGLProgram)

out float intensity;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vec3 N = normalize(normalMatrix * normal);
    intensity = dot(vec3(0.0, 0.0, 1.0), N);
}