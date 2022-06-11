"use strict";

// -------------------- CHAMPS

let nav;
let main;
let aside;
let menuBtn;
let selectedA;
let modeSummBtn;
let allSectionDiv;
let allSectionTitle;
let allSectionTitleImg;

let clickedMenu;

let palierDesktop = 1024;
let listenerAdded = false;

let mainNavLinks;
let allSectionHTML;
let mainContent;
let lastSection;

// -------------------- FONCTION CHARGEMENT

function chargerPage(page){
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
            // analyse Markdown
			let contenuAnalyse = new ConverterMDHTML().AnalyseMD(xhr.response);
			// Construction page
			let contenu = StructureHTML(contenuAnalyse);
			// Initialiser l'UI
            InitContent(contenu);
		}
	};
	xhr.open("GET", page, true);
	xhr.send();
}

// -------------------- FONCTIONS UI

function ClickSommaire(e){
	e.preventDefault();
	if(e.target.closest('a')){
        let href = e.target.dataset.src;
		let cible = document.querySelector(href);
		mainContent.scrollTo(0,cible.offsetTop - 60); // -xx pour ajuster
	}
}

function clickNav(e){
	e.preventDefault();
	if(e.target.closest('a')){
		let parent = e.target.parentElement;
		if(parent.nodeName === 'SECTION'){
			parent.classList.toggle('sectionActive');
		}else if(parent.nodeName === 'DIV'){
			if(selectedA != null){
				selectedA.classList.remove('navLienActif');
			}
			selectedA = e.target;
			selectedA.classList.add('navLienActif');
			chargerPage(selectedA.dataset.src);
			if(window.innerWidth < palierDesktop){
				setTimeout(()=>{
					clickedMenu = false;
					nav.style.display = null;
                    main.style.display = null;
					mainContent.scrollTop = 0;
					aside.scrollTop = 0;
				},500);
			}
		}
	}
}

function clickMenuBtn(e){
	e.preventDefault();
	clickedMenu = (clickedMenu == true)?false:true;
	if(clickedMenu){
		ToggleMainNav('nav');
	}else{
		ToggleMainNav('main');
	}
}

function resize(){
	if(window.innerWidth >= palierDesktop){
		if(!clickedMenu){
			clickedMenu = true;
		}
		nav.style.display = null;
        main.style.display = null;
        menuBtn.style.display = null;
	}else{
		if(clickedMenu){
			clickedMenu = false;
			ToggleMainNav('main');
            menuBtn.style.display = null;
		}
        lastSection.style.minHeight = null;
	}
	ManageLastSection();
}

function ManageLastSection()
{
	if(window.innerWidth >= palierDesktop)
	{
		let prop = window.getComputedStyle(mainContent).height;
		let numberOnly = prop.substring(0,prop.indexOf('p')-1);
		if(numberOnly > 200) // hauteur minimum d'affichage de la div
		{
			numberOnly -= 90; // ajustement
			numberOnly = Math.floor(numberOnly);
			lastSection.style.minHeight = `${numberOnly}px`;
		}
	}
}

function ToggleMainNav(elementName)
{
    if(elementName == 'nav')
    {   
        nav.style.display = 'block';
        main.style.display = 'none';
    }
    else
    {
        nav.style.display = null;
        main.style.display = null;
    }
}

function ClickSummaryBtn(e)
{
    e.preventDefault();
    for (let i = 0; i < allSectionDiv.length; i++) 
    {
        allSectionDiv[i].classList.add('hidden');
        allSectionTitleImg[i].classList.add('turning180');
    }

    mainContent.scrollTop = 0; // pour réinit la position dans l'aside
}

function ClickTitle(e)
{
    e.preventDefault();
    let section = e.target.closest('a').parentNode;
    let chevron = section.querySelector('img');
    let sectionDiv = section.querySelector('.sectionDiv');
    let display = window.getComputedStyle(sectionDiv).display;
    if(display == 'none')
    {
        chevron.classList.remove('turning180');
        sectionDiv.classList.remove('hidden');
    }
    else
    {
        chevron.classList.add('turning180');
        sectionDiv.classList.add('hidden');
    }
}

function ScrollingMainContent(e)
{
    let scrollY = mainContent.scrollTop;
    
    for (let i = 0; i < allSectionHTML.length; i++) {
        const current = allSectionHTML[i];

        const sectionHeight = current.offsetHeight;
        const sectionTop = (current.getBoundingClientRect().top + scrollY) - 65;

        let sectionId = current.getAttribute("id");
        if(sectionId === null) return;
        
        if ( scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
        {
            document.querySelector(`aside a[data-src="#${sectionId}"]`).classList.add("currentSection");
        } else {
            document.querySelector(`aside a[data-src="#${sectionId}"]`).classList.remove("currentSection");
        }
    }

    if(mainContent.scrollTop == 0 && (mainContent.scrollHeight <= mainContent.clientHeight))
    {
        for (let i = 0; i < mainNavLinks.length; i++) 
        {
            mainNavLinks[i].classList.remove('currentSection');
        }
        mainNavLinks[0].classList.add('currentSection');
    }
}

function InitContent(contenu)
{
    main = document.getElementsByTagName('main')[0];
	main.innerHTML = contenu;
	
    allSectionTitle = document.querySelectorAll('main section > a:first-child');
    for (let i = 0; i < allSectionTitle.length; i++) {
		allSectionTitle[i].addEventListener('click',ClickTitle);
    }
    allSectionTitleImg = document.querySelectorAll('main section > a:first-child > img');
	
    aside = document.getElementsByTagName('aside')[0];
    aside.addEventListener('click', ClickSommaire); 
	aside.scrollTop = 0;
	
    modeSummBtn = document.getElementById('modeSummBtn');
    modeSummBtn.addEventListener('click',ClickSummaryBtn);
	
    allSectionDiv = document.getElementsByClassName('sectionDiv');
	
    mainContent = document.querySelector('.mainContent');
	mainContent.scrollTop = 0;
	
    lastSection = document.querySelector('.last');
	
    mainNavLinks = document.querySelectorAll('aside a');
	
    allSectionHTML = document.querySelectorAll('main section');
	
    mainContent.addEventListener('scroll',ScrollingMainContent);
	
	if(!listenerAdded)
	{
		window.addEventListener('resize', resize);
		resize();
		listenerAdded = true;
	}
	else
	{
		ManageLastSection();
	}
}


function StructureHTML(tableau)
{
	// Tableau bidimensionnel. 0 : H2, 1 : string

	let sections = [];
	let currentSection = -1;

	for (let i = 0; i < tableau.length; i++) {
		const e = tableau[i];
		if(e.substring(0,4) == '<h2>')
		{
			sections.push([e,'']); 
			currentSection ++;
		}
		else if(i > 2) // après le titre, date et résumé
		{
			let ajout = e;
			if(e.substring(0,5) != '<pre>') // si <pre>, ne pas mettre de retour
			{
				ajout += '\r';
			}
			sections[currentSection][1] += ajout;
		}
	}

	// console.log(sections);

	// Structurer les sections HTML et l'aside
	let sectionsHTML = [];
	let asideA = [];
	for (let i = 0; i < sections.length; i++) {
		const e = sections[i];
		let contenuSection = 
		`
		<section id="s${i}">
			<a href="#">
				${e[0]}
				<img src="../media/ui/chevron.svg" alt="Icone">
			</a>
			<div class="sectionDiv">
				${e[1]}
			</div>
		</section>`;
		sectionsHTML.push(contenuSection);

		let lienSeul = e[0].substring(4,e[0].length-5);
		let contenuAsideA = `<a href="#" data-src="#s${i}" title="${lienSeul}">${lienSeul}</a>`;
		asideA.push(contenuAsideA);
	}

	// console.log(sectionsHTML);
	// console.log(asideA);
	
	let titreH1Seul = tableau[0].substring(4,tableau[0].length-5);
	let totalPage = 
	`
	<div class="mainContent">
		<section id="haut">
			<div>
				${tableau[0]}
				${tableau[1]}
			</div>
			${tableau[2]}
		</section>
		<a href="#" class="mobileSumm" id="modeSummBtn">
			<p>Mode sommaire</p>
			<img src="../media/ui/caretUp.svg" alt="Icone">
		</a>
		${sectionsHTML.join('\r')}
		<div class="last">
			<p>Fin de page</p>
		</div>
	</div>
	<aside>
		<a href="#" data-src="#haut" class="currentSection" title="${titreH1Seul}">${titreH1Seul}</a>
		${asideA.join('\r')}
	</aside>`;

	return totalPage;
}

// -------------------- LANCEMENT

document.addEventListener('load',()=>{

	nav = document.getElementsByTagName('nav')[0];
	nav.addEventListener('click', clickNav);
	nav.scrollTop = 0;

    menuBtn = document.getElementById('menuBtn');
	menuBtn.addEventListener('click', clickMenuBtn);
	
	chargerPage('notes/accueil.md');
});