import React from 'react';
import { Image } from 'react-bootstrap';

/* Images */
import maskOne from '../image_mask_one.png';
import maskTwo from '../image_mask_two.png';

import './TopNavbar.scss';

const TopNavBar = () => {
  return (
    <div className="banner-mask-container">
      <div className="row g-0 w-100 h-100">
        <div className="col-9 h-100">
          <Image
            src={maskOne}
            alt="pic-mask-one"
            className="imageMask-WxH1"
          />
        </div>
        <div className="col-3 h-100">
          <Image
            src={maskTwo}
            alt="pic-mask-two"
            className="imageMask-WxH1"
          />
        </div>
      </div>

      <div className="banner-mask-overlay"></div>
    </div>
  );
};

export default TopNavBar;
