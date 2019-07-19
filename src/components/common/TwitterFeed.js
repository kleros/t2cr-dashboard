import './TwitterFeed.css';
import React from 'react';
import klerosLogoImg from '../../assets/images/kleros-logo-small.svg';
import twitterLogoImg from '../../assets/images/twitter-logo.svg';
import twitterDemoImg from '../../assets/images/twitter-feed-demo.png';

function TwitterFeed() {
    return (
        <div className="TwitterFeed">
            <div className="TwitterFeed__Header">
                <div className="TwitterFeed__KlerosLogo">
                    <img src={klerosLogoImg} alt="Kleros" />
                </div>
                <div className="TwitterFeed__Handle">
                    <p>@klerosT2CR</p>
                </div>
                <div className="TwitterFeed__TwitterLogo">
                    <img src={twitterLogoImg} alt="Twitter" />
                </div>
            </div>
            <div className="Twitter__Tweets">
                <img src={twitterDemoImg} alt="Twitter demo feed" />>
            </div>
        </div>
    );
}

export default TwitterFeed;