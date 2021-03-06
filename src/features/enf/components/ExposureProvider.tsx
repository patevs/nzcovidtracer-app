import { setEnfEnabled } from "@features/verification/commonActions";
import {
  selectIsReady,
  selectVerificationCredentials,
} from "@features/verification/selectors";
import React, { ReactNode, useEffect } from "react";
import {
  ExposureProvider as BaseExposureProvider,
  KeyServerType,
  useExposure,
} from "react-native-exposure-notification-service";
import { useDispatch, useSelector } from "react-redux";

import config from "../../../config";
import { setEnfStatus } from "../reducer";

export interface ExposureProviderProps {
  children: ReactNode;
}

export function ExposureProvider(props: ExposureProviderProps) {
  const verificationCredentials = useSelector(selectVerificationCredentials);
  const isReady = useSelector(selectIsReady);

  const exposureConfig = {
    authToken: verificationCredentials.authToken,
    refreshToken: verificationCredentials.refreshToken,
    isReady,
    serverUrl: config.ENFServerUrl,
    keyServerUrl: config.ENFServerUrl,
    keyServerType: KeyServerType.nearform,
    traceConfiguration: {
      exposureCheckInterval: config.ENFCheckInterval,
      storeExposuresFor: 14,
      fileLimit: 1,
      fileLimitiOS: 3,
    },
    analyticsOptin: true,
    notificationTitle: "",
    notificationDescription:
      "The app has identified that you have been in close contact with someone who has tested positive for COVID-19.",
    hideForeground: true,
  };

  return (
    <BaseExposureProvider {...exposureConfig}>
      <UpdateEnfState>{props.children}</UpdateEnfState>
    </BaseExposureProvider>
  );
}

export interface UpdateEnfStateProps {
  children: ReactNode;
}

export function UpdateEnfState({ children }: UpdateEnfStateProps) {
  const { enabled, status } = useExposure();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setEnfEnabled(enabled));
    dispatch(setEnfStatus(status));
  }, [dispatch, enabled, status]);

  return <>{children}</>;
}
