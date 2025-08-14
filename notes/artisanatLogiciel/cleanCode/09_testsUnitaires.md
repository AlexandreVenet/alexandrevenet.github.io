# Tests unitaires

Le 14-08-2025

Notes du chapitre 9 : tester prend sans doute plus de la moitié du temps de développement applicatif. Les tests doivent pouvoir s'effectuer rapidement, facilement, simplement.

## Principes du TDD

1. Ne pas écrire un code de production tant qu'il manque un test unitaire.
2. Écrire les tests unitaires suffisants pour échouer (dont l'impossibilité de compiler).
3. Écrire le code de production suffisant pour réussir le test.

## Qualité

Un test doit être de même qualité que le code testé, sans quoi on reproduit les mauvaises pratiques critiquées dans ce livre ! 

En revanche, le code de test n'a pas nécessairement besoin d'être aussi efficace que le code de production car là n'est pas son objectif.

## Certitude

Si le code passe le test, alors on acquiert la certitude que le code fonctionne. On n'a donc pas à craindre de modifier la production avec les nouvelles fonctionnalités. 

## Un concept par test

Le test couvre un concept, un comportement et non plusieurs. Sinon, le lecteur ou la lectrice doit déterminer pourquoi le test est divisé en sections.

## Méthode FIRST

|Nom|Description|
|-|-|
|***Fast***|Le test doit être rapide, lancé fréquemment.|
|***Independent***|Un test ne dépend pas d'un autre, est exécuté indépendamment des autres.|
|***Repeatable***|Un test doit pouvoir être reproduit dans n'importe quel environnement (production, assurance qualité, portable, ordinateur...) où l'application est supposée fonctionner.|
|***Self-validating***|Le résultat du test est binaire : échec ou succès. Ceci afin d'éviter l'interprétation et la subjectivité.|
|***Timely***|Le test doit être écrit au moment opportun. Test unitaire avant le code de production ; sinon, un programme trop gros dissuade de le tester.|

## Tests triviaux

Un test trivial doit aussi être effectué car on veut la certitude qu'il est couvert et non pas seulement le supposer.

