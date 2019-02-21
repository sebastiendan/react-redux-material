import { Theme, withStyles } from '@material-ui/core';
import * as React from 'react';

import Thread from '../containers/Thread';
import { IDataState } from '../types';
import { IMessenger, IThread } from '../types/messenger';

const styles = (theme: Theme) => ({
  footer: {
    bottom: 0,
    height: 40,
    position: 'fixed' as 'fixed',
    width: '100%',
    zIndex: 1000,
  },
  threadsWrapper: {
    alignItems: 'end',
    display: 'flex',
    flexDirection: 'row-reverse' as 'row-reverse',
    flexWrap: 'wrap' as 'wrap',
    position: 'absolute' as 'absolute',
    right: '17%',
    top: 0,
  },
});

interface IProps {
  classes: any;
  messenger: IDataState<IMessenger>;
}

class Footer extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {open: false};
  }

  public render() {
    const classes: any = this.props.classes;

    return (
      <div className={classes.footer}>
        <div className={classes.threadsWrapper}>
          {this.props.messenger.data.threads && this.props.messenger.data.threads.map((thread: IThread, index: number) => 
            this.props.messenger.data.openThreads.find(x => x === thread.id) || thread.id === undefined ? (
              <Thread thread={thread} key={index}/>
            ) : null
          )}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Footer);
