import { World, Bodies, Events, Body } from "matter-js";
import { mouvementGaucheDroite, sautJoueur, setOnGround } from '../level1/playerMouvement.js';
import { collisionPiegesJoueur, creerPiegeTriangles } from "../level1/pieges";

export function initializeLevel2(engine, render, world, player) {  // Ajout du paramètre 'player'
    
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

  const plateforme1 = Bodies.rectangle(750, 750, 150, 40, {
    label: 'plateforme',
    render: {
      fillStyle: "#33b560"
    },
    isStatic: true
  });
  const plateforme2 = Bodies.rectangle(550, 650, 100, 40, {
    label: 'plateforme',
    render: {
      fillStyle: "#33b560"
    },
    isStatic: true
  });
  const plateforme3 = Bodies.rectangle(275, 550, 100, 40, {
    label: 'plateforme',
    render: {
      fillStyle: "#33b560"
    },
    isStatic: true
  });
  const plateforme4 = Bodies.rectangle(550, 450, 100, 40, {
    label: 'plateforme',
    render: {
      fillStyle: "#33b560"
    },
    isStatic: true
  });

  const porte = Bodies.rectangle(950, 320, 1, 1,{
    label: 'porte2',
    render:{
      sprite:{
        texture: `porteMatter.png`,
        xScale: 0.1,
        yScale: 0.1
      },
    },isStatic : true
  })

  const plateformeAvecPorte = Bodies.rectangle(1000, 375, 600, 40, {
    label: 'plateformePorte',
    render: {
      fillStyle: "#33b560",
    },
    isStatic: true,
  });
  


  render.options.background = '#58b6e8';  // Changer la couleur d'arrière-plan pour le niveau 2
  World.add(world, [ground, player, rightWall, leftWall, plateformeAvecPorte, plateforme1, plateforme2, plateforme3, plateforme4, porte]);  // Ajouter le joueur existant au monde

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
      if ((collision.bodyA.label === 'player' && collision.bodyB.label === 'ground')) {
        setOnGround(false);  // Détecter quand le joueur quitte le sol
      }
    });
  });

  Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach((collision) => {
      if ((collision.bodyA.label === 'player' && collision.bodyB.label === 'porte')) {
        World.remove(world, player)
        import('../level3/mapLevel3.js').then(({ initializeLevel3 }) => {
          initializeLevel3(engine, render, world, player);  // Passer le joueur existant
        });
      }
    });
  });

}
