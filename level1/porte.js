import { Bodies, Events, World } from "matter-js";

const collisionJoueurPorteSon = new Audio('/sonJoueurPorte.mp4');

export function creerPorte(world, engine, player, render) {  // Ajout du paramètre 'player'
  const porte = Bodies.rectangle(900, 764, 20, 20, {
    render: {
      fillStyle: "#86b893",
      sprite: {
        texture: '/porteMatter.png',
        xScale: 0.1,
        yScale: 0.1
      }
    },
    isStatic: true,
    label: "porte"
  });
  World.add(world, porte);

  Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach((collision) => {
      if (collision.bodyA.label === "player" && collision.bodyB.label === "porte") {
        World.remove(world, player);  // Supprimer le joueur du monde
        collisionJoueurPorteSon.play();
        World.clear(world);
        render.options.background = '#4bd6c6';

        // Utiliser le bon chemin vers le fichier mapLevel2.js et passer le joueur existant
        import('../level2/mapLevel2.js').then(({ initializeLevel2 }) => {
          initializeLevel2(engine, render, world, player);  // Passer le joueur existant
        });
      }
    });
  });
}
