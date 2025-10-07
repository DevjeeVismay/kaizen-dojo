/**
 * The Scroll of Kaizen - Interactive Learning Game
 * A data-driven story game teaching the Kaizen change model
 * with a Kung Fu Panda theme.
 */

// Story Data Structure - Defines the new narrative flow
const story = {
    start: {
        video: "videos/placeholder_01.mp4",
        scenario: "To begin your training, a warm-up question! Who is Po's wise and patient Kung Fu master?",
        choices: [
            { text: "Master Oogway", feedback: "Master Oogway was the founder of Kung Fu, but Master Shifu is Po's direct teacher!", leadsTo: "start" },
            { text: "Master Shifu", leadsTo: "journeyToJapan" },
            { text: "Master Tigress", feedback: "Tigress is a powerful warrior and friend, but not Po's master.", leadsTo: "start" }
        ]
    },
    journeyToJapan: {
        video: "videos/placeholder_02.mp4",
        scenario: "The scroll speaks of 'Kaizen,' a powerful philosophy. To learn its secrets, Po must travel to its land of origin. Where did the way of Kaizen originate?",
        choices: [
            { text: "China", feedback: "While Kung Fu originates from China, the philosophy of Kaizen comes from Japan.", leadsTo: "journeyToJapan" },
            { text: "Korea", feedback: "A land of great traditions, but Kaizen's roots are in Japan.", leadsTo: "journeyToJapan" },
            { text: "Japan", leadsTo: "trainingBegins" }
        ]
    },
    trainingBegins: {
        video: "videos/placeholder_03.mp4",
        scenario: "Po meets the wise master Naruto, who explains that the path to Kaizen does not begin with a mighty clash, but with quiet observation. What is the first step in true Kaizen training?",
        choices: [
            { text: "Observing the process", leadsTo: "strength1" },
            { text: "Lifting heavy rocks", feedback: "Strength is important, but Kaizen begins with the mind, not the muscles. One must first see the challenge clearly.", leadsTo: "trainingBegins" },
            { text: "Sparring with a master", feedback: "Combat reveals flaws, but true improvement starts by observing the everyday process, not the grand battle.", leadsTo: "trainingBegins" }
        ]
    },
    strength1: {
        video: "videos/placeholder_04.mp4",
        scenario: "Naruto teaches Po the first strength of Kaizen: it is for everyone. Who is responsible for suggesting improvements in the Kaizen way?",
        choices: [
            { text: "Only the Masters", feedback: "No, the masters guide the process, but the wisdom of Kaizen is that even the newest student can see a better way.", leadsTo: "strength1" },
            { text: "Only the Dragon Warrior", feedback: "The Dragon Warrior leads by example, but every single person's insight is valuable in the path of continuous improvement.", leadsTo: "strength1" },
            { text: "Everyone, from the noodle maker to the master", leadsTo: "strength2" }
        ]
    },
    strength2: {
        video: "videos/placeholder_05.mp4",
        scenario: "The second strength is revealed: Small steps lead to big changes. How does Kaizen achieve great results?",
        choices: [
            { text: "Through one single, heroic effort", feedback: "Heroic efforts are for legends! Kaizen is for the real world, where consistent, small actions create lasting change.", leadsTo: "strength2" },
            { text: "By making small, consistent improvements", leadsTo: "strength3" },
            { text: "By waiting for the perfect moment", feedback: "The perfect moment is now! Kaizen teaches that we should not wait, but take a small step forward today.", leadsTo: "strength2" }
        ]
    },
    strength3: {
        video: "videos/placeholder_06.mp4",
        scenario: "The third strength: It is easy to do it right. Kaizen focuses on simple, clear processes. Why is this important?",
        choices: [
            { text: "So it's easy for everyone to follow the correct way", leadsTo: "strength4" },
            { text: "To make the process more mysterious", feedback: "Clarity, not mystery, is the goal! A simple process is a strong process that everyone can master.", leadsTo: "strength3" },
            { text: "So only the smartest warrior can do it", feedback: "Kaizen is not for the few, but for the many. A simple process ensures everyone can contribute to success.", leadsTo: "strength3" }
        ]
    },
    strength4: {
        video: "videos/placeholder_07.mp4",
        scenario: "The final strength: Everyone improves together. As the team gets better, so does the individual. What is the outcome of this shared journey?",
        choices: [
            { text: "One warrior becomes the strongest", feedback: "When the team rises, everyone rises with it. The goal is collective strength, not individual glory.", leadsTo: "strength4" },
            { text: "It creates a culture of teamwork and shared success", leadsTo: "weakness1" },
            { text: "It causes jealousy between warriors", feedback: "In the Kaizen way, the success of a teammate is your success too. It builds unity, not rivalry.", leadsTo: "strength4" }
        ]
    },
    weakness1: {
        video: "videos/placeholder_08.mp4",
        scenario: "But the path is not without its challenges. The first weakness of Kaizen is that it requires great discipline. Why might this be difficult?",
        choices: [
            { text: "It's easy to forget small details over time", feedback: "Exactly! Without discipline, old habits return. Kaizen requires constant focus to maintain the improvements.", leadsTo: "weakness2" },
            { text: "The training is too physically hard", feedback: "The challenge of Kaizen is mental, not physical. It's the discipline of the mind to stay focused on continuous improvement.", leadsTo: "weakness1" },
            { text: "It requires expensive new equipment", feedback: "Kaizen focuses on improving the process with what you have. The investment is in effort and discipline, not money.", leadsTo: "weakness1" }
        ]
    },
    weakness2: {
        video: "videos/placeholder_09.mp4",
        scenario: "The second weakness: The results can feel slow at first. Why could this be a challenge for the Furious Five?",
        choices: [
            { text: "They are used to seeing immediate, powerful results", leadsTo: "pre_outro" },
            { text: "The changes are too big and scary", feedback: "Kaizen is the opposite! It's all about small, manageable changes. The challenge is having patience for them to add up.", leadsTo: "weakness2" },
            { text: "It requires learning a new language", feedback: "The language of Kaizen is action, which everyone understands. The challenge is trusting that small actions will lead to big results over time.", leadsTo: "weakness2" }
        ]
    },
    pre_outro: {
        // This is a new text-only node before the final video
        video: null, // No video for this node
        scenario: "Po now understands the Scroll of Kaizen. The journey to mastery is not a single leap, but a path of endless small steps. He returns to the Valley of Peace, ready to share this wisdom.",
        choices: [
            { text: "See the journey's end", leadsTo: "outro" }
        ]
    },
    outro: {
        // This is the final node with the credits video
        video: "videos/placeholder_10.mp4",
        scenario: "Thank you for playing!",
        choices: [
            { text: "Begin the Journey Anew", leadsTo: "start" }
        ]
    }
};

// DOM Element References
const startScreen = document.getElementById('start-screen');
const videoScreen = document.getElementById('video-screen');
const endScreen = document.getElementById('end-screen');
const mainVideo = document.getElementById('main-video');
const decisionContainer = document.getElementById('decision-container');
const scenarioText = document.getElementById('scenario-text');
const choicesBox = document.getElementById('choices-box');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const endMessage = document.getElementById('end-message');

// App Container for blur effect
const appContainer = document.getElementById('app-container');

// Progress Bar Elements
const progressBarContainer = document.getElementById('progress-bar-container');
const progressFill = document.getElementById('progress-fill');
const poProgressIcon = document.getElementById('po-progress-icon');

// Modal Elements
const shifuModal = document.getElementById('shifu-feedback-modal');
const shifuCharacter = document.getElementById('shifu-character');
const speechBubble = document.getElementById('speech-bubble');
const feedbackText = document.getElementById('feedback-text');
const tryAgainBtn = document.getElementById('try-again-btn');

// Scroll Modal Elements
const infoBtn = document.getElementById('info-btn');
const scrollModal = document.getElementById('scroll-modal');
const closeScrollBtn = document.getElementById('close-scroll-btn');

// Game State
let currentStoryNode = null;
let currentRetryNode = null; 

// Progress Tracking - Updated main story nodes for the new flow
const mainStoryNodes = ['start', 'journeyToJapan', 'trainingBegins', 'strength1', 'strength2', 'strength3', 'strength4', 'weakness1', 'weakness2', 'pre_outro', 'outro'];

/**
 * Update the progress bar based on current story node
 * @param {string} nodeKey - The current story node key
 */
function updateProgress(nodeKey) {
    const currentIndex = mainStoryNodes.indexOf(nodeKey);
    if (currentIndex === -1) return;
    const totalNodes = mainStoryNodes.length;
    const progress = totalNodes > 1 ? (currentIndex / (totalNodes - 1)) * 100 : 0;
    progressFill.style.width = `${progress}%`;
    poProgressIcon.style.left = `${progress}%`;
}

/**
 * Show the progress bar (called when game starts)
 */
function showProgressBar() {
    progressBarContainer.classList.remove('hidden');
    progressBarContainer.classList.add('visible');
}

/**
 * Hide the progress bar (called when returning to start screen)
 */
function hideProgressBar() {
    progressBarContainer.classList.add('hidden');
    progressBarContainer.classList.remove('visible');
}

/**
 * Main Game Engine - Loads and displays a story node
 * @param {string} nodeKey - The key of the story node to load
 */
function loadNode(nodeKey) {
    mainVideo.classList.remove('blurred'); // Add this line at the top
    const nodeData = story[nodeKey];
    if (!nodeData) {
        console.error(`Story node '${nodeKey}' not found!`);
        return;
    }
    currentStoryNode = nodeKey;
    updateProgress(nodeKey);

    // Hide decision container and modals initially
    decisionContainer.classList.add('hidden');
    shifuModal.classList.add('hidden');
    shifuModal.classList.remove('active');
    shifuCharacter.classList.remove('active');
    speechBubble.classList.remove('active');
    appContainer.classList.remove('blurred');
    choicesBox.innerHTML = '';
    scenarioText.textContent = nodeData.scenario;

    // Handle nodes with video vs. text-only nodes
    if (nodeData.video) {
        mainVideo.style.display = 'block'; // Ensure video player is visible
        mainVideo.src = nodeData.video;
        mainVideo.load();
        mainVideo.play().catch(error => {
            console.warn('Video autoplay failed:', error);
        });
    } else {
        mainVideo.style.display = 'none'; // Hide video player for text-only nodes
        showDecisionContainer(); // Immediately show the text and choices
    }
    
    // Create choice buttons if choices exist
    if (nodeData.choices && nodeData.choices.length > 0) {
        nodeData.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.className = 'choice-btn';
            button.addEventListener('click', () => {
                if (choice.feedback) {
                    showFeedbackModal(choice.feedback, choice.leadsTo);
                } else {
                    decisionContainer.classList.add('hidden');
                    loadNode(choice.leadsTo);
                }
            });
            choicesBox.appendChild(button);
        });
    }
}

/**
 * Show the animated feedback modal with Master Shifu's guidance
 * @param {string} feedback - The feedback message to display
 * @param {string} retryNode - The node to retry from
 */
function showFeedbackModal(feedback, retryNode) {
    currentRetryNode = retryNode;
    feedbackText.textContent = feedback;
    decisionContainer.classList.add('hidden');
    appContainer.classList.add('blurred');
    shifuModal.classList.remove('hidden');
    shifuModal.classList.add('active');
    setTimeout(() => shifuCharacter.classList.add('active'), 100);
    setTimeout(() => speechBubble.classList.add('active'), 600);
}

/**
 * Hide the feedback modal and retry the current chapter
 */
function retryCurrentChapter() {
    shifuCharacter.classList.remove('active');
    speechBubble.classList.remove('active');
    shifuModal.classList.remove('active');
    shifuModal.classList.add('hidden');
    appContainer.classList.remove('blurred');
    if (currentRetryNode) {
        loadNode(currentRetryNode);
    }
}

/**
 * Show the scroll modal with Kaizen information
 */
function showScrollModal() {
    appContainer.classList.add('blurred');
    scrollModal.classList.remove('hidden');
    scrollModal.classList.add('active');
}

/**
 * Hide the scroll modal
 */
function hideScrollModal() {
    appContainer.classList.remove('blurred');
    scrollModal.classList.remove('active');
    scrollModal.classList.add('hidden');
}

/**
 * Show the decision container when video ends
 */
function showDecisionContainer() {
    if (currentStoryNode && story[currentStoryNode].choices) {
        mainVideo.classList.add('blurred'); // Add this line
        decisionContainer.classList.remove('hidden');
    }
}

/**
 * Switch to a specific screen
 * @param {string} screenId - The ID of the screen to show
 */
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    if (screenId === 'start-screen') {
        hideProgressBar();
    } else if (screenId === 'end-screen') {
        updateProgress('outro'); // Ensure progress bar shows 100% on the final node
    }
}

/**
 * Initialize the game
 */
function initGame() {
    startBtn.addEventListener('click', () => {
        showScreen('video-screen');
        showProgressBar();
        loadNode('start');
    });

    restartBtn.addEventListener('click', () => {
        showScreen('video-screen');
        showProgressBar();
        loadNode('start');
    });

    tryAgainBtn.addEventListener('click', retryCurrentChapter);
    infoBtn.addEventListener('click', showScrollModal);
    closeScrollBtn.addEventListener('click', hideScrollModal);
    mainVideo.addEventListener('ended', showDecisionContainer);
    mainVideo.addEventListener('error', (e) => {
        console.error('Video error:', e);
        showDecisionContainer();
    });
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);