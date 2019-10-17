import * as vscode from 'vscode';
import * as fs from 'fs';
import { initTreeView } from './nodeDep';
// 参考文档 
// 中文版 https://liiked.github.io/VS-Code-Extension-Doc-ZH/#/
// 官方 https://code.visualstudio.com/api

export function activate(context: vscode.ExtensionContext) {
	

	let disposable = vscode.commands.registerCommand('foldersManager.openFolder', async (workspace) => {
		vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(workspace));
	});

	let disposableEditConfig = vscode.commands.registerCommand('foldersManager.editConfig', (name) => {
		vscode.commands.executeCommand('vscode.open', vscode.Uri.file(context.globalStoragePath));
	});

	initTreeView(context);
	context.subscriptions.push(disposable, disposableEditConfig);
}

export function deactivate() {}
