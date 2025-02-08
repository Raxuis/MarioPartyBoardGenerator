export const CAROUSEL_DURATION = 5000;

export const MAPS = [
    {
        id: '1',
        name: "Bois Rieur de Méga Wiggler",
        description: "Un bois mystérieux et vibrant, peuplé par les redoutables Wiggler géants.",
        boardView: require('../assets/board-view/super-mario-party-jamboree-website-board-1.jpg'),
        boardIcon: require('../assets/board-icons/super-mario-party-jamboree-board-icon-1.png'),
        sound: require('../assets/sounds/maps/wiggler.mp3'),
    },
    {
        id: '2',
        name: "Circuit Débridé",
        description: "Un circuit rapide et sinueux, idéal pour les courses effrénées.",
        boardView: require('../assets/board-view/super-mario-party-jamboree-website-board-2.jpg'),
        boardIcon: require('../assets/board-icons/super-mario-party-jamboree-board-icon-2.png'),
        sound: require('../assets/sounds/maps/roll-em-raceway.mp3'),
    },
    {
        id: '3',
        name: "Île Goomba",
        description: "Une île pleine de Goombas et d'obstacles, un vrai défi pour les aventuriers.",
        boardView: require('../assets/board-view/super-mario-party-jamboree-website-board-3.jpg'),
        boardIcon: require('../assets/board-icons/super-mario-party-jamboree-board-icon-3.png'),
        sound: require('../assets/sounds/maps/goomba.mp3'),
    },
    {
        id: '4',
        name: "Base Secrète de Bowser",
        description: "La base secrète de Bowser, avec des pièges sournois et des ennemis redoutables.",
        boardView: require('../assets/board-view/super-mario-party-jamboree-website-board-7.jpg'),
        boardIcon: require('../assets/board-icons/super-mario-party-jamboree-board-icon-7.png'),
        sound: require('../assets/sounds/maps/bowser.mp3'),
    },
    {
        id: '5',
        name: "Galeries Multicolores",
        description: "Un lieu magique aux couleurs vives, offrant un parcours fascinant et surprenant.",
        boardView: require('../assets/board-view/super-mario-party-jamboree-website-board-4.jpg'),
        boardIcon: require('../assets/board-icons/super-mario-party-jamboree-board-icon-4.png'),
        sound: require('../assets/sounds/maps/market.mp3'),
    },
    {
        id: '6',
        name: "Pays Western",
        description: "Un environnement sauvage inspiré des classiques westerns, plein de duels et de défis.",
        boardView: require('../assets/board-view/super-mario-party-jamboree-website-board-5.jpg'),
        boardIcon: require('../assets/board-icons/super-mario-party-jamboree-board-icon-5.png'),
        sound: require('../assets/sounds/maps/western.mp3'),
    },
    {
        id: '7',
        name: "Château Arc-en-Ciel de Mario",
        description: "Un château magique rempli de mystères et de couleurs éclatantes.",
        boardView: require('../assets/board-view/super-mario-party-jamboree-website-board-6.jpg'),
        boardIcon: require('../assets/board-icons/super-mario-party-jamboree-board-icon-6.png'),
        sound: require('../assets/sounds/maps/rainbow.mp3'),
    }
];

// Could be used for a future feature
export const GAME_COLORS = {
    'Super Mario Party Jamboree': '#FF5733',
    'Mario Party Superstars': '#3498db',
    'Mario Party 10': '#2ecc71',
    'Mario Party 9': '#f1c40f',
};

export const NINTENDO_COLOR = '#E60012';

export const BUTTON_SOUNDS = {
    'FORWARD': require('../assets/sounds/click-forward.mp3'),
    'BACKWARD': require('../assets/sounds/click-backward.mp3'),
}
