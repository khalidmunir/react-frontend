import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


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
    textAlign: 'right',
  },
};

function ChatItem(props) {
  const { classes, chat } = props;
  // extract further from the chat in props
  //const { id, avatar, comment, username, validParent } = chat;
  const { id, parent, username, full_name, avatar, dateenglish, datehumanform, comment, validParent } = chat;

  //console.log("CHAT", chat)
  //console.log("validParent", validParent)

  return (

    <div className={classes.root}>
        <List>
            <ListItem key={id} dense  className={classes.listItem}>
                
            </ListItem>
            {validParent ? 
                `^^ I GOT A PARENT ` : ''}<br />
            <ListItem key={id} dense className={classes.listItem}>
              <Typography variant="title" color="inherit" primary={ comment }>
              { comment }
                </Typography>              
              
                       
            </ListItem>
            <ListItem>
              <Avatar alt={ full_name } src={ avatar } style={{display:'flex', justifyContent:'flex-end'}}  />
              <ListItemText primary={ username } secondary={full_name} />
              <ListItemText style={{display:'flex', justifyContent:'flex-end'}}  secondary={datehumanform} />
             
            </ListItem>
            <ListItem>
             
            </ListItem>

            



            
            
            <hr />

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