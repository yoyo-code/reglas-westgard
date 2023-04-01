import * as React from "react";
import { useState } from "react";
import useLocalStorageState from "./useLocalStorage";
import AlertDialog from "./alertDialog";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import AddchartIcon from "@mui/icons-material/Addchart";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Examenes from "./examenes";
import Contenido from "./contenido";
import Modal from "./modal";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { v4 as uuidv4 } from "uuid";

//aca empieza la edicion aaaa

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

//Aca empieza el componente
const Navbar = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [data, setData] = useLocalStorageState("data", []);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useLocalStorageState("selectedId", null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDataChange = (newData) => {
    setData(newData);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);

    // Si newData está vacío, establecer selectedId en null
    if (newData.length === 0) {
      setSelectedId(null);
    }
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleReset = () => {
    setData([]);
    setSelectedId(null);
    localStorage.removeItem("data");
    localStorage.removeItem("selectedId");
  };

  //funcionar para cargar datos demostrativos
  const handlePresetData = () => {
    const presetData = [
      {
        category: "Hematología",
        analyte: "Hematocrito",
        unit: "mg/dl",
        id: 9999997,
        datatable: [
          {
            id: 1,
            nivel1: 1,
            nivel2: 2,
            editFila: false,
          },
          {
            id: 2,
            nivel1: 3,
            nivel2: 4,
            editFila: true,
          },
          {
            id: 3,
            nivel1: 5,
            nivel2: 6,
            editFila: true,
          },
        ],
      },
      {
        category: "Quimica",
        analyte: "Glucosa",
        unit: "mg/dl",
        id: 9999998,
        datatable: [
          {
            id: 1,
            nivel1: 7,
            nivel2: 8,
            editFila: false,
          },
          {
            id: 2,
            nivel1: 9,
            nivel2: 10,
            editFila: true,
          },
          {
            id: 3,
            nivel1: 11,
            nivel2: 12,
            editFila: true,
          },
        ],
      },
      {
        category: "Otros",
        analyte: "BHCG",
        unit: "mg/dl",
        id: 9999999,
        datatable: [
          {
            id: 1,
            nivel1: 13,
            nivel2: 14,
            editFila: false,
          },
          {
            id: 2,
            nivel1: 15,
            nivel2: 16,
            editFila: true,
          },
          {
            id: 3,
            nivel1: 17,
            nivel2: 18,
            editFila: true,
          },
        ],
      },
    ];

    setData(presetData);
    setSelectedId(9999997);
    localStorage.setItem("data", JSON.stringify(presetData));
    localStorage.setItem("selectedId", JSON.stringify(0));
  };

  const updateData = (selectedId, rowId, newRowData) => {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === selectedId) {
          return {
            ...item,
            datatable: item.datatable.map((row) => {
              if (row.id === rowId) {
                return newRowData;
              }
              return row;
            }),
          };
        }
        return item;
      });
    });
  };

  const handleAddFila = () => {
    const newId = uuidv4();
    const newItem = {
      id: newId,
      nivel1: "",
      nivel2: "",
      editFila: true,
    };
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === selectedId) {
          return {
            ...item,
            datatable: [...item.datatable, newItem],
          };
        }
        return item;
      })
    );
  };

  const handleDeleteRow = (rowId) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === selectedId) {
          return {
            ...item,
            datatable: item.datatable.filter((row) => row.id !== rowId),
          };
        }
        return item;
      })
    );
  };

  const updateEditFila = (rowId, editFilaValue) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === selectedId) {
          return {
            ...item,
            datatable: item.datatable.map((row) => {
              if (row.id === rowId) {
                return { ...row, editFila: editFilaValue };
              }
              return row;
            }),
          };
        }
        return item;
      })
    );
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem key="prueba" disablePadding>
          <ListItemButton onClick={handleClickOpen}>
            <ListItemIcon>
              <AddchartIcon />
            </ListItemIcon>
            <ListItemText primary="Agregar analito" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Examenes data={data} onDelete={handleDelete} onSelect={handleSelect} />
      <Modal
        open={open}
        setOpen={setOpen}
        onDataChange={handleDataChange}
        data={data}
        setData={setData}
        onReset={handleReset}
      />
      <Divider />
      <ListItem key="presetData" disablePadding>
        <ListItemButton onClick={handlePresetData}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Demostración" />
        </ListItemButton>
      </ListItem>

      {data.length > 0 && <AlertDialog onConfirm={handleReset} />}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Reglas de Westgard - Control de calidad
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Contenido
        selectedId={selectedId}
        drawerWidth={drawerWidth}
        data={data}
        updateData={updateData}
        handleAddFila={handleAddFila}
        handleDeleteRow={handleDeleteRow}
        updateEditFila={updateEditFila}
      />
    </Box>
  );
};

export default Navbar;
