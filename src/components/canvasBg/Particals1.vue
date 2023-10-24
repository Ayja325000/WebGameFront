<template>
  <vue-particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" :options="options" />
</template>
<script setup lang='ts'>
import Particles from "particles.vue3";
import { loadFull } from "tsparticles";
const options = {
  /* custom options */
  background: {
    color: {
      value: '#0d47a1'
    }
  },
  fpsLimit: 60,
  interactivity: {
    detectsOn: 'window',
    events: {
      onClick: {
        enable: true,
        mode: 'push'
      },
      onHover: {
        enable: true,
        mode: 'repulse'
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
        speed: 1
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 80,
        duration: 0.3
      }
    }
  },
  particles: {
    color: {
      value: '#ffffff'
    },
    links: {
      color: '#cccccc',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 3,
      straight: false
    },
    number: {
      density: {
        enable: true,
        value_area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: 'square'
    },
    size: {
      random: true,
      value: 8
    }
  },
  detectRetina: true
};

async function particlesInit(engine: any): Promise<void> {
  await loadFull(engine);
}
const particlesLoaded = async (container: any) => {
  console.log("Particles container loaded", container);
};
</script>

<style scoped>
#tsparticles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
}
</style>