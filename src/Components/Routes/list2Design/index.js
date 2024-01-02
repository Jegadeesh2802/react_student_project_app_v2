import { Button, Card, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Iconify from "../../../assets/iconfy";
import {  UserListToolbar } from "../../../assets/user";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/Reducer/userReducer";
import axios from "axios";
import SideBar from "../../../assets/SideBar";
import { useNavigate } from "react-router-dom";





const useStyles = makeStyles((theme) => ({
  alignTableContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flexBasis: "50%",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "50px 0 0 0",
    marginBottom: "20px",
  },
  searchBox: {
    marginLeft: "auto",
  },
  tableCell: {
    color: "#000",
    backgroundColor: "#3f51b5",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // minHeight: "100vh", // Set the container to take up at least the full viewport height
    backgroundColor: theme.palette.background.default,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(3),
    // width: "100%",
    boxSizing: "border-box",
  },
}));



export default function index() {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);

  const [search, setSearch] = useState("");
  const [ studentList, setStudentList] = useState([]);


  const [searchResults, setSearchResults] = useState([]);


  const [filterName, setFilterName] = useState("");

  const [page, setPage] = useState(0);

  const navigate = useNavigate();
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const navigateAddStudent=()=>{
    navigate('/addStudent')
  }
  const user = useSelector(selectUser);
  useEffect(() => {
    const getUserStudentList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/student/user_data",
          {
            method: "GET",
            headers: {
              "x-access-token": user.accessToken,
            },
          }
        );
        console.log(response.data, "REsponse");
        setStudentList(response.data);
        setSearchResults(response.data); // add this line
      } catch (e) {
        console.log(e,'eroorrrrrrrrrrrrrrrrrr');
      }
    };
    getUserStudentList();
  }, [user.accessToken, setStudentList]);

  return (
    <div>
      <SideBar/>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {" "}
            Welcome : {user.username}
          </Typography>

          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={navigateAddStudent}
          >
           Add Student
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          ></UserListToolbar>

          <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCell}>Name</TableCell>
                <TableCell className={classes.tableCell}>Age</TableCell>
                <TableCell className={classes.tableCell}>
                  Date of Birth
                </TableCell>
                <TableCell className={classes.tableCell}>City</TableCell>
                <TableCell className={classes.tableCell}>Mobile</TableCell>
                <TableCell className={classes.tableCell}>Email</TableCell>
                <TableCell className={classes.tableCell}>College</TableCell>
                <TableCell className={classes.tableCell}>Course</TableCell>
                <TableCell className={classes.tableCell}>Passed Out</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.length > 0 ? (
                searchResults
                  .filter((student) => {
                    if (search === "") {
                      return student;
                    } else if (
                      typeof student.name === "string" &&
                      student.name.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return student;
                    }
                    return null;
                  })
                  .map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.age}</TableCell>
                      <TableCell>{student.dateOfBirth}</TableCell>
                      <TableCell>{student.city}</TableCell>
                      <TableCell>{student.mobile}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.college}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>{student.passedOut}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan="9" style={{ textAlign: "center" }}>
                    No data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          </TableContainer>
        </Card>
      </Container>
    </div>
  );
}
