import React, { useState, useCallback } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function UserAdvancedSearch(props) {
  const { onSearch, loading = false } = props;
  const initialQuery = {
    id: "",
    unique_name: "",
    user_name: "",
    role_id: "",
    phone_no: "",
  };
  const [query, setQuery] = useState(initialQuery);

  const onClear = useCallback(() => {
    if (onSearch) {
      onSearch({});
    }
    setQuery(initialQuery);
  }, [onSearch]);

  const searchQuery = useCallback(() => {
    const values = {};
    Object.keys(query).forEach((key) => {
      if (query[key]) {
        values[key] = query[key];
      }
    });
    console.log(values);
    if (onSearch) {
      onSearch(values);
    }
  }, [query, onSearch]);

  const handleForm = useCallback(
    (e, name) => {
      const { value } = e.target;
      setQuery({
        ...query,
        [name]: value.trim(),
      });
    },
    [query]
  );

  const handleCheckBox = useCallback(
    (e, name) => {
      const { value } = e.target;

      setQuery({
        ...query,
        [name]: query[name] === value.trim() ? "" : value.trim(),
      });
    },
    [query]
  );

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Advance User Search</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="User ID"
              variant="outlined"
              size="small"
              value={query.id}
              onChange={(e) => handleForm(e, "id")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Unique Name"
              variant="outlined"
              size="small"
              value={query.unique_name}
              onChange={(e) => handleForm(e, "unique_name")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Phone No"
              variant="outlined"
              size="small"
              value={query.phone_no}
              onChange={(e) => handleForm(e, "phone_no")}
            />
          </Grid>
          <Grid item xs={3}>
            <LoadingButton
              fullWidth
              variant="outlined"
              color="primary"
              loading={loading}
              endIcon={<RotateLeftRoundedIcon />}
              onClick={onClear}
            >
              Reset
            </LoadingButton>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="User Name"
              variant="outlined"
              size="small"
              value={query.user_name}
              onChange={(e) => handleForm(e, "user_name")}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              value="1"
              checked={query.role_id === "1"}
              control={<Checkbox size="small" />}
              label="Admin"
              onChange={(e) => handleCheckBox(e, "role_id")}
            />
            <FormControlLabel
              value="2"
              checked={query.role_id === "2"}
              control={<Checkbox size="small" />}
              label="Employee"
              onChange={(e) => handleCheckBox(e, "role_id")}
            />
          </Grid>
          <Grid item xs={3}>
            <LoadingButton
              fullWidth
              variant="contained"
              color="primary"
              endIcon={<SearchRoundedIcon />}
              onClick={searchQuery}
              loading={loading}
            >
              Search
            </LoadingButton>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default UserAdvancedSearch;
