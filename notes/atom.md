# Atom : choses utiles

## Markdown preview
Ceci est un fichier Markdown. Dans Atom, `CTRL MAJ m` pour **prévisualiser en temps réel**. Peut ne pas fonctionner lorsque la commande est lancée une première fois dans l'éditeur ouvert, alors recommencer.

## Community Packages (nom - auteur)
- **Atom-beautify** - Glavin001
- **color-picker** - thomaslindstrom
- **file-icons** - file-icons
- **lorem** - shilingp
- **nms-color-bracket** - nmscholl
- **open-in-browser** - magbicaleman
- **pigments** - abe33
- **emet** - emetio
- **french-menu** - lamboley
- **minimap** - atom-minimap
- **platformio-ide-terminal** - platformio
- **sass-autocompile** - armin-pfaeffle

## Core Packages à traiter
- **wrap-guide** : désactiver ou paramétrer selon l'envie
- **spell check** : désactiver "use locales". Ce package évalue les mots sur la base du dictionnaire système (seul l'EN-us est prévu par atom pour le moment, donc inutile en FR)

## Thèmes
- **One Dark** (ui/syntax)
- **One Light** (ui/syntax)
- **mdn** (syntax)
- **two** (syntax) : version améliorée de One Dark (syntax)

## Commentaires
Pour chercher **tous les commentaires d'un document**, cocher l'option "regEx" du champ de recherche puis entrer :
- type `//...` : rechercher `//.*`
- type `/*...*/` (sans retour chariot) : rechercher `/\*.*\*/`

## Raccourcis
- En HTML, `Tab` permet de passer d'une **propriété** à une autre.
- `CTRL /` marque la ou les **lignes en commentaire**, quel que soit le langage, que la ou les lignes soient vides ou pas.
- `CTRL L` **sélectionne la ligne** (fonctionne aussi sur plusieurs lignes).

## Snippets
Pour modifier les **snippets** : menu `File/Snippets`.

**Exemple** : on veut créer un snippet dont le code est `html` et qui écrit dans un fichier html une structure de page par défaut.
1. Ouvrir les `settings`.
2. Aller dans `packages`.
3. Entrer "html" dans le champ de recherche.
4. Dans la liste, sélectionner `langage-html`.
5. Chercher "scope" dans la page affichée. Copier la valeur qui est `.text.html.basic`.
6. Aller dans le menu `File/Snippets` (ou ouvrir le fichier `snippets.cson`).
7. Créer le nouveau snippet avec la valeur copiée et enregistrer le document.
9. Dans un fichier html vide, entrer `html`. Un menu apparait indiquant la liste de commandes possibles. Choisir l'entrée désirée (`touche entrée` ou `click souris`).

```
'.text.html.basic':
  'HTML5 base perso':
    'prefix': 'html'
    'body': """
		<!DOCTYPE html>
		<html lang="fr">
			<head>
				<meta charset="utf-8">
				<title>Document</title>
				<meta name="author" content="Nom...">
				<meta name="description" content="Description...">
				<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
				<link rel="stylesheet" href="styles.css">
			</head>
			<body>

				<header>
				</header>

				<main>
				</main>

				<footer>
				</footer>

				<script src="script.js"></script>
			</body>
		</html>
	 """
```
