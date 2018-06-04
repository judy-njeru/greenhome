import React, { Component } from 'react';
import '../../css/Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="container">
        <div className="share-social">
          <a className="social overlay_icon" href="https://pinterest.com/graentheimili">
            <i className="fab fa-pinterest-p"></i>
          </a>
          <a className="social overlay_icon" href="https://facebook.com/graentheimili">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a className="social overlay_icon" href="https://instagram.com/graentheimili">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
