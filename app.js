import V from "./vector.js"
import Particle from "./particle.js"
import __, * as _ from "./helper.js"
let fps = 40;
let dt = 1.0/fps;

let conDist = 180;// Minimum distance for the connection between particles to be shown

class Particles {
  constructor(n) {
    this.particles = [];
    this.canvas = document.getElementById('canvas');
    this.canvas.width = this.width = document.documentElement.clientWidth;
    this.canvas.height = this.height = document.documentElement.clientHeight;
    this.c = this.canvas.getContext('2d');
    this.c.strokeWeight = 2;
    this.hue = 0;
    this.createParticles(n);
  }

  createParticles(n) {
    for (let i = 0; i < n; i++)
      this.particles.push(new Particle(
        _.randv(0, this.width, 0, this.height), // Random Position
        V.toCartesian(_.rand(50, 80), _.rand(0, 2*Math.PI)), // Speed with random angle and intensity
        _.rand(1, 3), // Radius
        _.rand(.25, 1) // Opacity
      ));
  }

  loop() {
    // this.c.fillStyle = '#124599';
    this.c.fillStyle = `hsl(${this.hue}, 70%, 40%)`;
    this.c.fillRect(0, 0, this.width, this.height);

    this.c.strokeStyle = 'white';
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(dt, this.width, this.height);
      this.particles[i].draw(this.c);

      // Draws the connections betweens particles
      // O(n²)... ikr...
      // At least j = i+1 was optimized, right?
      let d;
      for (let j = i+1; j < this.particles.length; j++) {
        d = _.dist(this.particles[i].pos, this.particles[j].pos);
        if (d < conDist) {
          this.c.globalAlpha = (conDist - d) / conDist;
          this.c.beginPath();
          this.c.moveTo(this.particles[i].pos.x, this.particles[i].pos.y);
          this.c.lineTo(this.particles[j].pos.x, this.particles[j].pos.y);
          this.c.stroke();
          this.c.closePath();
        }
      }

    }

    this.hue = (this.hue + .2) % 360;
  }


}

if (window.particles && window.particles.interval) clearInterval(window.particles.interval);

window.particles = new Particles(60);

window.particles.interval = setInterval(window.particles.loop.bind(window.particles), dt*1000);