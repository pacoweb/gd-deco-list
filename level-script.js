const queryString = window.location.search;
const urlParams   = new URLSearchParams(queryString);
const levelId     = parseInt(urlParams.get('level'),0);

let currentLevelInfo = null;

function fillTemplate()
{
  const levelsLoadedContainer = document.getElementById('level-loaded');

  const rowElement = document.getElementById('level_template').content.cloneNode(true).firstElementChild;

  const [iframe] = rowElement.getElementsByTagName("iframe");

  const [levelTitle] = rowElement.querySelectorAll("p.level-title");
  const [levelAuthors] = rowElement.querySelectorAll("p.level-author");

  const fullTitle = "# "+ currentLevelInfo.title;

  [iframe.src, levelTitle.textContent] = [currentLevelInfo.youtubeEmbed, fullTitle];

  levelsLoadedContainer.appendChild(rowElement);
};

async function getlevels() 
{
  const res = await fetch(
    `levels.json`
  );

  return await res.json();
}

async function loadCurrentLevel() 
{
  if(isNaN(levelId)){
    return;
  }
  
  const allLevelsInfo = await getlevels();

  if(allLevelsInfo.length === 0){
      return;
  }

  currentLevelInfo = allLevelsInfo.find((levelInfo) => levelInfo.id === levelId);

  if(!currentLevelInfo){
    return;
  }

  fillTemplate();
}

function domReady(e){
  loadCurrentLevel();
}

document.addEventListener("DOMContentLoaded",domReady);