import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import SideBar from "../../../assets/SideBar";
import { Box, Grid } from "@mui/material";
import { PieChart, Pie, Cell, Legend, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const data = [
  { name: "Category A", value: 400 },
  { name: "Category B", value: 300 },
  { name: "Category C", value: 200 },
  { name: "Category D", value: 100 },
];


const dataBar = [
  { name: "Jan", value: 100 },
  { name: "Feb", value: 200 },
  { name: "Mar", value: 300 },
  { name: "Apr", value: 150 },
  { name: "May", value: 250 },
  { name: "Jun", value: 180 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function index() {
  return (
    <div>
      <SideBar />
      <h1 style={{ paddingTop: "100px" }}>WELCOME</h1>

      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item>
              <PieChart width={300} height={300}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
            <BarChart width={400} height={300} data={dataBar}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
