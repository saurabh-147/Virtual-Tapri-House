import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import * as TiIcons from "react-icons/ti";

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

const About = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <h1>About Us</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vestibulum morbi blandit cursus risus at
              ultrices mi tempus. Scelerisque in dictum non consectetur. Ornare quam viverra orci sagittis. Fames ac turpis egestas integer eget aliquet. Arcu non sodales neque
              sodales ut etiam sit amet. Sagittis eu volutpat odio facilisis mauris sit amet. Mattis nunc sed blandit libero volutpat sed. Ultrices tincidunt arcu non sodales
              neque. Lacus laoreet non curabitur gravida arcu ac tortor dignissim convallis. Pellentesque dignissim enim sit amet venenatis. Eget mi proin sed libero enim. Viverra
              accumsan in nisl nisi. Amet tellus cras adipiscing enim eu. Vitae elementum curabitur vitae nunc sed. Ut ornare lectus sit amet est placerat in. Vestibulum lorem sed
              risus ultricies tristique nulla aliquet. Nec tincidunt praesent semper feugiat nibh. Elementum tempus egestas sed sed risus pretium quam. Rhoncus urna neque viverra
              justo nec ultrices. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Convallis a cras semper auctor neque vitae. Lacus suspendisse faucibus
              interdum posuere lorem ipsum dolor sit amet. Odio ut sem nulla pharetra. Tempus egestas sed sed risus pretium quam vulputate. Tristique nulla aliquet enim tortor at
              auctor urna nunc id.
            </p>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
