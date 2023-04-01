import * as React from "react";
import { useState } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

const Examenes = ({ data, onDelete, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [deletedId, setDeletedId] = useState(null);

  if (!data) {
    return <></>;
  }

  const groups = new Map();
  data.forEach(({ category, analyte, unit, id }) => {
    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category).push({ analyte, unit, id });
  });

  const handleClickOpen = (id) => {
    setDeletedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete(deletedId);
    setOpen(false);
  };

  return (
    <>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {Array.from(groups.entries()).map(
          ([category, analytes], i) =>
            analytes.length > 0 && (
              <TreeItem key={category} nodeId={`${i}`} label={category}>
                {analytes.map(({ analyte, unit, id }, j) => (
                  <TreeItem
                    key={id}
                    onClick={() => onSelect(id)}
                    nodeId={`${i}.${j}`}
                    label={
                      <div style={{ display: "flex" }}>
                        {analyte}
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleClickOpen(id)}
                          size="small"
                          style={{ marginLeft: "auto" }}
                        >
                          <ClearIcon
                            sx={{
                              width: "15px",
                              height: "15px",
                              color: "#adadad",
                            }}
                          />
                        </IconButton>
                      </div>
                    }
                  />
                ))}
              </TreeItem>
            )
        )}
      </TreeView>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Estás seguro de que quieres eliminar este elemento?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si presionas "Eliminar", este elemento será eliminado de manera
            permanente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Examenes;
