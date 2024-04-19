import React from 'react';
import { Link } from 'react-router-dom';
import {arrow} from '../../assets/icons'

const InfoBox = ({text, link, btnText})=>(
    <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>{text}</p>
        {link && (
        <Link to={link} className='neo-brutalism-white neo-btn'>
            {btnText}
            <img src={arrow} className='w-4 h-4 object-contain' />
        </Link>
        )}
    </div>
);

const renderContent = {
    1 : (
        <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>Hi, my name is <span className='font-semibold'>Juan</span>👋 and this is my plane Pablo, and my bird friend Gustavo</h1>
    ),
    2 : (
        <InfoBox 
        text='I love my Pablo, Pablo love to export drugs to the USA' 
        
        />
    ),
    3 : (
        <InfoBox 
        text='This littles foxes reminds me a little mistake i made back in the (G)old days, i named this plane in honor of him, RIP😔' 
        link='https://www.clarin.com/internacional/-pablo-escobear-historia-oso-comio-20-kilos-cocaina-volvio-mito-vegas_0_VOYlezJUgw.html'
        btnText='Click Here'
        />
    ),
    4 : (
        <InfoBox 
        text='Now its time for a joint, if you dont have one click down below to buy it online ' 
        link='https://www.fbi.gov/'
        btnText='Click Here'
        />
    )
}





const HomeInfo = ({currentStage}) => {

   

  return renderContent[currentStage] || null;
}

export default HomeInfo