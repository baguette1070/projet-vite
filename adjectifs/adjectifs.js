// Sélectionne l'élément principal du document HTML
const main = document.querySelector('main');

// Déclare un tableau d'objets contenant les adjectifs en arabe et leur traduction en français
const adjectifs = [
    { arabe: 'كَبِير', francais: ['grand', 'grand '] },
    { arabe: 'صَغِير', francais: ['petit', 'petit '] },
    { arabe: 'طَوِيل', francais: ['long', 'long '] },
    { arabe: 'قَصِير', francais: ['court', 'court '] },
    { arabe: 'سَرِيع', francais: ['rapide', 'rapide '] },
    { arabe: 'بَطِيء', francais: ['lent', 'lent '] },
    { arabe: 'جَمِيل', francais: ['beau', 'beau '] },
    { arabe: 'قَبِيح', francais: ['laid', 'laid '] },
    { arabe: 'سَعِيد', francais: ['heureux', 'heureux '] },
    { arabe: 'حَزِين', francais: ['triste', 'triste '] },
    { arabe: 'قَوِي', francais: ['fort', 'fort '] },
    { arabe: 'ضَعِيف', francais: ['faible', 'faible '] },
    { arabe: 'ذَكِي', francais: ['intelligent', 'intelligent '] },
    { arabe: 'غَبِي', francais: ['stupide', 'stupide '] },
    { arabe: 'نَظِيف', francais: ['propre', 'propre '] },
    { arabe: 'وَسِخ', francais: ['sale', 'sale '] },
    { arabe: 'حَار', francais: ['chaud', 'chaud '] },
    { arabe: 'بَارِد', francais: ['froid', 'froid '] },
    { arabe: 'غَنِي', francais: ['riche', 'riche '] },
    { arabe: 'فَقِير', francais: ['pauvre', 'pauvre '] }
  ];
  

// Fonction pour sélectionner 6 adjectifs aléatoires sans répétition
function adjectifsAleatoires() {
  const indices = new Set();
  while (indices.size < 6) {
    const randomIndex = Math.floor(Math.random() * adjectifs.length);
    indices.add(randomIndex);
  }
  return Array.from(indices).map(index => adjectifs[index]);
}

// Sélectionne 6 adjectifs aléatoires
let adjectifsSelectionnes = adjectifsAleatoires();

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
    // Affiche les 6 adjectifs sur l'écran
    afficherAdjectifs();
  });
}

// Fonction pour afficher les adjectifs sélectionnés sur l'écran
function afficherAdjectifs() {
  for (let i = 0; i < 6; i++) {
    const adjectif = adjectifsSelectionnes[i];
    document.getElementById(`motArabe${i + 1}`).textContent = `${adjectif.arabe} : `;
    const reponseJoueur = document.getElementById(`reponseJoueur${i + 1}`);
    reponseJoueur.value = ''; // Réinitialise le champ de réponse
    reponseJoueur.style.visibility = 'visible';
    reponseJoueur.style.color = 'black'; // Réinitialise la couleur du texte
    reponseJoueur.disabled = false; // Active le champ de réponse
  }
}

// Fonction pour supprimer la synthèse des adjectifs lors du clic sur le bouton de démarrage
function supprimerSyntheseAdjectifs() {
  const monBoutonDemarrer = document.getElementById("boutonDemarrer");
  monBoutonDemarrer.addEventListener('click', function () {
    const syntheseAdjectifs = document.getElementById('syntheseAdjectifs');
    if (syntheseAdjectifs) syntheseAdjectifs.remove();
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

  for (let i = 0; i < adjectifsSelectionnes.length; i++) {
    const reponsesPossibles = adjectifsSelectionnes[i].francais.map(r => r.toLowerCase());
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

    for (let i = 0; i < adjectifsSelectionnes.length; i++) {
      const reponsesPossibles = adjectifsSelectionnes[i].francais.map(r => r.toLowerCase());
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
    adjectifsSelectionnes = adjectifsAleatoires();
    afficherAdjectifs();
    document.getElementById('countPoint').textContent = ''; // Réinitialise le score affiché
    timerSpan.textContent = '20 ; 00';
    clearInterval(intervalId); // Arrête le chronomètre actuel s'il est en cours
    chronometre(); // Redémarre le chronomètre
  });
}

// Appelle les fonctions pour mettre en place le quiz et les actions de suppression
afficherQuizDansBox();
supprimerSyntheseAdjectifs();
messageSupprimerLancementChronometre();
checkReponse();
restart();
