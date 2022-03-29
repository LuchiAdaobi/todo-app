// SELECT ELEMENTS
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// Classes names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle';
const LINE_THROUGH = 'lineThrough';

// Variables
let LIST = [];
let id = 0;

// Get items from local storage
const data = localStorage.getItem('TODO');

// check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to the last one in the list
  loadList(LIST); // load the list to the user interface
} else {
  // if data is empty
  LIST = [];
  id = 0;
}

// load items to the user's interface
function loadList(array) {
  array.forEach((item) => {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// clear the local storage
clear.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});

// Show today's date
const options = {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('en-US', options);

// ADD TODO FUNCTION
function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : '';

  const item = `
    <li class="item">
    <i class="far ${DONE} co" job ='complete' id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa-solid fa-trash-can de" job ="delete" id="${id}"></i>
    </li> 
    `;
  const position = 'beforeend';
  list.insertAdjacentHTML(position, item);
}

// Add item to list when user hits enter
input.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    const toDo = input.value;

    // if the input isn't empty
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id,
        done: false,
        trash: false,
      });

      // add item to local storage. This code must be added everywhere we update a list array
      localStorage.setItem('TODO', JSON.stringify(LIST));

      id += 1;
    }
    input.value = '';
    console.log(LIST);
  }
});
// addToDo('coffee', 1, true, false);

// Complete ToDo
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

  LIST[element.id].done = !!LIST[element.id].done;
}

// remove todo
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

// target the items created dynamically
list.addEventListener('click', (e) => {
  const element = e.target; // return the clicked element inside list
  const elementJob = element.attributes.job.value; // complete or delete

  if (elementJob === 'complete') {
    completeToDo(element);
  } else if (elementJob === 'delete') {
    removeToDo(element);
  }

  // add item to local storage. This code must be added everywhere we update a list array
  localStorage.setItem('TODO', JSON.stringify(LIST));
});
