# Portfolio Website

A clean, typography-forward personal portfolio website built with pure HTML, CSS, and vanilla JavaScript. No build process or framework dependencies required.

## Features

- **Four sections**: Words, Pictures, Performances, Research
- **Expandable project cards**: Click to reveal full details
- **Simple data management**: Edit projects.json in any text editor
- **Mobile-responsive**: Works on all devices
- **Zero dependencies**: No npm, no build step, no framework
- **Netlify-ready**: Deploy by dragging the folder

## Quick Start

1. **View the site**: Open `index.html` in any web browser
2. **Edit projects**: Modify `projects.json` with your content
3. **Customize**: Update text in `index.html` and styles in `style.css`

## File Structure

```
wisecracker-site/
├── index.html      # Main HTML structure
├── style.css       # All styles and responsive design
├── script.js       # JavaScript for loading and displaying projects
├── projects.json   # Your project data (edit this!)
└── README.md       # This file
```

## How to Add/Edit Projects

All your projects are stored in `projects.json`. Open it in any text editor to add, edit, or remove projects.

### Project Structure

Each project is an object with the following fields:

```json
{
  "title": "Project Title",
  "description": "A description of your project. This can be multiple sentences.",
  "date": "2024-11-15",
  "category": "words",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "videoEmbeds": [
    "https://www.youtube.com/embed/VIDEO_ID"
  ],
  "links": [
    {
      "label": "View Project",
      "url": "https://example.com"
    }
  ]
}
```

### Field Definitions

- **title** (required): The project name
- **description** (required): Full description of the project
- **date** (required): Date in YYYY-MM-DD format (used for sorting)
- **category** (required): Must be one of: `words`, `pictures`, `performances`, or `research`
- **images** (optional): Array of image URLs. Can be empty `[]`
- **videoEmbeds** (optional): Array of video embed URLs (YouTube, Vimeo, etc.). Can be empty `[]`
- **links** (optional): Array of link objects with `label` and `url`. Can be empty `[]`

### Adding a New Project

1. Open `projects.json` in a text editor
2. Add a comma after the last project's closing brace `}`
3. Paste your new project object
4. Save the file
5. Refresh your browser

### Example: Adding a New Essay

```json
{
  "title": "My New Essay",
  "description": "This is a new essay I wrote about technology and creativity.",
  "date": "2024-12-02",
  "category": "words",
  "images": [],
  "videoEmbeds": [],
  "links": [
    {
      "label": "Read on Medium",
      "url": "https://medium.com/@yourname/my-essay"
    }
  ]
}
```

### Example: Adding a Photo Project

```json
{
  "title": "Street Photography Series",
  "description": "A collection of candid moments from urban environments.",
  "date": "2024-12-01",
  "category": "pictures",
  "images": [
    "https://yoursite.com/photos/street1.jpg",
    "https://yoursite.com/photos/street2.jpg",
    "https://yoursite.com/photos/street3.jpg"
  ],
  "videoEmbeds": [],
  "links": []
}
```

### Tips for Working with projects.json

- **Validate your JSON**: Use [JSONLint](https://jsonlint.com/) to check for syntax errors
- **Dates**: Always use YYYY-MM-DD format (e.g., 2024-12-02)
- **Categories**: Must match exactly: `words`, `pictures`, `performances`, or `research`
- **Empty arrays**: Use `[]` for fields you don't need (don't omit them)
- **Commas**: Remember commas between projects, but NOT after the last one
- **Quotes**: Always use double quotes `"` not single quotes `'`

## Customization

### Changing Site Title

Edit the `<h1>` tag in `index.html`:

```html
<h1 class="site-title">Your Name</h1>
```

Also update the `<title>` tag in the `<head>`:

```html
<title>Your Name - Portfolio</title>
```

### Adjusting Colors

Edit the CSS variables in `style.css`:

```css
:root {
    --color-text: #1a1a1a;          /* Main text color */
    --color-text-light: #666;       /* Lighter text */
    --color-border: #e0e0e0;        /* Border color */
    --color-background: #ffffff;    /* Background */
    --color-accent: #333;           /* Accent color */
}
```

### Changing Fonts

The site uses system fonts by default. To use custom fonts:

1. Add Google Fonts or font files
2. Update the font variables in `style.css`:

```css
:root {
    --font-serif: 'Your Serif Font', Georgia, serif;
    --font-sans: 'Your Sans Font', -apple-system, sans-serif;
}
```

## Using Your Own Images

You have several options for hosting images:

1. **In the project folder**: Create an `images/` folder and reference them:
   ```json
   "images": ["images/photo1.jpg", "images/photo2.jpg"]
   ```

2. **Image hosting services**: Use Imgur, Cloudinary, or similar
   ```json
   "images": ["https://i.imgur.com/yourimage.jpg"]
   ```

3. **Cloud storage**: Use Dropbox, Google Drive (with public links)

## Video Embeds

For YouTube videos, use the embed URL format:
```
https://www.youtube.com/embed/VIDEO_ID
```

For Vimeo videos:
```
https://player.vimeo.com/video/VIDEO_ID
```

## Deploying to Netlify

### Method 1: Drag and Drop (Easiest)

1. Go to [netlify.com](https://www.netlify.com/)
2. Sign up or log in
3. Drag the entire `wisecracker-site` folder onto the Netlify dashboard
4. Done! Your site is live

### Method 2: Git-based Deployment

1. Create a Git repository
2. Push your code to GitHub/GitLab/Bitbucket
3. Connect the repository to Netlify
4. Configure:
   - Build command: (leave empty)
   - Publish directory: `/` (root)

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Troubleshooting

### Projects not showing up

1. Check that `projects.json` is in the same folder as `index.html`
2. Validate your JSON syntax at [JSONLint](https://jsonlint.com/)
3. Open browser console (F12) to check for errors
4. Make sure the `category` field matches one of: `words`, `pictures`, `performances`, `research`

### Images not loading

1. Check that image URLs are correct and publicly accessible
2. For local images, make sure they're in the same folder or a subfolder
3. Check browser console for 404 errors

### Site looks broken on mobile

1. Make sure you haven't accidentally modified the viewport meta tag in `index.html`
2. Check that you haven't removed responsive CSS rules in `style.css`

## Design Philosophy

This site is inspired by the typography-forward, content-first approaches.

- **Generous whitespace**: Let content breathe
- **Readable typography**: Serif body text, clear hierarchy
- **Minimal distraction**: Focus on the work, not the interface
- **Progressive disclosure**: Collapsed cards reveal details on demand

## Technical Notes

- No external dependencies
- No build process required
- Vanilla JavaScript (ES6+)
- CSS Grid and Flexbox for layout
- Mobile-first responsive design
- Semantic HTML5
- Accessible navigation
- Works offline once loaded

## License

This template is free to use for personal or commercial projects. No attribution required.

## Support

For issues with the template itself, check:
1. That all files are in the same directory
2. That you're using a modern browser
3. That your JSON is valid

---

Made with vanilla HTML, CSS, and JavaScript. No frameworks harmed in the making of this site.
