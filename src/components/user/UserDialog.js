import React, { useEffect, useMemo, useState, useCallback } from "react";
import * as Yup from "yup";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Zoom from "@mui/material/Zoom";
import { Form, FormField, FormSelector, FormSubmitButton } from "../form";
import LinearProgress from "@mui/material/LinearProgress";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import LoadingButton from "@mui/lab/LoadingButton";
import UserHook from "../../hooks/user/UserHook";
import UserFormHook from "../../hooks/user/UserFormHook";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom direction="up" ref={ref} {...props} />;
});

export default function UserDialog(props) {
  const initialValues = useMemo(
    () => ({
      id: "",
      unique_name: "",
      user_name: "",
      role_id: "1",
      password: "",
      phone_no: "",
      note: "",
      address: "",
    }),
    []
  );

  const {
    open,
    onClose,
    methodType,
    item,
    onUpdatedUser,
    onDeletedUser,
    onCreatedUser,
  } = props;

  const { getUserById, user, getUserByIdLoading } = UserHook();

  const {
    createdUserLoading,
    isCreatedUserError,
    errorMessageCreatedUser,
    updateUserLoading,
    isUpdateUserError,
    errorMessageUpdateUser,
    deleteUserLoading,
    isDeleteUserError,
    errorMessageDeletedUser,
    setIsUpdateUserError,
    setIsDeleteUserError,
    setIsCreatedUserError,
    updateUserById,
    createUser,
    deleteUserById,
  } = UserFormHook();

  const [userForm, setUserForm] = useState(initialValues);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isNotDirtyEdit, setIsNotDirtyEdit] = useState(false);

  const roles = useMemo(
    () => [
      { key: "Admin", value: "1" },
      { key: "Employee", value: "2" },
    ],
    []
  );

  const isView = useMemo(() => methodType === "view", [methodType]);
  const isEdit = useMemo(() => methodType === "edit", [methodType]);
  const isCreate = useMemo(() => methodType === "create", [methodType]);
  const isDelete = useMemo(() => methodType === "delete", [methodType]);
  const validationSchema = useMemo(() => {
    const validator = {
      unique_name: Yup.string().required().label("Name"),
      user_name: Yup.string().required().label("User Name"),
      phone_no: Yup.string().required().label("Phone Number"),
    };

    if (isCreate) {
      validator.password = Yup.string().min(6).required().label("Password");
      validator.role_id = Yup.string().required().label("Role");
    }
    return Yup.object().shape(validator);
  }, [isCreate]);

  useEffect(() => {
    // when calling everytime popup if editing we'll fetching
    if (open) {
      setUserForm({ ...initialValues });
    }
    if (open && item) {
      getUserById(item?.id);
    }
  }, [open, item]);

  useEffect(() => {
    if (user) {
      setUserForm({
        id: user.id,
        unique_name: user.unique_name,
        user_name: user.user_name,
        role_id: user.role_id,
        phone_no: user.phone_no,
        note: user.note,
        address: user.address,
      });
    }
  }, [user]);

  const handleClose = useCallback(() => {
    if (
      getUserByIdLoading ||
      deleteUserLoading ||
      updateUserLoading ||
      createdUserLoading
    ) {
      return;
    }
    if (onClose) {
      onClose();
    }
  }, [
    onClose,
    getUserByIdLoading,
    deleteUserLoading,
    updateUserLoading || createdUserLoading,
  ]);

  const handleCloseErrorMessage = useCallback(
    (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setIsUpdateUserError(false);
      setIsDeleteUserError(false);
      setIsCreatedUserError(false);
      setIsNotDirtyEdit(false);
    },
    [
      setIsUpdateUserError,
      setIsDeleteUserError,
      setIsCreatedUserError,
      setIsNotDirtyEdit,
    ]
  );

  const handleCloseSuccessMessage = useCallback(
    (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setIsSuccessMessage(false);
    },
    [setIsSuccessMessage]
  );

  const checkIsDirty = useCallback(
    (values) => {
      const toCheckKeys = ["phone_no", "unique_name", "user_name"];

      const isEverySame = toCheckKeys.every(
        (key) => userForm[key]?.trim() === values[key]?.trim()
      );

      return !isEverySame;
    },
    [userForm]
  );

  const onSubmitHandler = useCallback(
    async (values) => {
      if (isEdit) {
        const { id, unique_name, user_name, phone_no } = values;

        const isDirty = checkIsDirty(values);
        if (!isDirty) {
          setIsNotDirtyEdit(true);
          return;
        }

        const isDone = await updateUserById(id, {
          unique_name,
          user_name,
          phone_no,
        });

        if (isDone.isSuccess) {
          setIsSuccessMessage(true);
          handleClose();
          onUpdatedUser && onUpdatedUser(isDone.user);
        }

        return;
      }

      if (isCreate) {
        const { unique_name, user_name, phone_no, password, role_id } = values;
        const body = { unique_name, user_name, phone_no, password, role_id };
        const isDone = await createUser(body);
        if (isDone.isSuccess) {
          setIsSuccessMessage(true);
          handleClose();
          onCreatedUser && onCreatedUser();
        }
        return;
      }
    },
    [isEdit, isCreate, handleClose, onUpdatedUser, checkIsDirty]
  );

  const onDeleteHandler = useCallback(async () => {
    if (isDelete) {
      const isDone = await deleteUserById(user.id);
      if (isDone) {
        setIsSuccessMessage(true);
        handleClose();
        onDeletedUser && onDeletedUser(user);
      }
    }
  }, [user, onDeletedUser, handleClose]);

  return (
    <>
      <Dialog
        disableEscapeKeyDown
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        {getUserByIdLoading && (
          <LinearProgress color={isDelete ? "error" : "primary"} />
        )}
        <DialogTitle>
          {isCreate && "Create "}
          {isEdit && "Editing "}
          {isView && "View "}
          {isDelete && "Deleting "}
          User {(isEdit || isCreate) && " Form"}
        </DialogTitle>
        <DialogContent>
          {!isDelete && (
            <Form
              initialValues={userForm}
              validationSchema={validationSchema}
              onSubmit={onSubmitHandler}
            >
              <FormField
                type="text"
                name="unique_name"
                id="unique_name"
                label="Unique Name"
                InputProps={{
                  readOnly: isView,
                }}
                disabled={getUserByIdLoading}
                isEnterSubmit
              />

              {isCreate && (
                <>
                  <FormField
                    type="password"
                    name="password"
                    id="password"
                    label="Password"
                    InputProps={{
                      readOnly: isView,
                    }}
                    disabled={getUserByIdLoading}
                    isEnterSubmit
                  />

                  <FormSelector
                    name="role_id"
                    id="role_id"
                    label="Role"
                    options={roles}
                  />
                </>
              )}

              <FormField
                type="text"
                name="user_name"
                id="user_name"
                label="User Name"
                InputProps={{
                  readOnly: isView,
                }}
                disabled={getUserByIdLoading}
                isEnterSubmit
              />
              <FormField
                type="text"
                name="phone_no"
                id="phone_no"
                label="Phone No"
                InputProps={{
                  readOnly: isView,
                }}
                disabled={getUserByIdLoading}
                isEnterSubmit
              />
              {!isView && (
                <FormSubmitButton
                  disabled={getUserByIdLoading}
                  loading={
                    getUserByIdLoading ||
                    updateUserLoading ||
                    createdUserLoading
                  }
                />
              )}
            </Form>
          )}

          {/* If Deleting */}
          {isDelete && (
            <>
              <DialogContentText id="alert-dialog-description">
                Are you sure to delete{" "}
                {userForm.user_name && <b>{userForm.user_name}</b>} ?
              </DialogContentText>
            </>
          )}
        </DialogContent>
        {isDelete && (
          <DialogActions>
            <LoadingButton
              loading={deleteUserLoading}
              size="small"
              variant="outlined"
              onClick={handleClose}
              color="primary"
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              loading={getUserByIdLoading || deleteUserLoading}
              size="small"
              variant="outlined"
              onClick={onDeleteHandler}
              color="error"
              autoFocus
            >
              Delete
            </LoadingButton>
          </DialogActions>
        )}
      </Dialog>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={
            isUpdateUserError ||
            isDeleteUserError ||
            isCreatedUserError ||
            isNotDirtyEdit
          }
          autoHideDuration={3000}
          onClose={handleCloseErrorMessage}
        >
          <Alert
            onClose={handleCloseErrorMessage}
            severity="error"
            sx={{ width: "100%" }}
          >
            {isCreatedUserError && errorMessageCreatedUser}
            {isUpdateUserError && errorMessageUpdateUser}
            {isDeleteUserError && errorMessageDeletedUser}
            {isNotDirtyEdit && "All values are same."}
          </Alert>
        </Snackbar>
      </Stack>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={isSuccessMessage}
          autoHideDuration={3000}
          onClose={handleCloseSuccessMessage}
        >
          <Alert
            onClose={handleCloseSuccessMessage}
            severity="success"
            sx={{ width: "100%" }}
          >
            {isEdit && "Successfully updated."}
            {isCreate && "Successfully created."}
            {isDelete && "Successfully deleted."}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
