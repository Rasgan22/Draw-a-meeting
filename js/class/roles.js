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
