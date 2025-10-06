# Anime Search

A modern web application for discovering and managing your favorite anime series. Built with React, TypeScript, and Vite for optimal performance and developer experience.

---

## 🚀 Features

- **Search Anime**: Find anime series using the Jikan API.
- **Favorite Management**: Add/remove anime to/from your personal favorites.
- **Detailed Views**: Compact cards with modal details and dedicated detailed views.
- **Random Recommendations**: Discover new anime with daily recommendations.
- **Local Storage**: Your favorites are saved locally in your browser.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.0
- **Language**: TypeScript
- **Build Tool**: Vite 7.0.4
- **Routing**: React Router DOM 7.8.0
- **Styling**: CSS3 with custom properties
- **API**: Jikan API (MyAnimeList)
- **Linting**: ESLint with TypeScript support

---

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd anime-search
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:** [http://localhost:5173](http://localhost:5173)

## 🏗️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## 🎯 Key Features Explained

### Search Functionality

- Real-time search with debouncing
- Automatic search after 3 characters
- Enter key support for manual search

### Favorites System

- Local storage persistence
- Add/remove toggle functionality
- Context-based state management

## 🌐 API Integration

This application uses the **Jikan API v4**, an unofficial MyAnimeList API, to fetch anime data including:

- Title and images
- Scores and ratings
- Episode information
- Genres and synopsis

## 🔧 Configuration

The project includes:

- TypeScript strict mode configuration
- ESLint with React Hooks and TypeScript rules
- Vite configuration for optimized builds
- Path aliases for cleaner imports

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Jikan API** for providing anime data
- **MyAnimeList** for the comprehensive anime database
- **React** and **Vite** teams for the excellent developer tools
