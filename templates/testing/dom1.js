const title = document.getElementById("main-title");
console.log(title);
const first = document.getElementsByClassName("movie-container");
const second = document.getElementsByClassName("movie-grid");
const third = document.getElementsByClassName("movie");
console.log(first);
console.log(second);
console.log(third);
const listItems = document.querySelectorAll(".movie");
for(let i=0;i<listItems.length;i++){
    listItems[i].style.fontSize='2rem';
}
console.log(listItems);

//creating element

const ul = document.querySelector('ul');

const li = document.createElement('li');

li.textContent = "NewItem";   // add content
ul.append(li);

console.log(li);              // log the element
