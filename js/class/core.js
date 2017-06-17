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
