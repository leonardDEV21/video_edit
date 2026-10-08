// Render many stills from one bundle: node scripts/stills.mjs <outDir> <frame> [frame...]
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';

const [outDir, ...frames] = process.argv.slice(2);
const comp = process.env.COMP ?? 'Short';
fs.mkdirSync(outDir, {recursive: true});
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const browserExecutable = process.env.REMOTION_BROWSER ?? null;
const composition = await selectComposition({serveUrl, id: comp, browserExecutable});
for (const f of frames.map(Number)) {
	const output = path.join(outDir, `${comp}-${String(f).padStart(4, '0')}.jpg`);
	await renderStill({serveUrl, composition, frame: f, output, imageFormat: 'jpeg', jpegQuality: 85, browserExecutable});
	console.log(output);
}
