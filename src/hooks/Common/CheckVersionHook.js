import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CheckVersionHook() {
  const [currentVersion, setCurrentVersion] = useState(process.env.VERSION);
  const [nextVersion, setNextVersion] = useState(0);
  const [getVersionLoading, setGetVersionLoading] = useState(false);
  const [isReleaseNewVersion, setIsReleaseNewVersion] = useState(false);

  useEffect(() => {
    setCurrentVersion(process.env.VERSION);
  }, []);

  const changeNumericFormat = (version) => Number(version.replace(/\./g, ""));

  const checkVersionRelease = async () => {
    if (isReleaseNewVersion || getVersionLoading) return true;

    try {
      setGetVersionLoading(true);
      const res = await axios.get(process.env.VERSION_URL);
      const nxtVerNumeric = changeNumericFormat(res.data.version);
      const curVerNumeric = changeNumericFormat(currentVersion);
      if (nxtVerNumeric > curVerNumeric) {
        setTimeout(() => {
          setNextVersion(res.data.version);
          setGetVersionLoading(false);
          setIsReleaseNewVersion(true);
        }, 2000);
      } else {
        setIsReleaseNewVersion(false);
      }
    } catch (e) {
      setGetVersionLoading(false);
      console.log(e);
    }
  };

  return {
    currentVersion,
    nextVersion,
    getVersionLoading,
    isReleaseNewVersion,
    checkVersionRelease,
  };
}
