import React from 'react';
import Particles from 'react-tsparticles';
import ParticlesConfig from "./config/particles-config.js";
import './particles-bg.css';

const ParticlesBg = () => {
  return(
    <div className='particle-container'>
      <Particles params={ParticlesConfig} />
    </div>
    );
}

export default ParticlesBg;