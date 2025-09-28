# The Scroll of Kaizen - Interactive Learning Game

A single-page interactive game website that teaches the Kaizen change model using a Kung Fu Panda and Naruto theme. Players progress through a story by watching videos and making decisions that affect the narrative flow.

## Features

- **Interactive Storytelling**: Data-driven narrative with multiple choice decisions
- **Video Integration**: Seamless video playback with local file support
- **Responsive Design**: Mobile-friendly dark cinematic theme
- **Educational Content**: Teaches the 5S method (Sort, Set in Order, Shine, Standardize, Sustain)
- **Progressive Learning**: Story branches based on user choices
- **Animated Feedback System**: Master Shifu slides in with a speech bubble when incorrect choices are made
- **Retry Mechanism**: Users can retry specific chapters after receiving feedback
- **Dynamic Visual Effects**: Background blur, smooth animations, and comic-style speech bubbles
- **Progress Tracking**: Po-themed progress bar shows journey through the 5S method
- **Kung Fu Themed Start Screen**: Stylized title with 3D effects, dojo background, and glowing border
- **Information Scroll**: Scrollable pop-up with detailed Kaizen model information

## File Structure

```
Panda/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # Game logic and story data
├── README.md           # This file
├── videos/             # Video files directory (create this)
│   ├── 01_intro.mp4
│   ├── 02_correct_choice.mp4
│   ├── 03_set_in_order.mp4
│   ├── 04_shine.mp4
│   ├── 05_standardize.mp4
│   └── 99_success.mp4
└── images/             # Image files directory (create this)
    ├── shifu.png       # Master Shifu image for feedback modal
    ├── po_face.png     # Po's face for progress bar icon
    ├── scroll.png      # Scroll background image for information modal
    └── dojo_background.jpg  # Dojo background image for start screen
```

## Setup Instructions

1. **Create the videos directory**: Make a `videos` folder in the same directory as `index.html`

2. **Add video files**: Place the following video files in the `videos` folder:
   - `01_intro.mp4` - Introduction video
   - `02_correct_choice.mp4` - Correct choice feedback
   - `03_set_in_order.mp4` - Set in Order step
   - `04_shine.mp4` - Shine step
   - `05_standardize.mp4` - Standardize step
   - `99_success.mp4` - Success ending

3. **Add image files**: Create an `images` folder and add:
   - `shifu.png` - Master Shifu image for the feedback modal
   - `po_face.png` - Po's face image for the progress bar icon
   - `scroll.png` - Scroll background image for the information modal
   - `dojo_background.jpg` - Dojo background image for the start screen

4. **Open the game**: Open `index.html` in a web browser

## How to Play

1. Click "Begin Your Journey" to start (enjoy the Kung Fu themed start screen!)
2. Watch the video that plays and see Po's progress in the top progress bar
3. Click the "i" button (top-right) anytime to learn more about the Kaizen model
4. When the video ends, read the scenario and make a choice
5. **Correct choices** advance the story to the next chapter (Po moves forward)
6. **Incorrect choices** trigger Master Shifu's animated feedback:
   - Background blurs for focus
   - Master Shifu slides in from the side
   - Speech bubble pops up with guidance
   - Progress bar stays at current level
7. Click "Try Again" to retry the current chapter with your new knowledge
8. Continue until you master the 5S method and reach the end (Po reaches 100%)

## Technical Details

### Story Structure
The game uses a data-driven approach where the story is defined in the `story` object in `script.js`. Each story node contains:
- `video`: Path to the video file
- `scenario`: Text describing the situation
- `choices`: Array of choice objects with:
  - `text`: Choice description
  - `leadsTo`: Next story node (for correct choices)
  - `feedback`: Master Shifu's guidance (for incorrect choices)
  - `leadsTo`: Retry node (for incorrect choices)

### Browser Compatibility
- Modern browsers with HTML5 video support
- JavaScript ES6+ features
- CSS Grid and Flexbox support

### Mobile Support
- Responsive design works on mobile devices
- Touch-friendly button sizing
- Optimized for portrait orientation

## Customization

### Adding New Story Content
1. Add new video files to the `videos` folder
2. Update the `story` object in `script.js`
3. Add new story nodes with video paths and choices

### Styling Changes
- Modify CSS variables in `:root` for color scheme
- Update fonts by changing the Google Fonts import
- Adjust responsive breakpoints in media queries

### Video Requirements
- MP4 format recommended
- Optimize for web (compressed but good quality)
- Consider mobile data usage for longer videos

## Development Notes

- The game uses vanilla JavaScript (no external dependencies)
- Video autoplay may be restricted in some browsers
- All videos are muted by default to comply with autoplay policies
- The game gracefully handles video loading errors

## License

This project is created for educational purposes. Please ensure you have rights to use any video content you add to the game.
