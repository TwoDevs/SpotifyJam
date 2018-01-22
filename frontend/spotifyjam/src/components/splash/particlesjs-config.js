module.exports = {
  "particles": {
    "number": {
      "value": 7,
      "density": {
        "enable": true,
        "value_area": 1100
      }
    },
    "color": {
      "value": "#1db954"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 6
      },
      "image": {
        "src": "/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_Green.png",
        "width": 10,
        "height": 10
      }
    },
    "opacity": {
      "value": 1,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 20,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 2,
        "size_min": 10,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 250,
      "color": "#1db954",
      "opacity": 1,
      "width": 1,
      shadow: {
        enable: true,
        color: "#ffffff",
        blur: 5
      }
    },
    "move": {
      "enable": true,
      "speed": 1.2,
      "direction": "left",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": true,
      "attract": {
        "enable": false,
        "rotateX": 0,
        "rotateY": 0
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 100,
        "size": 20,
        "duration": 5,
        "opacity": 1,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": false
};