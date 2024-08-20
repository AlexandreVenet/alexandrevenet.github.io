"use strict";

// -------------------- CHAMPS

let menuBtn;

let nav;
let navSectionMain;
let navSectionContenu;
let navTitre;
let retourAccueil;

let dureeNavSectionTransition; // en ms
let dureeSousSectionOuverture; // en ms
let hauteurSousSectionFermee;

let sectionChoisie;
let chapitreChoisi;

let aside;
let asideLiens;

let main;
let mainContenu;
let mainContenuSections;
let finDePage;
let sousTitres;
let sousTitreDureeTransition; // en ms

const palierMobile = 900;
const palierDesktop = 1200;

let windowEcouteResize = false;
let mainContenuEcouteScroll = false;

const debutCheminImages = './'; // avec ou sans slash de fin
const debutCheminFichiersMD = './notes'; // sans slash de fin nécessairement

// -------------------- FONCTIONS

let menuBtnClick = (e) => 
{
	e.preventDefault();
	nav.classList.toggle('ouvrir');
}

let mainClick = (e) =>
{
	// e.preventDefault(); // Non, sinon plus de clic possible sur les éléments de contenu (ex : <a>)
	if(!nav.classList.contains('ouvrir')) return;
	nav.classList.remove('ouvrir');
}
	
let chargerPage = async (chemin, callback) =>
{	
	try 
	{
		const p = await fetch(chemin);
		if(!p.ok)
		{
			throw new Error(p.status + ' ' + p.statusText);
		}
		else
		{
			callback(await p.text());
		}
	} 
	catch (error) 
	{
		// 1. dans la page
		construirePageErreur(error.message);
		initPage();
		// 2. en console
		// console.log(error.message);
		// Au choix ^^
	}
}

let construirePageErreur = (message) =>
{
	mainContenu.replaceChildren();
	aside.replaceChildren();
	
	const sectionHaut = creerSectionHautDePage();
	const h1 = document.createElement('h1');
	h1.textContent = 'Oups !';
	const p1 = document.createElement('p');
	p1.textContent = '(^_^)';
	const p2 = document.createElement('p');
	p2.textContent = 'Une erreur s\'est produite.';
	sectionHaut.append(h1);
	sectionHaut.append(p1);
	sectionHaut.append(p2);
	
	const s0 = creerSectionAvecID('s0'); 
	
	const sousTitre = creerDivSousTitre();
	const h2 = document.createElement('h2');
	h2.textContent = 'Message';
	const img = creerChevronImg();
	sousTitre.append(h2);
	sousTitre.append(img);
	
	const sectionTexte = creerDivSectionTexte();
	const p = document.createElement('p');
	p.textContent = message;
	sectionTexte.appendChild(p);
	
	s0.append(sousTitre);
	s0.append(sectionTexte);
	
	mainContenu.append(sectionHaut);
	mainContenu.append(s0);
	mainContenu.append(creerSectionBas());
	
	const aInitial = creerA('#hautDePage', 'Oups');
	aInitial.classList.add('articleSectionChoisie');
	const a0 = creerA('#s0', 'Erreur');
	aside.appendChild(aInitial);
	aside.appendChild(a0);
}

let construirePage = (contenu) =>
{
	mainContenu.replaceChildren();
	aside.replaceChildren();
	
	// Formater selon les règles du site
	
	const contenuDOM = new DOMParser().parseFromString(contenu, 'text/html');
	let contenuDOMNodes = contenuDOM.body.childNodes;	
	
	const superContenu = document.createElement('div');
	
	const sectionHautDePage = creerSectionHautDePage();
	sectionHautDePage.appendChild(contenuDOMNodes[0].cloneNode(true));
	sectionHautDePage.appendChild(contenuDOMNodes[1].cloneNode(true));
	sectionHautDePage.appendChild(contenuDOMNodes[2].cloneNode(true));
	superContenu.appendChild(sectionHautDePage);
		
	let currentSectionIndex = -1;
	let currentSection;
	for (let i = 3; i < contenuDOMNodes.length; i++) 
	{
		const node = contenuDOMNodes[i];
		if(node.tagName === 'H2')
		{
			if(currentSectionIndex > -1)
			{
				superContenu.appendChild(currentSection);
			}
			currentSectionIndex++;
			
			currentSection = creerSectionAvecID('s' + currentSectionIndex); 
			
			const divSousTitre = creerDivSousTitre();
			const img = creerChevronImg();
			divSousTitre.appendChild(node.cloneNode(true));
			divSousTitre.appendChild(img);			
			currentSection.appendChild(divSousTitre);
			
			const divSectionTexte = creerDivSectionTexte();
			currentSection.appendChild(divSectionTexte);
		}
		else
		{
			if(node.tagName === 'TABLE')
			{
				const conteneurTable = creerElementAvecClasseCss('div', 'tableConteneur');
				conteneurTable.appendChild(node.cloneNode(true));
				currentSection.querySelector('div.sectionTexte').appendChild(conteneurTable);
			}
			else
			{
				currentSection.querySelector('div.sectionTexte').appendChild(node.cloneNode(true));
			}
		}
	};
	
	// Ajoute la dernière section du md si elle existe
	if(currentSection)
	{
		superContenu.appendChild(currentSection);
	}
	
	currentSection = null;
	
	superContenu.appendChild(creerSectionBas());
		
	for (let node of superContenu.childNodes) 
	{
		mainContenu.appendChild(node.cloneNode(true));
		
		if(node.querySelector('h1'))
		{		
			const a = creerAsideA('hautDePage', node.querySelector('h1'));
			a.classList.add('articleSectionChoisie');
			aside.appendChild(a);
		}
		else if(node.querySelector('h2'))
		{
			let h2 = node.querySelector('h2');
			let sectionParente = h2.parentNode.parentNode;
			aside.appendChild(creerAsideA(sectionParente.id, h2));
		}
	}
}

let initPage = () =>
{
	asideLiens = document.querySelectorAll('aside a');
	aside.scrollTop = 0;
	
	finDePage = document.querySelector('.finDePage');
	if(window.innerWidth >= palierMobile)
	{	
		calculerFinDePage();
	}
	
	sousTitres = document.querySelectorAll('.sousTitre');
	for (let i = 0; i < sousTitres.length; i++) {
		sousTitres[i].addEventListener('click', sousTitreClick);
	}
	if(!sousTitreDureeTransition)
	{
		sousTitreDureeTransition = obtenirDureeTransition(sousTitres[0].parentNode);
	}
	
	mainContenuSections = document.querySelectorAll('.mainContenu > section');
	mainContenu.scrollTop = 0;
	if(!mainContenuEcouteScroll)
	{
		mainContenu.addEventListener('scroll', scroller);
		mainContenuEcouteScroll = true;
	}
	
	if(!windowEcouteResize)
	{
		window.addEventListener('resize', resize);
		windowEcouteResize = true;
	}	
}

let navSectionMainClick = async (e) =>
{
	e.preventDefault();
	
	if(!e.target.closest('a')) return;
	
	let a = e.target;
	// Récupérer le nom de l'ancre
	let indexCroisillon = a.href.lastIndexOf('#');
	let navAncreChoisie = a.href.substring(indexCroisillon, a.href.length);
	sectionChoisie = document.querySelector(navAncreChoisie);
	// Afficher la section correspondant à l'ancre, avec le titre adéquat
	navTitre.textContent = a.textContent;
	elementVisible(navSectionContenu);
	elementVisible(sectionChoisie);
	// Délai de prise en compte de la modification de l'état du DOM
	await attendre(10);
	// Jouer la transition
	navSectionMain.classList.add('animer');
	navSectionContenu.classList.add('animer');
	// Masquer la section principale
	await attendre(dureeNavSectionTransition);
	elementInvisible(navSectionMain);
}

let retourAccueilClick = async (e) =>
{
	e.preventDefault();
	
	elementVisible(navSectionMain);
	// Délai de prise en compte de la modification de l'état du DOM
	await attendre(10);
	// Jouer la transition
	navSectionMain.classList.remove('animer');
	navSectionContenu.classList.remove('animer');
	// Masquer la section secondaire et sa section choisie
	await attendre(dureeNavSectionTransition);
	elementInvisible(navSectionContenu);
	elementInvisible(sectionChoisie);
}

let navSousSectionClick = async (e) =>
{
	e.preventDefault();
	
	if(e.target.parentNode.tagName == 'SECTION')
	{
		let section =  e.target.parentNode;
		let divInterne = section.querySelector('div');
		
		let estInvisible = elementEstInvisible(divInterne);
		if(estInvisible)
		{
			elementVisible(divInterne);
			// .offsetHeight doit être appelé après la manipulation de l'élément dans le DOM
			section.style.maxHeight = divInterne.offsetHeight + hauteurSousSectionFermee + 'px';
			await attendre(10);
		}
		else
		{
			section.style.maxHeight = hauteurSousSectionFermee + 'px';
			await attendre(dureeSousSectionOuverture);
			elementInvisible(divInterne);
		}
	}
	else if(e.target.closest('A') && e.target.closest('A').parentNode.tagName == 'DIV')
	{
		if(chapitreChoisi != null)
		{
			chapitreChoisi.classList.remove('chapitreChoisi');
		}
		chapitreChoisi = e.target.closest('A');
		chapitreChoisi.classList.add('chapitreChoisi');
		
		nav.classList.remove('ouvrir');
		
		chargerPage(debutCheminFichiersMD + chapitreChoisi.pathname, (texte) =>
			{
				mainContenu.scrollTop = 0;
				aside.scrollTop = 0;
				const html = new Convertisseur().analyser(texte, debutCheminImages);
				construirePage(html);
				initPage();
			});
	}
}

let sommaireClick = (e) =>
{
	e.preventDefault();
	if(e.target.closest('A'))
	{
		let href = e.target.closest('A').href;
		href = href.substring(href.lastIndexOf('#'), href.length);
		let cible = document.querySelector(href);
		// let ajustement = 50;
		// if(href == '#hautDePage')
		// {
		// 	ajustement += 10;
		// }
		// mainContenu.scrollTo(0, cible.offsetTop - ajustement);
		mainContenu.scrollTo(0, cible.offsetTop);
	}
}

let calculerFinDePage = () =>
{
	let mainContenuHauteur = window.getComputedStyle(mainContenu).height;
	mainContenuHauteur = mainContenuHauteur.substring(0, mainContenuHauteur.lastIndexOf('p') -2);
	mainContenuHauteur = Number(mainContenuHauteur);

	if(mainContenuHauteur > 200) 
	{
		mainContenuHauteur -= 20; // ajustement
		mainContenuHauteur = Math.floor(mainContenuHauteur);
		finDePage.style.minHeight = `${mainContenuHauteur}px`;
	}
}

let sousTitreClick = async (e) =>
{
	e.preventDefault();
	let sousTitre = e.target.closest('.sousTitre');
	let chevron = sousTitre.querySelector('img');
	let parent = sousTitre.parentNode;
	let sectionTexte = parent.querySelector('.sectionTexte');
	let estInvisible = elementEstInvisible(sectionTexte); 
	chevron.classList.toggle('rotation180');
	if(estInvisible)
	{
		elementVisible(sectionTexte);
		parent.style.maxHeight = sousTitre.offsetHeight + sectionTexte.offsetHeight + parent.offsetHeight + 'px'; 
		// Si la largeur de fenêtre se réduit, maxHeight est fixé. Alors du contenu peut ne pas être visible. Donc :
		await attendre(sousTitreDureeTransition);
		parent.style.maxHeight = '';
	}
	else
	{
		//La première fois, max-height n'est pas défini. Il faut le faire, sinon pas de transition possible
		if(parent.style.maxHeight == '')
		{
			parent.style.maxHeight = parent.offsetHeight + 'px';
		}
		parent.style.maxHeight = sousTitre.offsetHeight + 48 + 'px'; // ajustement
		await attendre(sousTitreDureeTransition);
		elementInvisible(sectionTexte);
	}
}

let scroller = () =>
{
	let scrollY = mainContenu.scrollTop;
	
	for (let i = 0; i < mainContenuSections.length; i++) 
	{
		const section = mainContenuSections[i];
		
		const sectionHeight = section.offsetHeight;
		const sectionTop = (section.getBoundingClientRect().top + scrollY) - 65; // ajustement
		
		let sectionId = section.getAttribute("id");
		if(sectionId === null) return;
		
		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
		{
			document.querySelector(`aside a[href="#${sectionId}"]`).classList.add("articleSectionChoisie");
		}
		else
		{
			document.querySelector(`aside a[href="#${sectionId}"]`).classList.remove("articleSectionChoisie");
		}
	}
	
	// if(mainContenu.scrollTop <= 10)
	// {
	// 	for (let i = 0; i < asideLiens.length; i++) 
	// 	{
	// 		asideLiens[i].classList.remove('articleSectionChoisie');
	// 	}
	// 	asideLiens[0].classList.add('articleSectionChoisie');
	// }
}

let resize = () => 
{
	if(window.innerWidth >= palierMobile)
	{
		nav.classList.remove('ouvrir');
	}
		
	if(window.innerWidth >= palierDesktop)
	{
		calculerFinDePage();
	}
	else
	{
		finDePage.style.minHeight = '0';
	}
}

let attendre = async (temps) => await new Promise(resolve => setTimeout(resolve, temps)); 

let elementInvisible = (element) => element.classList.add('invisible');	
let elementVisible = (element) => element.classList.remove('invisible');
let elementEstInvisible = (element) => element.classList.contains('invisible');

let obtenirDureeTransition = (element) => parseFloat(window.getComputedStyle(element).transitionDuration) * 1000;

// Traitement HTML

let creerElementAvecClasseCss = (tag, classe) =>
{
	const e = document.createElement(tag);
	e.classList.add(classe);
	return e;
}

let creerDivSousTitre = () => creerElementAvecClasseCss('div', 'sousTitre');
let creerDivSectionTexte = () => creerElementAvecClasseCss('div', 'sectionTexte');

let creerSectionBas = () =>
{
	const s = creerElementAvecClasseCss('section', 'finDePage');
	let p = document.createElement('p');
	p.textContent = 'Fin de page';
	s.append(p);
	return s;
}

let creerChevronImg = () =>
{
	const img = document.createElement('img');
	img.src = './media/ui/chevron.svg';
	img.alt = 'Chevron';
	img.title = 'Afficher/Masquer';
	img.width = 16;
	img.height = 16;
	return img;
}

let creerSectionAvecID = (id) =>
{
	let s = document.createElement('section');
	s.id = id;
	return s;
}

let creerSectionHautDePage = () => creerSectionAvecID('hautDePage'); 

let creerAsideA = (id, source) =>
{
	const a = document.createElement('a');
	a.href = '#'+id;
	a.title = source.innerText;
	while (source.firstChild) 
	{
		a.appendChild(source.firstChild);
	}
	
	return a;
}

let creerA = (href, texte) =>
{
	const a = document.createElement('a');
	a.href = href;
	a.title = texte;
	a.innerText = texte;
	return a;
}

// -------------------- LANCEMENT lorsque DOM et ressources chargées

window.onload = () =>
{
	menuBtn = document.getElementById('menuBtn');
	menuBtn.onclick = menuBtnClick;
	
	nav = document.querySelector('nav');
	
	navSectionMain = document.querySelector('#navSectionMain');
	navSectionMain.onclick = navSectionMainClick;
	dureeNavSectionTransition = obtenirDureeTransition(navSectionMain);
	
	navSectionContenu = document.querySelector('#navSectionContenu');
	
	retourAccueil = document.querySelector('#retourAccueil');
	retourAccueil.onclick = retourAccueilClick;
	
	navTitre = document.querySelector('#navTitre');
	
	chargerPage(debutCheminFichiersMD + '/sommaire.md', (texte) =>
		{
			const html = new Convertisseur().analyser(texte, debutCheminImages);
			const contenuDOM = new DOMParser().parseFromString(html, 'text/html');
			let numCategorie = -1;
			let sectionCategorieActuelle = null;
			let divActuelle = null;
			contenuDOM.body.childNodes.forEach(node =>
			{							
				if(node.tagName === 'H1')
				{
					numCategorie ++;
					
					const lienCategorie = creerA('#categorie' + numCategorie, node.textContent);
					navSectionMain.appendChild(lienCategorie);
					
					const partie = document.createElement('section');
					partie.id = 'categorie' + numCategorie;
					partie.classList.add('invisible');
					sectionCategorieActuelle = navSectionContenu.appendChild(partie);
				}
				else if(node.tagName === 'H2')
				{
					const partieSection = document.createElement('section');
					const titre = creerA('#', node.textContent);
					partieSection.appendChild(titre);
					const div = document.createElement('div');
					div.classList.add('invisible');
					partieSection.appendChild(div);
					sectionCategorieActuelle.appendChild(partieSection);
					divActuelle = sectionCategorieActuelle.querySelector('section:last-of-type > div.invisible');
				}
				else if(node.tagName === 'P')
				{
					const lien = node.querySelector('A');
					if(lien !== null);
					{					
						divActuelle.appendChild(lien.cloneNode(true));
					}
				}
			});
			
			let navSousSections = document.querySelectorAll('#navSectionContenu > section:nth-child(n+2) > section');
			for (let i = 0; i < navSousSections.length; i++) {
				navSousSections[i].addEventListener('click', navSousSectionClick);
			}
			dureeSousSectionOuverture = obtenirDureeTransition(navSousSections[0]);
			hauteurSousSectionFermee = window.getComputedStyle(navSousSections[0]).getPropertyValue('max-height');
			hauteurSousSectionFermee = Number(hauteurSousSectionFermee.substring(0, hauteurSousSectionFermee.length-2)); 	
		});
			
	aside = document.querySelector('aside');
	aside.onclick = sommaireClick;
	
	main = document.querySelector('main');
	main.onclick = mainClick;
	
	mainContenu = document.querySelector('.mainContenu');
	
	chargerPage(debutCheminFichiersMD + '/accueil.md', (texte) =>
	{
		const html = new Convertisseur().analyser(texte, debutCheminImages);
		construirePage(html);
		initPage();
	});
};
