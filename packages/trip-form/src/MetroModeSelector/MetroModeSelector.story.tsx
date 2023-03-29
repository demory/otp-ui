import { ModeButtonDefinition } from "@opentripplanner/types";
import { Bus, Car, PersonWalking } from "@styled-icons/fa-solid";
import { ClassicBike } from "@opentripplanner/icons/lib/classic";
import React, { ReactElement } from "react";
import { QueryParamProvider } from "use-query-params";
import { WindowHistoryAdapter } from "use-query-params/adapters/window";
import * as Core from "..";
import { QueryParamChangeEvent } from "../types";

import modeSettingDefinitions from "../../modeSettings.yml";

const defaultModeButtonDefinitions = [
  {
    Icon: Bus,
    iconName: "bus",
    key: "TRANSIT",
    label: "Bus",
    modes: [{ mode: "TRANSIT" }]
  },
  {
    Icon: PersonWalking,
    iconName: "person-walking",
    key: "WALK",
    label: "Walk",
    modes: [{ mode: "WALK" }]
  },
  {
    // Using TriMet icon here to illustrate the use of fillModeIcons prop.
    Icon: ClassicBike,
    iconName: "bicycle",
    key: "BICYCLE",
    label: "Bike",
    modes: [{ mode: "BICYCLE" }]
  },
  {
    Icon: Car,
    iconName: "car",
    key: "CAR",
    label: "Car",
    modes: [{ mode: "CAR" }]
  }
];

const modeSettingDefinitionsWithDropdown = [
  ...modeSettingDefinitions,
  {
    applicableMode: "TRANSIT",
    default: "blue",
    key: "busColor",
    label: "Bus Color",
    options: [{ value: "blue", text: "Blue" }],
    type: "DROPDOWN"
  }
];

const initialState = {
  enabledModeButtons: ["TRANSIT"],
  modeSettingValues: {}
};

const MetroModeSelectorComponent = ({
  fillModeIcons,
  modeButtonDefinitions,
  onSetModeSettingValue,
  onToggleModeButton
}: {
  fillModeIcons?: boolean;
  modeButtonDefinitions: ModeButtonDefinition[];
  onSetModeSettingValue: (event: QueryParamChangeEvent) => void;
  onToggleModeButton: (key: string) => void;
}): ReactElement => {
  const {
    buttonsWithSettings,
    setModeSettingValue,
    toggleModeButton
  } = Core.useModeState(
    modeButtonDefinitions,
    initialState,
    modeSettingDefinitionsWithDropdown,
    {
      queryParamState: false
    }
  );

  const toggleModeButtonAction = (key: string) => {
    toggleModeButton(key);
    onToggleModeButton(key);
  };

  const setModeSettingValueAction = (event: QueryParamChangeEvent) => {
    setModeSettingValue(event);
    onSetModeSettingValue(event);
  };

  return (
    <Core.MetroModeSelector
      fillModeIcons={fillModeIcons}
      label="Select a transit mode"
      modeButtons={buttonsWithSettings}
      onSettingsUpdate={setModeSettingValueAction}
      onToggleModeButton={toggleModeButtonAction}
    />
  );
};

const Template = (args: {
  fillModeIcons?: boolean;
  onSetModeSettingValue: (event: QueryParamChangeEvent) => void;
  onToggleModeButton: (key: string) => void;
}): ReactElement => (
  <QueryParamProvider adapter={WindowHistoryAdapter}>
    <MetroModeSelectorComponent
      modeButtonDefinitions={defaultModeButtonDefinitions}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...args}
    />
  </QueryParamProvider>
);

export default {
  argTypes: {
    fillModeIcons: { control: "boolean" },
    onSetModeSettingValue: { action: "set mode setting value" },
    onToggleModeButton: { action: "toggle button" }
  },
  component: MetroModeSelectorComponent,
  title: "Trip Form Components/Metro Mode Selector"
};

export const MetroModeSelector = Template.bind({});

const a11yOverrideParameters = {
  a11y: { config: { rules: [{ id: "label", reviewOnFail: true }] } }
};
MetroModeSelector.parameters = a11yOverrideParameters;
