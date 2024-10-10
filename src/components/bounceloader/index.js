import { connect } from 'react-redux';
import React, { Component } from 'react';

import './index.css';
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Bounce extends Component {

  render() {
    const { setLoader } = this.props
    return (
      <>
        {setLoader['status'] == true &&
          <div className='bounce-loader'>
            <div className="loader-area">
              <BounceLoader
                css={override}
                size={50}
                color={'#92101F'}
                loading={true}
              />
              <span className="loading-text">
                <p className="mt-4">{setLoader['message']}</p>
              </span>
            </div>
          </div>
        }
      </>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = ({ Auth }) => {
  let { setLoader } = Auth;
  return { setLoader };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bounce);
