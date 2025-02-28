import * as React from "react";
import styles from "./HelloWorld.module.scss";
import type { IHelloWorldProps } from "./IHelloWorldProps";
import { escape } from "@microsoft/sp-lodash-subset";

//SPHttpClientResponse
import { SPHttpClient } from "@microsoft/sp-http";

export interface ISPList {
  Title: string;
  Id: string;
}
export interface ISPLists {
  value: ISPList[];
}

export default class HelloWorld extends React.Component<IHelloWorldProps> {
  private async _getListData(): Promise<ISPLists> {
    const response = await this.props.context.spHttpClient.get(
      `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false`,
      SPHttpClient.configurations.v1
    );

    return response.json();
  }

  public render(): React.ReactElement<IHelloWorldProps> {
    const {
      description,
      test,
      test1,
      test2,
      test3,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    this._getListData()
      .then((items) => console.log(items))
      .catch((err) => console.log(err));

    return (
      <section
        className={`${styles.helloWorld} ${
          hasTeamsContext ? styles.teams : ""
        }`}
      >
        <div className={styles.welcome}>
          <img
            alt=""
            src={
              isDarkTheme
                ? require("../assets/welcome-dark.png")
                : require("../assets/welcome-light.png")
            }
            className={styles.welcomeImage}
          />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>
            Web part property value: <strong>{escape(description)}</strong>
          </div>
          <p>{escape(test)}</p>
          <p>{test1}</p>
          <p>{escape(test2)}</p>
          <p>{test3}</p>
        </div>
        <div>
          <h3>Welcome to SharePoint Framework!</h3>
        </div>
      </section>
    );
  }
}
