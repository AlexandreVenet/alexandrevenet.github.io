# Introduction

Le 22-08-2024

Architecture modèle pour résoudre un problème.

## Présentation

Un **patron de conception (*design pattern*)** est une solution connue, éprouvée, générale, permettant de résoudre un problème courant. Par exemple, la fonction, *design pattern* pour assembleur, est si utile qu'elle est devenue un élément de base de programmation dans les langages. 

Les *design patterns* peuvent être utilisés quel que soit le **paradigme de programmation** : fonctionnel, impératif, orienté objet. Mais certains d'entre eux peuvent n'être développés que pour un paradigme en particulier (*Template Method* par exemple pour l'orienté objet).

Un *design pattern* n'est pas lié à un langage en particulier car il est un **plan général** utilisable quelque soit le langage. **L'implémentation d'un patron de conception est spécifique, contextuelle,** car elle dépend de l'environnement de développement, du langage utilisé, du projet (exemples : trouver une implémentation d'un concept qui n'existe pas dans tel langage, cas de l'utilisation en contexte *multi-thread*).

L'utilisation de patron de conception peut paraître nécessaire ou superflue, générer de la simplicité ou de la complexité. La personne ou l'équipe développant l'application ne doit pas ajouter de complexité inutile si aucun avantage n'est obtenu en implémentant un patron de conception. D'autre part, une solution pertinente, adaptée au projet (contexte, but, métier...) peut aussi bien convenir qu'un patron de conception.

Les langages sont inégaux en terme de *design patterns*. Par exemple, C# propose des librairies de *design patterns*, Python en intègre jusque dans sa syntaxe.

Les *design patterns* sont **hiérarchiques**. Certains ont besoin de *design patterns* plus simples pour fonctionner. Ces motifs plus simples sont alors appelés *design patterns* **de base**.

La notion de patron de conception hérite ou s'inspire du travail de **Christopher Alexander** (1936-2022), architecte et théoricien ayant contribué à la **conception par schémas** dans l'**architecture**.
- Répétabilité et réutilisabilité : des solutions peuvent être réemployées dans divers contextes.
- Modélisation de l'expérience : les schémas architecturaux doivent répondre au besoins humains, permettre de créer des espaces où se sentir bien.
- Structure et cohérence : les schémas visent à apporter une cohérence et de la beauté au moyen d'une structure harmonieuse.
- Collaboration : les schémas sont un langage commun aux architectes, utilisateurs et utilisatrices.
- Empirisme : les schémas émergent des pratiques reconnues, observées, c'est-à-dire de l'expérience.

Il existe différents ensembles de patrons de conception, créés par différents auteurs.
- *Design Patterns - Elements of Reusable Object-Oriented Software* de Erich Gamma, Richard Helm, Ralph Johnson et John Vlissides. On surnomme les auteurs le *Gang of four*. 
- Patrons GRASP, créés par Craig Larman.
- *Entreprise Design Patterns* de Martin Fowler.

Sources :
- [Wikipédia Christopher Alexander](https://fr.wikipedia.org/wiki/Christopher_Alexander _blank)

## Patron du *Gang of Four (GoF)*

Les patrons de conception du GoF sont divisés en catégories.
- **Patrons de création** : créer et configurer des objets.
- **Patrons de structure** : organiser des entités.
- **Patron de comportement** : distribuer les responsabilités.

## Références

J'ai rédigé ce dossier à partir des sources suivantes, que l'on consultera avec profit.
- [Refactoring Guru](https://refactoring.guru/fr/design-patterns _blank)
- [Patrons de conception chez Wikibooks](https://fr.wikibooks.org/wiki/Patrons_de_conception _blank)
- [Wikipédia *Design pattern*](https://en.wikipedia.org/wiki/Software_design_pattern _blank)
- [Wikipédia Patron de conception](https://fr.wikipedia.org/wiki/Patron_de_conception _blank)
- [Wikipédia GRASP](https://fr.wikipedia.org/wiki/GRASP_(programmation) _blank)

Les autres références plus spécifiques sont mentionnées dans chaque page.
