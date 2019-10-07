// dependency
import { ExtensionContext, commands, workspace, window } from 'vscode';
// builds
import { rcm } from './build';

const path = workspace.workspaceFolders[0].uri.fsPath;

export const activate = (context: ExtensionContext) => {
  commands.registerCommand('ets.rcm', () => {
    const options = { prompt: 'Name of RCM (Router, Controller and Model)', placeHolder: 'Set RCM name' };
    window.showInputBox(options).then((value: string) => {

      if (value.length === 0) return window.showErrorMessage('You must put name of RCM!');

      const src = workspace.getConfiguration('ets').target || 'src';
      const name = value.toLowerCase();
      const types = ['routers', 'controllers', 'models'];

      for (const [i, type] of types.entries()) {
        if (!rcm(type, path, src, name)) {
          window.showErrorMessage(`${src}/${type}/${name}.ts already exists!`);
          break;
        }
        if (i === types.length - 1) window.showInformationMessage('Created RCM file!');
      }

    });
  });

};

export const deactivate = () => console.log('Deactivate');
