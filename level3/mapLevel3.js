import { World, Bodies, Events, Body } from "matter-js";
import { mouvementGaucheDroite, sautJoueur, setOnGround } from '../level1/playerMouvement.js';
import { collisionPiegesJoueur, creerPiegeTriangles } from "../level1/pieges";

export function initializeLevel3(engine, render, world, player) {  // Ajout du paramètre 'player'
    
  //
  Body.setPosition(player, {x:100, y:600})
  // Utiliser le joueur existant plutôt que d'en créer un nouveau
  const ground = Bodies.rectangle(500, 825, 1000, 50, {
    label: 'ground',
    render: {
      fillStyle: "#33b560",
      wireframes: false
    },
    isStatic: true
  });

  const leftWall = Bodies.rectangle(0, 375, 50, 850, {
    label: 'leftWall',
    render: {
      fillStyle: "#58b6e8"
    },
    isStatic: true
  });
  const rightWall = Bodies.rectangle(1000, 375, 50, 850, {
    label: 'rightWall',
    render: {
      fillStyle: "#58b6e8"
    },
    isStatic: true
  });




  render.options.background = '#58b6e8';  // Changer la couleur d'arrière-plan pour le niveau 2
  World.add(world, [ground, player, rightWall, leftWall]);  // Ajouter le joueur existant au monde

  mouvementGaucheDroite(player);  // Utiliser le joueur existant pour le mouvement gauche/droite
  sautJoueur(player);  // Utiliser le joueur existant pour le saut
  creerPiegeTriangles(world);  // Ajouter les pièges
  collisionPiegesJoueur(engine, world, player);  // Configurer les collisions entre le joueur et les pièges
  

  Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach((collision) => {
      if ((collision.bodyA.label === 'player' && collision.bodyB.label === 'ground' || collision.bodyB.label === 'plateforme') ||
          (collision.bodyA.label === 'ground' && collision.bodyB.label === 'player')) {
        setOnGround(true);  // Détecter quand le joueur touche le sol
      }
    });
  });

  Events.on(engine, "collisionEnd", (event) => {
    event.pairs.forEach((collision) => {
      if ((collision.bodyA.label === 'player' && collision.bodyB.label === 'ground') ||
          (collision.bodyA.label === 'ground' && collision.bodyB.label === 'player')) {
        setOnGround(false);  // Détecter quand le joueur quitte le sol
      }
    });
  });
}
