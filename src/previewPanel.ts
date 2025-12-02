import * as vscode from 'vscode';
import { convertToSvgString } from './svgParser';

export class SvgPreviewPanel {
  public static currentPanel: SvgPreviewPanel | undefined;
  public static readonly viewType = 'rnSvgPreview';

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri, document: vscode.TextDocument) {
    const column = vscode.ViewColumn.Beside;

    if (SvgPreviewPanel.currentPanel) {
      SvgPreviewPanel.currentPanel._panel.reveal(column);
      SvgPreviewPanel.currentPanel.update(document);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      SvgPreviewPanel.viewType,
      'SVG Preview',
      column,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );

    SvgPreviewPanel.currentPanel = new SvgPreviewPanel(panel, extensionUri);
    SvgPreviewPanel.currentPanel.update(document);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  public update(document: vscode.TextDocument) {
    const code = document.getText();
    const { svg, errors } = convertToSvgString(code);
    this._panel.webview.html = this._getHtmlForWebview(svg, errors);
  }

  public dispose() {
    SvgPreviewPanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  private _getHtmlForWebview(svg: string, errors: string[]): string {
    const errorHtml = errors.length > 0
      ? `<div class="errors">
          <h3>Errors:</h3>
          <ul>${errors.map(e => `<li>${this._escapeHtml(e)}</li>`).join('')}</ul>
        </div>`
      : '';

    const svgHtml = svg
      ? `<div class="svg-container">${svg}</div>`
      : '<div class="no-svg">No React Native SVG found in the current file</div>';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SVG Preview</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      padding: 20px;
      background: var(--vscode-editor-background, #1e1e1e);
      color: var(--vscode-editor-foreground, #d4d4d4);
      min-height: 100vh;
    }

    .header {
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--vscode-panel-border, #333);
    }

    .header h2 {
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--vscode-foreground, #ccc);
    }

    .controls {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .control-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .control-group label {
      font-size: 12px;
      color: var(--vscode-descriptionForeground, #888);
    }

    .control-group input[type="range"] {
      width: 100px;
    }

    .control-group input[type="color"] {
      width: 30px;
      height: 24px;
      border: none;
      cursor: pointer;
    }

    .control-group select {
      background: var(--vscode-input-background, #3c3c3c);
      color: var(--vscode-input-foreground, #ccc);
      border: 1px solid var(--vscode-input-border, #555);
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }

    .svg-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px;
      background: var(--preview-bg, #ffffff);
      border-radius: 8px;
      min-height: 300px;
      transition: background 0.2s;
    }

    .svg-container svg {
      max-width: 100%;
      max-height: 80vh;
      transition: transform 0.2s;
    }

    .no-svg {
      text-align: center;
      padding: 60px 20px;
      color: var(--vscode-descriptionForeground, #888);
      font-size: 14px;
    }

    .no-svg::before {
      content: '🎨';
      display: block;
      font-size: 48px;
      margin-bottom: 16px;
    }

    .errors {
      background: var(--vscode-inputValidation-errorBackground, #5a1d1d);
      border: 1px solid var(--vscode-inputValidation-errorBorder, #be1100);
      border-radius: 4px;
      padding: 12px;
      margin-bottom: 20px;
    }

    .errors h3 {
      font-size: 12px;
      margin-bottom: 8px;
      color: var(--vscode-errorForeground, #f48771);
    }

    .errors ul {
      list-style: none;
      font-size: 12px;
    }

    .errors li {
      padding: 4px 0;
      color: var(--vscode-errorForeground, #f48771);
    }

    .errors li::before {
      content: '• ';
    }

    .checkerboard {
      background-image:
        linear-gradient(45deg, #ccc 25%, transparent 25%),
        linear-gradient(-45deg, #ccc 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #ccc 75%),
        linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
      background-color: #fff;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>React Native SVG Preview</h2>
  </div>

  <div class="controls">
    <div class="control-group">
      <label for="zoom">Zoom:</label>
      <input type="range" id="zoom" min="25" max="400" value="100">
      <span id="zoomValue">100%</span>
    </div>

    <div class="control-group">
      <label for="bgColor">Background:</label>
      <select id="bgSelect">
        <option value="white">White</option>
        <option value="black">Black</option>
        <option value="gray">Gray</option>
        <option value="checkerboard">Checkerboard</option>
        <option value="custom">Custom</option>
      </select>
      <input type="color" id="bgColor" value="#ffffff" style="display: none;">
    </div>
  </div>

  ${errorHtml}
  ${svgHtml}

  <script>
    const container = document.querySelector('.svg-container');
    const svg = container ? container.querySelector('svg') : null;
    const zoomSlider = document.getElementById('zoom');
    const zoomValue = document.getElementById('zoomValue');
    const bgSelect = document.getElementById('bgSelect');
    const bgColor = document.getElementById('bgColor');

    // Zoom control
    zoomSlider.addEventListener('input', (e) => {
      const value = e.target.value;
      zoomValue.textContent = value + '%';
      if (svg) {
        svg.style.transform = 'scale(' + (value / 100) + ')';
      }
    });

    // Background control
    bgSelect.addEventListener('change', (e) => {
      const value = e.target.value;
      if (container) {
        container.classList.remove('checkerboard');
        if (value === 'white') {
          container.style.setProperty('--preview-bg', '#ffffff');
        } else if (value === 'black') {
          container.style.setProperty('--preview-bg', '#1e1e1e');
        } else if (value === 'gray') {
          container.style.setProperty('--preview-bg', '#808080');
        } else if (value === 'checkerboard') {
          container.classList.add('checkerboard');
        } else if (value === 'custom') {
          bgColor.style.display = 'inline-block';
          container.style.setProperty('--preview-bg', bgColor.value);
        }

        if (value !== 'custom') {
          bgColor.style.display = 'none';
        }
      }
    });

    bgColor.addEventListener('input', (e) => {
      if (container) {
        container.style.setProperty('--preview-bg', e.target.value);
      }
    });
  </script>
</body>
</html>`;
  }

  private _escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
