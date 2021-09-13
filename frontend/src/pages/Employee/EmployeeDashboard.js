import React, { useEffect, useState } from "react";
import { userInfo } from "../../api/user";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";

import { isAuthenticated } from "../../api/auth";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link, useHistory } from "react-router-dom";
import { officeDetailsForEmployee, officeDetailsForEmployer } from "../../api/office";
import * as BsIcons from "react-icons/bs";
import ModalForm from "../../components/Modal/ModalForm";
import * as BiIcons from "react-icons/bi";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    margin: "10px",
  },
}));

const EmployeeDashboard = () => {
  const classes = useStyles();
  let history = useHistory();

  const { token } = isAuthenticated();
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(null);
  const [offDetails, setOffDetails] = useState("");

  const getDetailsOfUserOffice = () => {
    officeDetailsForEmployee(token).then((data) => {
      if (data.success) {
        setOffDetails(data.officeDetails);
      } else {
        console.log(data.error);
      }
    });
  };

  const checkIfUserIsInOffice = () => {
    userInfo(token).then((data) => {
      if (data.success) {
        if (data.user.underOffice) {
          setUser(data.user);
          getDetailsOfUserOffice();
        } else {
          setOpenModal(true);
        }
      } else {
        console.log(data.error);
      }
    });
  };

  useEffect(() => {
    checkIfUserIsInOffice();
  }, []);

  const goBackButton = () => {
    return (
      <>
        <Button as={Link} variant="danger" to="/">
          Back
        </Button>
      </>
    );
  };

  return (
    <>
      {!openModal && (
        <>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
              <Paper style={{ background: "blueviolet", color: "white" }} className={classes.paper}>
                <Button onClick={() => history.push("/")}>
                  <BiIcons.BiArrowBack />
                </Button>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper} style={{ color: "white", background: "black" }}>
                <Typography variant="h5">{offDetails?.name}</Typography>
                <Typography variant="subtitle1"> {offDetails?.description}</Typography>
              </Paper>
            </Grid>
          </Grid>
          <Button style={{ marginLeft: "20px" }} as={Link} to={`/Chat?chatId=${user?.userChatId}&userId=${user?._id}`}>
            <BsIcons.BsChatDots />
          </Button>
          <Grid container spacing={3}>
            <Grid item xs>
              {user &&
                user.userUnderOfficeRooms.map((item, index) => {
                  return (
                    <Paper className={classes.paper} key={index}>
                      <Grid container>
                        <Grid item xs>
                          <Typography variant="h6"> {item.name}</Typography>
                          <Typography variant="subtitle2"> {item.description}</Typography>

                          <Button as={Link} to={`/employeeRoom/${item.roomId}`}>
                            View
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  );
                })}
            </Grid>
          </Grid>
        </>
      )}
      <ModalForm
        openModal={openModal}
        title="Employee Message"
        content="Sorry , You Are Not Present In Any Office , Ask Your Employer To Send Request To Join Office"
        children={() => {}}
        childrenButtons={goBackButton}
      />
    </>
  );
};

export default EmployeeDashboard;
