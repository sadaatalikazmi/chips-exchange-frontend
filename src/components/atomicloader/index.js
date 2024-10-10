import { connect } from 'react-redux';
import React, { Component } from 'react';

import './index.css';

class Atomic extends Component {

  render() {
    return (
      <div class="atomic-loader">
        <div class="inner one"></div>
        <div class="inner two"></div>
        {/* <div class="inner three"></div> */}
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = ({ Auth }) => {
  let { } = Auth;
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Atomic);
