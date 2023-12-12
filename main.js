// Importation des modules Matter.js
const { Engine, Render, World, Bodies, Constraint, Body } = Matter;

// Création du moteur
const engine = Engine.create();

// Création du rendu
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 800,
        wireframes: false,
        showCollisions: true
    }
});

// Création des boules bleues et rouges
const balls = [];
for (let i = 0; i < 12; i++) {
    for (let y = 0; y < 12; y++) {
        const redBall = Bodies.circle(60+i*50,60+y*20, 20, { isStatic: false, render: { fillStyle: 'red' } });
        balls.push(redBall);
    }
    for (let y = 0; y < 12; y++) {
        const blueBall = Bodies.circle(60+i*50,400+y*20, 20, { isStatic: false, render: { fillStyle: 'blue' } });
        balls.push(blueBall);
    }
    
}

// Création de la croix
const crossSize = 600; // Taille de la croix
const crossThickness = 50; // Épaisseur de la croix
const crossColor = '#313131'; // Couleur de la croix

const crossPart1 = Bodies.rectangle(400, 400, crossSize, crossThickness, {
    render: {
        fillStyle: crossColor
    }
});
const crossPart2 = Bodies.rectangle(400, 400, crossThickness, crossSize, {
    render: {
        fillStyle: crossColor
    }
});

const cross = Body.create({ // Création du corps composite
    parts: [crossPart1, crossPart2]
});

// Création du mur
const wallThickness = 100; // Épaisseur du mur
const wallLength = 800; // Longueur du mur
const wallColor = '#313131'; // Couleur du mur

const wallPart1 = Bodies.rectangle(400, 0, wallLength, wallThickness, {
    isStatic: true,
    render: {
        fillStyle: wallColor
    }
});
const wallPart2 = Bodies.rectangle(0, 400, wallThickness, wallLength, {
    isStatic: true,
    render: {
        fillStyle: wallColor
    }
});
const wallPart3 = Bodies.rectangle(400, 800, wallLength, wallThickness, {
    isStatic: true,
    render: {
        fillStyle: wallColor
    }
});
const wallPart4 = Bodies.rectangle(800, 400, wallThickness, wallLength, {
    isStatic: true,
    render: {
        fillStyle: wallColor
    }
});

const wall = Body.create({ // Création du corps composite
    parts: [wallPart1, wallPart2, wallPart3, wallPart4]
});

// Fixation de la croix au centre
const constraint = Constraint.create({
    pointA: { x: 400, y: 400 },
    bodyB: cross,
    stiffness: 1
});

// Fixation du mur au centre
const wallConstraint = Constraint.create({
    pointA: { x: 400, y: 400 },
    bodyB: wall,
    stiffness: 1
});

// Ajout de la contrainte du mur au monde
World.add(engine.world, wallConstraint);

// Ajout du mur au monde
World.add(engine.world, wall);

// Ajout de la contrainte au monde
World.add(engine.world, constraint);

// Ajout de la croix au monde
World.add(engine.world, cross);

// Ajout des boules au monde
World.add(engine.world, balls);

// Démarrage du moteur
Matter.Runner.run(engine)

setInterval(() => {
    Matter.Body.rotate(cross, 0.003); // 0.05 est l'angle de rotation
    Matter.Body.rotate(wall, -0.001); // 0.010 est l'angle de rotation
}, 2);

// Démarrage du rendu
Render.run(render);
