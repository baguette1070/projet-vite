// Sélectionne l'élément principal du document HTML
const main = document.querySelector('main');

// Déclare un tableau d'objets contenant les pronoms en arabe et leur traduction en français
const pronoms = [
  { arabe: 'انا', francais: ['je', 'je '] },
  { arabe: 'أنتَ', francais: ['tu (masculin)', 'tu (masculin) ', 'tu masculin', 'tu masculin ', 'tu m', 'tu m '] },
  { arabe: 'أَنتِ', francais: ['tu (féminin)', 'tu (féminin) ', 'tu féminin', 'tu féminin ', 'tu f', 'tu f ', 'tu (feminin)', 'tu (feminin) ', 'tu feminin', 'tu feminin ']},
  { arabe: 'هُوَ', francais:  ['il', 'il '] },
  { arabe: 'هِيَ', francais:  ['elle', 'elle '] },
  { arabe: 'نَحْنُ', francais: ['nous', 'nous '] },
  { arabe: 'أَنْتُم', francais: ['vous (masculin)', 'vous (masculin) ', 'vous masculin', 'vous masculin ', 'vous m', 'vous m '] },
  { arabe: 'أَنْتُنَّ', francais: ['vous (féminin)', 'vous (féminin) ', 'vous féminin', 'vous féminin ', 'vous f', 'vous f ', 'vous (feminin)', 'vous (feminin) ', 'vous feminin', 'vous feminin '] },
  { arabe: 'هُم', francais: ['ils', 'ils '] },
  { arabe: 'هُنَّ', francais: ['elles', 'elles '] },
  { arabe: 'هُما', francais: ['ils/elles (duel)', 'ils/elles (duel) ', 'ils elles (duel)', 'ils elles duel', 'ils/elles duel'] }
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
let pronomsSelectionnes = pronomsPersonnels();

// Fonction pour afficher le quiz dans la boîte correspondante
function afficherQuizDansBox() {
  const monBoutonDemarrer = document.getElementById("boutonDemarrer");
  const boutonConfirmer = document.getElementById('boutonConfirmer');
  const boutonRestart = document.getElementById('boutonRestart');
  const timerSpan = document.getElementById('timerSpan');

  monBoutonDemarrer.addEventListener("click", function () {
    monBoutonDemarrer.remove(); // Enlève le bouton
    boutonConfirmer.style.visibility = 'visible';
    boutonRestart.style.visibility = 'visible';
    timerSpan.style.visibility = 'visible';
    // Affiche les 6 pronoms sur l'écran
    afficherPronoms();
  });
}

// Fonction pour afficher les pronoms sélectionnés sur l'écran
function afficherPronoms() {
  for (let i = 0; i < 6; i++) {
    const pronom = pronomsSelectionnes[i];
    document.getElementById(`motArabe${i + 1}`).textContent = `${pronom.arabe} : `;
    const reponseJoueur = document.getElementById(`reponseJoueur${i + 1}`);
    reponseJoueur.value = ''; // Réinitialise le champ de réponse
    reponseJoueur.style.visibility = 'visible';
    reponseJoueur.style.color = 'black'; // Réinitialise la couleur du texte
    reponseJoueur.disabled = false; // Active le champ de réponse
  }
}

// Fonction pour supprimer la synthèse des pronoms lors du clic sur le bouton de démarrage
function supprimerSynthesePronoms() {
  const monBoutonDemarrer = document.getElementById("boutonDemarrer");
  monBoutonDemarrer.addEventListener('click', function () {
    const synthesePronoms = document.getElementById('synthesePronoms');
    if (synthesePronoms) synthesePronoms.remove();
  });
}

// Fonction pour supprimer un texte spécifique lors du clic sur le bouton de démarrage
function messageSupprimerLancementChronometre() {
  const monBoutonDemarrer = document.getElementById("boutonDemarrer");
  monBoutonDemarrer.addEventListener('click', function () {
    const texteAsupprimer = document.getElementById('texteAsupprimer');
    if (texteAsupprimer) texteAsupprimer.remove();
    chronometre();
  });
}

function checkReponseSansBouton() {
  const count = document.getElementById('countPoint');
  let point = 0;
  const reponsesFinalsJoueur = document.querySelectorAll('input[type="text"]');
  
  for (let i = 0; i < pronomsSelectionnes.length; i++) {
    const reponsesPossibles = pronomsSelectionnes[i].francais.map(r => r.toLowerCase());
    const reponseJoueur = reponsesFinalsJoueur[i].value.trim().toLowerCase();
    
    if (reponsesPossibles.includes(reponseJoueur)) {
      reponsesFinalsJoueur[i].style.color = 'green';
      point++;
    } else {
      reponsesFinalsJoueur[i].style.color = 'red';
      reponsesFinalsJoueur[i].value = `${reponsesFinalsJoueur[i].value} => ${reponsesPossibles[0]}`;
    }
  }
  count.textContent = `Score : ${point} / ${reponsesFinalsJoueur.length}`;
  clearInterval(intervalId); // Arrête le chronomètre lorsque les réponses sont vérifiées
  reponsesFinalsJoueur.forEach(reponse => reponse.disabled = true);
}

function checkReponse() {
  const boutonConfirmer = document.getElementById('boutonConfirmer');
  const count = document.getElementById('countPoint');
  let point = 0;

  boutonConfirmer.addEventListener('click', function () {
    const reponsesFinalsJoueur = document.querySelectorAll('input[type="text"]');
    
    for (let i = 0; i < pronomsSelectionnes.length; i++) {
      const reponsesPossibles = pronomsSelectionnes[i].francais.map(r => r.toLowerCase());
      const reponseJoueur = reponsesFinalsJoueur[i].value.trim().toLowerCase();
      
      if (reponsesPossibles.includes(reponseJoueur)) {
        reponsesFinalsJoueur[i].style.color = 'green';
        point++;
      } else {
        reponsesFinalsJoueur[i].style.color = 'red';
        reponsesFinalsJoueur[i].value = `${reponsesFinalsJoueur[i].value} => ${reponsesPossibles[0]}`;
      }
    }
    count.textContent = `Score : ${point} / ${reponsesFinalsJoueur.length}`;
    point = 0
    clearInterval(intervalId); // Arrête le chronomètre lorsque les réponses sont vérifiées
    reponsesFinalsJoueur.forEach(reponse => reponse.disabled = true);
    
  });
}

let intervalId;

function chronometre() {
  const timer = document.getElementById('timerSpan');
  const reponsesFinalsJoueur = document.querySelectorAll('input[type="text"]');
  
  let tempsRestant = 20;

  intervalId = setInterval(() => {
    if (tempsRestant >= 0) {
      timer.innerHTML = `${tempsRestant} ; 00`;
      tempsRestant -= 1;
    } else {
      reponsesFinalsJoueur.forEach(reponse => reponse.disabled = true);
      clearInterval(intervalId);
      checkReponseSansBouton();
    }
  }, 1000);
}

function restart() {
  const boutonRestart = document.getElementById('boutonRestart');
  const timerSpan = document.getElementById('timerSpan');

  boutonRestart.addEventListener('click', function () {
    pronomsSelectionnes = pronomsPersonnels();
    afficherPronoms();
    document.getElementById('countPoint').textContent = ''; // Réinitialise le score affiché
    timerSpan.textContent = '20 ; 00'
    clearInterval(intervalId); // Arrête le chronomètre actuel s'il est en cours
    chronometre(); // Redémarre le chronomètre
  });
}

// Appelle les fonctions pour mettre en place le quiz et les actions de suppression
afficherQuizDansBox();
supprimerSynthesePronoms();
messageSupprimerLancementChronometre();
checkReponse();
restart();

