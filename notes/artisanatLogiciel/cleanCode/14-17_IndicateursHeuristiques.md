# Indicateurs et heuristiques

Le 14-08-2025

Notes des chapitres 14 à 17 : points non traités précédemment uniquement.

## Code mort

Du code jamais utilisé ou qui ne peut pas être utilisé doit disparaître. Exemple : un constructeur par défaut sans implémentation.

## Multiples langages

Un fichier source doit idéalement contenir un seul langage.

## Principe de moindre surprise

En utilisant le code, le lecteur ou la lectrice doit s'attendre à un résultat tel que le code le suppose. 

Si le codeur ou la codeuse fait une chose d'une certaine manière, toutes les choses comparables doivent être faite de cette manière (principe de moindre surprise).

Lorsqu'un comportement évident n'est pas implémenté, le lecteur ou la lectrice ne peut plus se fonder sur ses intuitions de compréhension. Par conséquent, il ou elle n'a plus confiance dans l'auteur ou l'autrice et doit alors s'en remettre à la lecture détaillée du code (effort).

Réaliser des entités selon leur concept. Exemple : la constante PI doit se trouver dans une classe de trigonométrie.

## Niveaux d'abstraction

Les concepts de bas niveau se trouvent dans la classe dérivée ; les concepts de haut niveau se trouvent dans la classe de base.

## Base qui ignore sa dérivée

Pas de classe qui fasse référence à sa ou ses classes dérivées. Exception : machines à états finis. Matérialiser la séparation par une organisation des dossiers ou espaces de noms.

## Limiter les informations

Éviter de réaliser des entités possédant trop de membres. Exemple : réduire le nombre de variables d'instance.

## Réduire le couplage

Les choses indépendantes ne doivent pas être couplées artificiellement. Ne pas déposer une entité dans une autre au seul motif que l'endroit semble pratique sur le moment.

## Staticité irrévocable

Préférer les méthodes non statiques aux statiques. Si je veux une fonction statique, alors je dois vérifier qu'il n'y ait aucune chance qu'elle doive un jour avoir un comportement polymorphe, concret, spécifique. Exemple : calculer la paie à l'heure... et demain avoir une fonction qui doive calculer la paie au mois.

## Variables explicatives

Du code illisible gagne en lisibilité en exposant des variables dites explicatives, c'est-à-dire en décomposant les calculs et opérations en entités intermédiaires.

## Pas de valeurs dans le code

Transformer les valeurs dans le code par des constantes, des `enum`...

## Encapsuler les conditions

Si une condition est incompréhensible dans un `while` ou un `if`, alors en faire une fonction bien nommée.

## Pas/Peu de négativité

Préférer une condition affirmative à une condition négative car cette dernière est plus difficile à comprendre.

## Justifier

Justifier ses choix. Rien ne doit paraître arbitraire pour le lecteur ou la lectrice.

## Pas de navigation transitive

Les composants ou modules ne doivent pas en savoir trop sur les autres ou sur l'architecture : n'exposer que l'essentiel. Par conséquent, un composant ne peut pas en appeler un autre pour en appeler un autre. Ex : pas de `a.getB().getC().Faire()`.

