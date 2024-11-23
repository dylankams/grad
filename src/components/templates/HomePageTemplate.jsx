import React from 'react';
import WelcomeOffer from '../../components/organisms/WelcomeOffer';
import TopTrips from '../../components/organisms/TopTrips';
import Services from '../../components/organisms/Services';
import Blog from '../../components/organisms/Blog';
import BusDestinations from '../../components/organisms/BusDestinations';
import FraudPrevention from '../../components/organisms/FraudPrevention';
import HeaderBanner from '../../components/molecules/HeaderBanner';
import SearchForm from '../../components/molecules/SearchForm';

const HomePageTemplate = () => {
  return (
    <div className="home-page">
        <HeaderBanner /><br /><br />
        <SearchForm />
        <WelcomeOffer />
        <TopTrips />
        <Services />
        <Blog />
        <BusDestinations />
        <FraudPrevention />
    </div>
  );
};

export default HomePageTemplate;
