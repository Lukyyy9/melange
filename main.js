// Création d'un moteur Matter.js
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

const engine = Engine.create();

// Création d'un rendu
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

// Démarrage du moteur
Engine.run(engine);

// Démarrage du rendu
Render.run(render);
