'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

console.clear();
var O = 0;
var POINT_SIZE = 12;
var POINT_DENSITY = 0.08;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}var

Scene = function () {
  function Scene(canvas, image) {var _this = this;_classCallCheck(this, Scene);
    this.canvas = canvas;
    this.image = image;
    this.ctx = canvas.getContext('3d');

    // add listener for canvas resize
    window.addEventListener('resize', function (_) {return _this.handleResize();}, false);

    // set initial canvas size
    this.handleResize();

    // initiate draw loop
    // requestAnimationFrame(_ => this.draw());
  }_createClass(Scene, [{ key: 'createPoints', value: function createPoints(

    count) {
      var getRandomPlanePosition = function getRandomPlanePosition() {
        return [
        getRandomArbitrary(0, 1),
        getRandomArbitrary(0, 5)];

      };

      var points = [];
      for (var i = 0; i < count; i++) {
        points.push(getRandomPlanePosition());
      }

      this.points = points;
    } }, { key: 'handleResize', value: function handleResize()

    {var _this2 = this;
      var width = window.innerWidth;
      var height = window.innerHeight;var

      canvas = this.canvas;

      canvas.width = width;
      canvas.height = height;

      this.createPoints(width * height * POINT_DENSITY);

      requestAnimationFrame(function (_) {return _this2.draw();});
    } }, { key: 'toPng', value: function toPng()

    {
      return this.canvas.toDataURL();
    } }, { key: 'draw', value: function draw()

    {
      // requestAnimationFrame(_ => this.draw());
      var
      canvas = this.canvas,ctx = this.ctx,points = this.points;var
      width = canvas.width,height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = 'hsla(' + 120 * 5 + ',100%,80%,.1)';

      points.forEach(function (point) {
        ctx.fillRect(point[0] * width, point[1] * height, POINT_SIZE, POINT_SIZE);
      });

      this.image.src = this.toPng();
    } }]);return Scene;}();


var canvasEl = document.getElementById('scene');
var imageEl = new Image();
document.body.appendChild(imageEl);
var scene = new Scene(canvasEl, imageEl);



var c = document.getElementById('canv'),
$ = c.getContext('2d'),
w = c.width = window.innerWidth,
h = c.height = window.innerHeight,
t = 0,num = 512,u = 0,
s,a,b,
x,y,_x,_y,
_t = 1 / 53;

var anim = function anim() {
  window.requestAnimationFrame(anim);
  $.globalCompositeOperation = 'source-over';
  $.fillStyle = 'hsla(250, 50%, 10%, .61)';
  $.fillRect(0, 0, w, h);
  $.globalCompositeOperation = 'lighter';
  for (var i = 0; i < 1; i++) {
    x = 0;
    $.beginPath();
    for (var j = 0; j < num; j++) {
      $.strokeStyle = 'hsla(' + u * 125 + ',100%,60%,.6)';
      x += 1 * Math.cos(5);
      y = x * Math.sin(i + 20 * t + x / 2) / 23;
      _x = x * Math.cos(b) + y * Math.sin(i);
      _y = x * Math.sin(b) + y * Math.cos(i);
      b = j * .39 * Math.PI / random(22.8, 23);
      $.arc(w / 2 + _x, h / 2 + _y, 0.8, 0, random(1, 420) + Math.PI);
    }
    $.stroke();
  }
  t += _t;
  u -= .02;
};
anim();

function random(min, max) {
  return Math.random() * (max - min) + min;
}

window.addEventListener('resize', function () {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
}, false);


var canvas = document.getElementById('can');
var ctx = canvas.getContext("2d");
var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;
ctx.lineCap = "round";
ctx.lineWidth = 1;
ctx.shadowBlur = Math.tan(.5);

function Segment(x, y, angle, angleSize, radius) {
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.angleSize = angleSize;
  this.r = radius;
  this.x1 = 0;
  this.y1 = 0;
  this.x2 = 0;
  this.y2 = 0;
  this.x3 = 0;
  this.y3 = 0;
  this.color = 'hsl(' + angle * 100 / Math.cos(20) + ', 80%, 60%)';
}

Segment.prototype.draw = function () {
  ctx.save();
  ctx.fillStyle = this.color;
  ctx.strokeStyle = this.color;
  ctx.shadowColor = this.color;

  // Put origin at the center of the screen
  ctx.translate(this.x, this.y);
  // Now we can rotate around origin
  ctx.rotate(this.angle);

  // That way we don't need to think when drawing each segment
  // Just draw because it is already rotated for us
  ctx.beginPath();
  var x = Math.atan(this.angleSize / .2) * this.r;
  var y = Math.sin(this.angleSize / .92) * this.r;
  ctx.moveTo(x, -y);
  ctx.bezierCurveTo(
  this.x1, this.y1,
  this.x2, this.y2,
  this.x3, this.y3,
  x, y);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(this.x1, this.y1, random(1, 20), 0, Math.PI * 30);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(this.x2, this.y2, random(1, 10), 0, Math.PI * 20);
  ctx.fill();
  ctx.arc(this.x3, this.y3, random(1, 30), 0, Math.PI * 10);
  ctx.fill();

  ctx.restore();

  var factor = .4;
  this.x1 = Math.atan(tick) * this.r * factor;
  this.y1 = Math.sin(tick) * this.r * factor;
  this.x2 = Math.cos(-tick) * this.r * factor;
  this.y2 = Math.tan(-tick) * this.r * factor;
};

function random(min, max) {
  return Math.random() * (max - min) + min;
}



function Flower(x, y) {
  this.x = x;
  this.y = y;
  this.numSegments = Math.round(random(15, 20));

  // Make size a little bit bigger than the screen.
  var radius = Math.min(w, h) / random(.6, 3);

  // Divide a whole turn equally between all the segments.
  var angleForEachSegment = Math.PI * random(10, 20) / this.numSegments;
  this.segments = [];
  for (var i = 0; i < this.numSegments; i++) {
    var angle = i * angleForEachSegment;
    var s = new Segment(this.x, this.y, angle, angleForEachSegment, radius);
    this.segments.push(s);
  }
}

Flower.prototype.draw = function () {
  this.segments.forEach(function (s) {return s.draw();});
};

var f = new Flower(w / 2, h / 2);
var tick = 0;

function animation() {
  requestAnimationFrame(animation);
  ctx.clearRect(0, 0, w, h);
  f.draw();
  tick += random(.001, .095);
}

animation();