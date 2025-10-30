# The Scroll of Kaizen - Interactive Learning Game

A single-page interactive game website that teaches the Kaizen change model using a Kung Fu Panda and Naruto theme. Players progress through a story by watching videos and making decisions that affect the narrative flow.

## File Structure

```
Panda/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # Game logic and story data
├── README.md           # This file
├── ANSWERS.md           # This file
├── videos/             # Video files directory (create this)
│   ├── placeholder_1.mp4
│   ├── placeholder_2.mp4
│   ├── placeholder_3.mp4
│   ├── placeholder_4.mp4
│   ├── placeholder_5.mp4
│   ├── placeholder_6.mp4
│   ├── placeholder_7.mp4
│   ├── placeholder_8.mp4
│   ├── placeholder_9.mp4
│   └── placeholder_10.mp4
└── images/             # Image files directory (create this)
    ├── shifu.png       # Master Shifu image for feedback modal
    ├── po_face.png     # Po's face for progress bar icon
    ├── scroll.png      # Scroll background image for information modal
    └── dojo_background.jpg  # Dojo background image for start screen
```

## How to Play

1. Click "Begin Your Journey" to start (enjoy the Kung Fu themed start screen!)
2. Watch the video that plays and see Po's progress in the top progress bar
3. Click the "i" button (top-right) anytime to learn more about the Kaizen model
4. When the video ends, read the scenario and make a choice
5. **Correct choices** advance the story to the next chapter (Po moves forward)
6. **Incorrect choices** trigger Master Shifu's animated feedback:
   - Master Shifu slides in from the side
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

## License

This project is created for educational purposes.
