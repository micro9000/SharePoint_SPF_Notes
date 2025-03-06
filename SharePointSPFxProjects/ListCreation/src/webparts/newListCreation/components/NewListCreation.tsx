import * as React from "react";
import styles from "./NewListCreation.module.scss";
import type { INewListCreationProps } from "./INewListCreationProps";

import { TextField } from "@fluentui/react/lib/TextField";
import { PrimaryButton } from "@fluentui/react/lib/Button";

import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions,
} from "@microsoft/sp-http";

const NewListCreation = (props: INewListCreationProps) => {
  const { context, hasTeamsContext } = props;

  const [listName, setListName] = React.useState<string>();
  const [listDescription, setListDescription] = React.useState<string>();

  React.useEffect(() => {
    console.log(listName, listDescription);
  }, [listName, listDescription]);

  const onChangeListNameFieldValue = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setListName(newValue || "");
    },
    []
  );

  const onChangeListDescriptionFieldValue = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setListDescription(newValue || "");
    },
    []
  );

  const onCreateButtonClient = (): void => {
    const listUrl: string = `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${listName}')`;

    context.spHttpClient
      .get(listUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        if (response.status === 200) {
          alert("A list already does exists with this name");
          return;
        }
        if (response.status === 404) {
          const url: string =
            context.pageContext.web.absoluteUrl + "/_api/web/lists";
          const listDefinition: any = {
            Title: listName,
            Description: listDescription,
            AllowContentTypes: true,
            BaseTemplate: 100,
            ContentTypesEnabled: true,
          };
          const spHttpClientOptions: ISPHttpClientOptions = {
            body: JSON.stringify(listDefinition),
          };

          context.spHttpClient
            .post(url, SPHttpClient.configurations.v1, spHttpClientOptions)
            .then((response: SPHttpClientResponse) => {
              if (response.status === 201) {
                alert("A new list has been created successfully");
              } else {
                console.log("Create post method", response);
                alert(
                  `Error Message: ${response.status} - ${response.statusText}`
                );
              }
            })
            .catch((error) => console.log(error));
        } else {
          console.log("Not 200 or 400", response);
          alert(`Error Message: ${response.status} - ${response.statusText}`);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <section
      className={`${styles.newListCreation} ${
        hasTeamsContext ? styles.teams : ""
      }`}
    >
      <div>
        <h3>Create new SharePoint List</h3>

        <TextField
          label="List name"
          onChange={onChangeListNameFieldValue}
          value={listName}
        />
        <TextField
          label="List description"
          multiline
          rows={3}
          value={listDescription}
          onChange={onChangeListDescriptionFieldValue}
        />
        <PrimaryButton
          text="Primary"
          onClick={onCreateButtonClient}
          allowDisabledFocus
        />
      </div>
    </section>
  );
};

export default NewListCreation;
