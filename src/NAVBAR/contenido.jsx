import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Tabla from "./datagrid";

const Contenido = ({
  drawerWidth,
  selectedId,
  data,
  updateData,
  handleAddFila,
  handleDeleteRow,
  updateEditFila,
}) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar />
      <Box sx={{ width: "1000px" }}>
        <Tabla
          selectedId={selectedId}
          data={data}
          updateData={updateData}
          handleAddFila={handleAddFila}
          handleDeleteRow={handleDeleteRow}
          updateEditFila={updateEditFila}
        />
      </Box>
    </Box>
  );
};

export default Contenido;
