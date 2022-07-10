uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;
varying float vElevation;

void main() {
    vec4 modelPositon = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPositon.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPositon.y * uFrequency.y - uTime) * 0.1;

    modelPositon.z += sin(modelPositon.x * uFrequency.x - uTime) * 0.1;
    modelPositon.z += sin(modelPositon.y * uFrequency.y - uTime) * 0.1;

    vec4 viewPosition = viewMatrix * modelPositon;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
    vElevation = elevation;
}
