import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IMsGraphCalendarEventsProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  spContext: WebPartContext;
}
