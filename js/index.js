/**
 * @author anuraghazra
 * @github https://github.com/anuraghazra
 */


let c = new Candy();
let width = WINDOW_WIDTH - 4;
let height = WINDOW_HEIGHT - 4;
c.createCanvas(width, height);

let Lsystems = {
  koch_curve,
  sierpinski_triangle,
  sierpinski_arrowhead,
  dragon_curve,
  hilbert_curve,
  fractal_plant,
  fractal_tree,
  fractal_tree2,
  fractal_tree3,
  snake_kolam,
  anklets_of_krishna,
  flower_cube,
  honeycomb,
  krishna_chakra
}

// ONLY FOR DAT.GUI
let selectmenu = {
  'Krishna Chakra': 'krishna_chakra',
  'Anklets Of Krishna': 'anklets_of_krishna',
  'Snake Kolam': 'snake_kolam',
  'Honeycomb': 'honeycomb',
  'Flower Cube': 'flower_cube',
  'Dragon Curve': 'dragon_curve',
  'Hilbert Curve': 'hilbert_curve',
  'Koch Curve': 'koch_curve',
  'Sierpinski Triangle': 'sierpinski_triangle',
  'Sierpinski Arrowhead': 'sierpinski_arrowhead',
  'Fractal Tree3': 'fractal_tree3',
  'Fractal Tree2': 'fractal_tree2',
  'Fractal Tree': 'fractal_tree',
  'Fractal Plant': 'fractal_plant',
}


let config = {};
let dropdown = null;
let gui = new dat.GUI();

window.onload = function () {

  config = {
    scale: 1,
    x: width / 2,
    y: height / 2,
    lengthDecrease: 1.0,
    generate: generate,
    reset: reset,
    current: 'anklets_of_krishna',
  }

  // Canvas Mouse Drag
  let isDown = false;
  let dragDiff = { x: 0, y: 0 };
  function startDrag(e) {
    isDown = true;
    dragDiff.x = e.offsetX - config.x;
    dragDiff.y = e.offsetY - config.y;
  }
  function endDrag(e) {
    isDown = false;
    endDrag.x = e.offsetX;
    endDrag.y = e.offsetY;
  }
  function moveDrag(e) {
    e.preventDefault();
    if (isDown) {
      config.x = (e.offsetX) - dragDiff.x
      config.y = (e.offsetY) - dragDiff.y
    }
  }
  function zoom(e) {
    config.scale -= norm(e.deltaY, 0, 1000);
    config.scale = clamp(config.scale, 0.1, 10);
  }
  c.canvas.addEventListener('mousedown', startDrag);
  c.canvas.addEventListener('mouseup', endDrag);
  c.canvas.addEventListener('mousemove', moveDrag);
  c.canvas.addEventListener('mousewheel', zoom);


  // DAT.gui
  gui.add(config, 'x', 0, width).listen();
  gui.add(config, 'y', 0, height).listen();
  gui.add(config, 'scale', 0, 10, 0.1).listen();
  gui.add(config, 'lengthDecrease', 0, 1, 0.1).listen();
  gui.add(config, 'generate');
  gui.add(config, 'reset');
  dropdown = gui.add(config, 'current', selectmenu).name('L-Systems');
  getSavedLSystem();



  function generate() {
    Lsystems[config.current].generate();
  }
  function reset() {
    Lsystems[config.current].reset();
  }

  generate();
  generate();
  generate();
  generate();
  generate();
  function animate() {
    c.clear(25);

    Lsystems[config.current].render(config.x, config.y);

    c.loop(animate);
  }
  animate();

}