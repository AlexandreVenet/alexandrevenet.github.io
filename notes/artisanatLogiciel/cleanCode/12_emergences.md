# Émergences

Le 14-08-2025

Notes du chapitre 12

## Argument

Comment créer de bonnes conceptions à mesure que le travail avance ?

**Règle 1 : le code passe tous les tests.**
- Petites classes, responsables d'un seul concept ou objectif : faciles à tester.
- Réduire le couplage (abstractions, injection de dépendance...).

**Règle 2 : pas de redondance.**
- Nettoyer le code, factoriser, simplifier...
- Assurer l'expressivité (*patterns* *Command* ou *Visitor*, nommage...).
- Outil : *pattern* *Patron de Méthode* : une méthode dont le but est de seulement appeler d'autres méthodes dans un ordre précis.

**Règle 3 : exprimer les intentions du programmeur.**
- Tout ce qui précède doit rendre la conception claire au lecteur.

**Règle 4 : réduire le nombre de classes et méthodes.**
- La séparation des responsabilités peut conduire à augmenter le nombre de classes et de méthodes (ex : insister sur la création d'une interface pour chaque classe, insister sur la séparation des comportements et des structures de données...). Ne pas tomber dans le dogmatisme et rester pragmatique : le système global doit rester petit mais ce n'est pas la priorité.

