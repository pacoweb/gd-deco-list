const levelsContainer = document.getElementById('levels-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Fetch levels from API
async function getlevels() 
{
  const res = await fetch(
    `levels.json`
  );

  const data = await res.json();

  return data.sort((a, b) => b.points - a.points);;
}



// Show levels in DOM
async function showlevels() 
{
  const levels = await getlevels();

  levels.forEach((level, index) => {
    const levelEl = document.createElement('div');
    levelEl.classList.add('level');
    levelEl.innerHTML = `
      <div class="number">${(index +1)}</div>
      <div class="level-info">
        <h2 class="level-title">${level.title}</h2>
        <p class="level-body">${level.authors}</p>
        <iframe width="95%" height="60%" src="${level.youtubeEmbed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
    `;

    levelsContainer.appendChild(levelEl);
  });
}

// Show loader & fetch more levels
function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showlevels();
    }, 300);
  }, 1000);
}

// Filter levels by input
function filterlevels(e) {
  const term = e.target.value.toUpperCase();
  const levels = document.querySelectorAll('.level');

  levels.forEach(level => {
    const title = level.querySelector('.level-title').innerText.toUpperCase();
    const body = level.querySelector('.level-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      level.style.display = 'flex';
    } else {
      level.style.display = 'none';
    }
  });
}

// Show initial levels
showlevels();

/*window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollHeight - scrollTop === clientHeight) {
    showLoading();
  }
});*/

filter.addEventListener('input', filterlevels);
