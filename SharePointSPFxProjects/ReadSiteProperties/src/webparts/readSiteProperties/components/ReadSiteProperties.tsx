import * as React from "react";
import styles from "./ReadSiteProperties.module.scss";
import type { IReadSitePropertiesProps } from "./IReadSitePropertiesProps";
import { escape } from "@microsoft/sp-lodash-subset";

const ReadSiteProperties = (props: IReadSitePropertiesProps) => {
  const {
    context,
    description,
    isDarkTheme,
    environmentMessage,
    hasTeamsContext,
    userDisplayName,
  } = props;

  return (
    <section
      className={`${styles.readSiteProperties} ${
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
      </div>
      <div>
        <h3>Welcome to SharePoint Framework!</h3>
        <p>
          The SharePoint Framework (SPFx) is a extensibility model for Microsoft
          Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to
          extend Microsoft 365 with automatic Single Sign On, automatic hosting
          and industry standard tooling.
        </p>

        <p>Absolute Url: {escape(context.pageContext.web.absoluteUrl)}</p>
        <p>Title: {escape(context.pageContext.web.title)}</p>
        <p>
          Server Relative Url:{" "}
          {escape(context.pageContext.web.serverRelativeUrl)}
        </p>
        <p>User login name: {escape(context.pageContext.user.loginName)}</p>

        <p>
          Current Culture Name:{" "}
          {escape(context.pageContext.cultureInfo.currentCultureName)}
        </p>
        <p>
          Current UI Culture Name:{" "}
          {escape(context.pageContext.cultureInfo.currentUICultureName)}
        </p>
        <p>IsRightToLeft?: {context.pageContext.cultureInfo.isRightToLeft}</p>
      </div>
    </section>
  );
};

export default ReadSiteProperties;
