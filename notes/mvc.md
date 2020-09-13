# MVC d'un point de vue pragmatique
MVC est l'acronyme de **Model Vue Controler**, c'est un modèle de structure applicative. Ce modèle possède 4 éléments principaux :
- le fichier **routeur** (ou répertoire contenant les éléments de routage),
- le répertoire de fonctions de type **Model**,
- le répertoire de fonctions de type **Vue**,
- le répertoire de fonctions de type **Controleur**.

## Routeur
Le routeur est le fichier à la racine du site ou de l'application.  
Il **exécute** les fonctions du programme en fonction des manipulations de l'utilisateur.  
Il **appelle** des éléments Vue qui affichent les résultats de ces fonctions.

## Model
Le Model regroupe les fonctions de **traitement de données** du programme, comme par exemple : les requêtes SQL.  
Il faut coder **un** fichier Model par **table** de bdd.

## Controler
Le Controler regroupe les fonctions de **contrôle de l'utilisation** du programme. comme par exemple : tester les données d'un formulaire et appeler des fonctions Model et Vue au besoin.  
Il faut coder **un** fichier Controler par **page** affichée ou écran.

## Vue
La Vue regroupe les fonctions qui concernent **l'affichage**, comme par exemple : les dossiers de fichiers html, phtml, css, js...

## Tools
On peut avoir besoin de fonctions plus **utilitaires** ou **générales** comme par exemple : fichiers de configuration, informations de connexion...  
Ces fichiers sont à placer dans un répertoire Config ou Tools...

## POO
MVC s'utilise volontiers avec la **programmation orientée objet (POO)**. Alors, chaque dossier regroupe en général des fichiers de **classe**.  
On peut utiliser le modèle MVC pour l'application aussi bien que ses composants, comme par exemple : une application en AJAX sur la base des langages PHP et Javascript peut présenter la structure de son dossier `vue/js` en MVC.