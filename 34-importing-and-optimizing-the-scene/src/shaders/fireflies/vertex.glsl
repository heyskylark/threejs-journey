attribute float aScale;

uniform float uTime;
uniform float uPixelRatio;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.5;
  modelPosition.x += sin(uTime + modelPosition.y * 5.0) * aScale * 0.2;
  modelPosition.z += sin(uTime + modelPosition.x * 10.0) * aScale * 0.1;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;
  gl_PointSize = 300.0 * uPixelRatio * aScale;
  gl_PointSize *= (1.0 / - viewPosition.z);
}