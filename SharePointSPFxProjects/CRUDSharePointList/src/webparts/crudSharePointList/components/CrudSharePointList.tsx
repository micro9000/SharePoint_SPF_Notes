import * as React from "react";
import styles from "./CrudSharePointList.module.scss";
import type { ICrudSharePointListProps } from "./ICrudSharePointListProps";
import { DefaultButton, PrimaryButton, TextField } from "@fluentui/react";
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions,
} from "@microsoft/sp-http";
import { ISoftwareListItem } from "./ISoftwareListItem";

const CrudSharePointList = (props: ICrudSharePointListProps) => {
  const { context, hasTeamsContext } = props;
  const [softwareId, setSoftwareId] = React.useState<string>("");
  const [softwareName, setSoftwareName] = React.useState<string>();
  const [status, setStatus] = React.useState<string>();
  const [allItems, setAllItems] = React.useState<ISoftwareListItem[]>();
  const siteListEndpoint =
    context.pageContext.site.absoluteUrl +
    "/_api/web/lists/getbytitle('SoftwareCatalog')/items";

  const onChangeSoftwareIdFieldValue = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setSoftwareId(newValue || "");
    },
    []
  );

  const onChangeSoftwareNameFieldValue = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setSoftwareName(newValue || "");
    },
    []
  );

  const getListItemById = (id: string): Promise<ISoftwareListItem> => {
    const url = siteListEndpoint + `?$filter=Id eq ${id}`;
    return context.spHttpClient
      .get(url, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        console.log(response);
        return response.json();
      })
      .then((listItems) => {
        const listItem = listItems.value[0] as ISoftwareListItem;
        return listItem;
      })
      .catch((error) => console.log(error)) as Promise<ISoftwareListItem>;
  };

  const getListItems = (): Promise<ISoftwareListItem[]> => {
    return context.spHttpClient
      .get(siteListEndpoint, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        console.log(response);
        return response.json();
      })
      .then((json) => json.value as ISoftwareListItem[])
      .catch((error) => console.log(error)) as Promise<ISoftwareListItem[]>;
  };

  const onReadItemButtonClick = () => {
    getListItemById(softwareId).then((item) =>
      setSoftwareName(item.SoftwareName)
    );
  };

  const onInsertButtonClicked = () => {
    const itemBody = {
      Title: `${softwareName}-title`,
      SoftwareName: softwareName,
    };

    const spHttpClientOptions: ISPHttpClientOptions = {
      body: JSON.stringify(itemBody),
    };

    context.spHttpClient
      .post(
        siteListEndpoint,
        SPHttpClient.configurations.v1,
        spHttpClientOptions
      )
      .then((response: SPHttpClientResponse) => {
        if (response.status === 201) {
          setStatus("List item has been created successfully");
          setSoftwareName("");
          setSoftwareId("");
        } else {
          setStatus(
            "An error occured i.e." +
              response.status +
              " - " +
              response.statusText
          );
        }
      })
      .catch((error) => console.log(error));
  };

  const onUpdateButtonClicked = () => {
    const url = `${siteListEndpoint}(${softwareId})`;

    const itemBody = {
      Title: `${softwareName}-title`,
      SoftwareName: softwareName,
    };

    const headers = {
      "X-HTTP-Method": "MERGE",
      "IF-MATCH": "*",
    };

    const spHttpClientOptions: ISPHttpClientOptions = {
      headers: headers,
      body: JSON.stringify(itemBody),
    };

    context.spHttpClient
      .post(url, SPHttpClient.configurations.v1, spHttpClientOptions)
      .then((response: SPHttpClientResponse) => {
        if (response.status === 204) {
          setStatus("List item has been updated successfully");
          setSoftwareName("");
          setSoftwareId("");
        } else {
          setStatus(
            "An error occured i.e." +
              response.status +
              " - " +
              response.statusText
          );
        }
      })
      .catch((error) => console.log(error));
  };

  const onDeleteButtonClicked = () => {
    const url = `${siteListEndpoint}(${softwareId})`;

    const headers = {
      "X-HTTP-Method": "DELETE",
      "IF-MATCH": "*",
    };

    const spHttpClientOptions: ISPHttpClientOptions = {
      headers: headers,
    };

    context.spHttpClient
      .post(url, SPHttpClient.configurations.v1, spHttpClientOptions)
      .then((response: SPHttpClientResponse) => {
        console.log(response);
        if (response.status === 204) {
          setStatus("List item has been deleted successfully");
          setSoftwareName("");
          setSoftwareId("");
        } else {
          setStatus(
            "An error occured i.e." +
              response.status +
              " - " +
              response.statusText
          );
        }
      })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    getListItems().then((items) => setAllItems(items));
  }, []);

  console.log(allItems);

  return (
    <section
      className={`${styles.crudSharePointList} ${
        hasTeamsContext ? styles.teams : ""
      }`}
    >
      <div className={styles.welcome}>
        <h2>CRUD SharePoint List!</h2>

        <table>
          <tr>
            <td>
              <TextField
                label="Please enter software id"
                onChange={onChangeSoftwareIdFieldValue}
                value={softwareId}
              />
              <DefaultButton
                text="Read Details"
                onClick={onReadItemButtonClick}
                allowDisabledFocus
              />
            </td>
          </tr>
          <tr>
            <td>
              <TextField
                label="Software name"
                onChange={onChangeSoftwareNameFieldValue}
                value={softwareName}
              />
            </td>
          </tr>
          <tr>
            <td>
              <PrimaryButton
                text="Insert item"
                onClick={onInsertButtonClicked}
                allowDisabledFocus
              />
              <PrimaryButton
                text="Update item"
                onClick={onUpdateButtonClicked}
                allowDisabledFocus
              />
              <PrimaryButton
                text="Delete item"
                onClick={onDeleteButtonClicked}
                allowDisabledFocus
              />
            </td>
          </tr>
          <tr>
            <td>
              <p>{status}</p>
            </td>
          </tr>
        </table>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Software Name</th>
            </tr>
          </thead>
          <tbody>
            {allItems?.map((item) => (
              <tr>
                <td>{item.Id}</td>
                <td>{item.Title}</td>
                <td>{item.SoftwareName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div></div>
    </section>
  );
};

export default CrudSharePointList;
