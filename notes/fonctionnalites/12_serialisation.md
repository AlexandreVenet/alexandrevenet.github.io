# Sérialisation

Le 16-03-2021

La sérialisation est une opération consistant à transformer des données en un format facile à stocker et réutiliser.

## Présentation

La **sérialisation** consiste à fournir une **représentation des données**. Unity s'en sert pour :
- **garder des informations** : *assets* changeant de dossier, préférences de projets, informations relatives aux scènes...,
- **gérer les ressources au *runtime*** : instancier un *prefab*, c’est copier la représentation du *prefab* intégré dans le flux de données à l’exécution.

La sérialisation porte sur des variables, des classes, structs... 

Elle s'effectue au format **binaire**, **Json**, **XML**...

## Dans les fichiers

Créer un cube et en faire un *prefab*. Afficher dans l’explorateur de fichiers : clic droit dans *Project* sur le fichier puis `Show in Explorer`. Ouvrir ce fichier dans Visual Studio.

Par défaut, le fichier est sérialisé dans un **mode texte**, au format ***YAML (Yet Another Markup Language)***. On lit dans le fichier, par exemple, les données du composant `Transform`. Cela vaut aussi pour un fichier de scène ou quoi que ce soit d'autre.

Il est possible de changer le mode de sérialisation de l’éditeur dans `Edit > Projet Settings > Editor > Asset Serialisation`, par exemple pour obtenir un format **binaire**.

Unity utilise aussi la sérialisation pour les fichiers `.meta`. Par exemple, le numéro GUID permet de garder la référence du *prefab* lors de l’instanciation.

[Documentation Format de sérialisation](https://docs.unity3d.com/Manual/FormatDescription.html "Documentation Format de sérialisation")

## Sérialisation de scripts

Les **champs publics** de classes personnelles sont sérialisés et apparaissent dans l’*Inspector* : `string`, `Vector3`, `Color`, `AnimationCurve`, `LayerMask`, tout y passe. 

En général, est sérialisable tout type de données dérivé de `UnityEngine.Object`.

Pour `GameObject`, `Rigidbody` ou `Transform`, les champs rendus visibles accueillent des références de composant (par des objets). 

Les **collections** apparaissent en liste d’éléments après avoir renseigné la longueur.

**Champs privés** ou **classes** nécessitent un ***attribute*** pour être sérialisés. Par exemple, `[System.Serializable]` juste avant une définition de classe ou de struct permet de rendre visible en *Inspector* tout champ qui en déclare une instance.

[Documentation Script serialization](https://docs.unity3d.com/Manual/script-Serialization.html "Documentation Script serialization")

