# Mise en forme

Le 14-08-2025

Notes du chaptre 5 : organiser un script.

## Verticalité

Une ligne de code représente une expression ou une condition. Un groupe de lignes représente une idée. Donc, pour repérer ces idées, elle doivent être séparées par des lignes vides.

Les concepts étroitement liés doivent être verticalement proches les uns des autres et ne doivent pas se trouver dans des fichiers séparés (sauf si justifié). Ceci afin que le lien entre ces concepts soit évident pour le lecteur ou la lectrice.

Puisque les fonctions sont courtes, alors les variables qui s'y trouvent peuvent se trouver en début de chacune d'elles.

Les variables de boucle doivent se trouver dans la zone de condition (sauf cas particulier).

Les variables d'instance se déclarent en début de classe (pas d'enfouissement).

Lorsqu'une fonction en appelle une autre, les deux doivent être verticalement proches, l'appelante au-dessus de l'appelée (règle des niveaux d'abstraction).

On peut regrouper des fonctions par affinité conceptuelle plutôt que par le fait qu'elles s'appellent les unes les autres, par exemple lorsqu'elles mettent en œuvre des variantes d'une même tâche.

## Horizontalité

Essayer de ne jamais écrire du code qui nécessite de faire défiler la page horizontalement. Et ceci sans avoir à modifier la taille de la police de caractères.

Associer les termes étroitement liés, espacer les autres. Dans le cas des mathématiques, on peut ainsi mettre en valeur la précédence des opérateurs.

```Java
nombreDeLignes++;
int tailleDeLigne = line.length();
(-b + Math.sqrt(determinant)) / (2*a);
```

Éviter les alignements de texte pour former des lignes de tableau car ceci nuit à la compréhension de chaque ligne.

Toujours indenter le code. S'aider de l'IDE qui peut proposer l'option d'afficher la ligne verticale pour chaque niveau d'indentation.

Il peut y avoir un intérêt à supprimer les retours à la ligne mais l'auteur préfère tout développer... sans justifier (je suppose que c'est par souci de fluidité de travail car reconstruire un corps avec indentation à partir d'une seule ligne crée de la friction simplement pour de la syntaxe et mise en forme). 

```Java
if(toto){ return null; }
AdditionnerDeuxEntiers(int a, int b) => a+b;
// Super, maintenant je dois ajouter d'autres instructions à ces choses.
```

Ne pas omettre des éléments de syntaxe comme le corps d'une boucle (je suis surpris de découvrir qu'il puisse manquer un corps à une boucle !).

## Travail d'équipe

Le formatage du code doit être formalisé, faire l'objet d'un document spécifiant chaque point et distribué aux membres de l'équipe. Les membres doivent respecter ces règles.
