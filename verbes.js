// Sélectionne l'élément principal du document HTML
const main = document.querySelector('main');

// Déclare un tableau d'objets contenant les verbes en arabe et leur traduction en français
const verbes = [
  { arabe: 'ساعَدَ', francais: ['aider', 'aider '] },
  { arabe: 'كَتَبَ', francais: ['écrire', 'ecrire', 'écrire ', 'ecrire '] },
  { arabe: 'قَرَأَ', francais: ['lire', 'lire '] },
  { arabe: 'ذَهَبَ', francais: ['aller', 'aller '] },
  { arabe: 'جَاءَ', francais: ['venir', 'venir '] },
  { arabe: 'أَكَلَ', francais: ['manger', 'manger '] },
  { arabe: 'شَرِبَ', francais: ['boire', 'boire '] },
  { arabe: 'نَامَ', francais: ['dormir', 'dormir '] },
  { arabe: 'جَلَسَ', francais: ['s asseoir', 's assoir', 's\'asseoir ', 's\'assoir '] },
  { arabe: 'وَقَفَ', francais: ['se lever', 'se lever '] },
  { arabe: 'دَرَسَ', francais: ['étudier', 'etudier', 'étudier ', 'etudier '] },
  { arabe: 'رَكَضَ', francais: ['courir', 'courir '] },
  { arabe: 'قَفَزَ', francais: ['sauter', 'sauter '] },
  { arabe: 'سَبَحَ', francais: ['nager', 'nager '] },
  { arabe: 'طَبَخَ', francais: ['cuisiner', 'cuisiner '] },
  { arabe: 'رَسَمَ', francais: ['dessiner', 'dessiner '] }
];


// Fonction pour sélectionner 6 verbes aléatoires sans répétition
function verbesAleatoires() {
  const indices = new Set();
  while (indices.size < 6) {
    const randomIndex = Math.floor(Math.random() * verbes.length);
    indices.add(randomIndex);
  }
  return Array.from(indices).map(index => verbes[index]);
}

// Sélectionne 6 verbes aléatoires
let verbesSelectionnes = verbesAleatoires();

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
    // Affiche les 6 verbes sur l'écran
    afficherVerbes();
  });
}

// Fonction pour afficher les verbes sélectionnés sur l'écran
function afficherVerbes() {
  for (let i = 0; i < 6; i++) {
    const verbe = verbesSelectionnes[i];
    document.getElementById(`motArabe${i + 1}`).textContent = `${verbe.arabe} : `;
    const reponseJoueur = document.getElementById(`reponseJoueur${i + 1}`);
    reponseJoueur.value = ''; // Réinitialise le champ de réponse
    reponseJoueur.style.visibility = 'visible';
    reponseJoueur.style.color = 'black'; // Réinitialise la couleur du texte
    reponseJoueur.disabled = false; // Active le champ de réponse
  }
}

// Fonction pour supprimer la synthèse des verbes lors du clic sur le bouton de démarrage
function supprimerSyntheseVerbes() {
  const monBoutonDemarrer = document.getElementById("boutonDemarrer");
  monBoutonDemarrer.addEventListener('click', function () {
    const syntheseVerbes = document.getElementById('syntheseVerbes');
    if (syntheseVerbes) syntheseVerbes.remove();
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

// Fonction pour vérifier les réponses sans bouton
function checkReponseSansBouton() {
  const count = document.getElementById('countPoint');
  let point = 0;
  const reponsesFinalsJoueur = document.querySelectorAll('input[type="text"]');

  for (let i = 0; i < verbesSelectionnes.length; i++) {
    const reponsesPossibles = verbesSelectionnes[i].francais.map(r => r.toLowerCase());
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

// Fonction pour vérifier les réponses avec bouton
function checkReponse() {
  const boutonConfirmer = document.getElementById('boutonConfirmer');
  const count = document.getElementById('countPoint');
  let point = 0;

  boutonConfirmer.addEventListener('click', function () {
    const reponsesFinalsJoueur = document.querySelectorAll('input[type="text"]');

    for (let i = 0; i < verbesSelectionnes.length; i++) {
      const reponsesPossibles = verbesSelectionnes[i].francais.map(r => r.toLowerCase());
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
    point = 0;
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
    verbesSelectionnes = verbesAleatoires();
    afficherVerbes();
    document.getElementById('countPoint').textContent = ''; // Réinitialise le score affiché
    timerSpan.textContent = '20 ; 00';
    clearInterval(intervalId); // Arrête le chronomètre actuel s'il est en cours
    chronometre(); // Redémarre le chronomètre
  });
}

// Appelle les fonctions pour mettre en place le quiz et les actions de suppression
afficherQuizDansBox();
supprimerSyntheseVerbes();
messageSupprimerLancementChronometre();
checkReponse();
restart();