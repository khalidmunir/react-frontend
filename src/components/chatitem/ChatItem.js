import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
};

function ChatItem(props) {
  const { classes, chat } = props;
  // extract further from the chat in props
  const { id, avatar, comment, username } = chat;

  console.log("CHAT", chat)
  console.log("Comment", comment)

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        className={classes.media}
        width="100%"
        image={avatar}
        title="Some Messages from you the users"
      />
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          { username }
        </Typography>
        <Typography component="p">
          { comment }   
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

// ChatItem.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(ChatItem);