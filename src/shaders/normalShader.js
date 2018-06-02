
export const vertex = `
varying vec3 vNormal;

void main() {
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

export const fragment = `

uniform float time;
varying vec3 vNormal;

void main() {
    float sinred = sin(time + vNormal.x);
    float singreen = sin(time + vNormal.y);
    float sinblue = sin(time + vNormal.z);
    gl_FragColor = vec4(sinred, singreen, sinblue, 1.0 );
}
`;

