// Sélectionne l'élément principal du document HTML
const main = document.querySelector('main');

// Déclare un tableau d'objets contenant les adverbes en arabe et leur traduction en français
const adverbes = [
  { arabe: 'أَمامَ', francais: ['à l\'avance', 'à l avance', 'a l avance', 'a l\'avance'] },
  { arabe: 'خَلْفَ', francais: ['derrière', 'derriere'] },
  { arabe: 'تَحْتَ', francais: ['ci-dessous', 'ci dessous'] },
  { arabe: 'فَوْقَ', francais: ['ci-dessus', 'ci dessus'] },
  { arabe: 'مَعَ', francais: ['avec'] },
  { arabe: 'عِنْدَ', francais: ['à', 'a'] },
  { arabe: 'وَسَطَ', francais: ['au milieu de', 'au milieu'] },
  { arabe: 'عَبْرَ', francais: ['à travers', 'a travers'] },
  { arabe: 'بَيْنَ', francais: ['entre'] },
  { arabe: 'حَوْلَ', francais: ['autour de', 'autour'] },
  { arabe: 'لَدَى', francais: ['à', 'à '] },
  { arabe: 'لَدُنْ', francais: ['de'] },
  { arabe: 'حَيْثُ', francais: ['où'] },
  { arabe: 'أَيْنَ', francais: ['où'] },
  { arabe: 'هُنا', francais: ['ici'] },
  { arabe: 'هُناك', francais: ['là-bas'] },
  { arabe: 'ثُمَّ', francais: ['puis'] },
  { arabe: 'قَبْلَ', francais: ['avant'] },
  { arabe: 'بَعْدَ', francais: ['après'] },
  { arabe: 'بَيْنَما', francais: ['alors que'] },
  { arabe: 'خِلالَ', francais: ['pendant'] },
  { arabe: 'مُنْذُ', francais: ['depuis'] },
  { arabe: 'عِنْدَما', francais: ['lorsque'] },
  { arabe: 'إِلى أنْ', francais: ['jusqu\'à ce que'] },
  { arabe: 'مَتى', francais: ['quand'] },
  { arabe: 'طالَما', francais: ['tant que'] },
  { arabe: 'إِذْ', francais: ['quand'] },
  { arabe: 'إِذًا', francais: ['alors'] },
  { arabe: 'إِذَنْ', francais: ['alors'] },
  { arabe: 'الآن', francais: ['maintenant'] },
  { arabe: 'اليَوْم', francais: ['aujourd\'hui', 'aujourdhui', 'aujourd hui'] }
];

// Fonction pour sélectionner 6 adverbes aléatoires sans répétition
function adverbesAleatoires() {
  const indices = new Set();
  while (indices.size < 6) {
    const randomIndex = Math.floor(Math.random() * adverbes.length);
    indices.add(randomIndex);
  }
  return Array.from(indices).map(index => adverbes[index]);
}

// Sélectionne 6 adverbes aléatoires
let adverbesSelectionnes = adverbesAleatoires();

// Fonction pour afficher le quiz dans la boîte correspondante
function afficherQuizDansBox() {
  const monBoutonDemarrer = document.getElementById("boutonDemarrer");
  const boutonConfirmer = document.getElementById('boutonConfirmer');
  const boutonRestart = document.getElementById('boutonRestart');
  const timerSpan = document.getElementById('timerSpan');
  const synthesesAsupprimer = document.getElementById('synthesesAsupprimer');

  monBoutonDemarrer.addEventListener("click", function () {
    monBoutonDemarrer.remove(); // Enlève le bouton
    synthesesAsupprimer.remove()
    boutonConfirmer.style.visibility = 'visible';
    boutonRestart.style.visibility = 'visible';
    timerSpan.style.visibility = 'visible';
    // Affiche les 6 adverbes sur l'écran
    afficherAdverbes();
  });
}

function restart() {
    const boutonRestart = document.getElementById('boutonRestart');
    const timerSpan = document.getElementById('timerSpan');
  
    boutonRestart.addEventListener('click', function () {
      adverbesSelectionnes = adverbesAleatoires();
      afficherAdverbes()
      document.getElementById('countPoint').textContent = ''; // Réinitialise le score affiché
      timerSpan.textContent = '20 ; 00'
      clearInterval(intervalId); // Arrête le chronomètre actuel s'il est en cours
      chronometre(); // Redémarre le chronomètre
    });
  }

// Fonction pour afficher les adverbes sélectionnés sur l'écran
function afficherAdverbes() {
  for (let i = 0; i < 6; i++) {
    const adverbe = adverbesSelectionnes[i];
    document.getElementById(`motArabe${i + 1}`).textContent = `${adverbe.arabe} :`;
    const reponseJoueur = document.getElementById(`reponseJoueur${i + 1}`);
    reponseJoueur.value = ''; // Réinitialise le champ de réponse
    reponseJoueur.style.visibility = 'visible';
    reponseJoueur.style.color = 'black'; // Réinitialise la couleur du texte
    reponseJoueur.disabled = false; // Active le champ de réponse
  }
}

// Fonction pour supprimer la synthèse des adverbes lors du clic sur le bouton de démarrage
function supprimerSyntheseAdverbes() {
  const monBoutonDemarrer = document.getElementById("boutonDemarrer");
  monBoutonDemarrer.addEventListener('click', function () {
    const syntheseAdverbes = document.getElementById('syntheseAdverbes');
    if (syntheseAdverbes) syntheseAdverbes.remove();
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

  for (let i = 0; i < adverbesSelectionnes.length; i++) {
    const reponsesFinalsJoueur = document.getElementById(`reponseJoueur${i + 1}`);
    const reponsesPossibles = adverbesSelectionnes[i].francais.map(r => r.toLowerCase());
    const reponseJoueur = reponsesFinalsJoueur.value.trim().toLowerCase();

    if (reponsesPossibles.includes(reponseJoueur)) {
      reponsesFinalsJoueur.style.color = 'green';
      point++;
    } else {
      reponsesFinalsJoueur.style.color = 'red';
      reponsesFinalsJoueur.value = `${reponsesFinalsJoueur.value} => ${reponsesPossibles[0]}`;
    }
  }
  count.textContent = `Score : ${point} / ${adverbesSelectionnes.length}`;
  clearInterval(intervalId); // Arrête le chronomètre lorsque les réponses sont vérifiées
  for (let i = 0; i < adverbesSelectionnes.length; i++) {
    document.getElementById(`reponseJoueur${i + 1}`).disabled = true;
  }
}

// Fonction pour vérifier les réponses avec bouton
function checkReponse() {
  const boutonConfirmer = document.getElementById('boutonConfirmer');
  const count = document.getElementById('countPoint');
  let point = 0;

  boutonConfirmer.addEventListener('click', function () {
    for (let i = 0; i < adverbesSelectionnes.length; i++) {
      const reponsesFinalsJoueur = document.getElementById(`reponseJoueur${i + 1}`);
      const reponsesPossibles = adverbesSelectionnes[i].francais.map(r => r.toLowerCase());
      const reponseJoueur = reponsesFinalsJoueur.value.trim().toLowerCase();

      if (reponsesPossibles.includes(reponseJoueur)) {
        reponsesFinalsJoueur.style.color = 'green';
        point++;
      } else {
        reponsesFinalsJoueur.style.color = 'red';
        reponsesFinalsJoueur.value = `${reponseJoueur} => ${reponsesPossibles[0]}`;
      }
    }
    count.textContent = `Score : ${point} / ${adverbesSelectionnes.length}`;
    point = 0;
    clearInterval(intervalId); // Arrête le chronomètre lorsque les réponses sont vérifiées
    for (let i = 0; i < adverbesSelectionnes.length; i++) {
      document.getElementById(`reponseJoueur${i + 1}`).disabled = true;
    }
  });
}

let intervalId;

// Fonction pour démarrer le chronomètre
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
      clearInterval(intervalId); // Arrête le chronomètre
      checkReponseSansBouton();
    }
  }, 1000);
}

// Exécution des fonctions lors du chargement de la page

afficherQuizDansBox();
supprimerSyntheseAdverbes();
messageSupprimerLancementChronometre();
checkReponse();
restart()

