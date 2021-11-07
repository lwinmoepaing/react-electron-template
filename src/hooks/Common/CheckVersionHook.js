import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function CheckVersionHook() {
  const { electron } = window;
  const currentVersion = useSelector((state) => state.app.version);
  const [nextVersion, setNextVersion] = useState(0);
  const [getVersionLoading, setGetVersionLoading] = useState(false);
  const [isReleaseNewVersion, setIsReleaseNewVersion] = useState(false);
  const [versionStatus, setVersionStatus] = useState("");
  const [versionUpdateLoading, setVersionUpdateLoading] = useState(false);
  const [versionUpdatePercentage, setVersionUpdatePercentage] = useState("0");
  const [isVersionUpdateError, setIsVersionUpdateError] = useState(false);
  const [versionUpdateErrorMessage, setVersionUpdateErrorMessage] =
    useState("");

  useEffect(() => {
    electron.versionApi.onVersionMessage(onVersionMessage);
    electron.versionApi.onFinishedUpdate(onFinishedUpdate);
    electron.versionApi.onVersionUpdatePercentage(onVersionProgress);
    electron.versionApi.onVersionUpdateError(onVersionUpdateError);
    // onVersionUpdateError
    return () => {
      electron.versionApi.onVersionMessageRemoveListener(onVersionMessage);
      electron.versionApi.onFinishedUpdateRemoveListener(onFinishedUpdate);
      electron.versionApi.onVersionUpdatePercentageRemoveListener(
        onVersionProgress
      );
      electron.versionApi.onVersionUpdateErrorRemoveListener(
        onVersionUpdateError
      );
    };
  }, []);

  const onVersionMessage = (event, message) => {
    setVersionStatus(message);
  };

  const onVersionUpdateError = (event, message) => {
    setIsVersionUpdateError(true);
    setVersionUpdateErrorMessage(message);
  };

  const onFinishedUpdate = () => {
    setVersionUpdateLoading(false);
  };

  const onVersionProgress = (event, percentage) => {
    setVersionUpdatePercentage(percentage);
  };

  const changeNumericFormat = useCallback(
    (version) => Number(version.replace(/\./g, "")),
    []
  );

  const checkVersionRelease = async () => {
    if (isReleaseNewVersion || getVersionLoading) return true;

    try {
      setGetVersionLoading(true);
      const res = await axios.get(process.env.VERSION_URL);
      const nxtVerNumeric = changeNumericFormat(res.data.version);
      const curVerNumeric = changeNumericFormat(currentVersion);
      setNextVersion(res.data.version);
      if (nxtVerNumeric > curVerNumeric) {
        setTimeout(() => {
          setGetVersionLoading(false);
          setIsReleaseNewVersion(true);
        }, 2000);
      } else {
        setTimeout(() => {
          setIsReleaseNewVersion(false);
          setGetVersionLoading(false);
        }, 2000);
      }
    } catch (e) {
      setGetVersionLoading(false);
      console.log(e);
    }
  };

  const updateVersionRelease = async () => {
    setVersionUpdateLoading(true);
    electron.versionApi.requestUpdate();
  };

  return {
    currentVersion,
    nextVersion,
    getVersionLoading,
    isReleaseNewVersion,
    versionStatus,
    versionUpdatePercentage,
    versionUpdateLoading,
    isVersionUpdateError,
    versionUpdateErrorMessage,
    checkVersionRelease,
    updateVersionRelease,
  };
}
