'user strict';

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';


function checkConfig(filePath: string, context: vscode.ExtensionContext) {
  if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  }

  fs.watchFile(filePath, () => {
    vscode.window.registerTreeDataProvider('foldersManager', new DepNodeProvider(context));
  });
}

export function initTreeView (context: vscode.ExtensionContext) {
  context = context;
	checkConfig(context.globalStoragePath, context);
  const treeView = vscode.window.createTreeView('foldersManager', {treeDataProvider: new DepNodeProvider(context)});
}

export class DepNodeProvider implements vscode.TreeDataProvider<Dependency> {

  constructor(private context: vscode.ExtensionContext) {
    
  }
  onDidChangeTreeData?: vscode.Event<any>;  
  getTreeItem(element: any): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }
  getChildren(element?: any): vscode.ProviderResult<any[]> {
    if (!this.context) {
      vscode.window.showInformationMessage('workspaceRoot 为空');
      return [];
    }

    if (element) {
      if(element.children && element.children.length > 0) {

      }

      return element.children.map((item: any) => new Dependency(
        item.name,
        vscode.TreeItemCollapsibleState.None,
        item.children,
        {
          title: 'openWordspace',
          command: 'foldersManager.openFolder', 
          arguments: [item.path]
        }
      ));
    } else {
      let rootList = [];
      try{
        const config = JSON.parse(fs.readFileSync(this.context.globalStoragePath, 'utf-8'));

        rootList = config.map((item: any) => new Dependency(
          item.name,
          vscode.TreeItemCollapsibleState.Collapsed,
          item.children || []
        ));
      }catch(e){
        vscode.window.showInformationMessage(`配置读取错误`);
      }

      return rootList;
    }
  }
  getParent(element?: any): vscode.ProviderResult<Dependency> {
    if (element) {
      return null;
    }
    return  null;
  }
  
}

export class Dependency extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsbleState: vscode.TreeItemCollapsibleState,
    public children?: [],
    public readonly command?: vscode.Command
  ) {
    super(label, collapsbleState);

  }

  get tooltip(): string {
    return `${this.label}`;
  }

}
