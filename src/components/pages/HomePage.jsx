import React, { useState, useEffect } from 'react';
import { useCarousel } from '../../hooks/useCarousel';
import { useApi } from '../../hooks/useApi';

import Carousel from '../common/Carousel';
import Announcement from '../home/Announcement';
import GameNavigation from '../home/GameNavigation';
import PromoBanner from '../home/PromoBanner';
import FloatBanner from '../common/FloatBanner/FloatBanner';


import { gamesAPI } from '../../api/games';
import { banners, promoBanners, announcement } from '../../data/homeData';
import { gameCategories } from '../../data/games';
import ScrollBanner from '../banners/ScrollBanner/ScrollBanner';
import FeatureGames from '../banners/FeatureGames/FeatureGames';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState(gameCategories[0]);
  const { currentIndex, goToSlide } = useCarousel(banners.length, 3000);
  const { execute: executeLoadGames } = useApi();

  // useEffect(() => {
  //   loadGames(activeCategory);
  // }, [activeCategory]);

  // const loadGames = async (category) => {
  //   try {
  //     setLoading(true);
  //     const response = await executeLoadGames(gamesAPI.getGames, { category });
      
  //     if (response.success) {
  //       setGames(response.data);
  //     } else {
  //       // Fallback to static data if API fails
  //       setGames(require('../../data/games').hotGames);
  //     }
  //   } catch (error) {
  //     console.error('Failed to load games:', error);
  //     // Fallback to static data
  //     setGames(require('../../data/games').hotGames);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const carouselItems = [
    {
      id: 1,
      messageId: '181278',
      imageUrl: 'https://img.s628b.com/upload/h5Announcement/image_296289.jpg',
      onClick: (item) => console.log('Clicked:', item)
    },
    {
      id: 2,
      messageId: '131120',
      imageUrl: 'https://img.s628b.com/upload/h5Announcement/image_290581.jpg',
      onClick: (item) => console.log('Clicked:', item)
    },
    {
      id: 3,
      messageId: '176066',
      imageUrl: 'https://img.s628b.com/upload/h5Announcement/image_290965.jpg',
      onClick: (item) => console.log('Clicked:', item)
    },
    {
      id: 4,
      messageId: '175525',
      imageUrl: 'https://img.s628b.com/upload/h5Announcement/image_287665.jpg',
      onClick: (item) => console.log('Clicked:', item)
    },
    {
      id: 5,
      messageId: '172273',
      imageUrl: 'https://img.s628b.com/upload/h5Announcement/image_282301.jpg',
      onClick: (item) => console.log('Clicked:', item)
    }
  ];

  return (
    <div className="ng-tns-c175553946 ng-star-inserted" style={{}}>

      <div className="main-content">
        <Carousel
           items={carouselItems}
        autoPlay={true}
        delay={5000}
        />

        <Announcement text={announcement} />

        {/* {loading ? (
          <div className="loading-container">
            <LoadingSpinner text="গেমস লোড হচ্ছে..." />
          </div>
        ) : ( */}
          <GameNavigation
            // categories={gameCategories}
            // activeCategory={activeCategory}
            // onCategoryChange={handleCategoryChange}
            // games={games}
          />
        {/* )} */}

        {/* <PromoBanner banners={promoBanners} /> */}
        <FeatureGames></FeatureGames>
        <ScrollBanner/>
        
      </div>


    </div>
  );
};

export default HomePage;