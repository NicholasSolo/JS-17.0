"use strict";

const books = document.querySelectorAll('.book');
document.querySelector("body").style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

books[1].after(books[0]);
books[0].after(books[4]);
books[5].after(books[2]);

const bookHeaders = document.querySelectorAll('.book>h2');
bookHeaders[2].textContent = 'Книга 3. this и Прототипы Объектов';
bookHeaders[2].style.color = 'darkkhaki';

document.querySelector('.adv').remove();

const booksContentsSorted = document.querySelectorAll('.book>ul');

booksContentsSorted[1].children[3].after(booksContentsSorted[1].children[6], booksContentsSorted[1].children[8]);
booksContentsSorted[1].children[9].after(booksContentsSorted[1].children[2]);

booksContentsSorted[4].children[3].before(booksContentsSorted[4].children[9]);
booksContentsSorted[4].children[5].after(booksContentsSorted[4].children[2]);
booksContentsSorted[4].children[9].before(booksContentsSorted[4].children[6]);

const newChapter = document.createElement('li');
newChapter.innerHTML = 'Глава 8: За пределами ES6';
booksContentsSorted[5].append(newChapter);

const allBookChapters = document.querySelectorAll('.book>ul>li');
allBookChapters[56].before(allBookChapters[57]);