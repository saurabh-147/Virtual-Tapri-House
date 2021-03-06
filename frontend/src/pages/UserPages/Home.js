import React, { useEffect, useState } from "react";
import "./Home.css";

import Button from "@material-ui/core/Button";
import { isAuthenticated } from "../../api/auth";
import {
  getNotificationsforJoin,
  acceptRequestToJoinOffice,
  userInfo,
  askQuestion,
} from "../../api/user";
import SuccessModal from "../../components/Modal/SuccessModal";
import Footer from "./Footer";
import img from "./student2.png";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import SendSharpIcon from "@material-ui/icons/SendSharp";
import { TextareaAutosize } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const Home = () => {
  const [notification, setNotification] = useState(false);
  const [companyDetails, setCompanyDetails] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const preLoad = () => {
    const { token } = isAuthenticated();
    userInfo(token).then((data) => {
      if (data.user.offerToJoinOffice && !data.user.underOffice) {
        getNotificationsforJoin(token).then((notifiData) => {
          if (notifiData.success && notifiData.isPresent) {
            console.log(notifiData.office);
            setNotification(true);
            setCompanyDetails(notifiData.office);
          } else {
            console.log(notifiData.error);
          }
        });
      }
    });
  };

  useEffect(() => {
    if (isAuthenticated()) {
      preLoad();
    }
  }, []);

  const joinCompany = () => {
    const { token, user } = isAuthenticated();
    acceptRequestToJoinOffice(token).then((data) => {
      if (data.success) {
        alert(data.message);
      } else {
        console.log(data.error);
      }
    });
    setNotification(false);
  };

  const joinButton = () => {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
          onClick={joinCompany}
        >
          Join Compnay {companyDetails.name}
        </Button>
      </>
    );
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setQuestion(value);
  };

  const onSubmit = () => {
    askQuestion(question).then((data) => {
      console.log(data);

      if (data["ans"] == "empty") {
        alert("No Similar question found , pls try something else");
      } else {
        setAnswer(data["ans"]);
      }
    });
  };

  return (
    <>
      <div>
        <div className="land_div">
          <div className="land_content">
            <div className="row">
              <div className="col-md-6">
                <h1 className="p-5 land_head">
                  Welcome to Let Us Meet! Create or join an office for free!
                </h1>
                <div className="px-5">
                  <Link to="/signup">
                    <button className="land_btn">Join Us</button>
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <img className="p-5 img" src={img} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 land_cards">
                <div className="text-center land_card">
                  <i className="fa fa-briefcase land_icons" />
                  <h3 className="land_sub">Create Office</h3>
                </div>
              </div>
              <div className="col-md-4 land_cards">
                <div className="text-center land_card">
                  <i class="fa fa-commenting-o land_icons"></i>
                  <h3 className="land_sub">Chat With Employees</h3>
                </div>
              </div>
              <div className="col-md-4 land_cards">
                <div className="text-center land_card">
                  <i class="fa fa-plus-square land_icons"></i>
                  <h3 className="land_sub">Add Employees</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-5 land_cards">
                <div className="text-center land_card">
                  <h4 style={{ marginBottom: "20px" }}>Smart FAQs</h4>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginBottom: "20px",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Ask Question"
                      variant="outlined"
                      value={question}
                      onChange={handleChange}
                    ></TextField>
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<SendSharpIcon />}
                      onClick={onSubmit}
                    >
                      Send
                    </Button>
                  </div>

                  <Typography variant="subtitle2">{answer}</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <SuccessModal
        openModal={notification}
        content="You Have a Invite for joining a Company ,  Join the Company Just By Clicking the Below Button"
        childrenButtons={joinButton}
      />
    </>
  );
};

export default Home;
