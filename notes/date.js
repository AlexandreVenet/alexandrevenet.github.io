'use strict';

// un objet Date
const currentDate = new Date();

// exemple des méthodes de l'objet Date
document.write(`<p>Nous sommes le ${currentDate.getDate()}/${parseInt([currentDate.getMonth()]) + 1}/${currentDate.getFullYear()}. Il est ${currentDate.getHours()}:${currentDate.getMinutes()}</p>`);

// on peut utiliser la fonction toLocaleDateString() qui permet traduction et mise en forme
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

// exemples
document.write(`<p>Nous sommes le ${currentDate.toLocaleDateString('fr-FR',options)}.</p>`);
document.write(`<p>Heute ist ${currentDate.toLocaleDateString('de-DE', options)}</p>`);
document.write(`<p>Today is ${currentDate.toLocaleDateString('en-GB', options)}</p>`);
document.write(`<p>Oggi siamo ${currentDate.toLocaleDateString('it-IT', options)}</p>`);
