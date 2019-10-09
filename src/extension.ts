// dependency
import { ExtensionContext, commands, workspace, window } from 'vscode';
// builds
import { rcm } from './build';
// helpers
import { camelize, search } from './helpers';

const path = workspace.workspaceFolders[0].uri.fsPath;

/**
 * Activation method
 * @param {ExtensionContext} context
 * @docs https://code.visualstudio.com/api/references/vscode-api#ExtensionContext
 */
export function activate(context: ExtensionContext) {
  commands.registerCommand('ets.rcm', () => {

    const types = ['routers', 'controllers', 'models', 'middleware', 'dto', 'interfaces'];

    window.showInputBox({
      prompt: 'Name of RCM (Router, Controller and Model)',
      placeHolder: 'Set RCM name, eg: User',
      validateInput: (nameRCM: string): string | undefined => {
        if (!nameRCM || nameRCM.length === 0) return 'Can\'t be empty!';
        return undefined;
      },
    }).then((nameRCM: string) => {

      if (nameRCM === undefined) return;

      window.showInputBox({
        prompt: 'Type of RCM (routers, controllers, models, middleware, dto, interfaces)',
        placeHolder: 'Set RCM type, (leave if want to all)',
        validateInput: (typeRCM: string): string | undefined => {
          if (typeRCM && !types.includes(typeRCM)) return search(typeRCM, types);
          return undefined;
        },
      }).then((typeRCM: string) => {

        const src = workspace.getConfiguration('ets').target || 'src';
        const name = camelize(nameRCM);

        if (typeRCM) {
          if (!rcm(typeRCM, path, src, name)) {
            window.showErrorMessage(`${src}/${typeRCM}/${name.toLowerCase()}.ts already exists!`);
          } else {
            window.showInformationMessage(`Created ${typeRCM} file!`);
          }
        } else if (typeRCM === '') {
          for (const [i, type] of types.entries()) {
            if (!rcm(type, path, src, name)) {
              window.showErrorMessage(`${src}/${type}/${name.toLowerCase()}.ts already exists!`);
              break;
            }
            if (i === types.length - 1) window.showInformationMessage('Created RCM file!');
          }
        }

      });

    });
  });

}
