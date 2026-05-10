#version 300 es

precision highp float;
in vec2 v_texcoord; // is in 0-1
uniform sampler2D tex;

layout(location = 0) out vec4 fragColor;

vec3 contrast(vec3 i_color, float i_factor)
{
    const float k_mid_grey_pivot = 0.5;

    return (i_color - k_mid_grey_pivot) * i_factor + k_mid_grey_pivot;
}

void main() {
    vec4 pixColor = texture(tex, v_texcoord);

	const float k_warm_factor = 1.0;
	pixColor.r = min(pixColor.r + k_warm_factor * 0.2, 1.0);
	pixColor.g = min(pixColor.g + k_warm_factor * 0.05, 1.0);
	pixColor.b = max(pixColor.b - k_warm_factor * 0.3, 0.0);

    const float k_contrast_factor = 0.5;
    vec3 pixColorLow = contrast(pixColor.rgb, k_contrast_factor);
    fragColor = vec4(pixColorLow, pixColor.a);
}
