import * as React from "react";
import type { IMsGraphCalendarEventsProps } from "./IMsGraphCalendarEventsProps";

import { MSGraphClientV3 } from "@microsoft/sp-http";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";

interface ICalendarEventsDemoState {
  value: MicrosoftGraph.Event[];
}

const MsGraphCalendarEvents = ({ spContext }: IMsGraphCalendarEventsProps) => {
  const [events, setEvents] = React.useState<ICalendarEventsDemoState>({
    value: [],
  });

  React.useEffect(() => {
    spContext.msGraphClientFactory
      .getClient("3")
      .then((client: MSGraphClientV3): void => {
        client
          .api("/me/calendar/events")
          .select("*")
          .get(
            (
              error,
              eventsReponse: ICalendarEventsDemoState,
              rawResponse?: any
            ) => {
              console.log(rawResponse);
              console.error(error);
              // console.log(eventsReponse.value);
              setEvents(eventsReponse);
            }
          )
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }, []);

  console.log(events.value.map((e) => e.subject));

  return <h1>{events.value.map((e) => e.subject).join(",")}</h1>;
};

export default MsGraphCalendarEvents;
