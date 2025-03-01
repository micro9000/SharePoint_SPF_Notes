import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IReadSitePropertiesProps {
  context: WebPartContext;
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
