# Commentaires

Le 14-08-2025

Notes du chapitre 4

## Généralités

Le code doit être suffisamment expressif pour que tout commentaire soit inutile.

Le commentaire a ses risques : il peut être obsolète, erroné, lui-même confus, moins précis que le code.

## Pas de compensation

Ne pas compenser un mauvais code par un commentaire ; préférer réorganiser le code ou le décomposer en entités dont le nom clarifie les concepts utilisés.

## S'expliquer par le code

Au lieu de décrire des instructions complexes, envelopper cette complexité dans une fonction dont le nom est clair. Comparer :

```JS
// Vérifier si l’employé peut bénéficier de tous les avantages.
if ((employee.flags & HOURLY_FLAG) && (employee.age > 65))
```

```JS
if (employee.isEligibleForFullBenefits())
```

## Remplacer par directives

Le commentaire pour signifier qu'une instruction apparaît en *Debug* ou *Release* peut être remplacé par une **directive de préprocesseur**.

```C#
#if DEBUG
	Console.ReadKey();
#endif
```

## Le bon commentaire

Les informations légales sont des éléments nécessaires que l'on place en commentaire en début de fichier. Ne pas écrire les termes du contrat ; préférer faire référence à un document spécifique prévu à cet effet. Voici un exemple de contenu suffisant :

```JS
// Copyright (C) 2003, 2004 par Tutu La Praline. Tous droits réservés.
// Publié sous les termes de la Licence Publique Générale de GNU version 2 ou ultérieure.
```

Le commentaire est justifié lorsqu'il éclaire une intention de l'auteur.

```JS
// Voici notre meilleure solution pour obtenir une condition de concurrence.
// Nous créons un grand nombre de threads.
```

Le commentaire est justifié lorsqu'il éclaire une instruction complexe sur laquelle on ne peut pas intervenir, comme par exemple le code de la bibliothèque standard.

```Java
assertTrue(a.compareTo(a) == 0); // a == a
assertTrue(a.compareTo(b) != 0); // a != b
assertTrue(ab.compareTo(ab) == 0); // ab == ab
assertTrue(a.compareTo(b) == -1); // a < b
assertTrue(aa.compareTo(ab) == -1); // aa < ab
assertTrue(ba.compareTo(bb) == -1); // ba < bb
assertTrue(b.compareTo(a) == 1); // b > a
assertTrue(ab.compareTo(aa) == 1); // ab > aa
assertTrue(bb.compareTo(ba) == 1); // bb > ba
```

Le commentaire est justifié lorsqu'il informe de conséquences ou sert à alerter.

```JS
// Ne pas exécuter, sauf si vous avec du temps à tuer
writeLinesToFile(10000000);
```

Le commentaire "À faire" est justifié car il explique pourquoi une implémentation est inachevée.

## Ne pas cacher la misère

Pas de commentaire en remplacement de code, par exemple dans un `catch` qui ne contient aucune instruction !

## Pas de redondance

Une instruction claire n'a pas besoin de paraphrase, voire de redite.

```C#
private int jourDuMois; // Le jour du mois
```

## Commentaires obligés

L'auteur considère qu'une fonction claire n'a pas besoin de documentation dans le code. Je trouve cela discutable, car il est déroutant que certaines fonctions disposent d'une documentation (IntelliSense par exemple) et pas d'autres (effort d'harmonisation).

## Le *versioning* à la rescousse

Il n'est plus nécessaire d'ajouter l'historique de modifications d'un script dans un commentaire car les outils de *versioning* fournissent cette fonctionnalité sans alourdir le code.

De même, inutile d'ajouter un commentaire indiquant qui a modifié quoi car l'outil de *versioning* est mieux adapté pour gérer ce genre d'information.

## Marqueurs de section

Utiliser les titres de sections avec parcimonie car si on les repère facilement, ils encombrent aussi facilement.

```JS
// Titre ////////////////////
```

## Commentaires d'accolade fermante

Eviter les commentaires de rappel de bloc à l'accolade fermante, par exemple dans le cas de blocs `while`, `try... catch`, `if` imbriqués. Préférer décomposer le tout en fonctions.

## Pas de code en commentaire

Le code en commentaire doit être supprimé car le lecteur en ignore le degré d'importance.

## Pas d'entities HTML

Le commentaire HTML est illisible, l'éviter.

## Commentaire local

Le commentaire concerne du code proche de lui et non pas des parties éloignées.

## Peu d'informations

Les discussions n'ont rien à faire dans le code et se trouveront mieux placées dans un document dédié.

## Lien non évident

Le lien entre le commentaire et le code doit être évident. Pas de devinettes ou de concepts sans rapports avec le code.

