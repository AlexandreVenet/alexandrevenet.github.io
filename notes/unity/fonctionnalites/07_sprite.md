# *Sprite*

Le 19-11-2021

Le *sprite* est un objet 2D présentant une image appelée texture.

## Présentation 

La **texture** est une **image importée**. On en paramètre les propriétés en cliquant sur l'*asset* dans la fenêtre *Project*.

En général, utiliser des **multiples de 2** pour les dimensions des images : 
- lors d’un zoom, si on a une image de 3x3 pixels, les colonnes et lignes de milieu vont être interpolées sur les deux autres, ce qui altère le rendu final (effet de bavure),
- 2 est adapté car le processeur utilise un format binaire,
- exemples : 512x512, 1024x512, 1024x1024...

Les textures du projet sont éditables dans l'outil **Sprite Editor**, *package* installé par défaut dans un projet 2D mais qu'il faut installer dans un projet 3D (à partir du ***Package Manager***).
- [Learn Introduction Sprite Editor](https://learn.unity.com/tutorial/introduction-to-sprite-editor-and-sheets "Learn Introduction Sprite Editor" _blank),
- [Documentation Sprite Editor](https://docs.unity3d.com/Manual/SpriteEditor.html "Documentation Sprite Editor" _blank).

## *SpriteSheet*

L'image peut être une ***spritesheet***, c'est-à-dire une image contenant des *sprites* séquentielles, les **poses pour une animation**.

Une fois l'image importée, on peut la paramétrer selon le projet. Par exemple, pour un projet 2D :
- `Texture Type` : `Sprite (2D and UI)`,
- `Sprite mode` : `Multiple` si l'image contient plusieurs *sprites*, ce qui fait apparaître le bouton `Sprite Editor`.
- `Filter mode` : `Point (no filter)` pour obtenir plus de netteté,
- dans le `Format` de couleur : choisir `rgba32` pour ne pas modifier le rendu des couleurs,
- si le *sprite* affiché en scène est tout petit, alors modifier non pas la caméra mais le **rapport pixel/unité** ; sinon, la physique risque de ne pas fonctionner correctement : `Pixel per unit` à 16 pour un aspect *retro-game* (16 pixels d'image pour 1 unité Unity). En général, on entre ici la dimension de l'image (ex : un carré de 512 pixels de côté, c'est une valeur de 512/unité Unity).

[Learn Import 2D Assets](https://learn.unity.com/tutorial/importing-2d-assets-into-unity-2019-3 "Learn Import 2D Assets" _blank)

## *Atlas*

L'image peut aussi être un ***Atlas***, c'est-à-dire une collection de *sprites* non séquentiels découpés selon une certaine grille, par exemple les **tuiles pour réaliser une *tilemap***. Dans la fenêtre *Project*, cet *asset* présente un triangle pour accéder aux images qu'il contient. 

Paramétrage minimum : `Sprite mode` défini à `Multiple` pour accéder à l'outil **Sprite Editor**. Ensuite, découper.

L'*atlas* peut aussi être réalisé directement dans Unity à partir d'images. Unity calculera au mieux la position de chaque élément dans le fichier. Ceci requiert deux choses :
- créer un fichier *atlas* dans le *Project* avec clic droit puis `Create > 2D > Sprite Atlas`,
- activer *Sprite Packer* depuis menu `Edit > Project Settings... > Editor > Sprite Packer > Mode`.

Plus d'infos :
- [Doc Sprite Atlas](https://docs.unity3d.com/Manual/class-SpriteAtlas.html "Doc Sprite Atlas" _blank),
- [Learn Sprite Atlasing](https://learn.unity.com/tutorial/ui-sprite-atlasing "Learn Sprite Atlasing" _blank).

## Découpage 

Pour découper une image paramétrée comme *sprite* : 
- cliquer sur le bouton `Sprite Editor`, puis sur `Slice`,
- `Automatic` : détection logicielle des pixels transparents en scannant chaque ligne. Les boîtes ont des tailles différentes,
- `Grid by cell size` : paramétrage par taille de cellule,
- `Grid by cell count` : paramétrage par nombre de colonnes,
- `Pivot` : définir le point fixe de référence de l’élément (mettre en `bottom` pour qu’il soit en bas d’un personnage par exemple),
- cliquer sur `Slice`,
- cliquer sur `Apply` dans le menu de la fenêtre.

Chaque retancle ainsi généré est sélectionnable, modifiable... Les zones générées qui s'avèrent inutiles peuvent être supprimées. On peut aussi simplement cliquer-déplacer dans la fenêtre pour générer des zones rectangulaires.

## Affichage

Pour **afficher un *sprite***, il faut utiliser le composant `Sprite Renderer` attaché à un `GameObject`.

Pour un projet paramétré en 2D, tout objet est affiché à une position Z de 0 pour faciliter le travail. Noter qu'un tel objet possède un composant `Transform`.

La superposition des *sprites* est contrôlable grâce à la propriété `Sorting Layer` : on contrôle alors les *sprites* un à un selon des couches que l'on crée au besoin. Dans ces *layers*, l'ordre de superposition est défini par la valeur de `Order in Layer`.

On peut faire de même avec des groupes de `Sprite Renderer` : attacher le composant `Sorting Group` au parent avec un `Sorting Layer 2D`, et dans ce parent, distribuer un *layer* en partant de 0 ; de cette façon, tout l’objet est traité comme un seul `Sprite Renderer` indépendamment de son contenu.

Plus d'infos :
- [Documentation Sprite Renderer](https://docs.unity3d.com/Manual/class-SpriteRenderer.html "Documentation Sprite Renderer" _blank),
- [Documentation Sorting Group](https://docs.unity3d.com/Manual/class-SortingGroup.html "Documentation Sorting Group" _blank).

Maintenant, à propos des *tilemaps*, Unity propose un outil d'édition spécifique pour réaliser un décor rapidement sans avoir à ajouter manuellement chaque *sprite* dans la scène. 
- Ouvrir menu `Window > 2D > Tile Palette`. 
- Créer une nouvelle palette de *tiles* en cliquant sur `Create New Palette`. Enregistrer le fichier qui sera généré dans le dossier du projet.
- Cliquer-déplacer les *tiles* dans la fenêtre de palette (si non visibles, cliquer sur le bouton « rond avec triangle » du *sprite* pour les afficher).
- Ajouter à la scène un `2D Object > Tilemap`. On dispose à présent d'une image à « peindre ».
- Avec la fenêtre de palette toujours à l'écran, sélectionner si non déjà fait l'outil *Brush*. Sélectionner une tuile à utiliser comme motif de peinture.
- Cliquer-déplacer dans la scène pour peindre.

## Animation

Pour **animer** un ensemble de *sprites* :
- sélectionner tous les *sprites*,
- glisser dans la scène,
- enregistrer. L'animation génère un fichier `Animator Controller` et un fichier d'animation proprement dite. Il peut arriver qu'Unity crée d'autres contrôleurs à mesure qu'on ajoute des animations : on ne retiendra qu’un seul contrôleur, les nouveaux seront à supprimer,
- créer un objet qui a le composant `Animator`. Y renseigner le contrôleur précédent. L'édition des états peut commencer.

Astuce : pour améliorer le flux de travail, nommer les fichiers à l'identique avec un numéro incrémenté en fin de nom.

Dans une animation de *sprite*, s’il s’agit de **n’afficher plus rien** (ce qui correspond à assigner la valeur `None` au champ de saisie), il faut cliquer `Record` dans `Animation` et **manuellement sélectionner** `None` dans le champ de `Sprite Renderer` : une *keyframe* correspondante apparait alors dans la *timeline*.

## Curseur

Paramétré en `Cursor`, un *sprite* peut remplacer le **curseur de la souris**.

Pour définir le curseur par défaut de l’application : 
- `SetCursor()` à l’`Awake()`, 
- ou bien dans `Project settings > Player > Default cursor`.

Un curseur a un ***hot spot*** : c’est son point d'interaction. On peut le modifier avec `Cursor.SetCursor()` et un `Vector2` qui pose le décalage en pixels.

## *9-slicing*

Il est possible de disposer d'un *sprite* de **certaines dimensions** (carré, rectangle) pour l'utiliser à des **dimensions différentes**. Par exemple : un bouton à bords arrondis redimensionnable à loisir, sans déformation des arrondis. Pour cela :
- dans les paramètres d'importation de l'image, `Sprite mode > Mesh type` : sélectionner `Full Rect`,
- dans `Sprite Editor`, déplacer les bords (en vert) de façon à obtenir un découpage où les 4 coins de l'image sont isolés,
- dans le composant `Sprite Renderer` (ou `Image` si on fait de l'UI), sélectionner `Draw Mode` : `Sliced` par exemple,
- modifier éventuellement `Pixels Per Unit Multiplier` (rapport pixel/unité éditeur) selon la taille du *sprite* utilisé.

[Documentation 9 Slice Sprites](https://docs.unity3d.com/Manual/9SliceSprites.html "Documentation 9 Slice Sprites" _blank)
