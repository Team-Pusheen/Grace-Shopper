import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { GiPocketBow } from 'react-icons/gi'



const Home = ()=> {
  return (
    <div className='home-img'>
      <div className='container speech-bubble'>
        <p>Welcome weary travelers to The Pusheen Bazaar!</p>
        <TypeAnimation 
        sequence={[
          'The one stop shop to prepare you for your adventure. We boast the highest quality gear and magical items in all the land!',3000,''
        ]}
        speed={20}
        style={{ fontSize: '22px' }}
        wrapper="span"
        repeat={Infinity} 
        />
        <p><GiPocketBow /></p>
      </div>
    </div>
  );
};

export default Home;
