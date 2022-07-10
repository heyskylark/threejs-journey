uniform float uTime;

varying vec2 vUv;
varying float vTime;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
    vTime = uTime;
}