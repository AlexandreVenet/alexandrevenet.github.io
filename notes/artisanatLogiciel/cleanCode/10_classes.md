# Classes

Le 14-08-2025

Notes du chapitre 10

## Organisation

En Java, l'organisation d'une classe est la suivante.
- Constantes statiques publiques.
- Variables statiques privées.
- Variables d'instance privées.
- Variables d'instance publiques (si vraiment il y a une raison).
- Fonctions publiques.
- Fonctions privées.

Toujours respecter la règle de l'encapsulation. N'exposer un membre que si nécessaire.

## Petites classes

Les classes doivent petites, concentrées sur un concept. Délimiter le concept de la classe, c'est délimiter sa **responsabilité** (*Single Responsability Principle, SRP*).

Lorsqu'une classe a trop de responsabilités, c'est qu'elle couvre de nombreux concepts. La diviser en plusieurs classes.

Aucun inconvénient à avoir de nombreuses petites classes car le programme n'a pas plus de parties que le même programme structuré en grandes classes. Il y a autant à apprendre dans les deux cas.

## Cohésion

Les membres de la classe doivent être interdépendants et former une unité logique.  

Si des membres ne sont utilisés que par ou pour un sous-ensemble de la classe, alors c'est qu'un concept doit être pensé afin de créer une autre classe.

## Principe *Open-Closed*

Les classes doivent être ouvertes à l'extension mais fermées à la modification. C'est-à-dire que dans l'idéal, étendre le système ne doit pas modifier le code existant.

## Abstrait-concret

On dispose d'une classe concrète métier ? En abstraire le comportement dans une entité (interface, classe abstraite...). Ainsi, la classe concrète dépend d'un concept abstrait isolé, indépendant, réutilisable, tandis que sa responsabilité se concentre sur la mise en œuvre de cette abstraction.

