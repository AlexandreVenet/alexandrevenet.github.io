# Code propre

Le 14-08-2025

Notes du chapitre 1

## Argument

**Programmer, coder** : représenter, exprimer les exigences de conception, et ceci dans un niveau de détail (ou avec une précision) qui permette à une machine de les exécuter.

Programmer ne disparaîtra pas car il faut toujours spécifier des exigences dans le détail pour qu'elles soient exécutées. « Inutile de penser à une machine qui produirait des opérations à partir de vagues sentiments. »

Si coder, c'est représenter, exprimer les exigences dans le détail (ou de façon précise), qu'est-ce que la **conception** ? C'est le discours sur l'architecture : schémas, justifications, choix... La conception, ses exigences, sont formulées en langue naturelle ; mais le code, lui, exprime, représente toutes ces exigences de façon technique. Donc, le code dépend de la conception. Par conséquent, mauvaise conception implique mauvais code. La réciproque n'est pas vraie : une bonne conception n'implique pas nécessairement un bon code car il faut savoir comment représenter, exprimer correctement la conception.

Principes du mauvais code : 
- le désordre, 
- le manque de soin, 
- le manque d'attention aux détails, 
- la négligence, 
- la trop grande quantité de dépendances, 
- la logique confuse.

Le mauvais code a des conséquences : 
- évolution du produit difficile,
- maintenance difficile,
- surcoût lié au recrutement de développeurs supplémentaires pour réparer,
- augmentation du mauvais code,
- incompréhension croissante,
- diminution de la productivité.

Principes du code propre :
- organisation,
- attention au détail,
- dépendances minimes,
- logique exposée, simple, sans ambiguïté,
- rend lisible la conception de l'auteur,
- simple, 
- facile à lire,
- gestion des erreurs totale (tests unitaires et tests de recette),
- performances proches de l'idéal,
- noms significatifs,
- propose une manière de faire (et non pas plusieurs),
- suffisant (réduire le nombre d'entités),
- sans redondance,
- petites abstractions faciles à réutiliser, modifier.

