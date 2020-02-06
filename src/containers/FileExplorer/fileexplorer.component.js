import React, { Component } from "react";
import { rdfService } from "@services";
import { ThemeProvider } from "styled-components";
import { Explorer, ExplorerItem, Route } from "./fileexplorer.style";

export default class FileExplorerComponent extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
      files: [],
      route: [],
      previousRoute: []
    };
    this.changeRoot = this.changeRoot.bind(this);
  }

  async componentDidMount() {
    let publicRoot = await rdfService.getPublicFolderRoot();
    console.log("HEEEEEEEREEEEEEE: " + publicRoot);
    this.setState({
      url: publicRoot
    });
    let content = await rdfService.getFolderContent(this.state.url);
    this.setState({
      files: content,
      route: this.getRoute(this.state.url)
    });
    console.log("STATE: " + this.state);
  }

  async changeRoot(newRoute) {
    let content = await rdfService.getFolderContent(newRoute);
    let prev = this.state.route;
    await this.setState({
      url: newRoute,
      files: content,
      route: this.getRoute(newRoute),
      previousRoute: prev
    });
  }

  getRoute(url) {
    let route = url.split("//");
    route = route[1].split("/");
    let newRoute = [];
    for (var i = 1; i < route.length; i++) {
      if (route[i] !== "") {
        let part = {};
        part.name = route[i];
        let url = "https://" + route[0] + "/";
        for (var j = 1; j <= i; j++) {
          url += route[j] + "/";
        }
        part.url = url;
        newRoute.push(part);
      }
    }
    return newRoute;
  }

  /* jshint ignore:start */
  render() {
    console.log(this.state);
    let folders = null;

    if(this.state.files.folders !== undefined){
       folders = this.state.files.folders.map(file => {
        return (
          <ExplorerItem key={file.url}>
            <span onClick={() => this.changeRoot(file.url)}>{file.name}</span>
            <span>{file.modified}</span>
            <span>{file.size}</span>
          </ExplorerItem>
        );
      });
    }

    let archives = null;

    if(this.state.files.archives !== undefined){
      archives = this.state.files.archives.map(file => {
        return (
          <ExplorerItem key={file.url}>
            <span>{file.name}</span>
            <span>{file.modified}</span>
            <span>{file.size}</span>
          </ExplorerItem>
        );
      });
    }

    const route = (
      <Route>
        {this.state.route.map(part => {
          return (
            <span onClick={() => this.changeRoot(part.url)}>{part.name}/</span>
          );
        })}
      </Route>
    );
    return (
      <Explorer>
        {route}
        {folders}
        {archives}
      </Explorer>
    );
  }
  /* jshint ignore:end */
}
