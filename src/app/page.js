"use client";
import Image from "next/image";
import styles from "./page.module.css";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import PaidIcon from "@mui/icons-material/Paid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Products from "@/components/product";
export default function Home() {
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState("");
  const callComponent = (name) => {
    setActiveComponent(name);
  };
  return (
    <Grid container>
      <Grid item lg={2}>
        <Box
          display="flex"
          flexDirection="column"
          border="1px solid "
          sx={{ display: "block", height: "100vh", marginTop: "1rem" }}
        >
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding disableRipple>
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard " />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => callComponent("product")}>
                  <ListItemIcon>
                    <Inventory2OutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Products  " />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Costumers " />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Categories " />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LocalGroceryStoreIcon />
                  </ListItemIcon>
                  <ListItemText primary="Orders " />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PaidIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transactions " />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PaidIcon />
                  </ListItemIcon>
                  <ListItemText primary="About " />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Grid>
      <Grid item lg={9}>
        <Box>{activeComponent === "product" ? <Products /> : null}</Box>
      </Grid>
    </Grid>
  );
}
