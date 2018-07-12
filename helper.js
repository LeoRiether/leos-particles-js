import V from "./vector.js";

export default function nothing(){}

export function dist(v0, v1) {
  let dx = v0.x - v1.x;
  let dy = v0.y - v1.y;
  return Math.sqrt(dx*dx + dy*dy);
}

export function rand(min, max) {
  return Math.random() * (max-min) + min;
}

export function randv(minx, maxx, miny, maxy) {
  return new V(
    rand(minx, maxx),
    rand(miny, maxy)
  );
}
