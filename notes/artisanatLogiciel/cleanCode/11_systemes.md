# Systèmes

Le 14-08-2025

Notes du chapitre 10

## Construction/Utilisation

Séparer les préoccupations est essentiel. Opérer dans l'ordre :
1. le processus de démarrage : la **construction**,
2. la logique d'exécution : l'**utilisation**.

Une solution consiste à déplacer dans `main()`, ou des modules appelés par cette fonction, tout ce qui concerne la construction. On suppose ensuite que tous les objets sont disponibles. Enfin, ces objets sont passés à l'application proprement dite. Ainsi, l'application reste séparée du processus de démarrage.

Maintenant, si la responsabilité de la création d'instances doit être laissée à l'application, alors utiliser le *design pattern* Fabrique Abstraite qui s'occupera de cette opération de démarrage. Ainsi, même dans l'application, la construction est séparée de l'utilisation.

L'**injection de dépendance** est une autre solution. Un objet ne doit pas lui-même prendre en charge l’instanciation des dépendances dont il a besoin. Au lieu de cela, il laisse cette responsabilité à un autre mécanisme, ce qui est dit « inverser le contrôle ». Ce mécanisme « faisant autorité » est soit la méthode principale, soit un conteneur à usage spécifique. Et c'est dans ce mécanisme qu'on envoie (injecte) les dépendances à l'objet en question (cet objet peut être d'une certaine manière vu comme passif).

## Grandir, décider : la modularité

L'architecture d'un logiciel peut grandir si la **séparation des préoccupations** reste adéquate.

L'auteur préconise le développement dit modulaire : créer des **modules** respecte la règle de séparation des préoccupations. Ces modules eux-mêmes peuvent faire appels à d'autres entités autonomes, ce qui respecte encore la règle.

La séparation des préoccupations décentralise la gestion et la prise de décision. Les décisions doivent être reportées au dernier moment.

Je laisse de côté les détails sur la programmation orientée aspects.

## Langage propre à un domaine

Un logiciel peut accueillir ou proposer un langage propre (*DLS, Domain-Specific Language*). C'est un langage petit, indépendant, pour l'écriture de scripts ou des API développés dans des langages standards. Ce langage propre à un domaine réduit les erreurs car sa syntaxe ne couvre pas toutes les fonctionnalités (sa portée est plus petite que le langage standard).

