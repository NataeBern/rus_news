import {
  COUNT_SHOW_MAIN_ARTICLES_CLICK
 } from "http://localhost/RusNews/js/constants.js";





const articles = document.querySelector('.set-articles-row');
const btnShowArticles = document.querySelector('.btn-see-more');
let showArticles = COUNT_SHOW_MAIN_ARTICLES_CLICK;
let countClickBtnShowArticles = 1;
let articlesData = [];



// Uploading articles

getArticles();

btnShowArticles.addEventListener('click', sliceArrArticles)



async function getArticles() {
  try {
    if (!articlesData.length) {
      const res = await fetch("http://localhost/RusNews/data/articles-row.json");
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      articlesData = await res.json();
    }
    if ((articlesData.length > COUNT_SHOW_MAIN_ARTICLES_CLICK) &&
        btnShowArticles.classList.contains('hidden')) {
        btnShowArticles.classList.remove('hidden');
    }
    renderStartPage(articlesData);
  } catch (err) {
    console.log(err);
  }
}

function renderStartPage(data) {
  if (!data || !data.length) {
    return
  };
  const arrArticles = data.slice(0, COUNT_SHOW_MAIN_ARTICLES_CLICK);
  createArticles(arrArticles);
}

function sliceArrArticles() {
  if (showArticles >= articlesData.length) return;
  countClickBtnShowArticles++;
  const countShowArticles = COUNT_SHOW_MAIN_ARTICLES_CLICK * countClickBtnShowArticles;
  const arrArticles = articlesData.slice(showArticles, countShowArticles);
  createArticles(arrArticles);
  showArticles = articles.children.length;
  if (showArticles >= articlesData.length) {
    btnShowArticles.classList.add('hidden');
  }
}



// Rendering article

function createArticles(data) {
  data.forEach(article => {
    const { id, title, text, time, further } = article;
    const articleItem = 
    `
    <li class="set-article-block">

      <div class="set-article-img">
          <a href="http://localhost/RusNews/article.html?id=${id}">
              <img src="http://localhost/RusNews/img/articles/article-${id}.png">
          </a>
      </div>
      
      <div class="set-article-content">

          <h4 class="set-article-heading">${title}</h4>
          <p>${text}</p>

          <ul class="set-article-list">
              <li class="article-time">${time}</li>
              <li class="article-further"><a href="http://localhost/RusNews/article.html?id=${id}" class="article-further-link">${further}</a></li>
          </ul>

      </div>

    </li>

    `
    articles.insertAdjacentHTML('beforeend', articleItem);
     
  })
}



// Night mode

document.getElementById('toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
  });



const nav = document.querySelector('#nav');
const navButton = document.querySelector('#nav-button');
const navButtonImage = document.querySelector('#nav-button-image');

window.addEventListener('rezice', event => {
  if (event.target.window.innerWidth > 759) responseFirst();
  if (event.target.window.innerWidth <= 759 && event.target.window.innerWidth > 534) responseSecond();
  if (event.target.window.innerWidth <= 534) responseThird();
})



// Replacing icon

navButton.onclick = () => {
  if (nav.classList.toggle('open')) {
      navButtonImage.src = "http://localhost/RusNews/img/icons/nav-close.svg";
  } else {
      navButtonImage.src = "http://localhost/RusNews/img/icons/nav-open.svg";
  }
}