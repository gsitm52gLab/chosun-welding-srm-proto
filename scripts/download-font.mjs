import fs from 'fs';
import path from 'path';

const url = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/woff2/PretendardVariable.woff2';
const dir = path.join(process.cwd(), 'public', 'fonts');
const dest = path.join(dir, 'PretendardVariable.woff2');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const res = await fetch(url);
const buffer = Buffer.from(await res.arrayBuffer());
fs.writeFileSync(dest, buffer);
console.log('Pretendard font downloaded to', dest);
