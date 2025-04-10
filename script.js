
const API_KEY = '3f55905ffb584aeeac5dd4bdd2116591';
const BASE_URL = 'https://newsapi.org/v2/everything?q=';

const newsContainer = document.getElementById('newsContainer');
const searchInput = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-box button');
const navBtns = document.querySelectorAll('.nav-btn');
const loadingSpinner = document.querySelector('.loading-spinner');


window.addEventListener('DOMContentLoaded', () => {
fetchNews('latest');
});


async function fetchNews(query) {

newsContainer.innerHTML = '';
loadingSpinner.style.display = 'block';

const response = await fetch(`${BASE_URL}${query}&apiKey=${API_KEY}`);
const data = await response.json();

if (data.articles && data.articles.length > 0) {
    bindData(data.articles);
} else {
    newsContainer.innerHTML = '<p class="no-news">No news found for this category. Try another search.</p>';
}

}


function bindData(articles) {
const template = document.getElementById('newsTemplate');

articles.forEach(article => {
if (!article.urlToImage) return;

const cardClone = template.content.cloneNode(true);
fillDataInCard(cardClone, article);
newsContainer.appendChild(cardClone);
});
}


function fillDataInCard(cardClone, article) {
const newsImg = cardClone.querySelector('.news-image img');
const newsTitle = cardClone.querySelector('.news-title');
const newsDesc = cardClone.querySelector('.news-desc');
const newsSource = cardClone.querySelector('.news-source');
const newsDate = cardClone.querySelector('.news-date');
const readMoreLink = cardClone.querySelector('.read-more');
const categoryBadge = cardClone.querySelector('.category-badge');

newsImg.src = article.urlToImage;
newsImg.alt = article.title;
newsTitle.textContent = article.title;
newsDesc.textContent = article.description || 'No description available';
newsSource.textContent = article.source.name;


const date = new Date(article.publishedAt);
newsDate.textContent = date.toLocaleDateString('en-US', {
year: 'numeric',
month: 'short',
day: 'numeric'
});


categoryBadge.textContent = 'General';


readMoreLink.href = article.url;
readMoreLink.target = '_blank';


cardClone.querySelector('.news-card').addEventListener('click', () => {
window.open(article.url, '_blank');
});
}

searchBtn.addEventListener('click', () => {
const query = searchInput.value.trim();
if (query) {
fetchNews(query);
}
});

searchInput.addEventListener('keypress', (e) => {
if (e.key === 'Enter') {
const query = searchInput.value.trim();
if (query) {
    fetchNews(query);
}
}
});

navBtns.forEach(btn => {
btn.addEventListener('click', (e) => {
e.preventDefault();
const category = btn.dataset.category;
fetchNews(category);
});
});
