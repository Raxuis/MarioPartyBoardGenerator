# ⭐️ Random Map Generator ⭐️

**Random Map Generator** is aimed to generate a random map on *Super Mario Party Jamboree*.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Languages](#languages)
- [Versions](#versions)
- [Starting](#starting)
- [Author](#author)

---

## Features

In this project, you can:

- Generate a random map for *Super Mario Party Jamboree*.
- View the generated map.
- Generate a new map.
- See the 7 different maps with their names.

---

## Architecture

Here is the project structure:

    .
    ├── ...
    ├── pages                       # Every page of the project
    │   ├── Home.js                 # Home page
    │   ├── Maps.js                 # 7 different maps page
    │   ├── RandomMap.js            # Random Map generated page
    │   ├── RandomMapGeneration.js  # Random Map generation page (carousel)
    │   ├── NotFound.md             # Error 404 page
    │   └── ...                     # etc.
    ├── components                  # Every component of the project
    │   └── ...                     
    ├── store                       # Zustand store
    │   └── ...                     
    ├── App.js                      # Main component
    ├── utils.js                    # Utility functions
    │   └── index.js                # Main utility functions
    ├── styles                      # Global styles
    │   └── globalStyles.js
    ├── constants                   # Constants
    │   └── index.js
    ├── assets                      # Assets
    │   ├── board-icons
    │      └── ...
    │   ├── board-view
    │      └── ...
    │   ├── fonts
    │      └── ...
    │   ├── sounds
    │      └── ...
    │   └── ...
    └── ...

---

## Languages

This project is built using the following technologies:

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

## Versions

Used versions in this project :

- **Node.js**: v20.11.0
- **npm**: v10.2.4
- **Next.js**: v0.76.6
- **TailwindCSS**: v4
- **Expo**: ~52.0.28

---

## Starting

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Raxuis/random-map-generator.git
   ```

2. Navigate to the project folder:
   ```bash
   cd random-map-generator
   ```

3. Install dependencies:
   ```bash
   npm install 
   ```
    or If not working :
    ```bash
     npm install --force
    ```

4. Run the development server:
   ```bash
   npm run start
   ```

5. Open your browser or emulator to view the application.

---

## Author

- [Raxuis](https://github.com/Raxuis)

---

Made with ❤️ by [Raxuis](https://github.com/Raxuis)