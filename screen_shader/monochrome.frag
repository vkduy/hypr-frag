#version 300 es

precision highp float;
in vec2 v_texcoord; // is in 0-1
uniform sampler2D tex;

layout(location = 0) out vec4 fragColor;

float contrast(float i_lum, float i_factor)
{
    const float k_mid_grey_pivot = 0.5;

    return (i_lum - k_mid_grey_pivot) * i_factor + k_mid_grey_pivot;
}

void main() {
    vec4 pixColor = texture(tex, v_texcoord);

    const vec3 k_lum = vec3(0.2126, 0.7152, 0.0722);
    float lum = dot(pixColor.rgb, k_lum);

    const float k_contrast_factor = 0.7;
    float lum_low_contrast = contrast(lum, k_contrast_factor);
    fragColor = vec4(vec3(lum_low_contrast), pixColor.a);
}
