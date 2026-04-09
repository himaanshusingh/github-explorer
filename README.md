# GitHub Explorer 🕵️‍♂️

Hey there! 👋 Welcome to **GitHub Explorer**. 

I built this project to make searching through GitHub users and browsing their repositories a breeze. Whether you're looking up a developer friend, exploring open-source creators, or just hunting for cool new repos, this app's got your back.

## ✨ What can it do?

- **Real-time User Search**: Just start typing! It uses debouncing under the hood so we aren't hammering the GitHub API on every single keystroke. 
- **Repository Browsing**: Click on a user and smoothly scroll through their public repos. And yep, it supports infinite scrolling.
- **Save for Later**: Found a repo you love? Bookmark it! You can view all your saved repos together in a dedicated section.
- **Filter & Sort**: Easily sort any user's repos (or your bookmarks) by stars, forks, or name, and even filter them down by programming language.
- **Dark Mode**: Because our eyes deserve a break, obviously. 🌙

## 🛠️ What's under the hood?

I wanted to keep the codebase snappy, lightweight, and free from heavy, unnecessary dependencies. Here is the stack:

- **React 18**: Built with pure, clean Javascript (JSX) to keep things flexible and straightforward.
- **Vite**: For ridiculously fast dev builds.
- **TailwindCSS (v4)**: For rapid and responsive styling without ever leaving the component file.
- **React Router v6**: For clean client-side navigation.
- **Lucide React**: For crisp, scalable icons.

No massive UI component libraries dragging the project down. All the visual elements (cards, headers, search bars, filters) are custom-built to keep the bundle size small and the architecture simple to understand.

## 🚀 Getting Started

Want to spin this up on your local machine? It's super easy.

1. **Clone the repo**
   ```bash
   git clone https://github.com/himaanshusingh/github-explorer.git
   cd github-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Fire up the dev server**
   ```bash
   npm run dev
   ```

4. Head over to the localhost port Vite gives you (usually `http://localhost:5173`) and start exploring!

## 🤝 Need to tweak something?

If you feel like adding a new feature, fixing a bug, or just improving the UI, feel free to open a pull request. I'm always open to ideas and feedback!

Thanks for checking out the project. Go build something awesome today! ✌️
