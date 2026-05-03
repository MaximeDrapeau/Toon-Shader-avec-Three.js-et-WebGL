in vec3 interpolatedNormal;
in vec3 interpolatedLight;
uniform vec3 diffuseColor;

void main() {
    float intensity = dot(normalize(interpolatedNormal), interpolatedLight);
    if (intensity > 0.95)
        gl_FragColor = vec4(diffuseColor, 1.0);
    else if (intensity > 0.75)
        gl_FragColor = vec4(diffuseColor * 0.6, 1.0);
    else if (intensity > 0.50)
        gl_FragColor = vec4(diffuseColor * 0.4, 1.0);
    else
        gl_FragColor = vec4(diffuseColor * 0.2, 1.0);
}



