import V from "./vector.js"

class Particle {
  constructor(pos, vel, radius, opacity) {
    this.pos = pos;
    this.vel = vel;
    this.r = radius;
    this.opacity = opacity;
  }

  update(dt, w, h) {
    this.pos.add(V.scale(this.vel, dt));

    // Bounce off the borders
    if (this.pos.x <= 0) { this.vel.x *= -1; this.pos.x = 0; }
    if (this.pos.x >= w) { this.vel.x *= -1; this.pos.x = w; }
    if (this.pos.y <= 0) { this.vel.y *= -1; this.pos.y = 0; }
    if (this.pos.y >= h) { this.vel.y *= -1; this.pos.y = h; }
  }

  draw(c) {
    c.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    c.globalAlpha = 1;
    // c.globalAlpha = this.opacity;
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.r, 0, 2.0*Math.PI);
    c.fill();
    c.closePath();
  }
}

export default Particle;