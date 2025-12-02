import * as vscode from 'vscode';
import { SvgPreviewPanel } from './previewPanel';

export function activate(context: vscode.ExtensionContext) {
  console.log('React Native SVG Preview is now active!');

  const showPreviewCommand = vscode.commands.registerCommand(
    'rnSvgPreview.showPreview',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        SvgPreviewPanel.createOrShow(context.extensionUri, editor.document);
      }
    }
  );

  context.subscriptions.push(showPreviewCommand);

  // Update preview when document changes
  vscode.workspace.onDidChangeTextDocument((event) => {
    if (SvgPreviewPanel.currentPanel) {
      const activeEditor = vscode.window.activeTextEditor;
      if (activeEditor && event.document === activeEditor.document) {
        SvgPreviewPanel.currentPanel.update(event.document);
      }
    }
  });

  // Update preview when active editor changes
  vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor && SvgPreviewPanel.currentPanel) {
      SvgPreviewPanel.currentPanel.update(editor.document);
    }
  });
}

export function deactivate() {}
