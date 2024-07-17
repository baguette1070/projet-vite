import { Body } from "matter-js";

let interval = null;
let isGrounded = false;
const sautJoueurSon = new Audio('/sautJoueurSon.mp4')

export function mouvementGaucheDroite(player) {
  window.addEventListener('keydown', (event) => {
    if (interval) return;
    if (event.code === "ArrowRight") {
      interval = setInterval(() => {
        Body.translate(player, { 
          x: 6,
          y: 0 
        });
      }, 10);
    } else if (event.code === "ArrowLeft") {
      interval = setInterval(() => {
        Body.translate(player, { 
          x: -6, 
          y: 0 
        });
      }, 10);
    }
  });

  window.addEventListener('keyup', (event) => {
    if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
      clearInterval(interval);
      interval = null;
    }
  });
}

export function sautJoueur(player) {
  window.addEventListener('keydown', (event) => {
    if (event.code === "Space" && isGrounded) {
      Body.applyForce(player,player.position, { x: 0, y: -0.10 });
      isGrounded = false;
      sautJoueurSon.play()
    }
  });
}

export function setOnGround(value) {
  isGrounded = value;
}