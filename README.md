# Game Developer Portfolio

A modern, responsive portfolio website showcasing game development projects, skills, and code examples.

## 🎮 Features

- **Dark Gaming Theme**: Eye-catching purple and pink gradient design with glow effects
- **Bilingual Support**: Full English and Polish localization
- **Responsive Design**: Works beautifully on all devices
- **Three Project Categories**:
  - **Published Games**: Commercially released projects
  - **Game Jams**: Fast-paced jam projects and hackathons
  - **Personal Projects**: Work in progress and experiments
- **Detailed Project Cards**: Each project includes:
  - Your role in the project
  - Key responsibilities and contributions
  - Project specifications and achievements
- **Interactive Sections**:
  - Hero section with stats and call-to-action buttons
  - Technology & skills display with categorized tags
  - Code snippets showcase with syntax highlighting
  - Experience & achievements timeline
  - Contact section

## 🚀 Getting Started

### Development

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 📁 Project Structure

```
├── index.html              # Main HTML file
├── src/
│   ├── main.js            # JavaScript logic
│   └── styles.css         # Styling
├── public/
│   └── locales/
│       ├── en.json        # English translations
│       └── pl.json        # Polish translations
└── images/                # Game screenshots and assets
```

## 🎨 Customization

### Adding Your Games

Your portfolio now has three categories of projects. Edit `public/locales/en.json` and `public/locales/pl.json`:

#### Published Games
```json
"published": {
  "cards": [
    {
      "badge": "Unity",
      "title": "Your Game Title",
      "description": "Game description",
      "role": "Your Role (e.g., Lead Developer)",
      "responsibilities": [
        "What you designed/built",
        "Systems you implemented",
        "Features you created"
      ],
      "specs": [
        "Platform & Release info",
        "Player count or reviews",
        "Special achievements"
      ]
    }
  ]
}
```

#### Game Jam Projects
```json
"gamejam": {
  "cards": [
    {
      "badge": "Unity",
      "title": "Jam Game Name",
      "description": "Created during [Event Name]",
      "role": "Your Role",
      "responsibilities": [
        "What you contributed",
        "Time constraint achievements"
      ],
      "specs": [
        "Event name and year",
        "Rankings or ratings",
        "Play count"
      ]
    }
  ]
}
```

#### Personal/Private Projects
```json
"private": {
  "cards": [
    {
      "badge": "Unreal",
      "title": "Project Name",
      "description": "Experimental project description",
      "role": "Your Role",
      "responsibilities": [
        "What you're working on",
        "Technologies being explored"
      ],
      "specs": [
        "Development status",
        "Target platform",
        "Expected release"
      ]
    }
  ]
}
```

### Project Card Structure

Each project card can include:
- **badge**: Engine/framework name (Unity, Unreal, Godot, etc.)
- **title**: Project name
- **description**: Brief overview of the game
- **role**: Your specific role (optional but recommended)
- **responsibilities**: Array of key contributions (optional but recommended)
- **specs**: Technical details, stats, achievements

### Adding Code Snippets

Add your best code examples in the `code.snippets` array:

```json
"code": {
  "snippets": [
    {
      "title": "Snippet Title",
      "language": "C#",
      "description": "What this code does",
      "code": "your code here"
    }
  ]
}
```

### Updating Skills

Modify the `skills.categories` array to reflect your technology stack:

```json
"skills": {
  "categories": [
    {
      "name": "Game Engines",
      "items": ["Unity", "Unreal", "Godot"]
    }
  ]
}
```

## 🖼️ Adding Game Screenshots

Place your game screenshots in the `images/` folder and reference them in your game cards. The images will be displayed as background overlays on the game project cards.

## 🌐 Language Toggle

The site automatically detects the user's browser language and defaults to English if Polish is not selected. Users can switch languages using the flag buttons in the header.

## 📧 Contact Information

Update the contact email in both locale files:

```json
"contact": {
  "cta": {
    "label": "Email me",
    "href": "mailto:your-email@example.com"
  }
}
```

## 🛠️ Technologies Used

- **Vite**: Fast build tool and dev server
- **Vanilla JavaScript**: No framework dependencies
- **CSS Grid & Flexbox**: Modern responsive layouts
- **CSS Custom Properties**: Themeable design system

## 📝 License

© Mikołaj Gajewski

---

Built with passion for game development 🎮
