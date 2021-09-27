import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  ListItem,
  Paper,
  Divider,
  TextField,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fab,
  List,
  Button,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

function App() {
  const classes = useStyles();
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);
  const [isClicked, setisClicked] = useState(false);

  

  useEffect(() => {
    const socket = new WebSocket("ws://10.13.8.99:8000/ws/chat/elfolibre/");

    socket.onopen = () => {
      console.log(isClicked);
      if(isClicked){
        console.log("is connected");
        const data = {
          message : message,
          date : new Date(),
          user : 1
        }
        socket.send(JSON.stringify(data));
      }
      
    };
  
    socket.onmessage = (message) => {
      console.log('here',message);
    };
  
    // socket.addEventListener("open", function (event) {
    //   socket.send("Hello Server!");
    // });

    // socket.addEventListener("message", function (event) {
    //   console.log("Message from server ", event.data);
    // });
    // return () => {
    //   cleanup
    // }
  
  }, [isClicked, message])
  const handleText = (event) => {
    setmessage(event.target.value);
  }
  // Connection opened
  const handleSendMessage = () => {
    // Listen for messages
    setisClicked(true);
    setmessages([...messages,message]);
  };
  console.log(messages);
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="John Wick"></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
              <ListItemText secondary="online" align="right"></ListItemText>
            </ListItem>
            <ListItem button key="Alice">
              <ListItemIcon>
                <Avatar
                  alt="Alice"
                  src="https://material-ui.com/static/images/avatar/3.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Alice">Alice</ListItemText>
            </ListItem>
            <ListItem button key="CindyBaker">
              <ListItemIcon>
                <Avatar
                  alt="Cindy Baker"
                  src="https://material-ui.com/static/images/avatar/2.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={9}>
          <List className={classes.messageArea}>
            {messages.map((msg,index)=>
            <ListItem key={index}>
            <Grid container>
              <Grid item xs={12}>
                <ListItemText
                  align="right"
                  primary = {msg}
                ></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText align="right" secondary="09:30"></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
            )}

            {/* <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:31"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem> */}
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
                onChange={handleText}
              />
            </Grid>

            <Button onClick={handleSendMessage}>
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
