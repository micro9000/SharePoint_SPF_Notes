import * as React from "react";
import type { IShowAllUsersProps } from "./IShowAllUsersProps";

import { MSGraphClientV3 } from "@microsoft/sp-http";
// import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";

// import {
//   TextField,
//   PrimaryButton,
//   DetailsList,
//   DetailsListLayoutMode,
//   CheckboxVisibility,
//   SelectionMode,
// } from "@fluentui/react";

// import * as strings from "ShowAllUsersWebPartStrings";
import { escape } from "@microsoft/sp-lodash-subset";

// interface IUser {
//   displayName: string;
//   givenName: string;
//   surname: string;
//   mail: string;
//   mobilePhone: string;
//   userPrincipalName: string;
// }

const ShowAllUsers = ({ spContext }: IShowAllUsersProps) => {
  // const [allUsers, setAllUsers] = React.useState<IUser[]>([]);
  const [searchFor, setSearchFor] = React.useState<string>("Raniel");

  React.useEffect(() => {
    spContext.msGraphClientFactory
      .getClient("3")
      .then((client: MSGraphClientV3): void => {
        client
          .api("users")
          .select("*")
          .filter(`startswith(givenname, '${escape(searchFor)}')`)
          .get((error: any, response: any, rawResponse?: any) => {
            console.log(error);
            console.log(rawResponse);
            console.log(response);

            // let usersTmp: IU`ser[] = [];
            // response.value.map((item: any) => {
            //   usersTmp.push({
            //     displayName: item.display
            //   });
            // });
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }, []);

  return <h1 onClick={() => setSearchFor("raniel")}>HI</h1>;
};

export default ShowAllUsers;
