import * as React from "react";
import type { IUserProfileInfoProps } from "./IUserProfileInfoProps";

import { MSGraphClientV3 } from "@microsoft/sp-http";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";

const UserProfileInfo = ({ spContext }: IUserProfileInfoProps) => {
  const [user, setUser] = React.useState<MicrosoftGraph.User | undefined>();

  React.useEffect(() => {
    spContext.msGraphClientFactory
      .getClient("3")
      .then((client: MSGraphClientV3): void => {
        client
          .api("/me")
          .get((error, user: MicrosoftGraph.User, rawResponse?: any) => {
            console.log(rawResponse);
            console.error(error);
            setUser(user);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <p>Display name: {user?.displayName}</p>
      <p>Display name: {user?.givenName}</p>
    </div>
  );
};

export default UserProfileInfo;
