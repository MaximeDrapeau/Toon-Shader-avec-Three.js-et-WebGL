uniform vec3 diffuseColor;
in float intensity;

void main() {
    if (intensity > 0.95)
        gl_FragColor = vec4(diffuseColor, 1.0);
    else if (intensity > 0.5)
        gl_FragColor = vec4(diffuseColor * 0.6, 1.0);
    else if (intensity > 0.25)
        gl_FragColor = vec4(diffuseColor * 0.4, 1.0);
    else
        gl_FragColor = vec4(diffuseColor * 0.2, 1.0);
}