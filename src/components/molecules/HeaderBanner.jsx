import React from 'react';
import styled from 'styled-components';
import banner from '../../assets/img/banner.jpg';

const BannerWrapper = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${banner});
  background-size: cover;
  background-position: center;
  
  @media (max-width: 768px) {
    height: 150px;
  }
`;

const HeaderBanner = () => {
  return <BannerWrapper />;
};

export default HeaderBanner;
