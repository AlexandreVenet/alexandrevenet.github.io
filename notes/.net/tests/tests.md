# Tests

Le 06-09-2024

Tester le code pour s'assurer de son fonctionnement.

## Introduction

Un **test** consiste en une série de méthodes qui s'exécutent sur le code du produit et qui renvoient un résultat positif ou négatif sur la base de critères, d'affirmations. Le but du test est de **vérifier le bon fonctionnement de tout ou partie du programme**.

Les tests sont du **code supplémentaire au code du produit**. Les tests servent à la qualité, la maintenance, mais ne sont **pas livrés avec l'application**. Il sont exécutés en tant qu'application à part entière.

Les tests doivent être **reproductibles**.

Voici un exemple d'insertion de test au cours du travail de développement.
1. Ajouter une fonctionnalité.
2. Tester la fonctionnalité.
3. Identifier les erreurs.
4. Corriger le test et/ou la fonctionnalité.
5. Revenir en étape 2. tant que le résultat n'est pas OK.
6. Publier.
7. Recueillir des retours.
8. Passer à la fonctionnalité suivante.

On parle de **couverture de tests**, de **code couvert par les tests**, lorsque le code produit fait l'objet de tests. Un IDE comme Visual Studio présente la couverture du code par les tests, par exemple en ajoutant au-dessus de la signature de méthode le résultat du test qui concerne celle-ci.

## Types de test

Il existe différents types de test, chacun ciblant une partie du produit. Ces tests sont catégorisés par niveaux hiérarchiques. Il n'y a pas de structure unique, chaque entreprise pouvant adopter une architecture différente (par exemple, la recette peut être le terme utilisé pour recouvrir plusieurs étapes de tests ou bien consister en une étape spécifique).

Au plus bas niveau, on trouve les **tests unitaires**. Faciles à écrire, à maintenir, rapides à exécuter, ils sont spécifiques d'une méthode, d'une petite unité de code. Une méthode peut avoir de nombreux tests unitaires pour couvrir toutes ses fonctionnalités, ses cas de valeur d'entrée par exemple.

Les prochains niveaux voient les tests devenir plus difficiles à écrire, à maintenir, à établir ; ils sont aussi moins fréquents car plus généraux ou abstraits. 

Les **tests d'intégration** couvrent plusieurs méthodes ou un ensemble d'unités de code ou encore une procédure utilisant plusieurs fonctionnalités. Ils sont plus larges que les tests unitaires. On parle d'intégration en référence à l'action d'insérer dans le code du produit la petite unité de code ayant fait, elle, l'objet de tests unitaires.

Les **tests de performance** capturent généralement le temps nécessaire à l'exécution de certaines parties du programme (vitesse d'exécution contrôlée par minuterie, chronomètre).

Les **tests de charge** permettent de déterminer si l'application reste fonctionnelle, performante (temps de réponse évalué précédemment), lorsqu'elle est de plus en plus sollicitée. Par exemple, comment le programme se comporte-t-il avec 10 utilisateurs, puis 100, puis 1000 ?

Les **tests d'acceptation**, autrement nommée la **recette**, servent à vérifier la conformité du produit avec les spécifications, attentes formulées. 

Les **tests utilisateur final** évaluent les interactions entre l'*User Interface (UI)* et la personne utilisant le programme. Ils peuvent être automatisés dans une certaine limite, par exemple avec UIPath, Cypress, PlayWright. Ces tests organisés de façon manuelle ou automatisée sont complémentaires car leurs résultats sont **quantitatifs** ou **qualitatifs**. L'avantage de test avec personnes réelles est qu'il apporte plus de confiance dans le fait que le programme est prêt au déploiement.

## Approches

Plusieurs approches existent pour effectuer des tests ou les utiliser pendant la phase de développement.

L'approche ordinaire ou naïve consiste à effectuer les tests une fois la fonctionnalité terminée, voire (pire) lorsqu'une erreur survient une fois l'application en production ! Dans les faits, cette approche n'est pas sérieuse et est très coûteuse pour l'entreprise : temps de travail, qualité, coût financier, baisse de confiance des clients, dégradation de la réputation...

Le ***Test Driven Development (TDD)***, ou **développement piloté par les tests**, est une méthode qui consiste à coder la fonctionnalité à partir des tests possibles qui la concerne. Les tests sont considérés prioritaires, premiers, et non pas une réflexion après-coup.

Le ***Behavior Driver Development***, ou **développement orienté comportement**, se concentre sur les tests d'acceptation. Il s'agit de travailler avec les clients, partenaires, responsables, pour rédiger les critères du produit. En général, ces tests sont en fait des descriptions de fonctionnalités, de leur portée. Ils sont à rapprocher des *user-stories* de l'agilité.

## Rédaction

Une méthode est testées sur ses éventuels paramètres, son comportement interne (pointeurs `null`, exceptions non capturées...), sa valeur de retour éventuelle. Ne pas s'étonner qu'une méthode présente de nombreux tests ; c'est le signe d'une excellente réflexion sur les erreurs ou échecs possibles. Tout ceci doit être rédigé, ce qui conduit à l'établissement d'un **cahier de tests**. Ce peut être un tableau.

|Catégorie|Test/Entrée|Résultat|État|Notes|
|-|-|-|-|-|
|...| | | | |
|**Rubrique xxx**| | | | |
|Get()|Sans paramètres|Erreur orange PHP|KO|Erreur attendue car signature de méthode non respectée|
|Get()|Paramètre 1 `...`, paramètre 2 `abc`|403 forbidden|KO|Erreur attendue car `...` valeur invalide et entité `abc` inexistante|
|...| | | | |
