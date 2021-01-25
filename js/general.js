'use strict';

/*
	JS réalisé par Alexandre Venet pour https://alexandrevenet.github.io
	Version du 25-01-2021
*/

let main;
let contenuPage;

let nav;
let selectedSection;
let selectedA;

let menuBtn;
let clickedMenu;
let sommaire;

let palierDesktop = 800;

document.addEventListener('DOMContentLoaded',()=>{
	main = document.getElementsByTagName('main')[0];
	contenuPage = document.getElementById("contenuPage");

	nav = document.getElementsByTagName("nav")[0];
	nav.addEventListener("click",clickNav);

	menuBtn = document.querySelector('#menuBtn');
	menuBtn.addEventListener('click', clickMenuBtn);



	window.addEventListener('resize', resize);
	resize();
});


function chargerPage(page){
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			contenuPage.innerHTML = xhr.responseText;
			main.scrollTop = 0;
			testSommaire();
		}
	};
	xhr.open("GET", page, true);
	xhr.send();
}

function testSommaire(){
	if(document.querySelector('#sommaire') != null){
		sommaire = document.querySelector('#sommaire');
		sommaire.addEventListener('click', clickSommaire);
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
					nav.style.display = 'none';
				},500);
			}

		}
	}
}


function clickMenuBtn(e){
	e.preventDefault();
	clickedMenu = (clickedMenu == true)?false:true;
	if(clickedMenu){
		nav.style.display = 'block';
	}else{
		nav.style.display = 'none';
	}
}


function clickSommaire(e){
	e.preventDefault();
	if(e.target.closest('a')){
		let href = e.target.getAttribute("href");
		let cible = document.querySelector(href);
		main.scrollTo(0,cible.offsetTop -95); // -xx pour ajuster
	}
}


function resize(){
	if(window.innerWidth >= palierDesktop){
		if(!clickedMenu){
			clickedMenu = true;
			nav.style.display = 'block';
		}
	}else{
		if(clickedMenu){
			clickedMenu = false;
			nav.style.display = 'none';
		}
	}
}
