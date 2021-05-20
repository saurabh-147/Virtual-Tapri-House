import React, { useEffect, useState } from "react";
import "./Home.css";
import xyz from "./xyz.png";
import Button from "@material-ui/core/Button";
import { isAuthenticated } from "../../api/auth";
import { getNotificationsforJoin, acceptRequestToJoinOffice, userInfo } from "../../api/user";
import SuccessModal from "../../components/Modal/SuccessModal";
import Footer from "./Footer";
const Home = () => {
  const [notification, setNotification] = useState(false);
  const [companyDetails, setCompanyDetails] = useState("");

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
        <Button variant="contained" color="primary" style={{ marginBottom: "20px" }} onClick={joinCompany}>
          Join Compnay {companyDetails.name}
        </Button>
      </>
    );
  };

  return (
    <>
      <div className="home">
        <div className="home_section1">
          <div className="home_section1_text">
            <h1 className="home_heading">Work remotely, side-by-side.</h1>
            <p className="home_txt">
              Sococo is the online workplace where distributed teams come to work together each day, side-by-side. No matter where team members might be. Down the hall, across
              campus, or halfway around the world – working in your organization’s online office is even more productive than being on the same floor or in the same room.
            </p>
          </div>
          <div className="home_section1_image">
            <img className="home_img" src={xyz} />
          </div>
        </div>
        <div className="home_section2">
          <div className="home_section2_text">
            <h1 className="sec2_home_heading">Answers to your virtual office questions.</h1>
            <p className="sec2_home_text">Our team is ready to answer your questions.</p>
            <Button variant="contained" color="secondary">
              Enquire Now
            </Button>
          </div>
          <div className="home_section2_FAQs">
            <h1>FAQS</h1>
            <div className="home_faQs">
              <h4 className="home_ques">Is a virtual office a physical space?</h4>
              <p className="home_ans">
                A virtual office isn’t a full-time workspace for your business. With our virtual office packages, you register your business at one of our workspaces and your
                company benefits from having a prestigious address in a leading location. All our business addresses belong to real workplaces. If you need a physical space to
                work, you can choose a virtual office package to access our global network of business lounges and work there whenever you want. With our Virtual Office Plus
                package, you can work from an office or coworking desk for five days each month. Alternatively, our office or coworking membership give you access to a private
                office or coworking desk as often as you need.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <SuccessModal openModal={notification} content="You Have a Invite for joining a Company ,  Join the Company Just By Clicking the Below Button" childrenButtons={joinButton} />
    </>
  );
};

export default Home;
