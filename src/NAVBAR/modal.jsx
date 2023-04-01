import React, { useState } from "react";
import useLocalStorageState from "./useLocalStorage";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

const Modal = (props) => {
  const [formData, setFormData] = useState({
    category: "",
    analyte: "",
    unit: "",
    id: "",
    datatable: [],
  });
  const [counter, setCounter] = useLocalStorageState("counter", 0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSave = () => {
    if (formData.category && formData.analyte && formData.unit) {
      const newData = {
        ...formData,
        id: counter,
      };
      props.onDataChange([...props.data, newData]); //pasa los datos al componente padre (navbar)
      setFormData({
        category: "",
        analyte: "",
        unit: "",
      });
      setCounter(counter + 1);
      setErrorMessage("");
      props.setOpen(false);
    } else {
      setErrorMessage("Por favor complete todos los campos");
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Añadir analito</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="category-label">Sección</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={formData.category}
              onChange={(event) =>
                setFormData({ ...formData, category: event.target.value })
              }
            >
              <MenuItem value="Quimica">Quimica</MenuItem>
              <MenuItem value="Hematología">Hematología</MenuItem>
              <MenuItem value="Otros">Otros</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="analyte"
            name="analyte"
            label="Analito"
            value={formData.analyte}
            onChange={(event) =>
              setFormData({ ...formData, analyte: event.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            id="unit"
            name="unit"
            label="Unidad de medida"
            value={formData.unit}
            onChange={(event) =>
              setFormData({ ...formData, unit: event.target.value })
            }
            fullWidth
          />
          {errorMessage && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {errorMessage}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
