import * as React from "react";
import styles from "./CreateSite.module.scss";
import type { ICreateSiteProps } from "./ICreateSiteProps";
import { PrimaryButton, TextField } from "@fluentui/react";
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions,
} from "@microsoft/sp-http";

const CreateSite = (props: ICreateSiteProps) => {
  const { context, hasTeamsContext } = props;
  const [subSiteName, setSubSiteName] = React.useState<string>();
  const [subSiteDescription, setSubSiteDescription] = React.useState<string>();
  const [subSiteUrl, setSubSiteUrl] = React.useState<string>();

  const onChangeSubSiteNameFieldValue = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setSubSiteName(newValue || "");
    },
    []
  );

  const onChangeSubSiteDescriptionFieldValue = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setSubSiteDescription(newValue || "");
    },
    []
  );

  const onChangeSubSiteUrlFieldValue = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setSubSiteUrl(newValue || "");
    },
    []
  );

  const onCreateSubSiteButtonClicked = (): void => {
    console.log(subSiteName, subSiteUrl, subSiteDescription);

    const url = context.pageContext.web.absoluteUrl + "/_api/web/webinfos/add";
    const requestBody: any = {
      parameters: {
        "@data.type": "SP.WebInfoCreationInformation",
        Title: subSiteName,
        Url: subSiteUrl,
        Description: subSiteDescription,
        Language: 1033,
        WebTemplate: "STS#0",
        UseUniquePermissions: true,
      },
    };

    const spHttpClientOptions: ISPHttpClientOptions = {
      body: JSON.stringify(requestBody),
    };

    context.spHttpClient
      .post(url, SPHttpClient.configurations.v1, spHttpClientOptions)
      .then((response: SPHttpClientResponse) => {
        console.log(response);
        if (response.status === 200) {
          alert("New subsite has been created successfully");
        } else {
          alert("Error message:" + response.status + "-" + response.statusText);
        }
      })
      .catch((error) => console.log(error));

    console.log(spHttpClientOptions);
  };

  return (
    <section
      className={`${styles.createSite} ${hasTeamsContext ? styles.teams : ""}`}
    >
      <div className={styles.welcome}>
        <h2>Create a subsite</h2>
      </div>
      <div>
        <TextField
          label="Sub Site Title"
          onChange={onChangeSubSiteNameFieldValue}
          value={subSiteName}
        />
        <TextField
          label="Sub Site description"
          multiline
          rows={3}
          value={subSiteDescription}
          onChange={onChangeSubSiteDescriptionFieldValue}
        />

        <TextField
          label="Sub Site Url"
          value={subSiteUrl}
          onChange={onChangeSubSiteUrlFieldValue}
        />
        <PrimaryButton
          text="Primary"
          onClick={onCreateSubSiteButtonClicked}
          allowDisabledFocus
        />
      </div>
    </section>
  );
};

export default CreateSite;
