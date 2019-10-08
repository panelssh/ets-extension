// dependency
import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { join } from 'path';
// template
import RCM from '../templates/rcm';

export function rcm(Type: any, Path: string, Src: string, name: string): boolean {
  const src = join(Path, Src);
  const path = join(src, Type);
  const dest = join(path, `${name.toLowerCase()}.ts`);

  const type: 'routers' | 'controllers' | 'models' = Type;
  const content = RCM(name.toLowerCase(), name);

  if (!existsSync(src)) mkdirSync(src);
  if (!existsSync(path)) mkdirSync(path);
  if (existsSync(dest)) return false;

  createWriteStream(dest).write(content[type]);

  return true;

}
