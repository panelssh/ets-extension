// dependency
import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { join } from 'path';
// helpers
import { capitalize } from '../helpers';
// template
import RCM from '../templates/rcm';

export function rcm(Type: any, Path: string, Src: string, name: string): boolean {
  const src = join(Path, Src);
  const path = join(src, Type);
  const dest = join(path, `${name}.ts`);

  const type: 'routers' | 'controllers' | 'models' = Type;
  const content = RCM(name, capitalize(name));

  if (!existsSync(src)) mkdirSync(src);
  if (!existsSync(path)) mkdirSync(path);
  if (existsSync(dest)) return false;

  createWriteStream(dest, { flags: 'wx', autoClose: true }).write(content[type]);

  return existsSync(dest);

}
