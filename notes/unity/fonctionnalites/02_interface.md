# Interface

Le 23-05-2022

Découverte de l'interface graphique du *framework*. Source : [Utiliser l'éditeur](https://docs.unity3d.com/Manual/UsingTheEditor.html "Utiliser l'éditeur" _blank).

## *Scene* et *game*

Un jeu contient bon nombre de **scènes** qui sont autant d'emplacements où se produit l'action: 
- scène d'introduction avec les *splash screens*,
- scène de menus,
- scènes des crédits,
- une ou plusieurs scènes du jeu proprement dit.

Une scène est un fichier apparaissant dans la fenêtre ***Project***. Double-cliquer dessus pour la charger. 

Pour revenir à l'état d'origine d'une scène, simplement ne pas enregistrer la version courante et recharger le fichier en double-cliquant sur son icone dans la fenêtre *Project*.

On **édite** la scène : les données sont conservées. On **teste** une scène ou on en lance la **simulation** en cliquant sur le bouton ***Play***. Lorsqu'on clique sur le bouton *Play* à nouveau, la simulation s'arrête et on retourne en édition. On passe en fait d'une fenêtre ***Scene*** à une fenêtre ***Game*** et le mode de travail change. En mode *Game*, toutes les données peuvent être modifiées mais ne seront pas conservées une fois la simulation terminée (sauf intervention sur les fichiers eux-mêmes). On peut faire une pause dans la simulation en cliquant sur le bouton ***Pause*** ; cliquer à nouveau et le jeu reprend. 

La fenêtre *Game* présente des menus. Le premier concerne le *ratio* ou format d'écran dans lequel afficher le jeu ; 16:9 est aujourd'hui le plus répandu. La fenêtre *Game* peut être zoomée, ce qui modifie la qualité du rendu. 

La fenêtre *Scene* présente aussi des menus :
- type d'affichage,
- activer/désactiver l'éclairage avec l'icone *Soleil*,
- affichage des *gizmos*,
- etc.

## *Hierarchy* 

La fenêtre ***Hierarchy*** présente les **objets utilisés dans la scène** courante, chargée. 

En mode **simulation (*game*)**, la liste de la fenêtre *Hierarchy* peut **varier**. Exemple : apparition d'ennemis.

Une bonne pratique est de créer des objets regroupant d'autres objets similaires ou partageant un même but, ceci afin d'éviter que tous les objets ne soient au même niveau de la scène. Cela permet aussi des traitements par l'objet parent.

## *Project*

La fenêtre *Project* présente tous les *assets* du jeu : scripts, textures, fontes... C'est la représentation de ce qui existe sur l'ordinateur, dans le dossier du projet. 

Chaque fichier est accompagné d'un fichier caché `.meta`, que l'on voit dans l'Explorateur de fichier et non dans l'interface d'Unity. Ces fichiers permettent par exemple de garder une référence à l'objet, ce qui optimise les traitements en éditeur.

Un ***slider*** permet de modifier le zoom pour obtenir un affichage en **icônes** ou en **liste de noms**.

Dans le champ de recherche, on peut renseigner un **nom**, un **type** (exemple : « t:mesh ») ou par ***label*** (exemple : « l:food »). La catégorie pour ce *label* se définit en sélectionnant un objet et en cliquant sur le bouton « étiquette bleue » en bas à droite de l'*Inspector*.

## *Inspector*

Les **propriétés** de l'objet sélectionné s'affichent dans la fenêtre ***Inspector***. Ces propriétés sont classées par **composant (*component*)**.

Ce qui est affiché peut porter sur un objet de la *Hierarchy* ou du *Project*.

Toute modification en *Inspector* peut en général être annulée/rétablie avec `CTRL Z`.

Clic droit sur l'onglet de cette fenêtre offre la possibilité de passer l'*Inspector* en mode ***Debug*** (utile en mode *Game*). On peut créer autant de fenêtres que l'on veut. On peut aussi  verrouiller la sélection d'un *Inspector* avec l'icone cadenas en haut à droite (permet des comparaisons, éditions...).

Depuis Unity 2020, clic droit sur un champ de référence d'objet ou sur un *asset* permet d'ouvir un ***focused Inspector*** : fenêtre pour l'objet sélectionné et verrouillé sur lui.

## Contrôles en édition

`SHIFT Espace` alors que le curseur survole un panneau permet de maximiser/rétablir ce panneau à l'écran.

En édition, dans la fenêtre de *Scene*, le **repère** ou *gizmo* en haut à droite indique la direction de la caméra d'édition selon les trois axes x, y et z. Cliquer sur un axe fait basculer la vue sur cet axe. 

Unity utilise les repères dits « main gauche » :
- x : droite,
- y : haut,
- z : profondeur.

Sous le repère, on peut choisir le **mode de projection** de la caméra d'édition : **perspective** ou **orthographique** (on peut cliquer sur le cube pour le même résultat). 

Contrôles **souris** :
- la `molette souris` contrôle le zoom,
- `clic-droit enfoncé` permet de tourner la caméra sur son axe, 
- `clic-droit WASD` pour déplacer à vol d'oiseau, `SHIFT` pour modifier la vitesse,
- `ALT clic-droit maintenu` fait tourner la caméra autour de l'objet sélectionné,
- `click molette déplacer`/`CTRL ALT déplacer` pour déplacer la caméra.

En haut à gauche de l'écran se trouvent des **boutons de contrôle** (`QWERTY` au clavier):
- **Main** : se déplacer dans la scène,
- **Croix directionnelle** : déplacer un objet sur l'axe x, y ou z ou sur un plan,
- **Rotation** : faire pivoter un objet sur le plan x, y ou z, ou localement par rapport à la caméra, ou au milieu des axes pour tourner sur les 3 axes,
- **Échelle** : changer la taille de l'objet en x, y, z, ou les 3 à la fois avec le cube central,
- **Rectangle** : redimensionner sur une forme plane pour les éléments 2D, fonctionne par plan pour un objet 3D,
- **Combo** : translation, rotation, échelle,
- **Clé et crayon** : fournit un outil selon les options de composant ou selon les *plugs-in* installés (exemple : édition de la forme du `Collider`).

Bouton **Pivot/Center** : change le point de contrôle de l'objet à **pivot** (point d'origine de création de l'objet) ou **centre**. Par défaut, le point pivot de l'objet dans Unity est en son centre.

Bouton **Global/Local** : axes en référence à la **scène (global)** ou **à l'objet (local)**.

Pour **trouver** un objet particulier dans la scène (exemple : l'objet jouable) :
- soit on cherche visuellement, on sélectionne l'objet et on appuie sur `F` pour focaliser la vue sur l'objet, 
- soit on va dans la fenêtre *Hierarchy* et on double-clique l'objet en question ; la vue est focalisée alors sur l'objet. 

`CTRL D` permet de **dupliquer** un objet à l'endroit de l'objet original.

**Sélectionner** :
- `SHIFT clic-gauche` en *Hierarchy* sélectionne une plage d'objets,
- `CTRL clic-gauche` ajoute un objet cliqué à la sélection,
- dans la scène, dessiner un rectangle de sélection avec `clic-gauche` enfoncé puis déplacement.

Pour **positionner** des objets dans la scène :
- on peut utiliser les propriétés du composant `Transform` de chaque objet (position, rotation, échelle),
- on peut aussi déplacer les objets par **crans de 1 unité** avec la touche `CTRL enfoncée pendant le déplacement`.
- Unity gère le ***vertex snapping*** : sélectionner l'objet non en pivot mais en centre, utiliser la touche `V` ou `CTRL SHIFT`, sélectionner le point de l'objet où contrôler ce dernier, pour que le positionnement s'effectue le long des surfaces et s'accroche aux sommets (cela fonctionne aussi pour plusieurs objets sélectionnés en même temps). 

Toute modification effectuée à un objet est **répercutée à ses enfants** mais pas l'inverse.

## Couleurs

Toutes les couleurs utilisées sont **modifiables** dans Menu `Edit > Preferences... > Colors`.
- `Playmode tint` : le filtre de couleur lorsqu'on passe en mode *Game*.
- Tout autre élément, *gizmo*...

## Console

Les **messages** d'Unity apparaissent dans la ***Console*** et peuvent aussi être scriptés au besoin :
- ***messages*** : quelconques, d'information ; `Debug.Log()`,
- ***Warnings*** : messages d'erreur non bloquants ; `Debug.LogWarning()`,
- ***Erreurs bloquantes*** : messages en rouge et arrêt de script ; `Debug.LogError()`.

Options : 
- ***Clear*** : tout effacer,
- ***Collapse*** : rassembler les mêmes messages en une ligne,
- ***Clear on Play*** : effacer tout au lancement de la simulation,
- ***Clear on Build*** : effacer lors du *build* du projet (export vers une plateforme),
- ***Error Pause*** : **pause** l'exécution du script lorsqu'il y a erreur bloquante afin de permettre d'**explorer les valeurs** actuelles au moment de cette erreur,
- ***Editor*** : ***Full log*** fournit les informations complètes de suivi.

Les entrées `Debug.Log` sont enregistrées dans des **fichiers log**. Plus d'infos : [Fichiers logs](https://docs.unity3d.com/Manual/LogFiles.html "Fichiers logs" _blank).

Astuce : pour debug un `array` sans boucler dessus, utiliser `string.Join()` car Unity (ou le C#) n'opère aucune conversion automatique : 
```C#
Debug.Log(string.Join(",", monArray));
```

La console autorise des **styles** sur le modèle HTML :
```C#
Debug.Log("Je parle <color=red><b>rouge</b></color>.");
```

Une méthode personnelle de *debug*, qu'on modifiera au besoin :
```C#
using System.Reflection;
void MyDebug(string message)
{
	string objName = gameObject.name;
	string className = this.GetType().Name;
	string methodName = MethodBase.GetCurrentMethod().Name;
	Debug.LogError($"[{objName}][{className}][{methodName}] {message}");
}
```

## *Layout*

Les ***layouts*** définissent des **configurations de l'espace de travail**. Le menu se trouve en haut à droite de l'écran d'Unity, dans la barre d'outils. 

Avec Windows, les *layouts* personnels se trouvent au chemin suivant : `C:\Users\[nom]\AppData\Roaming\Unity\Editor-5.x\Preferences\Layouts\default`.

Penser à faire des sauvegardes car des versions d'Unity peuvent réclamer parfois une **réinitialisation** des *layouts* pour s'ouvrir.

Plus d'infos sur les *layouts* ici : [Personnaliser l'espace de travail](https://docs.unity3d.com/Manual/CustomizingYourWorkspace.html "Personnaliser l'espace de travail" _blank).
