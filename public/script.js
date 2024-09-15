const levelsContainer = document.getElementById('levels-container');
const filter   = document.getElementById('filter');

// Fetch levels from API
async function getlevels() 
{
  const res = await fetch(
    `levels.json`
  );

  const data = await res.json();

  return data.sort((a, b) => b.points - a.points);;
}


function createLevelElement(levelInfo, index) 
{
  const rowElement = document.getElementById('level_template').content.cloneNode(true).firstElementChild;

  rowElement.dataset.search = levelInfo.title.toUpperCase() + "," + levelInfo.authors.toUpperCase();

  const [iframe] = rowElement.getElementsByTagName("iframe");

  const [levelTitle] = rowElement.querySelectorAll("p.level-title");
  const [levelAuthors] = rowElement.querySelectorAll("p.level-author");

  const fullTitle = "# "+ (index +1) + " " +levelInfo.title;

  [iframe.src, levelTitle.textContent, levelAuthors.textContent] = [levelInfo.youtubeEmbed, fullTitle, levelInfo.authors];

  return rowElement;
}



// Show levels in DOM
async function showlevels() 
{
  const levelsInfo = await getlevels();

  const levelsElements = [];

  levelsInfo.forEach((levelInfo, index) =>{
    levelsContainer.append(createLevelElement(levelInfo, index));
    //levelsElements.push(createLevelElement(levelInfo));
  });

  //levelsContainer.append(levelsElements);
}

// Filter levels by input
function filterlevels(e) 
{
  const term = e.target.value.toUpperCase();
  const levels = document.querySelectorAll('.level');

  levels.forEach(levelElement => 
    {
      const dataSearch = levelElement.dataset.search;

      if (dataSearch.indexOf(term) > -1) {
        levelElement.style.display = 'flex';
      } else {
        levelElement.style.display = 'none';
      }
  });
}

// Show initial levels
showlevels();

filter.addEventListener('input', filterlevels);
