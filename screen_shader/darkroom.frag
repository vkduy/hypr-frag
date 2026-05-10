#version 300 es

precision highp float;
in vec2 v_texcoord; // is in 0-1
uniform sampler2D tex;

layout(location = 0) out vec4 fragColor;

float contrast(float i_color, float i_factor)
{
    const float k_mid_grey = 0.5;

    return (i_color - k_mid_grey) * i_factor + k_mid_grey;
}

void main() {
    vec4 pixColor = texture(tex, v_texcoord);
    pixColor.r = contrast(pixColor.r, 0.7);

    fragColor = pixColor * vec4(1.0, 0.0, 0.0, 1.0);
}
