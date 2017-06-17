class Animate {

  constructor(){

    this._setVars();
    this._setEvents();
  }

  _setVars() {

    this._button = document.querySelector('.choose__button--proceed');
    if( !this._button ) return;

    this._chooseSection = document.querySelector('.choose');
    this._drawSection = document.querySelector('.draw');

  }

  _setEvents() {

    let _this = this;
    this._button.addEventListener('click', function() { _this._animate(); });

  }

  _animate() {

    this._chooseSection.classList.add('choose--hide');
    this._drawSection.classList.remove('draw--hide');
    
  }
}

class Core {

    constructor() {

      this._runCore();
    }

    _runCore() {

      const roles = {
        deleteButton : document.querySelectorAll('.choose__button--delete'),
        addButton : document.querySelector('.choose__button--add[data-type="roles"]'),
        addInput : document.querySelector('.choose__input[data-type="roles"]'),
        list : ['Toastmaster', 'Topicmaster', 'Ah-counter', 'Grammarian', 'Timer', 'General evaluator', '1st Speaker', 'Evaluator'],
        listSelector: document.querySelector('.choose__list[data-type="roles"]')
      };

      const members = {
        deleteButton : document.querySelectorAll('.choose__button--delete'),
        addButton : document.querySelector('.choose__button--add[data-type="members"]'),
        addInput : document.querySelector('.choose__input[data-type="members"]'),
        list : ['Zbyszko z Bogdańca', 'John Kowalski', 'Pani Janina', 'Ziom spod sklepu', 'Twój ulubiony superbohater', 'Ten bez ucha', 'Sam wiesz kto', 'Adolf Huehuehue', 'Skończyła mi się wena'],
        listSelector: document.querySelector('.choose__list[data-type="members"]')
      };

      document.roles = new Roles( roles );
      document.members = new Roles( members );

      const draw = {
        roles : document.roles._list,
        members : document.members._list,
        button: document.querySelector('.draw__button'),
        output: document.querySelector('.draw__output')
      };

      document.draw = new Draw( draw );
      document.animate = new Animate();
    }


}

class Draw {

  constructor(options) {

    this._setVars(options);
    this._setEvents();

  }

  _setVars( options ) {

    this._members = options.members;
    this._roles = options.roles;
    this._button = options.button;
    this._list = options.output;

    this._roleName = document.querySelector('.draw__roleName');
    if( !this._roleName ) return;

    this._name = document.querySelector('.draw__name');
    if( !this._name) return;

  }

  _setEvents() {

    let _this = this;
    this._button.addEventListener('click', function() { _this._draw(); } );
  }

  _draw() {

    let roleToChoose = this._roles[0];
    const minimum = 0;
    const maximum = this._members.length - 1;
    let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    this._renderOutput(roleToChoose, this._members[randomnumber] );
    this._removeFromList( randomnumber );

  }

  _removeFromList( number ) {

    let _this = this;
    this._roles.shift();
    this._members.splice( number, 1 );

  }

  _renderOutput( role, name ){

    this._name.innerHTML = name;
    this._roleName.innerHTML = role;
    this._list.innerHTML += this._itemTemplate( role, name);

  }

  _itemTemplate( role, name){
    return `
    <li class="draw__role" data-role="${role}" data-member="${name}">
      <span class="draw__text draw__text--bold">${role}</span>
      <span class="draw__text">${name}</span>
    </li>`;
  }

}

class Roles {

  constructor( options ) {
    this._setVars( options );
    this._setEvents();
    this._renderList();
    this._validateAddButton();
  }

  _refresh() {

    this._setVars( options );
    this._setEvents();

  }

  _setVars( options ){

    this._deleteButton = options.deleteButton;
    this._addButton = options.addButton;
    this._addInput = options.addInput;
    this._list = options.list || [];
    this._listSelector = options.listSelector;

  }

  _setEvents(){

    var _this = this;
    this._addButton.addEventListener('click', function(){ _this._addToList(); });
    this._addInput.addEventListener('keydown', function(){ _this._validateAddButton(); });
  }

  _renderList(){

    var _this = this;

    if(!this._list) return;

    this._listSelector.innerHTML = '';
    this._list.forEach((item, index) => this._listSelector.innerHTML += this._useTemplate(item, index));
    document.querySelectorAll('.choose__button--delete').forEach( button => button.addEventListener('click', function(){ _this._removeFromList( button ); } ));
    this._validateAddButton();

  }

  _useTemplate(item, index){

    return `<li class="choose__singleRole" data-name="${item}" data-index="${index}">${item}<button class="choose__button choose__button--delete icon-minus"></button></li>`;
  }

  _removeFromList( button ){

    let indexToRemove = button.parentElement.dataset.index;
    this._list.forEach( (element, index) => {
      if( index == indexToRemove ) {
        this._list.splice( index, 1);
      }
    });

    this._renderList();
  }
  _addToList(){

    const input = this._addInput;
    this._list.push( input.value );

    input.value = '';
    this._renderList();
  }

  _validateAddButton() {

    const input = this._addInput;
    const button = this._addButton;

    if( input.value === '') {
      button.style.pointerEvents = "none";
      button.classList.add('hide');
    } else {
      button.style.pointerEvents = "auto";
      button.classList.remove('hide');
    }
  }

}
