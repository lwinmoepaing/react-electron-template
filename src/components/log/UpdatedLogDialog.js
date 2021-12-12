import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Zoom from "@mui/material/Zoom";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom direction="up" ref={ref} {...props} />;
});

export default function UpdatedLogDialog(props) {
  const { open, handleClose, updatedFieldData } = props;

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
    >
      <DialogTitle>Updated List</DialogTitle>
      <DialogContent dividers>
        <List>
          {updatedFieldData?.length > 0 &&
            updatedFieldData.map((data) => (
              <ListItem key={data.fieldName}>
                <ListItemText
                  primary={"Field Name: " + data.fieldName}
                  secondary={
                    <>
                      From: {data.oldValue} — To: {data.newValue}
                    </>
                  }
                />
              </ListItem>
            ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
