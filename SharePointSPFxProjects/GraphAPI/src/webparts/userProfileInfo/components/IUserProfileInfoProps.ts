import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IUserProfileInfoProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  spContext: WebPartContext;
}
