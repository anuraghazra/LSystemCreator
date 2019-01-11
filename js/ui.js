// Woooooo GLOBAL vars
// I WILL REFACTOR IT LATER
// You dont have to worry about the UI
// the LSystem class is your main objective 
let iName = document.getElementById('name');
let iStart = document.getElementById('start');
let iAngle = document.getElementById('angle');
let iLen = document.getElementById('length');

let addbtn = document.getElementById('addrule');
let rulewrapper = document.getElementById('rules');
let parsedata = document.getElementById('parsesystem');
let loadsystem = document.getElementById('loadsystem');
let savesystem = document.getElementById('savesystem');
let totalrules = 0;


function template(v1, v2) {
  totalrules++;
  return `
    <div class="setrules" data-name="rule-${totalrules}">
      <input spellcheck="false" type="text" id="replace" placeholder="replace" value="${(v1!==undefined) ? v1 : ''}" />
      <input spellcheck="false" type="text" id="command" placeholder="with" value="${(v2!==undefined) ? v2 : ''}" />
      <button title="delete rule" class="btn-normal rembtn">X</button>
    </div>
    `
}

// add UI rule
function addRule(v1, v2) {
  let elm = document.createElement('div');
  elm.innerHTML += template(v1, v2);
  rulewrapper.appendChild(elm);
}
addbtn.addEventListener('click', function() {
  addRule();
})

// remove UI rule 
function removeRule(e) {
  if (e.target.className.match('rembtn')) {
    let child = e.target.parentElement;
    child.classList.add('fade-remove')
    child.addEventListener("transitionend", function (e) {
      if (e.propertyName == 'left') {
        rulewrapper.removeChild(child.parentElement);
        child = null;
      }
    });
  }
}
rulewrapper.addEventListener('mousedown', removeRule)

// Parse the rules
function getDOMRules() {
  let data = [];

  let allrules = rulewrapper.children;

  for (let i = 0; i < allrules.length; i++) {
    data.push({
      a: allrules[i].children[0].children[0].value,
      b: allrules[i].children[0].children[1].value
    })
  }

  return data;
}

// Create L-System Object from UI
let final;
function createSystem() {
  let data = getDOMRules();

  final = new LSystem({
    starts: iStart.value,
    angle: parseFloat(iAngle.value),
    len: parseFloat(iLen.value),
    rules: data
  });


  if (selectmenu[iName.value] === undefined) {
    selectmenu[iName.value] = (iName.value);
  }
  Lsystems[iName.value] = final;
  config.current = selectmenu[iName.value];
  gui.remove(dropdown)
  dropdown = gui.add(config, 'current', selectmenu);
}
parsedata.addEventListener('click', createSystem);



// create UI from LSystem data
function loadsystemUI(system) {
  rulewrapper.innerHTML = '';
  iName.value = 'auto'
  iStart.value = system.axiom;
  iAngle.value = system.data.angle;
  iLen.value = system.data.len;

  for (let i = 0; i < system.data.rules.length; i++) {
    addRule(system.data.rules[i].a, system.data.rules[i].b)
  }
}
loadsystem.addEventListener('click', function() {
  loadsystemUI(Lsystems[config.current])
});

// Save LSystem to localStorage
function saveLSystem() {
  let data = getDOMRules();

  let saved = {}
  saved[iName.value] = {
    starts : iStart.value,
    len : parseFloat(iLen.value),
    angle : parseFloat(iAngle.value),
    rules : [
      ...data
    ]
  };
  
  if (localStorage.getItem('SavedLSystem')) {
    let ls = JSON.parse(localStorage.getItem('SavedLSystem'));
    for (const i in ls) {
      saved[i] = ls[i];
    }
  }
  
  localStorage.setItem('SavedLSystem', JSON.stringify(saved));
}
savesystem.addEventListener('click', saveLSystem);

// get LSystem from localStorage
function getSavedLSystem() {
  let ls = JSON.parse(localStorage.getItem('SavedLSystem'));
  for (const i in ls) {
    Lsystems[i] = new LSystem(ls[i]);
    selectmenu[i] = i;
  }
  gui.remove(dropdown)
  dropdown = gui.add(config, 'current', selectmenu);
}