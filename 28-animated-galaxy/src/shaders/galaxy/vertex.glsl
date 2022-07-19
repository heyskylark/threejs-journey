uniform float uTime;
uniform float uSize;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;

void main() {
    /**
    Position
    */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Spin
    // This only works since galaxy is at center of the scene. Otherwise we will have to do offsets.
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
    angle += angleOffset;
    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    // Randomness
    modelPosition.xyz += aRandomness;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    /**
    Size
    */
    gl_PointSize = aScale * uSize;
    gl_PointSize *= (1.0 / - viewPosition.z);

    vColor = color;
}