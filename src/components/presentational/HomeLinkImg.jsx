import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import fakeLogo from '@/assets/images/fake-logo.svg';


function HomeLinkImage(props) {
  const { imgClassName } = props;
  return (
    <Link to="/">
      <img src={fakeLogo} className={imgClassName} alt="Go to homepage" />
    </Link>
  );
}

HomeLinkImage.defaultProps = {
  imgClassName: '',
};

HomeLinkImage.propTypes = {
  imgClassName: PropTypes.string,
};

export default HomeLinkImage;
