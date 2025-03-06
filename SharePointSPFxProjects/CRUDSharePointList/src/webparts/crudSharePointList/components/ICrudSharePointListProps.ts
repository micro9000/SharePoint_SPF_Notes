import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICrudSharePointListProps {
  context: WebPartContext;
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
