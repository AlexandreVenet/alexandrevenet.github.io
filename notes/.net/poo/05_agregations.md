# Agrégations

Le 17-08-2024

Les relations entre objects.

## Agrégation simple

Dans l'agrégation simple (ou faible), une classe **utilise des objets qu'elle n'instancie pas**. Ces objets lui sont fournis, par exemple en argument de fonction, de constructeur... Si la classe utilisatrice est elle-même instanciée pour fonctionner, et si cette instance n'est plus utilisée, alors les objets qu'elle utilise lui survivent.

Exemple : `Voiture` possède une instance de `Moteur` mais cette instance de `Moteur` existe en dehors de `Voiture` car il n'est pas encore installé.

L'objet utilisateur est nommé **agrégateur**.

## Agrégation forte

Dans l'agrégation forte ou **composition**, une classe **utilise des objets qu'elle instancie**. Les objets sont instanciés dans la classe. Si la classe utilisatrice est elle-même instanciée pour fonctionner, et si cette instance n'est plus utilisée, alors les objets qu'elle utilise disparaissent car ils lui sont constitutifs.

Par exemple dans Unity, un objet ayant des composants a des relations de composition. L'objet *Player* ayant un `Rigidbody` **contient** une instance de la classe `Rigidbody`.

Précisons. D'abord, la composition est aussi désignée **agrégation par valeur**. Ensuite, la classe utilise des objets, c'est-à-dire des **types référence**, qu'elle instancie.

Rappelons : une classe est instanciée en mémoire *Heap*. La classe utilisatrice et les classes utilisées occupent toujours des espaces mémoire distincts. Or, pour créer une composition, il faut que le contenu soit « interne » au contenant et ceci ne peut s'effectuer qu'avec des **types valeurs**. Donc, en C# il est **impossible de créer une agrégation par valeur avec un type référence**.

Or, C# propose le type `struct` qui ressemble à une classe mais est de **type valeur**. Grâce à ce type, l'agrégation par valeur est possible, mais avec un type valeur et non pas un type référence (contournement de la difficulté). 

Maintenant, seul moyen de **s'approcher** de la composition avec des types référence : faire en sorte que **les objets internes ne soient jamais utilisés à l'extérieur** de la classe. En effet, dans le cas contraire, ils existent en mémoire, même si la classe utilisatrice disparaît ; s'ils ne sont jamais appelés, alors la durée de vie des objets internes correspond à celle de la classe les contenant (le *Garbage Collector* les élimine de la même manière).

