# Introduction

Le 14-08-2025

Qu'est-ce que le *clean code* ?

## Référence

***Clean Code*** est le titre d'un livre, traduit en français « *Coder proprement* », écrit par Robert C. Martin et publié en 2009 chez Pearson. L'ouvrage s'adresse aux programmeurs et programmeuses qui veulent s'améliorer. Il rassemble les meilleures pratiques de **programmation** dans une approche ***Lean*** et d'**artisanat logiciel**. Les principes [SOLID](https://fr.wikipedia.org/wiki/SOLID_(informatique) "SOLID chez Wikipédia" _blank) sont une partie des conseils prodigués. 

On peut positionner *Clean Code* dans cette hiérarchie :
|Position|Nom|Description|
|-|-|-|
|**Fondation**|Ingénierie logicielle (*Software Engineering*)|Ensemble regroupant méthodologies, architectures, gestion de projet, assurance qualité... Exemples : *Lean*, *Scrum*, *CI/CD*, gestion des exigences.|
|**Valeurs**|Artisanat logiciel (*Software Craftsmanship*)|Sous-ensemble du précédent. Approche qui met l’accent sur le professionnalisme, l’amélioration continue, la fierté du travail bien fait et la transmission du savoir... Exemples : comment collaborer, apprendre, aider les autres à grandir.|
|**Pratiques**|*Clean Code* (code propre)|Sous-ensemble d'artisanat logiciel. Techniques d’écriture d’un code clair, lisible et maintenable.|
| |TDD (*Test-Driven Development*)|Sous-ensemble d'artisanat logiciel. Diriger le développement par les tests.|

Je présente ici mes notes de lecture, agrémentées parfois d'une mise en discussion en rapport à mon expérience personnelle. Les exemples ne sont pas nécessairement ceux du livre.

## Préface, introduction

Une personne est dite **professionnelle** :
- lorsqu'elle passe du temps à **réfléchir sur l'objectif** d'un projet et à le **planifier**,
- lorsqu'elle est **attentive aux détails**,
- lorsqu'elle suit des disciplines comme : **concentration**, **présence d'esprit**, **réflexion**.

1951 au Japon : nouvelle approche qualité dite **maintenance productive totale** (*TPM, Total Productive Maintenance*) qui se fonde sur les **5S**. Ce sont des règles de travail, nommées **disciplines**. Cela inspirera la **méthode *Lean***.

|Nom japonais|Action|Concept|Description|
|-|-|-|-|
|*Seiri*|S'organiser|Organisation|Savoir où se trouvent les choses (noms, catégories...).
|*Seiton*|Situer|Ordre|Une place pour chaque chose, une chose à sa place.
|*Seiso*|Scintiller|Nettoyage|L'espace de travail doit être dégagé et propre (pas de parasite, de pollution...).
|*Seiketsu*|Standardiser|Norme|S'accorder autour de la manière de conserver l'espace de travail propre.
|*Shutsuke*|Suivre|Education|Suivre des pratiques admises, réfléchir au travail effectué (le sien, celui des autres), penser l'évolution, évoluer...|

***Test Driver Development*** (*TDD*) : ne pas attendre la maintenance, faire plutôt les tests dès le début d'un développement.

Produire du code propre est un *travail difficile* (souligné par l'auteur).

