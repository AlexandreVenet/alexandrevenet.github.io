# Jeu-vidéo

Le 22/05/2022

Tour d'horizon de la conception de jeu-vidéo.

## Modes de conception

Deux **stratégies de gestion de bourse** ont été appliquées au jeu-vidéo. Elles ne sont pas incompatibles car on peut partir de l’une pour aller à l’autre, et cela constamment dans la conception.
- ***Top Down*** : 
   - partir de l’**expérience globale**, d’une vision à transmettre, d’un point de vue centré sur ce que le jeu doit faire **ressentir** plutôt que sur les mécaniques et le *gameplay*,
   - les mécaniques et le *gameplay* seront développées dans un second temps, s’articuleront autour de l’expérience globale,
   - exemple : proposer l’expérience d'une vie de chien. 
- ***Bottom Up*** : 
   - partir des **mécaniques**, d’un point de vue centré sur le ***gameplay*** et les sensations de jeu plutôt que l’expérience globale,
   - on remonte des mécaniques de jeu particulières à l’expérience globale,
   - exemple : faire un *GTA* où le joueur est un chien.

## Gameplay

Ce qui définit un jeu-vidéo, c'est le ***gameplay*** : expérience (subjectif, *play*) instrumentée (objectif, *game*) - cf. Triclot.

Le *gameplay*  minimum de jeu-vidéo repose sur l'**incitation à l'action** (*call to action*) : 
- des **éléments non jouables** (*non-player*),
- **incitent le joueur**,
- à **mettre en oeuvre des compétences**,
- avec **un peu d'aléatoire**,
- pour produire une **expérience**.

## Attraction

Pour rendre l'objet **plus attrayant**, on peut ajouter des détails qui enrichissent le **monde du jeu** : **animation**, **audio** (musique, sons), **particules**...

Pour augmenter la **rétention du joueur** (inciter à jouer), on utilise :
- une **récompense de connexion**, par jour ou par semaine, voire planifiée dans un calendrier,
- des **missions à effectuer** contre récompense.

S'il faut une **éducation à l'image** pour éviter les manipulations, il faut de même penser un programme d'**éducation au jeu**.

## Le joueur

Pour commencer un prototype, coder d'abord le joueur :
1. ce qu'il **peut** faire (ex : se déplacer),
2. ensuite, ce qu'il **ne peut pas** faire (ex : se déplacer hors champ caméra).

##  UI

L'**interface utilisateur** comprend tout texte, bouton, ou tout autre élément que l'utilisateur peut lire ou avec lesquels il peut intéragir pendant son expérience. Ces éléments dépendent du type de jeu. Par exemple : score actuel, chronomètre, jauge de vie, etc.

L'UI augmente la qualité du jeu et rend le jeu **plus jouable** que sans. En effet, une bonne expérience comprend le fait de ne pas avoir de bugs et aussi de **ne pas avoir manqué d'informations**.

## Cohérence de style

Le **style** du jeu doit être **cohérent**, sans quoi il n'a pas de style du tout. Exemple : en l'état, un objet photoréaliste et une primitive non texturée ne vont pas ensemble ; il faut harmoniser.

Les **performances** sont toujours à surveiller selon les buts poursuivis. Exemple : un objet photoréaliste demande plus de calcul qu'une primitive non texturée.

## Les mécaniques de gameplay

Une **mécanique de *gameplay*** est une règle ou un syst_me qui rend **idéalement** le jeu plus intéressant. Cela peut ne pas être très intéressant en soi mais cela peut apporter de la **nouveauté** voire un **changement profond** du cœur du jeu. Par exemple : 
- la mécanique du ***power up*** : un état temporaire donnant au joueur un avantage. Cette mécanique introduit une possibilité de **choisir**, de poser une **stratégie** : prendre l'avantage ? le conserver pour plus tard ? ne pas l'utiliser, etc.
- la mécanique de la **difficulté croissante** : une fois tous les ennemis d'une vague éliminés, d'autres arrivent plus nombreux dans la vague suivante, réalisant ainsi des *rounds* de plus en plus difficiles. Cela fait passer d'une expérience « statique », prévisible, facilement maîtrisable et donc vite ennuyeuse car limitée dans les défis proposés, à un expérience « dynamique », imprévisible, requérant toujours l'exercice de compétences face à des défis inattendus.

Ces deux mécaniques vont de pair offrant ainsi une mécanique plus complexe : 
- plus la difficulté augmente,
- plus il est besoin de recourir à des avantages permettant de la résoudre.

Une autre mécanique est celle du ***randomizer***, par exemple dans un *metroidvania* :
- l'**accès** à un endroit est limité à un **objet** : chaque coffre de fin de défi fournit un objet aléatoire utilisable et qui sert de clé d'entrée (exemple : bombe pour casser la porte d'un donjon et y entrer),
- la progression est donc **non linéaire** : il faut **chercher où appliquer l'objet**,
- conséquence : on s'adresse aux joueurs qui **connaissent le jeu** et qui veulent rejouer avec un peu de variation ; on s'adresse aux joueurs **aimant chercher** le rapport objet-lieu.

D'autres mécaniques, plus évidentes dans la culture vidéo-ludique, existent et peuvent toujours être élaborées de façon originale : courir, tirer, collecter, (se) cacher, glisser...

## Compétences

De manière générale, les mécaniques de *gameplay* visent la mise en œuvre de **compétences** par le joueur, compétences qu'il peut développer grâce au jeu ou qu'il doit avoir déjà développées pour jouer :
- **synchronisation (*timing*)** : la prévision du temps correspondant à une action ou série d'actions. Il s'agit d'exécuter une action au bon moment pour avancer. L'événement est attendu,
- **réflexes** : réponse involontaire et rapide. Ici, il s'agit pour le joueur d'exécuter une action rapide suite à une incitation. L'événement est inattendu,
- **stratégie** : plannification des choix sur le long terme à partir de données fournies en amont de partie,
- **tactique** : faire un choix sur le moment, selon une stratégie ou pour modifier cette dernière,
- **précision** : effectuer une entrée (*input*) à une mesure fine. Par exemple viser juste, jauger un saut.

## Boucle de gameplay

La **boucle de *gameplay*** est un outil pour **découper un jeu** et en **faciliter le travail** de réalisation. Elle repose sur 3 principes :
1. **but** : ce que le joueur doit faire,
2. **défi** : ce qu'il faut franchir, réussir,
3. **récompense** : ce que le joueur gagne s'il réussit.

La boucle de *gameplay* permet de générer de l'**amusement** ou d'éviter qu'il ne s'évanouisse. En effet :
- personne n'aime faire des efforts sans recevoir de récompense,
- obtenir une récompense sans défi ne produit aucune impression d’accomplissement et retire de la valeur à la récompense.

C'est le *game designer* qui en général pense les boucles de *gameplay*. Il définit la **longueur** de chaque boucle. 

Il existe **3 types de boucles**, imbriquées, d'autant plus nombreuses qu'elles sont petites (présentées ici dans l'ordre croissant) :
1. ***micro*** : petite, quelques secondes ; exemple de *Super Mario Galaxy* :
   - but : atteindre la prochaine plateforme,
   - défi : sauter au bon moment,
   - récompense : avancer dans le niveau.
2. ***mid*** : moyenne, mission, quête, niveau ; exemple de *The legend of Zelda* :
   - but : terminer le donjon,
   - défi : venir à bout des ennemis et énigmes,
   - récompense : faire avancer l’histoire, obtenir un bonus de vie et objet spécial,
3. ***macro*** : grande, expérience complète, ce qui fait le jeu ; exemple général :
   - but : sauver le monde,
   - défi : finir tous les niveaux,
   - récompense : fin, réussite, *achievements*...

Le point de départ de la boucle est le **but** :
- quelle est sa **nature** ?
   - aller d’un point A à un point B,
   - résoudre une énigme, un puzzle,
   - vaincre un boss,
   - collecter des ressources,
   - ...
- comment l'**obtenir** ?
   - donné directement au joueur (interface, dialogue avec un PNJ…),
   - induit par la structure de jeu (terminer un niveau),
   - amené par des mécaniques de jeu (tuer un ennemi pour survivre).

Le **défi** est un équilibre à trouver :
- il fait appel aux mécaniques du jeu et aux compétences du joueur,
- il doit suivre un courbe de difficulté souhaitée tout en considérant que les joueurs deviennent meilleurs à mesure qu’ils jouent,
- il doit correspondre au public visé.

La **récompense** :
- elle est liée à l’accomplissement d’un défi et doit être proportionnelle à l’effort fourni,
- elle est de 2 natures :
   1. **liée au *gameplay*** : nouvelles fonctionnalités enrichissant l’expérience ludique, renforcement de personnage, nouveaux modes de jeu ou difficultés...
   2. **liée au monde du jeu** : éléments d’histoire, détails sur les personnages, cinématiques, costumes, *skins*...
- elle touche **plusieurs publics** : certains joueurs jouent pour l’univers, d’autre pour les sensations de jeu, d'autres oscillent entre les deux...

## Les 3 C

Les ***3 C*** désignent en anglais :
- ***camera*** : comment voit-on le jeu ?
- ***controls*** : comment joue-t-on ?
- ***character*** : quelles sont les compétences recrutées ?

Les *3 C* sont interdépendants et font système : une modification de l'un implique de modifier les autres. Par conséquent, ils sont à concevoir en premier car ils définissent **l'interface entre l'utilisateur et les actions dans le jeu**.

***Camera*** :
- fixe, 
- *scrolling* (par axe), 
- déplaçable (sans orientation possible et non suivante), 
- flottante (orientée librement et non suivante),
- suivante (position ou rotation),
- poussable/orbitale/TPS : liée à un personnage,
- FPS.

La caméra est à **adapter** à chaque expérience voulue. Par exemple :
- **horreur** : place importante accordée au personnage, réduire le champ de vision ; cela accentue l’oppression du joueur ; exemple : *Lone Survivor*, *Amnesia : the dark descent*,
- **exploration & action** : avatar petit pour permettre une navigation ample et nerveuse ; exemple : *Metroid Fusion*,
- ***runner*** : caméra décalée par rapport au personnage pour anticiper les obstacles ; exemple : *Bit. Trip presents : Runner 2*,
- **contrôle absolu** : caméra flottante avec zoom ; exemple : *Les Sims*,
- **effet cinématographique** : plans fixes avec plongée/contre plongée et gestion du hors champ ; exemple : *Resident Evil*,

***Controls*** :
- ils doivent être **simples** et **intuitifs** pour le plus grand nombre (prise en compte de la culture et de l'expérience des joueurs). Par exemple : la gâchette de manette pour tirer au pistolet correspond à ce qu'on attend de l'usage du pistolet et est l'entrée communément utilisée pour cela, 
- s’il faut changer, alors il faut que le contrôle reste intuitif ; sans quoi cela rend le contrôle difficile et frustrant,
- prendre en compte la **limitation physique** du joueur ; par exemple, un combo de touches trop complexe rend l'opération impossible à réaliser sur telle ou telle entrée ; sur mobile, les actions doivent s'effectuer en bas de l'écran (horizontal ou vertical) car sinon il y a risque de lancer des actions indésirables ou de lâcher le terminal.

***Character*** :
- il s'agit de penser les **compétences** liées au personnage : sauter, frapper, bouger, nager, voler ?
- ajouter une compétence à recruter implique d'**ajouter des contrôles** et éventuellemnt de **modifier la caméra**.

## Parcours et repères

Référence : [Astuces de Level Design](https://www.youtube.com/watch?v=7coiOSyqLgc "Astuces de Level Design")

Un **repère** (*landmark*) est une élément mis en valeur dans la composition : il sert à attirer l'attention du joueur et lui signifier un lieu important, digne d'intérêt.

Le **point focal** (*focal point*) est un élément de *gameplay* qui sert aussi à attirer l'attention du joueur mais à plus court terme ou plus localement que le repère précédent. En général, montrer le point focal **après** le repère.

Ces éléments font l'objet de choix et sont à hiérarchiser par priorité.

En général, attirer l'attention vient de la **mise en contraste**. Exemple : un objet de grande taille à côté d'un autre de petite taille (le grand n'attire l'œil que selon l'environnement).

Le fil d'Ariane ou ***breadcrumbs navigation*** est une méthode pour orienter le joueur dans une direction en le faisant suivre des éléments. Exemple : suivre des éléments d'architecture, des ennemis, etc. qui ont tous le même aspect, de façon à constituer un chemin.