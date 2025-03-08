import { Log } from "@microsoft/sp-core-library";
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
} from "@microsoft/sp-application-base";

import * as strings from "AppCustomizerApplicationCustomizerStrings";
import PlaceholderComponent, {
  PlaceholderComponentProps,
} from "./PlaceholderComponent";
import * as React from "react";
import * as ReactDom from "react-dom";

import styles from "./AppStyles.module.scss";
const LOG_SOURCE: string = "AppCustomizerApplicationCustomizer";

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IAppCustomizerApplicationCustomizerProperties {
  // This is an example; replace with your own property
  top: string;
  bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AppCustomizerApplicationCustomizer extends BaseApplicationCustomizer<IAppCustomizerApplicationCustomizerProperties> {
  private _topPlaceholder?: PlaceholderContent;
  private _bottomPlaceholder?: PlaceholderContent;

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(
      this,
      this._renderPlaceholders
    );

    return Promise.resolve();
  }

  private _onDispose(): void {
    console.log("Disposed custom top and bottom placeholders.");
  }

  private _renderPlaceholders(): void {
    console.log(
      "Available placeholders are: ",
      this.context.placeholderProvider.placeholderNames
        .map((ph) => PlaceholderName[ph])
        .join(", ")
    );

    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        {
          onDispose: this._onDispose,
        }
      );

      if (!this._topPlaceholder) {
        console.log("The placeholder Top was not found...");
        return;
      }

      if (this.properties) {
        let topString: string = this.properties.top;
        if (!topString) {
          topString = "(Top property was not defined!)";
        }

        if (this._topPlaceholder.domElement) {
          const element: React.ReactElement<PlaceholderComponentProps> =
            React.createElement(PlaceholderComponent, {
              toDisplayMsg: topString,
              placeHolderClassName: styles.topPlaceholder,
            });

          ReactDom.render(element, this._topPlaceholder.domElement);
        }
      }
    }

    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,
          {
            onDispose: this._onDispose,
          }
        );

      if (!this._bottomPlaceholder) {
        console.log("The placeholder Bottom was not found...");
        return;
      }

      if (this.properties) {
        let topString: string = this.properties.bottom;
        if (!topString) {
          topString = "(Bottom property was not defined!)";
        }

        if (this._bottomPlaceholder.domElement) {
          const element: React.ReactElement<PlaceholderComponentProps> =
            React.createElement(PlaceholderComponent, {
              toDisplayMsg: topString,
              placeHolderClassName: styles.bottomPlaceholder,
            });

          ReactDom.render(element, this._bottomPlaceholder.domElement);
        }
      }
    }
  }
}
