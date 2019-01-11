/**
 * ? All Of The L-Systems And Kolams
 * ? I researched as much as i can and ended up with this many 
 */


/**
 * @class LSystem
 * @param {object} data
 * creates a generic LSystem object
 */
class LSystem {

  constructor(data) {
    this.data = data;
    this.axiom = data.starts;
    this.startlength = data.len;
    this.len = this.data.len;
    this.angle = this.data.angle;

    this.drawingPattern = data.drawingPattern || {
      'F': function () {
        this.forward(this.len);
      },
      'G': function () {
        this.forward(this.len);
      },
      '-': function () {
        this.rotate(this.angle)
      },
      '+': function () {
        this.rotate(-this.angle);
      },
      '[': function () {
        c.push();
      },
      ']': function () {
        c.pop();
      }
    }

    this._parseData();
  }

  reset() {
    this.data.starts = this.axiom;
    this.len = this.startlength;
  }

  _parseData() {
    let drawingRule = {
      ...this.drawingPattern
    }
    drawingRule.angle = this.data.angle;
    drawingRule.len = this.data.len;

    let tmpdata = {
      ...this.data,
      drawingRules: {
        ...drawingRule
      }
    }
    this.data = tmpdata;
  }

  generate(fractal) {
    this.len *= config.lengthDecrease;
    if (fractal === undefined) fractal = this.data;
    let nextSentence = "";
    for (let i = 0; i < fractal.starts.length; i++) {
      let current = fractal.starts.charAt(i);
      let found = false;
      for (let k = 0; k < fractal.rules.length; k++) {
        if (current == fractal.rules[k].a) {
          found = true;
          nextSentence += fractal.rules[k].b;
          break;
        }
      }
      if (!found) {
        nextSentence += current;
      }
    }
    fractal.starts = nextSentence;
  }

  forward(len) {
    c.line(0, 0, 0, -len);
    c.translate(0, -len);
  }
  rotate(r) {
    c.rotate(radians(r));
  }

  render(x, y) {
    c.ctx.setTransform(1, 0, 0, 1, 0, 0);
    c.clear(35);
    c.translate(x, y);
    c.scale(config.scale);
    c.stroke(255);
    c.ctx.lineCap = 'round';
    c.ctx.lineJoin = "round";
    for (let i = 0; i < this.data.starts.length; i++) {
      let current = this.data.starts.charAt(i);
      for (const j in this.data.drawingRules) {
        if (current === j) {
          this.data.drawingRules[j].call(this);
        }
      }
    }
  }

}


/** 
 * Source : https://en.wikipedia.org/wiki/L-system
 */


/**
 * * Sierpinski Triangle
 */
let sierpinski_triangle = new LSystem({
  starts: 'F-G-G',
  angle: 120,
  len: 5,
  rules: [
    {
      a: 'F',
      b: 'F-G+F+G-F'
    },
    {
      a: 'G',
      b: 'GG'
    }
  ],
});


/**
 * * Sierpinski Arrowhead
 */
let sierpinski_arrowhead = new LSystem({
  starts: 'F',
  angle: 60,
  len: 5,
  rules: [
    {
      a: 'F',
      b: 'G-F-G'
    },
    {
      a: 'G',
      b: 'F+G+F'
    },
  ]
});


/**
 * * Dragon Curve
 */
let dragon_curve = new LSystem({
  starts: 'FX',
  angle: 90,
  len: 10,
  rules: [
    {
      a: 'X',
      b: 'X+YF+'
    },
    {
      a: 'Y',
      b: '-FX-Y'
    },
  ],
});

/**
 * * Koch Curve
 */
let koch_curve = new LSystem({
  starts: 'F',
  angle: 60,
  len: 10,
  rules: [
    {
      a: 'F',
      b: 'F+F--F+F'
    },
  ],
});

/**
 * * Hilbert Curve
 */
let hilbert_curve = new LSystem({
  starts: 'L',
  angle: 90,
  len: 10,
  rules: [
    {
      a: 'L',
      b: '+RF-LFL-FR+'
    },
    {
      a: 'R',
      b: '-LF+RFR+FL-'
    },
  ],
});


/**
 * * Fractal Plant
 */
let fractal_plant = new LSystem({
  starts: 'X',
  angle: 25,
  len: 10,
  rules: [
    {
      a: 'X',
      b: 'F+[[X]-X]-F[-FX]+X'
    },
    {
      a: 'F',
      b: 'FF'
    },
  ],
});


/**
 * * Fractal Tree
 */
let fractal_tree = new LSystem({
  starts: 'F',
  angle: 25,
  len: 10,
  rules: [
    {
      a: 'F',
      b: 'FF+[+F-F-F]-[-F+F+F]'
    },
  ],
});


/**
 * * Fractal Tree2
 */
let fractal_tree2 = new LSystem({
  starts: 'F',
  angle: 25.7,
  len: 10,
  rules: [
    {
      a: 'F',
      b: 'F[+F]F[-F]F'
    }
  ],
});

/**
 * * Fractal Tree3
 */
let fractal_tree3 = new LSystem({
  starts: 'B',
  angle: 20,
  len: 10,
  rules: [
    {
      a: 'F',
      b: 'FF'
    },
    {
      a: 'B',
      b: 'F[+B]F[-B]+B'
    }
  ],
});

/**
 * * Snake Kolam
 */
let snake_kolam = new LSystem({
  starts: 'F+xF+F+xF',
  angle: 90,
  len: 10,
  rules: [
    {
      a: 'x',
      b: 'xF-F-F+xF+F+xF-F-F+x'
    },
  ],
});

/**
 * * Anklets Of Krishna
 */
let anklets_of_krishna = new LSystem({
  starts: '-x--x',
  angle: 45,
  len: 10,
  rules: [
    {
      a: 'x',
      b: 'xFx--xFx'
    },
  ],
});

/**
 * * Honeycomb
 */
let honeycomb = new LSystem({
  starts: 'X',
  angle: 60,
  len: 10,
  rules: [
    {
      a: 'X',
      b: '[-F+F[Y]+F][+F-F[X]-F]'
    },
    {
      a: 'Y',
      b: '[-F+F[Y]+F][+F-F-F]'
    },
  ],
});


/**
 * * Flower Cube
 */
let flower_cube = new LSystem({
  starts: 'F-F-F-F',
  angle: 90,
  len: 5,
  rules: [
    {
      a: 'F',
      b: 'F[F]-F+F[--F]+F-F'
    },
  ],
});


/**
 * * Krishna Chakra
 */
let krishna_chakra = new LSystem({
  starts: 'AAAA',
  angle: 15,
  len: 10,
  rules: [
    {
      a: 'A',
      b: 'X+X+X+X+X+X+'
    },
    {
      a: 'X',
      b: '[F+F+F+F[---X-Y]+++++F++++++++F-F-F-F]'
    },
    {
      a: 'Y',
      b: '[F+F+F+F[---Y]+++++F++++++++F-F-F-F]'
    },
  ],
});
