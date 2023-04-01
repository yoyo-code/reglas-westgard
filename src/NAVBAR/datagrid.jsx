import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

//aca ya volvista a como antes

const Tabla = ({
  selectedId,
  data,
  updateData,
  handleAddFila,
  handleDeleteRow,
  updateEditFila,
}) => {
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    const findSelectedData = (id) => {
      return data.find((item) => item.id === id);
    };

    const selectedData = findSelectedData(selectedId);
    if (selectedData) {
      setTableRows(selectedData.datatable);
    } else {
      setTableRows([]);
    }
  }, [selectedId, data]);

  const columns = [
    {
      field: "nivel1",
      headerName: "Nivel 1",
      type: "number",
      editable: true,
      sortable: false,
    },
    {
      field: "nivel2",
      headerName: "Nivel 2",
      type: "number",
      editable: true,
      sortable: false,
    },
    {
      field: "reglas",
      headerName: "Reglas",
      type: "number",
      editable: true,
      sortable: false,
    },
    {
      field: "accion",
      headerName: "Accion",
      type: "string",
      renderCell: (params) => (
        <>
          {params.row.editFila ? (
            <IconButton
              onClick={() => {
                updateData(selectedId, params.row.id, params.row);
                updateEditFila(params.row.id, false);
              }}
            >
              <SaveIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => updateEditFila(params.row.id, true)}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton
            onClick={() => {
              console.log("Eliminando fila", params.row); //borrar esto mas adelante
              handleDeleteRow(params.row.id);
            }}
            aria-label="eliminar"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
      sortable: false,
    },
  ];

  return (
    <Box sx={{ width: "100%", height: 300 }}>
      {selectedId !== null ? (
        <>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Button variant="outlined" size="small" onClick={handleAddFila}>
              Añadir fila
            </Button>
          </Stack>
          <DataGrid
            isCellEditable={(params) => params.row.editFila === true}
            rows={tableRows}
            columns={columns}
            experimentalFeatures={{ newEditingApi: true }}
            disableColumnMenu //saca el menú de las columnas
            hideFooter={true} //saca la paginación
            componentsProps={{
              //permite moverte con tab
              cell: {
                tabIndex: 0,
              },
            }}
            getRowClassName={(params) =>
              params.row.editFila === true ? "non-editable-row" : ""
            }
            sx={{ ".non-editable-row": { backgroundColor: "yellow" } }}
          />
        </>
      ) : (
        <p>Seleccione un elemento primero</p>
      )}
    </Box>
  );
};

export default Tabla;
