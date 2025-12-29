let currentPageIndex = 1;
let noClickCount = 0;

// Hide greeting follow-up text initially, show after 3 seconds
window.addEventListener('load', () => {
    const followUp = document.getElementById('followUpText');
    followUp.style.display = 'none';
    setTimeout(() => {
        followUp.style.display = 'flex';
    }, 3000);
});

function showEnvelope() {
    document.getElementById('greetingScreen').style.display = 'none';
    document.getElementById('envelopeScreen').style.display = 'flex';
}

function openEnvelope() {
    document.getElementById('envelopeScreen').style.display = 'none';
    document.getElementById('letterScreen').style.display = 'flex';
    updateLetterPage();
}

function nextPage() {
    if (currentPageIndex < 4) {
        currentPageIndex++;
        updateLetterPage();
    }
}

function prevPage() {
    if (currentPageIndex > 1) {
        currentPageIndex--;
        updateLetterPage();
    }
}

function updateLetterPage() {
    // Hide all pages
    document.getElementById('letterPage1').style.display = 'none';
    document.getElementById('letterPage2').style.display = 'none';
    document.getElementById('letterPage3').style.display = 'none';
    document.getElementById('letterPage4').style.display = 'none';

    // Show current page
    document.getElementById(`letterPage${currentPageIndex}`).style.display = 'block';

    // Update page counter
    document.getElementById('currentPage').textContent = currentPageIndex;

    // Update button visibility
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const finishBtn = document.getElementById('finishBtn');

    if (currentPageIndex === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }

    if (currentPageIndex === 4) {
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        finishBtn.style.display = 'none';
    }
}

function finishLetter() {
    document.getElementById('letterScreen').style.display = 'none';
    document.getElementById('questionScreen').style.display = 'flex';
}

function answerYes() {
    document.getElementById('questionScreen').style.display = 'none';
    document.getElementById('finalScreen').style.display = 'flex';
    createConfetti();
}

function answerNo() {
    noClickCount++;
    const hintText = document.getElementById('hintText');
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.querySelector('.btn-yes');

    if (noClickCount === 1) {
        hintText.textContent = 'think again and answer';
        noBtn.style.transform = 'scale(0.8)';
        yesBtn.style.transform = 'scale(1.1)';
    } else if (noClickCount === 2) {
        hintText.textContent = 'think properly before answering';
        noBtn.style.transform = 'scale(0.6)';
        yesBtn.style.transform = 'scale(1.2)';
    } else if (noClickCount === 3) {
        hintText.textContent = 'now press that yes button please';
        noBtn.style.display = 'none';
        yesBtn.style.transform = 'scale(1.3)';
    }
}

function createConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    const confettiPieces = 50;

    for (let i = 0; i < confettiPieces; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.backgroundColor = ['#FFD7E8', '#FFF9C4', '#E6D5F0', '#FF9EC5'][
            Math.floor(Math.random() * 4)
        ];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        confettiContainer.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Add fall animation for confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotateZ(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
