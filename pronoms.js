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
  { arabe: 'هُما', francais: 'Ils/Elles (Duel)' }
];

const reponsesPossibles = [
  {انا : 'Je'},
  {أنتَ : ['Tu (Masculin)', 'Tu Masculin']},
  {أَنتِ : ['Tu (Féminin)', 'Tu Féminin']},
  {هُوَ : 'Vous'},
  {هِيَ : 'Elle'},
  {نَحْنُ : 'Nous'},
  {أَنْتُم : ['Vous (Masculin)', 'Vous Masculin']},
  {أَنْتُنَّ : ['Vous (Féminin)', 'Vous Féminin']},
  {هُم : ['Ils']},
  {هُنَّ : ['Elles']},
  {هُما : ['Ils/Elles (Duel)', 'Ils Elles (Duel)', 'Ils Elles Duel']}
]

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
function messageSupprimerLancementChronometre() {
  const monBoutonDemarrer = document.getElementById("boutonDemarrer");
  monBoutonDemarrer.addEventListener('click', function () {
    const texteAsupprimer = document.getElementById('texteAsupprimer');
    texteAsupprimer.remove();
    chronometre();
  });
}

// Fonction pour vérifier les réponses des joueurs
function checkReponse() {

  let reponseJoueur = null;
  for (let i = 0; i < 6; i++) {
    reponseJoueur = document.getElementById(`reponseJoueur${i + 1}`);
    
  }
  for (let j = 0; j < reponsesPossibles.length; j++){
    console.log(reponsesPossibles[j])
  }

  // Affiche toutes les valeurs de la propriété francais des objets sélectionnés
  pronomsSelectionnes.forEach(pronom => console.log(pronom.francais));

}

function chronometre(){

  const timer = document.getElementById('timerSpan');
  const reponsesFinalsJoueur = document.querySelectorAll('input');
  
  let tempsRestant = 20;

  const intervalId = setInterval(() => {

    if(tempsRestant >= 0){
      timer.innerHTML = `${tempsRestant} ; 00`;
      tempsRestant -= 10;
    } else{
      reponsesFinalsJoueur.forEach(reponse => reponse.disabled = 'true')
      clearInterval(intervalId)
    }
  }, 1000);

  }


// Appelle les fonctions pour mettre en place le quiz et les actions de suppression
afficherQuizDansBox();
supprimerSynthesePronoms();
messageSupprimerLancementChronometre();
checkReponse();
