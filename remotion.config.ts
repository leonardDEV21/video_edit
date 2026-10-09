import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// Standard-range BT.709 output (yuv420p, tv). Remotion v4's default is full-range yuvj420p tagged BT.601,
// which some phones and platforms display with shifted contrast. scripts/qc_render.py checks this.
Config.setColorSpace('bt709');
Config.setPixelFormat('yuv420p');
// Use a locally installed Chromium when one is provided, e.g.
// REMOTION_BROWSER=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
if (process.env.REMOTION_BROWSER) {
	Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
}
