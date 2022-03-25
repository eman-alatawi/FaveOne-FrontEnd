import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(4),
    },
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}));

export default function UserAvatar({imageSrc}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt="Remy Sharp" src={imageSrc} className={classes.large}/>
    </div>
  );
}
