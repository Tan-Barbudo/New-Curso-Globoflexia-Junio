import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

if (!existsSync('public/logo.jpg')) throw new Error('No se encontró el logo original');
for (const size of [192, 512]) {
  execFileSync('convert', ['public/logo.jpg', '-auto-orient', '-resize', size + 'x' + size, '-background', '#121212', '-gravity', 'center', '-extent', size + 'x' + size, 'public/icon-' + size + '.png'], { stdio: 'inherit' });
}
