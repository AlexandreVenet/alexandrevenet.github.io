# Prefab

Le 26-05-2022

Les modèles d'objet.

## Primitives

Unity fournit des ***primitives***, par défaut à des dimensions de 1 unité (mètre) : 
- **cube** et **sphère** : il et elle présentent leur `Collider` spécifique, 
- **capsule** et **cylindre** : hauteur de 2 unités, `Collider` de capsule,
- **plan** : surface plane subdivisée en 100 points (*vertices*, *vertex*, c'est-à-dire des sommets), pas d'épaisseur, la visibilité change selon une hauteur 1 ou -1,
- **quad** : surface plane non subdivisée, 4 points, 2 triangles, pas d'épaisseur, la visibilité change selon une hauteur 1 ou -1.

Toute face 3D n'est par défaut visible que d'un côté.

Les primitives sont des `GameObjects`, au même titre qu'un objet vide. Et tous ces objets peuvent être **imbriqués**. Ces imbrications peuvent être **sauvegardées** en l'état pour être **réutilisées**, ce sont des ***prefabs***.

## *Prefab*

Doc officielle : 
- [*Prefabs*](https://docs.unity3d.com/Manual/Prefabs.html "Prefabs" _blank),
- [*Prefab variants*](https://docs.unity3d.com/Manual/PrefabVariants.html "Prefab variants" _blank).

Un ***prefab*** est un **modèle** pour ses objets-instances ; objet préconfiguré, préconstruit, préfabriqué, et donc ne nécessitant pas d'être reconfiguré. Cela peut concerner toute sorte d'objets, rendus ou non.

Ses **instances** sont des copies liées à l'*asset* originel qui se trouve dans le *Project*. Ainsi : 
- tout changement sur le *prefab* originel est répercutable sur ses instances. Cela permet d'accélérer la modification (aspect, style) ou le *debug* (erreurs d'objet). Ceci est très utile pour des objets utilisés très souvent comme par exemple des plateformes,
- chaque instance peut être modifiée indépendamment du *prefab* originel,
- l'**imbrication** de *prefabs* est possible,
- un *prefab* peut être décliné en ***prefab variants***, c'est-à-dire des variations spécifiques d'un même objet et héritant du *prefab* initial.

Un *prefab* est automatiquement généré lorsqu'un objet de la *Hierarchy* est déplaçé dans la fenêtre *Project*.

Dans la fenêtre *Project* sont affichés les éléments du projet. Lorsqu'un *prefab* est sélectionné, le chemin complet apparaît en barre de statut : c'est un fichier `.prefab`. 

Les *prefabs* sont représentés en bleu avec une icône de cube plein (alors que les éléments par défaut sont des cubes vides gris). Les *prefab variants* sont représentés en bleu avec icône hachurée.

## Manipulations

Un objet peut être **converti** en *prefab*. Alors, un nouveau jeu de boutons est ajouté à l'*Inspector* :
- `select` : sélectionner le *prefab* originel dans la fenêtre *Project* (utile lorsqu'on a plein d'objets et qu'on n'y voit plus rien),
- `revert` : supprimer toutes les modifications qui ne sont pas dans le *prefab* originel,
- `overrides` : menu déroulant affichant les modifications apportées. En fin de liste : 
	- `revert all` : supprime les modifications apportées dans le menu `overrides` (et pas toute modification ; pour ça, utiliser `revert`),
	- `apply all` : distribuer les modifications apportées sur toutes les instances et le *prefab* originel.

Une bonne pratique est de préparer son objet **puis** d'en faire un *prefab* dans un dossier spécifique `Prefabs`. Ce faisant, si une fenêtre d'alerte apparaît, on a le choix entre :
- `Original Prefab` pour créer un **nouveau** *prefab*,
- `Prefab variant` pour créer une **variation**.

Pour **instancier** un *prefab* :
- l'ajouter manuellement à la scène ou la *Hierarchy*,
- en C#, utiliser la méthode `Instantiate()` avec une référence.

Pour **modifier** un *prefab* **en l'ouvrant** : 
- en *Hierarchy*, cliquer sur le chevron à droite du nom de l'instance,
- en *Project*, double cliquer sur le *prefab*,
- sauvegarder les modifications est nécessaire avant de sortir de l'édition du *prefab*.

Pour **modifier** un *prefab* dans la **scène** :
- déplier la *Hierarchy* et éditer les éléments,
- les composants modifiés ou ajoutés à l'instance présentent une icône agrémentée d'un `+`.
