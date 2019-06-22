import React, { FC, ReactChild } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import Typography from '@material-ui/core/Typography';

import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: theme.typography.pxToRem(20),
    flexShrink: 0
  },
  progress: {
    flexBasis: `calc(100% - ${theme.typography.pxToRem(20)})`,
    alignSelf: 'center'
  },
  withBorder: {
    borderBottom: '1px solid rgba(224, 224, 224, 1)'
  }
}));

interface PanelProps {
  name: string;
  title: string;
  isDataLoaded: Boolean;
  handleChange: Function;
  expanded: string;
  children: ReactChild;
}

const Panel: FC<PanelProps> = ({
  name,
  title,
  isDataLoaded,
  handleChange,
  expanded,
  children
}) => {
  const classes = useStyles();
  return (
    <ExpansionPanel expanded={expanded === name} onChange={handleChange(name)}>
      <ExpansionPanelSummary className={classes.withBorder}>
        <Typography className={classes.heading}>{title}</Typography>
        {!isDataLoaded && <LinearProgress className={classes.progress} />}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {isDataLoaded ? children : <CircularProgress />}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Panel;
