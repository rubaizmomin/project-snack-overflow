import React from 'react';
import Particles from 'react-tsparticles';
import ParticlesConfig from "./config/particles-config.js";

const ParticlesBg = () => {
  return(
    <Particles params={ParticlesConfig}></Particles>
    );
}

export default ParticlesBg;