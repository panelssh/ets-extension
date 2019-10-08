// dependency
import { ExtensionContext, commands, workspace, window } from 'vscode';
// builds
import { rcm } from './build';
// helpers
import { camelize } from './helpers';

const path = workspace.workspaceFolders[0].uri.fsPath;

/**
 * Activation method
 * @param {ExtensionContext} context
 * @docs https://code.visualstudio.com/api/references/vscode-api#ExtensionContext
 */
export function activate(context: ExtensionContext) {
  commands.registerCommand('ets.rcm', () => {
    window.showInputBox({
      prompt: 'Name of RCM (Router, Controller and Model)',
      placeHolder: 'Set RCM name, eg: User',
      validateInput: (text: string): string | undefined => {
        if (!text || text.length === 0) return 'Can\'t be empty!';
        return undefined;
      },
    }).then((text: string) => {

      const src = workspace.getConfiguration('ets').target || 'src';
      const name = camelize(text);
      const types = ['routers', 'controllers', 'models'];

      for (const [i, type] of types.entries()) {
        if (!rcm(type, path, src, name)) {
          window.showErrorMessage(`${src}/${type}/${name.toLowerCase()}.ts already exists!`);
          break;
        }
        if (i === types.length - 1) window.showInformationMessage('Created RCM file!');
      }

    });
  });

}
