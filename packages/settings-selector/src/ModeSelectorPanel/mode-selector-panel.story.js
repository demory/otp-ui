import React from "react";
import { action } from "@storybook/addon-actions";

import ModeSelectorPanel from ".";

const background = story => (
  <div
    style={{
      backgroundColor: "#F0F0F0",
      height: "300px",
      padding: "15px",
      fontFamily: "Hind, sans-serif"
    }}
  >
    {story()}
  </div>
);

const onQueryParamChange = action("onQueryParamChange");

const queryParams = {
  mode: "WALK,BUS,TRAM",
  routingType: "ITINERARY"
};

export default {
  title: "ModeSelectorPanel",
  decorators: [background]
};

export const container = () => (
  <ModeSelectorPanel
    queryParams={queryParams}
    onQueryParamChange={onQueryParamChange}
  />
);
