# Concepts

Le 22-05-2022

Les principales notions pour aborder Unity.

## Références

Les classes importantes d'Unity sont répertoriées dans la documentation officielle : [Classes importantes](https://docs.unity3d.com/Manual/ScriptingImportantClasses.html "Classes importantes dans le manuel").

Une référence utilisée pour rédiger le présent article : [Essential Unity Concepts](https://learn.unity.com/tutorial/essential-unity-concepts "Concepts essentiels d'Unity sur Unity Learn").

## GameObject, Component

***GameObject*** : 
- tout objet dans Unity est un type `GameObject`, 
- c'est une entité à laquelle on ajoute des propriétés triées par **composants** (*component*),
- il a **nécessairement** un composant de type `Transform` ou  `RectTransform` (2D pour l'UI), sans quoi il ne peut pas être dans la scène ; inversement un composant `transform` ne peut pas à lui seul constituer un `gameObject` car ce ne sont que des propriétés de position, rotation et échelle. 

***Component*** : 
- propriété de `gameObject` : lumière, physique, script... 
- un composant est un script C# spécifiant un comportement, une fonctionnalité.

Le **type** (`GameObject`, `Transform`) commence avec une majuscule (c'est une convention de nommage des classes). Une *instance* de type commence par une minuscule (`toto.transform`). Mais en *Inspector*, les noms commencent tous par une majuscule. Pour rédiger mes articles techniques, j'écris avec une majuscule pour référer à la classe, sauf lorsqu'il s'agit par exemple de code.

`GameObject` et `Transform` sont **interdépendants**. Par conséquent, il est possible de chercher un composant avec `GetComponent<>()` à partir de l'un ou l'autre. `gameObject` est accessible à partir de n'importe quel type dérivé.
```
[SerializeField] private TextMeshProUGUI _gameoverText; 

void Gameover()
{
	_gameoverText.gameObject.SetActive(true);
}
```

On peut préfixer/suffixer les noms de variables selon le type choisi ; cela peut faciliter (ou empêcher) la compréhension du code. Par exemple avec la **notation hongroise** :
```
GameObject _myObject;
public Transform m_tr_oiseau; // membre public "m_", transform "tr_", nom
```

`gameObject.transform` ou `transform` (c'est idem) est **itérable** ; on peut boucler dessus pour trouver la  **collection** des `transform` enfants ou utiliser des méthodes spécifiques à l'exploration de la hiérarchie.

Un objet peut être enfant d'un autre avec `transform.parent`.
```
_monObj.parent = _objetTransformParent; 
```
```
_objetTransform.parent = null; // le Transform n'a plus de parent, il se trouve à la racine de la scène
```

## Mesh

Lorsqu'on parle d'objet 3D, on parle de **maillage** (*mesh*). Qu'est-ce ? 
- Les **sommets** (*vertices*, *vertex*, *verts* en anglais), sont des **points 3D**. 
- Ils sont liés par des **arêtes** (*edges*), qui sont des segments de droite.
- 3 points reliés par des arêtes 2 à 2 en figure plane forment un triangle, la plus petite surface utilisée.
- Plusieurs triangles forment un **polygone**.
- L’ensemble des polygones forme le **maillage** d’un objet.

Le *mesh* contient également les données des **normales** des surfaces : c'est **la direction de chaque face** du maillage, direction indiquant quelle face calculer pour l'affichage.

**Afficher** (*render*) le *mesh* :
- on a besoin du composant `Mesh Filter` (contenu des données du *mesh*) et `Mesh Renderer` (composant d’affichage),
- à l’import de fichier, Unity crée un *prefab* qui inclut les deux composants,
- le `Mesh Renderer` n’affiche pas de ***Skinned mesh*** : ceci est utilisé pour afficher des personnages car le *mesh* inclut alors des os et squelette (*bones*, *skeleton*). Si on dispose d’un *skinned mesh*, alors Unity attache un `Skinned Mesh Renderer` au lieu du `Mesh Renderer`,
- si un modèle dans la scène est un `gameObject` **composé** d'objets qui sont autant de *meshes* différents, alors chaque instance de *prefab* renvoie à un *mesh* et a ses composants `Mesh filter` et `Mesh Renderer`.

Le composant `Mesh filter` :
- contient les **données de maillage** du modèle 3D,
- passe ces données au `Mesh Renderer`,
- a une seule propriété : la **référence au fichier** (*asset*).

Le composant `Mesh Renderer` :
- récupère les données envoyées par le `Mesh Filter` et **affiche le contenu** à une position, rotation et échelle définies dans le composant `Transform`,
- a des propriétés qui définissent **comment afficher le modèle**. Cela tombe sous 3 catégories :
   1. **ombres** : réception et projection,
   2. **matériaux** : ceux avec lesquels afficher le modèle. Unity en nécessite au moins un. Une couleur magenta indique l’absence de matériau,
   3. ***light probes*** : si le modèle tombe sous le calcul ou non.

## Rendu

Source Wikipédia : [Rasterisation](https://fr.wikipedia.org/wiki/Rast%C3%A9risation "Rasterisation sur Wikipédia").

Le **rendu à l'écran** (*rendering*) fait en général l'objet d'un processus appelé ***rasterisation*** : suite d'opérations consistant à **convertir** une donnée composée de **vecteurs** (image vectorielle, maillage) en une image composée de **points** qui possèdent des propriétés de couleur (c'est l'image matricielle, appelée aussi carte de points ou image *bitmap*). 

Il s'agit de prendre des données en trois dimensions (géométrie, positions, matériaux, éclairage...) et d'en générer une image en deux dimensions pour un écran (à partir de la caméra utilisée).

La *rasterisation* est un procédé unique et nécessaire. Mais Unity propose des variations pour ce processus, appelées ***pipelines* de rendu** - on peut traduire cela par **conduites de rendu**. Ces *pipelines* sont pensées pour une destination ou un usage spécifique : l'une est plus rapide, l'autre propose plus d'options... On choisit de travailler avec telle *pipeline* selon les objectifs poursuivis pour le projet.

**Avant** d'effectuer les calculs de rendu en 2D à l'écran, les données 3D font l'objet d'**éclairage**. Cet éclairage est effectué en suivant une suite de calculs. Dans Unity, ces calculs dépendent **aussi** de la *pipeline* de rendu choisie (certains *shaders* peuvent par exemple ne pas être supportés de l'une à l'autre). 

Les *render pipelines* proposées par Unity sont les suivantes :
- ***High Definition Render Pipeline (HDRP)***,
- ***Universal Render Pipeline (URP)***,
- ***Built-in render pipeline***.

![Le rendu est étape nécessaire faisant l'objet d'un choix de conduite de rendu.](../media/fonctionnalites/Rendering.svg)

Plus d'infos dans le chapitre Eclairage.

## Qualité

Voyons les paramètres d'un projet **URP**.

Ouvrir  les paramètres du projet depuis menu `Edit > Project Settings > Quality`. 

En haut et au milieu de la fenêtre se trouve le tableau des **niveaux de qualité**. Une case à cocher verte indique le niveau choisi pour la plateforme de destination.

![Les niveaux de qualité d'un projet.](../media/fonctionnalites/Quality.png)

Chaque ligne est cliquable pour utiliser les paramètres en temps réel dans la scène. Ces paramètres sont des données qui apparaissent soit dans la fenêtre, soit dans un fichier `ScriptableObject` dédié et qui est renseigné à la propriété `Rendering`. On accède à ce fichier comme un *asset*, dans la fenêtre *Project*.

![Les fichiers de paramètres de qualité.](../media/fonctionnalites/QualitySO.png)

Plus d'infos sur ces *assets* URP : [Universal Render Pipeline Asset](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@7.1/manual/universalrp-asset.html "URP Asset").