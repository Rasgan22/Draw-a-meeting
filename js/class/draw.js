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
