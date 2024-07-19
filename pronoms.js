const main = document.querySelector('main');

const pronoms = [
  { arabe: 'انا', francais: 'Je'},
  { arabe: 'أنتَ', francais: 'Tu (Masculin)'},
  { arabe: 'أَنتِ', francais: 'Tu (féminin)'},
  { arabe: 'هُوَ', francais: 'Il'},
  { arabe: 'هِيَ', francais: 'Elle'},
  { arabe: 'نَحْنُ', francais: 'Nous'},
  { arabe: 'أَنْتُم', francais: 'Vous (Masculin)'},
  { arabe: 'أَنْتُنَّ', francais: 'Vous (Féminin)'},
  { arabe: 'هُم', francais: 'Ils'},
  { arabe: 'هُنَّ', francais: 'Elles'},
  { arabe: 'هُما', francais: 'Ils/Elles (Deux)'}
];

// afficher un pronom personnels différent
function pronomsPersonnels(){
  const indices = new Set();
  while (indices.size < 6) {
    const randomIndex = Math.floor(Math.random() * pronoms.length);
    indices.add(randomIndex);
  }
  return Array.from(indices).map(index => pronoms[index]);
}

 // Sélectionne 6 pronoms aléatoires
const pronomsSelectionnes = pronomsPersonnels();

// Fonction pour afficher le quiz dans la boîte correspondante
function afficherQuizDansBox(){
  const titreQuiz = document.getElementById("titreQuiz");
  const monBoutonDemarrer = document.getElementById("boutonDemarrer");

  monBoutonDemarrer.addEventListener("click", function(){
    titreQuiz.textContent = 'Pronoms'; // Change le titre
    monBoutonDemarrer.remove(); // Enlève le bouton

    // affiche les 6 prénoms sur l'écran
    for (let i = 0; i < 6; i++) {
      const pronom = pronomsSelectionnes[i];
      document.getElementById(`motArabe${i + 1}`).textContent = `${pronom.arabe} : `;
      const reponseJoueur = document.getElementById(`reponseJoueur${i + 1}`);
      reponseJoueur.style.visibility = 'visible';
    }
  });
}

function supprimerSynthesePronoms(){
  const monBoutonDemarrer = document.getElementById("boutonDemarrer");
  monBoutonDemarrer.addEventListener('click', function(){
    const synthesePronoms = document.getElementById('synthesePronoms');
    synthesePronoms.remove()
  })
}

function messageSupprimer(){
  const monBoutonDemarrer = document.getElementById("boutonDemarrer");
  monBoutonDemarrer.addEventListener('click', function(){
    const texteAsupprimer = document.getElementById('texteAsupprimer');
    texteAsupprimer.remove()
  })
}

function checkReponse(){

  
  const pronomEnFrancais = pronomsSelectionnes.forEach(pronom => console.log(pronom.francais))
  for (let i = 0; i < 6; i++){
    const reponseJoueur = document.getElementById(`reponseJoueur${i + 1}`);
      if(reponseJoueur.value === pronomEnFrancais){
        console.log("dk")
      }
  }

}

afficherQuizDansBox();
supprimerSynthesePronoms();
messageSupprimer();
checkReponse();