import React, { ReactElement } from "react";

import RouteLongName from "../defaults/route-long-name";
import * as S from "../styled";
import { RouteDescriptionProps } from "../types";

export default function RouteDescription({
  leg,
  LegIcon
}: RouteDescriptionProps): ReactElement {
  const { routeShortName } = leg;
  return (
    <S.LegDescriptionForTransit>
      <S.LegIconContainer>
        <LegIcon leg={leg} />
      </S.LegIconContainer>
      {routeShortName && (
        <S.LegDescriptionRouteShortName>
          {routeShortName}
        </S.LegDescriptionRouteShortName>
      )}
      <RouteLongName leg={leg} />
    </S.LegDescriptionForTransit>
  );
}
