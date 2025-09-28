/**
 * The Scroll of Kaizen - Interactive Learning Game
 * A data-driven story game teaching the Kaizen change model
 * with Kung Fu Panda and Naruto themes
 */

// Story Data Structure - Defines the entire narrative flow with feedback system
const story = {
    start: {
        video: "videos/01_intro.mp4",
        scenario: "The Jade Palace kitchen is messy and disorganized. Master Shifu has asked Po to apply the 5S method (Sort, Set in Order, Shine, Standardize, Sustain) to improve the workspace. What is the FIRST step Po should take?",
        choices: [
            { 
                text: "Sharpen all the knives and tools", 
                feedback: "Sharpening tools is important, but 5S begins with removing what you don't need! The first step is always Sort - eliminate unnecessary items before organizing what remains.", 
                leadsTo: "start" 
            },
            { text: "Remove all broken pots and unused items (Sort)", leadsTo: "chapter2" },
            { 
                text: "Create new labels for everything", 
                feedback: "Labels are helpful, but they come after organization! The 5S method follows a specific order: Sort first, then Set in Order, then Shine, then Standardize. Labels are part of the Standardize step.", 
                leadsTo: "start" 
            },
            { 
                text: "Start cleaning and organizing immediately", 
                feedback: "Cleaning is important, but not the first step! In 5S, you must Sort (remove unnecessary items) and Set in Order (organize) before you Shine (clean). This prevents wasted effort on items that shouldn't be there.", 
                leadsTo: "start" 
            }
        ]
    },
    chapter2: {
        video: "videos/02_correct_choice.mp4",
        scenario: "Excellent! By sorting first, Po cleared the clutter and identified what's truly needed. Now that the unnecessary items are removed, what should be the next step in the 5S process?",
        choices: [
            { 
                text: "Start cleaning everything thoroughly", 
                feedback: "Cleaning comes later! After Sort, the next step is Set in Order - arranging items in logical, efficient locations. You need to organize before you clean to avoid cleaning things that aren't in their proper place.", 
                leadsTo: "chapter2" 
            },
            { text: "Arrange items in logical, efficient locations (Set in Order)", leadsTo: "chapter3" },
            { 
                text: "Create detailed procedures for everything", 
                feedback: "Procedures are part of Standardize, which comes after Set in Order and Shine. First organize the workspace, then clean it, then create the procedures to maintain it.", 
                leadsTo: "chapter2" 
            }
        ]
    },
    chapter3: {
        video: "videos/03_set_in_order.mp4",
        scenario: "Perfect! Po has organized the kitchen with everything in its proper place. Now comes the cleaning phase. What should Po focus on during the 'Shine' step?",
        choices: [
            { 
                text: "Clean only the visible surfaces", 
                feedback: "The Shine step is about deep cleaning and inspection, not just surface cleaning! This is when you discover problems, wear, and issues that need attention. A thorough cleaning reveals what needs maintenance.", 
                leadsTo: "chapter3" 
            },
            { text: "Deep clean everything and inspect for problems", leadsTo: "chapter4" },
            { 
                text: "Just wipe down the counters quickly", 
                feedback: "Quick wiping isn't the Kaizen way! The Shine step is about thorough cleaning and inspection to identify problems. This deep cleaning helps you understand what needs attention and prevents future issues.", 
                leadsTo: "chapter3" 
            }
        ]
    },
    chapter4: {
        video: "videos/04_shine.mp4",
        scenario: "Outstanding! Po discovered several issues during cleaning that could have caused problems later. Now it's time to create standards. What should Po do in the 'Standardize' step?",
        choices: [
            { text: "Write down the new procedures for everyone to follow", leadsTo: "chapter5" },
            { 
                text: "Just tell everyone the new way verbally", 
                feedback: "Verbal instructions aren't enough for standardization! The Standardize step requires written procedures, visual guides, and clear documentation so everyone can follow the same process consistently.", 
                leadsTo: "chapter4" 
            },
            { 
                text: "Let everyone figure it out on their own", 
                feedback: "That's not standardization at all! The Standardize step is about creating clear, consistent procedures that everyone can follow. Without standards, everyone will do things differently, and the improvements won't last.", 
                leadsTo: "chapter4" 
            }
        ]
    },
    chapter5: {
        video: "videos/05_standardize.mp4",
        scenario: "Excellent! Po has created clear standards and procedures. The final step is 'Sustain' - making sure the improvements last. What is the most important aspect of sustaining the 5S improvements?",
        choices: [
            { text: "Check the system regularly and make continuous improvements", leadsTo: "end_final" },
            { 
                text: "Set it and forget it - the work is done", 
                feedback: "That's not the Kaizen way! Continuous improvement means the work is never truly done. The Sustain step requires regular checking, monitoring, and making ongoing improvements. Kaizen is about never stopping the pursuit of excellence!", 
                leadsTo: "chapter5" 
            },
            { 
                text: "Only check when there's a problem", 
                feedback: "Reactive checking isn't enough! The Sustain step requires proactive, regular monitoring and continuous improvement. Waiting for problems to appear means you're not truly sustaining the improvements - you're just fixing things when they break.", 
                leadsTo: "chapter5" 
            }
        ]
    },
    end_final: {
        video: "videos/99_success.mp4",
        scenario: "Congratulations! You have mastered the Scroll of Kaizen! You understand that continuous improvement is a journey, not a destination. Like Po and Naruto, true strength comes from never stopping the pursuit of excellence. The 5S method is now part of your ninja toolkit!",
        choices: [
            { text: "Play Again", leadsTo: "start" }
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
let currentRetryNode = null; // Stores the node to retry from when incorrect choice is made

// Progress Tracking - Main story nodes that represent progression
const mainStoryNodes = ['start', 'chapter2', 'chapter3', 'chapter4', 'chapter5', 'end_final'];

/**
 * Update the progress bar based on current story node
 * @param {string} nodeKey - The current story node key
 */
function updateProgress(nodeKey) {
    // Find the index of the current node in main story nodes
    const currentIndex = mainStoryNodes.indexOf(nodeKey);
    
    // If node is not in main story nodes (like feedback states), don't update progress
    if (currentIndex === -1) {
        return;
    }
    
    // Calculate progress percentage
    const totalNodes = mainStoryNodes.length;
    const progress = totalNodes > 1 ? (currentIndex / (totalNodes - 1)) * 100 : 0;
    
    // Update progress bar fill
    progressFill.style.width = `${progress}%`;
    
    // Update Po's position
    poProgressIcon.style.left = `${progress}%`;
    
    console.log(`Progress updated: ${progress.toFixed(1)}% for node: ${nodeKey}`);
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
    // Get the story data for the current node
    const nodeData = story[nodeKey];
    
    if (!nodeData) {
        console.error(`Story node '${nodeKey}' not found!`);
        return;
    }
    
    // Update current node
    currentStoryNode = nodeKey;
    
    // Update progress bar
    updateProgress(nodeKey);
    
    // Update video source and load
    mainVideo.src = nodeData.video;
    mainVideo.load();
    
    // Hide decision container and modal initially
    decisionContainer.classList.add('hidden');
    shifuModal.classList.add('hidden');
    shifuModal.classList.remove('active');
    
    // Reset modal animation states
    shifuCharacter.classList.remove('active');
    speechBubble.classList.remove('active');
    
    // Remove blur effect
    appContainer.classList.remove('blurred');
    
    // Clear previous choices
    choicesBox.innerHTML = '';
    
    // Update scenario text
    scenarioText.textContent = nodeData.scenario;
    
    // Create choice buttons if choices exist
    if (nodeData.choices && nodeData.choices.length > 0) {
        nodeData.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.className = 'choice-btn';
            button.id = `choice-${index}`;
            
            // Add click event listener
            button.addEventListener('click', () => {
                // Check if this choice has feedback (incorrect choice)
                if (choice.feedback) {
                    // Show feedback modal
                    showFeedbackModal(choice.feedback, choice.leadsTo);
                } else {
                    // Correct choice - proceed normally
                    decisionContainer.classList.add('hidden');
                    loadNode(choice.leadsTo);
                }
            });
            
            choicesBox.appendChild(button);
        });
    }
    
    // Play the video
    mainVideo.play().catch(error => {
        console.warn('Video autoplay failed:', error);
        // If autoplay fails, show a play button or handle gracefully
    });
}

/**
 * Show the animated feedback modal with Master Shifu's guidance
 * @param {string} feedback - The feedback message to display
 * @param {string} retryNode - The node to retry from
 */
function showFeedbackModal(feedback, retryNode) {
    // Store the retry node
    currentRetryNode = retryNode;
    
    // Update feedback text
    feedbackText.textContent = feedback;
    
    // Hide decision container first
    decisionContainer.classList.add('hidden');
    
    // Apply blur effect to background
    appContainer.classList.add('blurred');
    
    // Show modal
    shifuModal.classList.remove('hidden');
    shifuModal.classList.add('active');
    
    // Trigger animations with slight delays for better effect
    setTimeout(() => {
        shifuCharacter.classList.add('active');
    }, 100);
    
    setTimeout(() => {
        speechBubble.classList.add('active');
    }, 600); // After Shifu has started sliding in
}

/**
 * Hide the feedback modal and retry the current chapter
 */
function retryCurrentChapter() {
    // Remove active classes to reset animations
    shifuCharacter.classList.remove('active');
    speechBubble.classList.remove('active');
    
    // Hide modal
    shifuModal.classList.remove('active');
    shifuModal.classList.add('hidden');
    
    // Remove blur effect
    appContainer.classList.remove('blurred');
    
    // Retry the current chapter
    if (currentRetryNode) {
        loadNode(currentRetryNode);
    }
}

/**
 * Helper function to show modal with proper timing
 * @param {string} feedbackMessage - The feedback message to display
 * @param {string} retryNode - The node to retry from
 */
function showModal(feedbackMessage, retryNode) {
    showFeedbackModal(feedbackMessage, retryNode);
}

/**
 * Helper function to hide modal
 */
function hideModal() {
    retryCurrentChapter();
}

/**
 * Show the scroll modal with Kaizen information
 */
function showScrollModal() {
    // Apply blur effect to background
    appContainer.classList.add('blurred');
    
    // Show scroll modal
    scrollModal.classList.remove('hidden');
    scrollModal.classList.add('active');
}

/**
 * Hide the scroll modal
 */
function hideScrollModal() {
    // Remove blur effect
    appContainer.classList.remove('blurred');
    
    // Hide scroll modal
    scrollModal.classList.remove('active');
    scrollModal.classList.add('hidden');
}

/**
 * Show the decision container when video ends
 */
function showDecisionContainer() {
    if (currentStoryNode && story[currentStoryNode].choices) {
        decisionContainer.classList.remove('hidden');
    }
}

/**
 * Switch to a specific screen
 * @param {string} screenId - The ID of the screen to show
 */
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Handle progress bar visibility
    if (screenId === 'start-screen') {
        hideProgressBar();
    } else if (screenId === 'end-screen') {
        // Ensure progress bar shows 100% on end screen
        updateProgress('end_final');
    }
}

/**
 * Initialize the game
 */
function initGame() {
    // Start button event listener
    startBtn.addEventListener('click', () => {
        showScreen('video-screen');
        showProgressBar();
        loadNode('start');
    });
    
    // Restart button event listener (for end screen)
    restartBtn.addEventListener('click', () => {
        showScreen('video-screen');
        showProgressBar();
        loadNode('start');
    });
    
    // Try again button event listener (for feedback modal)
    tryAgainBtn.addEventListener('click', retryCurrentChapter);
    
    // Info button event listener (for scroll modal)
    infoBtn.addEventListener('click', showScrollModal);
    
    // Close scroll button event listener
    closeScrollBtn.addEventListener('click', hideScrollModal);
    
    // Video ended event listener
    mainVideo.addEventListener('ended', showDecisionContainer);
    
    // Video error handling
    mainVideo.addEventListener('error', (e) => {
        console.error('Video error:', e);
        // Show decision container even if video fails
        showDecisionContainer();
    });
    
    // Handle video loading
    mainVideo.addEventListener('loadstart', () => {
        console.log('Video loading started');
    });
    
    mainVideo.addEventListener('canplay', () => {
        console.log('Video can start playing');
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            // If decision container is visible, trigger first choice
            if (!decisionContainer.classList.contains('hidden')) {
                const firstChoice = choicesBox.querySelector('.choice-btn');
                if (firstChoice) {
                    firstChoice.click();
                }
            }
            // If Shifu modal is visible, trigger try again
            else if (shifuModal.classList.contains('active')) {
                retryCurrentChapter();
            }
        }
        // Escape key to close modals
        else if (e.key === 'Escape') {
            if (shifuModal.classList.contains('active')) {
                retryCurrentChapter();
            } else if (scrollModal.classList.contains('active')) {
                hideScrollModal();
            }
        }
        // 'I' key to open info modal
        else if (e.key === 'i' || e.key === 'I') {
            if (!scrollModal.classList.contains('active') && !shifuModal.classList.contains('active')) {
                showScrollModal();
            }
        }
    });
}


// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);

// Debug function to test story navigation (can be called from browser console)
window.debugStory = function(nodeKey) {
    console.log('Loading story node:', nodeKey);
    loadNode(nodeKey);
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { story, loadNode, initGame };
}
