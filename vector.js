class V {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toInt() {
    this.x = ~~x;
    this.y = ~~y;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  static add(a, b) {
    return new V(a.x+b.x, a.y+b.y);
  }

  static scale(a, k) {
    return new V(a.x*k, a.y*k);
  }

  static toCartesian(r, theta) {
    return new V(
      r*Math.cos(theta),
      r*Math.sin(theta)
    )
  }
}

export default V;