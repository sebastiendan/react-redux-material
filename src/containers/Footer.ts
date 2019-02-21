import { connect } from 'react-redux';

import Footer from '../components/Footer';
import IStoreState from '../types';

export function mapStateToProps({ messenger }: IStoreState) {
  return {
    messenger,
  };
}

export default connect(mapStateToProps)(Footer);
