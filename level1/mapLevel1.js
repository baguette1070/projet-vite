import { Engine, Runner, World, Render, Bodies, Events } from "matter-js";
import { mouvementGaucheDroite, sautJoueur, setOnGround } from './playerMouvement.js';
import { collisionPiegesJoueur, creerPiegeTriangles } from "./pieges.js";
import { creerPorte } from "./porte.js";

export const engine = Engine.create();
export const render = Render.create({
  engine,
  element: document.body,
  options: {
    background: "#edd593",
    width: 1000,
    height: 850,
    wireframes: false,
  },
});
export const world = engine.world;
engine.gravity.y = 2;

const player = Bodies.rectangle(100, 775, 50, 50, {
  label: 'player',
  render: {
    fillStyle: "#494e7a",
    wireframes: false,
  },
});

export function generateMap(){


  const leftWall = Bodies.rectangle(0, 375, 50, 850, {
    label: 'leftWall',
    render: {
      fillStyle: "#edd593"
    },
    isStatic: true
  });
  const rightWall = Bodies.rectangle(1000, 375, 50, 850, {
    label: 'rightWall',
    render: {
      fillStyle: "#edd593"
    },
    isStatic: true
  });
  const ground = Bodies.rectangle(500, 825, 1000, 50, {
    label: 'ground',
    render: {
      fillStyle: "#9c8e28",
      wireframes: false
    },
    isStatic: true
  });

  World.add(world, [ground, player, leftWall, rightWall]);
  
  Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach((collision) => {
      if ((collision.bodyA.label === 'player' && collision.bodyB.label === 'ground') ||
          (collision.bodyA.label === 'ground' && collision.bodyB.label === 'player')) {
        setOnGround(true);
      }
    });
  });

  Events.on(engine, "collisionEnd", (event) => {
    event.pairs.forEach((collision) => {
      if ((collision.bodyA.label === 'player' && collision.bodyB.label === 'ground') ||
          (collision.bodyA.label === 'ground' && collision.bodyB.label === 'player')) {
        setOnGround(false);
      }
    });
  });

  mouvementGaucheDroite(player);
  sautJoueur(player);

  return { player, ground, leftWall, rightWall };
}

creerPiegeTriangles(world);
collisionPiegesJoueur(engine, world, player);
creerPorte(world, engine, player, render); // Pass render to creerPorte

const runner = Runner.create();
generateMap();
Render.run(render);
Runner.run(runner, engine);