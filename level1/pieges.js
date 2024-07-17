import { Bodies, Body , Events, World } from "matter-js";

const body = document.querySelector("body");
const sonJoueurPiege = new Audio('/sonJoueurPiege.mp4')
export function creerPiegeTriangles(world){
  const angleInitial = -Math.PI / 6;
  const trianglePieges = Bodies.polygon(400, 785, 3, 30,{
    angle: angleInitial,
    label: "piège",
    render:{
      fillStyle: "red",
      strokeStyle: '#000000',
      lineWidth: 4
    },
    isStatic: true,
  });
  World.add(world, trianglePieges);
  Body.setAngle(trianglePieges, angleInitial);

  return trianglePieges;
}


export function collisionPiegesJoueur(engine, world, player){
  Events.on(engine, "collisionStart", (event) =>{
    event.pairs.forEach((collision) =>{
      if ((collision.bodyA.label === "player" && collision.bodyB.label === 'piège')) {
        sonJoueurPiege.play()
        Body.setPosition(player, {x:100, y:750})
      }
    });
  });
}

