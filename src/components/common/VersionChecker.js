import React from "react";
import CheckVersionHook from "../../hooks/common/CheckVersionHook";
import Button from "@mui/material/Button";
import SearchLoading from "../../components/loading/SearchLoading";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

function VersionChecker() {
  const {
    currentVersion,
    nextVersion,
    getVersionLoading,
    isReleaseNewVersion,
    versionStatus,
    versionUpdatePercentage,
    versionUpdateLoading,
    isVersionUpdateError,
    versionUpdateErrorMessage,
    changeNumericFormat,
    checkVersionRelease,
    updateVersionRelease,
  } = CheckVersionHook();

  return (
    <Grid container justifyContent="center" alignItems="center" rowSpacing={1}>
      <Grid item xs={10} sm={8} md={4} lg={3}>
        <Card>
          <CardContent sx={{ pb: 1 }}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Version Checker
            </Typography>

            <Typography color="text.secondary">
              Current Version: v{currentVersion}
            </Typography>

            {!!isReleaseNewVersion && (
              <Typography color="text.secondary">
                New Version: v{nextVersion}
              </Typography>
            )}

            {getVersionLoading && (
              <Typography color="text.secondary" sx={{ fontSize: 12 }}>
                <SearchLoading
                  className="LoadingContainer"
                  style={{ top: 8 }}
                />
                <span style={{ inline: "block", marginLeft: 10 }}>
                  Loading ...
                </span>
              </Typography>
            )}

            {versionUpdateLoading && versionUpdatePercentage && (
              <LinearProgress
                variant="determinate"
                value={+versionUpdatePercentage}
                sx={{ mt: 1 }}
              />
            )}

            {versionUpdateLoading && (
              <Typography
                sx={{ fontSize: 14, mt: 1 }}
                color="text.secondary"
                gutterBottom
              >
                Status: {versionStatus}
              </Typography>
            )}

            {isVersionUpdateError && (
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Error Message: {versionUpdateErrorMessage}
              </Typography>
            )}

            {changeNumericFormat(currentVersion) >=
              changeNumericFormat(nextVersion) &&
              !getVersionLoading && (
                <Typography color="text.secondary" sx={{ fontSize: 12 }}>
                  Already Updated Version!
                </Typography>
              )}
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={
                isReleaseNewVersion ? updateVersionRelease : checkVersionRelease
              }
            >
              {isReleaseNewVersion
                ? "Do you want to update now ?"
                : "Check Version to Update?"}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default VersionChecker;
