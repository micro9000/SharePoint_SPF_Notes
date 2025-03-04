import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IHelloWorldProps {
  context: WebPartContext;
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
