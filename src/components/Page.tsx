import * as React from 'react';
import { Helmet } from 'react-helmet';

interface IProps {
  children: any;
  setTitle: (title: string) => void;
  title: string;
}

class Page extends React.Component<IProps, any> {
  public componentWillReceiveProps(nextProps: IProps) {
    this.props.setTitle(nextProps.title);
  }

  public render() {
    return (
      <React.Fragment>
        <Helmet><title>{this.props.title}</title></Helmet>
        {this.props.children}
      </React.Fragment>
    )
  }
}

export default Page;
