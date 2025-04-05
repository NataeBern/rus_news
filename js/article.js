

const infArticle = document.querySelector('.article');
const infHead = document.querySelector('.head');
let articlesData = [];

// Uploading articles

getArticles();



async function getArticles() {
  try {
    if (!articlesData.length) {
      const res = await fetch('http://localhost/RusNews/data/articles.json');
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      articlesData = await res.json();
    }
    loadArticleDetails(articlesData);
  } catch (err) {
    console.log(err);
  }
}

function getParameterfromURL(parameter) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(parameter);

}

function loadArticleDetails(data) {
  if (!data || !data.length) {
    return
  }
  const articleID = Number(getParameterfromURL('id'));
  if (!articleID) {
    return
  }
  const findArticle = data.find(article => article.id === articleID);
  if (!findArticle) {
    return
  }
  renderInfoArticle(findArticle);
  renderHeadArticle(findArticle);
}

function renderInfoArticle(article) {
  const { id, alt, h1, additional, time, p1_1, p1_2, p2_1, p2_2, 
          h5, p3, h3_1, p4, h3_2, p5  } = article;
  const articleItem = 
  `
  <div class="article-img">
        <img src="http://localhost/RusNews/img/articles/article-${id}.1.png" alt="${alt}">
  </div>

  <hr class="hr-line">

  <div class="container">

    <div class="article-text">

        <h1 class="article-heading">${h1}</h1>

        <ul class="article-list">
            <li class="article-additional"><a href="http://localhost/RusNews/article.html?id=${id}" class="article-additional-link">${additional}</a></li>
            <li class="article-time">${time}</li>
        </ul>

        <hr class="hr-line">

        <p>
          ${p1_1}<br>
          ${p1_2}  
        </p>

        <p>
          ${p2_1}<br>
          ${p2_2}  
        </p>

        <h5><i>${h5}</i></h5>
        <p>${p3}</p>

        <h3>${h3_1}</h3>
        <p>${p4}</p>

        <h3>${h3_2}</h3>
        <p>${p5}</p>

    </div>

    <label class="btn-beginning">
        <button type="button-beginning"><a href="#top"><img src="http://localhost/RusNews/img/icons/beginning-icon.svg" alt="Button at the top of the page"></a></button>
    </label>

  </div>
  `
      infArticle.insertAdjacentHTML('beforeend', articleItem);
}

function renderHeadArticle(article) {
  const { h1 } = article;
  const articleItem = 
  `
  <title>${h1}</title>
  `
    infArticle.insertAdjacentHTML('beforeend', articleItem);
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
      navButtonImage.src = 'http://localhost/RusNews/img/icons/nav-close.svg';
  } else {
      navButtonImage.src = 'http://localhost/RusNews/img/icons/nav-open.svg';
  }
}