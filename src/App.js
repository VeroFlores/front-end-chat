import React, { useState, useEffect,useRef } from "react";
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
    boxShadow:"none"
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
  const ws = useRef(null);

  useEffect(() => {
    ws.current =  new WebSocket("ws://127.0.0.1:8000/ws/chat/elfolibre/");
    ws.current.onerror = e => console.log('Web socket error!');
		ws.current.onmessage = e => {
			const msg = JSON.parse(e.data);
      console.log('msg',msg);
      setmessages([...messages,msg.server_message]);
		};
    return () => ws.current.close();
  }, [messages]);
  
  const handleText = (event) => {
    setmessage(event.target.value);
  }

  const handleSendMessage = () => {
    // Listen for messages
    setisClicked(true);
   
        const data = {
          message : message,
          date : new Date(),
          user : 1,
          negotiation_id : 1
        }
        ws.current.send(JSON.stringify(data));
  };

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
            <ListItem button key="Jhon Wick">
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
