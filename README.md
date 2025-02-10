# ⭐️ Random Board Generator ⭐️

**Random Board Generator** is aimed to generate a random map on *Super Mario Party Jamboree*.

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

- Generate a random board for *Super Mario Party Jamboree*.
- View the generated board.
- Generate a new map.
- See the 7 different boards with their names.

If you want to see screenshots of the project, you can check the `demo` folder.
PS: Try to find the hidden Easter egg in the project 🥚.

---

## Architecture

Here is the project structure:

    .
    ├── ...
    ├── pages                       # Every page of the project
    │   ├── Home.js                 # Home page
    │   ├── Boards.js               # 7 different boards page
    │   ├── RandomBoard.js          # Random Map generated page
    │   ├── RandomBoardGeneration.js  # Random Map generation page (carousel)
    │   ├── NotFound.md             # Error 404 page
    │   └── ...                     # etc.
    ├── components                  # Every component of the project
    │   └── ...                     
    ├── store                       # Zustand store
    │   └── ...
    ├── hooks                       # Custom hooks
    │   ├── useButtonSound.js       # Button sound hook
    │   └── useBackgroundSound.js   # Background sound hook
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
- **Expo**: v52.0.28

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

4. Run the server when on same network:
   ```bash
   npm run start
   ```
   or If **not on same network** :
    ```bash
     npx expo start --tunnel
    ```
   or :
    ```bash
     npm run tunnel
    ```

5. Open your browser or emulator to view the application.

---

## Author

- [Raxuis](https://github.com/Raxuis)

---

Made with ❤️ by [Raxuis](https://github.com/Raxuis)