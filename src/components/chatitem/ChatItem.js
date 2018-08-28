import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  card: {
    maxWidth: '80vw',
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
  readreply: {
      backgroundColor: '#ff0000',
  },
};

function ChatItem(props) {
  const { classes, chat } = props;
  // extract further from the chat in props
  //const { id, avatar, comment, username, validParent } = chat;
  const { id, parent, username, full_name, avatar, dateenglish, datehumanform, comment, validParent } = chat;

  //console.log("CHAT", chat)
  console.log("validParent", validParent)

  return (

    <div className={classes.root}>
        <List>
            <ListItem key={id} dense button className={classes.listItem}>
              <Avatar alt="Remy Sharp" src={ avatar } />
              <ListItemText primary={ comment } />
              <br />
              <ListItemText primary={ dateenglish } secondary={datehumanform} />
                       
            </ListItem>

        </List>
      </div>





    // <Card className={classes.card}>
    //   <CardMedia
    //     component="img"
    //     className={classes.media}
    //     width="10vw"
    //     image={avatar}
    //     title='Some Messages from the users'
    //   />
    //   <CardContent >
    //     <Typography gutterBottom variant="headline" component="h2" className={(validParent) ? 'reply' : 'reply'}>
    //       { username }
    //     </Typography>
    //     <Typography component="p" className={(validParent) ? 'readreply' : 'reply'}>
    //       { comment }   
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small" color="primary">
    //       Share
    //     </Button>
    //     <Button size="small" color="primary">
    //       Learn More
    //     </Button>
    //   </CardActions>
    // </Card>
  );
}

// ChatItem.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(ChatItem);