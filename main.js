const main = document.querySelector('main');

function pronomsPersonnels(){

  const pronoms = [
    { انا : 'Je'},
    { أنتَ : 'Tu (Masculin)'},
    { أَنتِ : 'Tu (féminin)'},
    { هُوَ : 'Il'},
    { هِيَ : 'Elle'},
    { نَحْنُ  : 'Nous'},
    { أَنْتُم  : 'Vous (Masculin)'},
    { أَنْتُنَّ : 'Vous (Féminin)'},
    { هُم : 'Ils'},
    { هُنَّ : 'Elles'},
    { هُما : 'Ils/Elles (Deux)'}
  ]
  const randomIndex = Math.floor(Math.random() * pronoms.length);
  const pronomsAuHasard = pronoms[randomIndex];

  const pronomArabe = Object.keys(pronomsAuHasard)[0];
  const traduction = pronomsAuHasard[pronomArabe];

  return pronomArabe
}

const titreQuiz = document.getElementById("titreQuiz");
const motArabe = document.getElementById("motArabe");
const monBoutonDemarrer = document.getElementById("boutonDemarrer");
monBoutonDemarrer.addEventListener("click", function(){
    
  titreQuiz.textContent = 'Pronoms'; // siyeb le titre
  monBoutonDemarrer.remove() // siyeb le bouton
  const pronomArabe = pronomsPersonnels()
  motArabe.textContent = pronomArabe

})
