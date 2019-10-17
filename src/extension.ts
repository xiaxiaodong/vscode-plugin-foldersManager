import * as vscode from 'vscode';
import * as fs from 'fs';
import { initTreeView } from './nodeDep';


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
