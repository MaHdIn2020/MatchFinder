import React from 'react';
import Banner from '../Shared/Banner';
import SuccessStories from '../Shared/SuccessStories';
import HowItWorks from '../Shared/HowItWorks';
import SuccessCount from '../Shared/SuceessCount';
import PremiumMembersSection from '../Shared/PremiumMembers';
import PrivateRoute from "./../../routes/PrivateRoute"

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PrivateRoute>
                <PremiumMembersSection></PremiumMembersSection>
            </PrivateRoute>
            <HowItWorks></HowItWorks>
            <SuccessCount></SuccessCount>
            <SuccessStories></SuccessStories>
            
        </div>
    );
};

export default Home;