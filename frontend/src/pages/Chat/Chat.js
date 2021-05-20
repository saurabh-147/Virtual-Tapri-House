import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import queryString from "query-string";

let socket;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
    marginTop: "20px",
  },
  message: {
    // textAlign: "center",
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

const Chat = ({ location }) => {
  const classes = useStyles();

  const [chatId, setChatId] = useState(null);
  const [userId, setUserId] = useState(null);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const ENDPOINT = "http://localhost:7000";

  useEffect(() => {
    const { chatId, userId } = queryString.parse(location.search);

    setChatId(chatId);
    setUserId(userId);

    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.emit("join", { chatId, userId }, (response) => {
      //over here we are retrieving previous messages
      console.log(response);
      setMessages(response);
    });

    return () => {
      console.log("User is disconnected");
      socket.off();
    };
  }, [ENDPOINT]);

  const updateMessages = (message) => {
    let newMessages = messages;
    newMessages.push(message);
    setMessages(newMessages);
    console.log(messages);
  };

  useEffect(() => {
    socket.on("message", (message) => {
      updateMessages(message);
    });
  }, []);

  //user sending messages
  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", { message, chatId, userId }, (response) => setMessage(""));
    }
  };

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item md={6} xs={12}>
          <Paper style={{ background: "blueviolet", color: "white" }} className={classes.paper}>
            Parle-Moi
          </Paper>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item md={6} xs={12}>
          <Paper className={classes.paper}>
            {messages.map((item) => {
              return userId == item.userId ? (
                <Grid container direction="row" justify="flex-end" spacing={2}>
                  <Grid item xs={5}>
                    <Paper className={classes.message}>{item.content}</Paper>
                  </Grid>
                </Grid>
              ) : (
                <Grid container direction="row" justify="flex-start">
                  <Grid item xs={5}>
                    <Paper className={classes.message}>Someone Else</Paper>
                  </Grid>
                </Grid>
              );
            })}

            <TextField
              id="outlined-full-width"
              placeholder="Type a message"
              fullWidth
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyPress={(event) => (event.key === "Enter" ? sendMessage(event) : null)}
              variant="outlined"
            />
            <Button style={{ margin: "2px" }} variant="contained" color="primary" onClick={(event) => sendMessage(event)}>
              Send
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
