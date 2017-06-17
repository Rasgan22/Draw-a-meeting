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
