// Sélectionne l'élément principal du document HTML
const main = document.querySelector('main');

// Déclare un tableau d'objets contenant les pronoms en arabe et leur traduction en français
const pronoms = [
  { arabe: 'انا', francais: 'Je' },
  { arabe: 'أنتَ', francais: 'Tu (Masculin)' },
  { arabe: 'أَنتِ', francais: 'Tu (féminin)' },
  { arabe: 'هُوَ', francais: 'Il' },
  { arabe: 'هِيَ', francais: 'Elle' },
  { arabe: 'نَحْنُ', francais: 'Nous' },
  { arabe: 'أَنْتُم', francais: 'Vous (Masculin)' },
  { arabe: 'أَنْتُنَّ', francais: 'Vous (Féminin)' },
  { arabe: 'هُم', francais: 'Ils' },
  { arabe: 'هُنَّ', francais: 'Elles' },
  { arabe: 'هُما', francais: 'Ils/Elles (Deux)' }
];

// Fonction pour sélectionner 6 pronoms aléatoires sans répétition
function pronomsPersonnels() {
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
function afficherQuizDansBox() {
  const titreQuiz = document.getElementById("titreQuiz");
  const monBoutonDemarrer = document.getElementById("boutonDemarrer");
  const boutonConfirmer = document.getElementById('boutonConfirmer');
  const timerSpan = document.getElementById('timerSpan');
  
  monBoutonDemarrer.addEventListener("click", function () {
    titreQuiz.textContent = 'Pronoms'; // Change le titre
    monBoutonDemarrer.remove(); // Enlève le bouton
    boutonConfirmer.style.visibility = 'visible';
    timerSpan.style.visibility = 'visible'
    // Affiche les 6 pronoms sur l'écran
    for (let i = 0; i < 6; i++) {
      const pronom = pronomsSelectionnes[i];
      document.getElementById(`motArabe${i + 1}`).textContent = `${pronom.arabe} : `;
      const reponseJoueur = document.getElementById(`reponseJoueur${i + 1}`);
      reponseJoueur.style.visibility = 'visible';
    }
  });


}

// Fonction pour supprimer la synthèse des pronoms lors du clic sur le bouton de démarrage
function supprimerSynthesePronoms() {
  const monBoutonDemarrer = document.getElementById("boutonDemarrer");
  monBoutonDemarrer.addEventListener('click', function () {
    const synthesePronoms = document.getElementById('synthesePronoms');
    synthesePronoms.remove();
  });
}

// Fonction pour supprimer un texte spécifique lors du clic sur le bouton de démarrage
function messageSupprimer() {
  const monBoutonDemarrer = document.getElementById("boutonDemarrer");
  monBoutonDemarrer.addEventListener('click', function () {
    const texteAsupprimer = document.getElementById('texteAsupprimer');
    texteAsupprimer.remove();
  });
}

// Fonction pour vérifier les réponses des joueurs
function checkReponse() {
  for (let i = 0; i < 6; i++) {
    const reponseJoueur = document.getElementById(`reponseJoueur${i + 1}`);
  }
  // Affiche toutes les valeurs de la propriété francais des objets sélectionnés
  pronomsSelectionnes.forEach(pronom => console.log(pronom.francais));
}

function chronometre(){

  const timer = document.getElementById('timerSpan');
  let tempsInitial = 20;
  let tempsFinal = 0;
  while(tempsInitial > tempsFinal){
    tempsFinal -= 1;
  }
  timer.textContent = tempsInitial;

}

setInterval(() => {
  chronometre()
}, 1000);

// Appelle les fonctions pour mettre en place le quiz et les actions de suppression
afficherQuizDansBox();
supprimerSynthesePronoms();
messageSupprimer();
checkReponse();
