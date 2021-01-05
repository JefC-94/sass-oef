import {v4 as uuid} from 'uuid';

class Todo{
    
    constructor(holder, data){
        this.holder = holder;
        this.data = data;
        this.formRef = null;
        this.listRef = null;
        this.inputRef = null;
        this.generateHTML();
        this.renderData();
        this.setUpEvents();
    }

    generateHTML(){
        this.holder.insertAdjacentHTML('beforeend', `
            <form action="" class="todoApp__form">
                <input
                type="text"
                class="todoApp__form__input" autofocus
                placeholder="Enter an activity.."
                />
                <input type="submit" class="todoApp__form__submit" value="+">
            </form>
            <ul class="todoApp__list"></ul>
        `);
        this.formRef = this.holder.querySelector('.todoApp__form');
        this.listRef = this.holder.querySelector('.todoApp__list');
        this.inputRef = this.holder.querySelector('.todoApp__form__input');
    }

    renderData(){
        this.listRef.innerHTML = "";
                                                //ES6: destructuring of an object: separating values
        this.listRef.innerHTML = this.data.map(({checked, todo, id}) => {
            const classes = checked ? "todoApp__list__item--checked" : "";
            return `
            <li data-id="${id}" class="todoApp__list__item ${classes}">
                <span class="todoApp__list__item__text">${todo}</span>
                <div class="todoApp__list__item__actions">
                    <a href="#" class="delete">
                        <span class="icon">
                            <svg class="icon icon-bin"><use xlink:href="icons/symbol-defs.svg#icon-bin"></use></svg>
                        </span>
                    </a>
                    <a href="#" class="check">
                        <span class="icon">
                            <svg class="icon icon-check"><use xlink:href="icons/symbol-defs.svg#icon-check"></use></svg>
                        </span>
                    </a>
                </div>
            </li>
        `}).join("");
    }

    setUpEvents(){
        this.formRef.addEventListener('submit', this.addTodo);
        //optie 2: this.formRef.addEventListener('submit', this.addTodo.bind());
        this.listRef.addEventListener('click', this.handleActions);
    }

    handleActions = (e) => {
        e.preventDefault();
        const li = e.target.closest(".todoApp__list__item");
        const id = li.dataset.id;
        if(e.target.classList.contains('delete')){
            this.remove(id);
        }
        if(e.target.classList.contains('check')){
            this.toggleCheck(id);
        }
    }

    toggleCheck(id){
        this.data.forEach(todoObj => {
            if(todoObj.id === id){
                todoObj.checked = !todoObj.checked;
            }
        });
        this.renderData();
    }

    remove(id){
        this.data = this.data.filter(todoObj => todoObj.id !== id);
        this.renderData();
    }

    addTodo = (e) => {
        e.preventDefault();
        if(this.inputRef.value){
            this.inputRef.classList.remove('todoApp__form__input--error');

            //ES6 code om toe te voegen, in plaats van te pushen!
            this.data = [...this.data, ({
                id: uuid(),
                todo: this.inputRef.value,
                checked: false,
            })];

            this.inputRef.value = "";
            this.renderData();
        } else {
            this.inputRef.classList.add('todoApp__form__input--error');
        }
    }

}


export default Todo;