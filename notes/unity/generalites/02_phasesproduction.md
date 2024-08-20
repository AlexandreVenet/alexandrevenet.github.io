# Phases de production

Le 10-08-2024

Les différentes étapes de réalisation d'un jeu-vidéo.

## Présentation

La réalisation d'un jeu-vidéo est un travail divisé en parties appelées **phases de production** :
1. **préproduction** : planning, prototype, définition de la *pipeline*, conception,
2. **production** : création du produit et de ses *assets* comme les images 2D, les modèles 3D, l'audio, la lumière et tout ce qui concerne l'expérience utilisateur,
3. **post-production** : le travail effectué une fois le produit final achevé. Ce travail recouvre l'assurance qualité, l'édition, les tests et corrections de bugs, la finition,
4. **operations** : une fois le produit publié, cette phase recouvre les ventes, la monétisation, les mises à jour et la maintenance.

## Préproduction

Dans cette phase, on ***conçoit*** le projet.

Les coûts de changement étant faibles, on peut explorer plusieurs directions, idées. On réalise des **prototypes** concentrés sur le cœur de l'application afin de produire un ***minimum viable product (MVP)***.

Une fois un produit minimum viable validé, les studios produisent un **document de conception** (*design document*) définissant la direction du projet. 

- Pour un film d'animation, cela recouvre le **script**, le **storyboard**, définir le contenu, le style et l'ambiance des cènes.
- Pour un jeu, c'est le document de ***game design*** incluant l'histoire, le *gameplay*, la direction artistique, la cible visée et l'accessibilité. On définit par exemple le **flux de jeu** (*game flow*) qui désigne les étapes de l'expérience du joueur, représenté par un graphique.

Le document prévoit également l'**échéance** (*deadline*) de réalisation générale et par poste (voir le chapitre dédié).

À la fin de la pré-production, un produit est présenté à l'entreprise ou à des investisseurs et, si accepté, il « reçoit le feu vert » (*green-lit*) pour passer en production.

## Production

C'est la phase la plus longue et la plus chère de la création du produit. Elle rassemble les artistes, les développeurs, les managers et directeurs. L'objectif est de **réaliser** ce qui a été imaginé dans le dossier de conception.

Les concepts sont transformés en modèles, les storyboards en séquences animées, les prototypes en applications optimisées, la liste des caractéristiques en expériences utilisateur. Selon le domaine, ce travail implique des employés issus de départements variés.

Un **producteur** (*producer*) supervise le travail et prend les décisions, gère l'équipe de façon à respecter l'échéance prévue. Il prévient le *feature creep*, la tendance séduisante et risquée consistant à ajouter de nouvelles caractéristiques au lieu de s'en tenir à celles convenues en préproduction.

On peut utiliser un logiciel de **contrôle de version** pour contrôler l'ajout de contenu des différents départements (voir le chapitre idoine). Cela permet :
- contrôler où les **changements** ont été effectués dans le temps,
- revenir à une **version antérieure** du projet si nécessaire,
- connaître la **contribution** des membres de l'équipe.

Exemples de logiciels de contrôle de version : [Github](https://github.com/ "Github"), [Unity Plastic SCM](https://unity.com/fr/products/plastic-scm "Unity Plastic SCM").

## Post-production

Ici, le projet est évalué, édité, corrigé, finalisé. Il passe par le service de ***quality assurance (QA)***. Cela inclut :
- l'***alpha testing*** : tests effectués en interne pour identifier des problèmes et améliorations possibles,
- le **beta testing** : tests effectués par des utilisateurs finaux éventuels dans l'environnement dans lequel le produit sera utilisé une fois terminé.

En général, ces deux phases produisent une longue liste de bugs (*bug report tracking*) et de demande de fonctionnalités (*feature requests*). Cette liste est ordonnée ensuite par **priorités** ; pour réaliser cet ordre on se pose des questions comme « Que choisir entre corriger un bug qui **pourrait** rendre l'expérience 5% plus mauvaise et réaliser fonctionnalité demandée qui rendrait **certainement** l'expérience 50% meilleure ? »

Des outils : [Github](https://github.com/ "Github"), [Jira](https://www.atlassian.com/fr/software/jira "Jira").

En général, un ***bug report*** contient : 
- un **titre**, 
- un **résumé**,
- un **descriptif long** avec l'impact sur l'expérience utilisateur,
- la **fréquence** du bug (chaque fois, la plupart du temps, au hasard, rarement),
- les **étapes de reproduction** précises et détaillées sans information supplémentaires,
- des **observations** : pistes de résolution, tout détail éventuellement impliqué...

Plus d'info : [L'art du *bug report* chez MinistryOfTesting](https://www.ministryoftesting.com/dojo/lessons/the-art-of-the-bug-report "L'art du bug report chez MinistryOfTesting")

La phase de post-production se termine avec la sortie du produit au public.

## Opérations

Cette phase recouvre les ventes, les statistiques, la monétisation, les mises à jour et la maintenance. Le contenu de cette phase peut varier selon le domaine du produit.

Exemple pour le **jeu-vidéo** :
- **assistance** (*support*) : gérer les questions, demandes et problèmes exprimés par les utilisateurs et partenaires,
- **monétisation** : achats *in-app*, publicités dans le jeu, pour gagner des revenus,
- **statistiques** (*analytics*) : suivre et analyser les données utilisateurs pour repérer les changements nécessaires à une fonctionnalité du jeu, à la stratégie commercial ou financière,
- **maintenance du site web** : gérer et mettre à jour le site web qui promeut et vend le produit,
- **finance et vente** : publicité, relations publiques, partenariats, et autres stratégies pour promouvoir le produit.

Cette phase se poursuit tant que le produit est en vente. Cette phase est achevée lorsque le produit est considéré **abandonné**, **déprécié** ou **obsolète** ou **caduc**.

Cette phase est l'occastion de réaliser une **retrospective** avec l'équipe de travail où chaque agent peut apporter un témoignage, une critique, sur toutes les étapes de réalisation. Ceci est un bon moyen d'établir trois catérogies d'actions présentées en colonnes :
- ***start doing***,
- ***stop doing***,
- ***continue doing***.

## Usage d'Unity

A quoi sert Unity dans ce processus de création ?

- Pré-production : réaliser des prototyes et storyboards, tester des angles de vue caméra.
- Production : réaliser le projet dans un environnement en temps-réel et intégrant toutes les ressources.
- Post-production : tester les fonctionnalités, analyser et optimiser les performances, exporter sur différentes plateformes.
- Opérations : monétiser le produit à travers des publicités et achats in-app, adresser des corrections de bugs, mettre à jour et étendre le produit.

Utiliser un environnement en temps réel permet de **lisser** les phases de création en fournissant des éléments aux différentes phases (assets, retours utilisateur sur une fonction, correction de bug...).

Exemple pour un film : [Réalisation de film avec le temps réel](https://unity.com/solutions/real-time-filmmaking-explained#new-and-improved-workflow "Réalisation de film avec le temps réel")

Unity couvre également différents domaines de création et répond à leurs besoins spécifiques :
- ***gaming*** : toutes phases de création,
- **animation** : préproduction, production et finitions en post-produciton,
- **film** : préproduction et production pour prototypes et visualisations rapides d'une idée,
- ***AEC (architecture, engineering, and construction) & ATM (automotive, transportation, and manufacturing)*** : préproduction et production pour réaliser des app AR/VR.
