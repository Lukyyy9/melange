// Importation des modules Matter.js
const { Engine, Render, World, Bodies, Constraint } = Matter;

// Création du moteur
const engine = Engine.create();

// Création du rendu
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 800
    }
});

// Création des boules bleues et rouges
const balls = [];
for (let i = 0; i < 10; i++) {
    const blueBall = Bodies.circle(100 + i * 50, 100 + i * 20, 20, {
        render: {
            fillStyle: 'blue'
        }
    });
    const redBall = Bodies.circle(200 + i * 40, 200 + i * 30, 20, {
        render: {
            fillStyle: 'red'
        }
    });
    balls.push(blueBall, redBall);
}

// Ajout des boules au monde
World.add(engine.world, balls);

// Création d'une croix composée de plusieurs corps
const crossBodies = [];

// Création des bras de la croix
const armOptions = {
    render: {
        fillStyle: 'green' // Choisissez la couleur souhaitée
    }
};

const arm1 = Bodies.rectangle(400, 400, 20, 80, armOptions);
const arm2 = Bodies.rectangle(400, 400, 80, 20, armOptions);

// Ajout des bras à la croix
crossBodies.push(arm1, arm2);

// Ajout des bras au monde
World.add(engine.world, crossBodies);

// Création de la contrainte pour permettre la rotation de la croix
const constraintOptions = {
    pointA: { x: 400, y: 400 },
    bodyB: arm2,
    length: 0
};

const constraint = Constraint.create(constraintOptions);
World.add(engine.world, constraint);

// Démarrage du moteur
Matter.Runner.run(engine)

// Démarrage du rendu
Render.run(render);
