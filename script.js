let currentPageIndex = 1;
let noClickCount = 0;

window.addEventListener('load', () => {
  const followUp = document.getElementById('followUpText');
  followUp.style.opacity = 0;
  setTimeout(() => { followUp.style.opacity = 1; }, 1500);
});

function showEnvelope(){
  document.getElementById('greetingScreen').style.display = 'none';
  document.getElementById('envelopeScreen').style.display = 'flex';
}

function openEnvelope(){
  document.getElementById('envelopeScreen').style.display = 'none';
  document.getElementById('letterScreen').style.display = 'flex';
  showLetterPage(1);
}

function showLetterPage(page){
  currentPageIndex = page;

  // toggle pages
  for(let i=1;i<=4;i++){
    const pageEl = document.getElementById(`letterPage${i}`);
    if(i===page) pageEl.classList.add('active');
    else pageEl.classList.remove('active');
  }

  // counter
  document.getElementById('currentPage').textContent = page;

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const finishBtn = document.getElementById('finishBtn');

  prevBtn.style.display = page === 1 ? 'none' : 'inline-flex';
  if(page === 4){
    nextBtn.style.display = 'none';
    finishBtn.style.display = 'inline-flex';
  }else{
    nextBtn.style.display = 'inline-flex';
    finishBtn.style.display = 'none';
  }
}

function nextPage(){
  if(currentPageIndex < 4) showLetterPage(currentPageIndex+1);
}

function prevPage(){
  if(currentPageIndex > 1) showLetterPage(currentPageIndex-1);
}

function finishLetter(){
  document.getElementById('letterScreen').style.display = 'none';
  document.getElementById('questionScreen').style.display = 'flex';
}

function answerYes(){
  document.getElementById('questionScreen').style.display = 'none';
  document.getElementById('finalScreen').style.display = 'flex';
}

function answerNo(){
  noClickCount++;
  const hint = document.getElementById('hintText');
  const noBtn = document.getElementById('noBtn');
  const yesBtn = document.querySelector('.btn-yes');

  if(noClickCount === 1){
    hint.textContent = 'think again and answer';
    noBtn.style.transform = 'scale(0.8)';
    yesBtn.style.transform = 'scale(1.1)';
  }else if(noClickCount === 2){
    hint.textContent = 'think properly before answering';
    noBtn.style.transform = 'scale(0.6)';
    yesBtn.style.transform = 'scale(1.2)';
  }else if(noClickCount === 3){
    hint.textContent = 'now press that yes button please';
    noBtn.style.display = 'none';
    yesBtn.style.transform = 'scale(1.3)';
  }
}
