# Assembly definition

Le 06-06-2022

Les définitions d'assemblage permettent d'organiser le code, les scripts, d'un projet. [Manual : Assembly definitions](https://docs.unity3d.com/Manual/ScriptCompilationAssemblyDefinitionFiles.html "Manual : Assembly definitions")

## Introduction

Par défaut, le code des scripts d'un projet Unity appartient à **un seul** *assembly* : l'**Assembly-CSharp**. C'est un fichier `.dll`.

Les *assemblies* sont hiérarchisables : l'assemblage principal **dépend** de tous les assemblages définis en lui. Cette organisiation dépend du projet, du but poursuivi.

Toute modification apportée à un script dans un *assembly* entraîne :
1. la **recompilation** de tout le code de l'*assembly*,
2. la **reconstruction** de l'*assembly* proprement dit, 
3. après la reconstruction, tous les assemblages qui en **dépendent** sont également **reconstruits**. 

Par exemple, admettons des scripts dans l'assemblage principal par défaut. Lorsqu'un fichier est modifié et sauvegardé, l'assemblage principal l'est également, ce qui signifie que tous les autres scripts doivent aussi être recompilés.

Problèmes : 
- cela ralentit le projet dans lequel chaque script fait partie de l'*assembly* principal ; ce ralentissement s'accentue à mesure que le nombre de scripts augmente, 
- tous les scripts du projet peuvent se référencer les uns les autres, ce qui peut ne pas être souhaité,
- tous les scripts sont compilés quelque soit la plateforme de destination, alors que certains pourraient être omis de la compilation.

Or, il est possible de **séparer le code** en *assemblies* personnels. Ainsi, mettre à jour le code a bien moins d'impact. Par exemple : un assemblage pour les scripts de l'application, un autre pour les scripts d'éditeur. Pour cela, on utilise des **définitions d'assemblage (*assembly definition*)**. 

## Création

Une définition d'assemblage est un **fichier** (*asset*) dans un dossier, dossier qui contient également le code pour lequel est défini l'assemblage. Le code de tous les sous-dossiers qui ne contiennent pas leur propre définition d'assemblage appartient également à cet assemblage.

Pour créer une telle définition :
- créer un dossier dans le projet pour l'assemblage et le code afférent,
- à l'intérieur du dossier, dans *Project*, clic droit sur le dossier puis `Create > Assembly definition`,
- le code de ce dossier, et de tout sous-dossier, fait maintenant partie de ce nouvel assemblage, plutôt que de l'assemblage principal par défaut,
- pour par la suite faire de l'un des sous-dossiers un sous-assemblage, il suffit de créer une nouvelle définition d'assemblage dans ce sous-dossier. Tout le code du sous-dossier, et de tout sous-dossier qu'il contient, appartiendra alors à ce nouvel assemblage.

## Édition

Pour éditer un fichier de définition d'assemblage, cliquer dessus dans *Project* pour afficher les propriétés en *Inspector*.

***General***
- `Allow 'unsafe' Code` : inclure les membres et les méthodes marqués comme non sûrs.
- `Auto Referenced` : les assemblages prédéfinis réfèrent automatiquement à cette définition d'assemblage.
- `Override References` : spécifier les assemblages précompilés que l'on souhaite référencer par cette définition d'assemblage. Si cette option n'est pas cochée, cette définition d'assemblage  réfère à tous les **assemblages précompilés "auto-référencés"**.
- `No Engine References` : Unity n'ajoute pas de référence à `UnityEditor` ou `UnityEngine` lorsqu'il compile les assemblages.

***Define Constraints***
- définir des contraintes de définition fait que l'*assembly* construit seulement si la contrainte retourne `true`. Les symboles de définition sont définis par plateforme dans `Edit > Project settings > Player > Other settings > Scripting Define Symbols`.

***Assembly Definition References***
- `Use GUIDs` : inclure les assemblages par leur GUID plutôt que par leur nom. Cela permet de renommer les assemblages sans avoir à changer à nouveau la référence. Le bouton `+` ajoute un assemblage.

***Platforms*** 
- notre *assembly definition* peut être paramétrée pour construire seulement sur certaines plateformes. En éditant le fichier `.asmdef` dans un éditeur de script plutôt que par l'*Inspector* rend impossible d'utiliser ensemble les mots-clé `includePlatforms` et `excludePlatforms` dans la même *assembly definition*.

***Version Definies***
- spécifier quelle version de *packages* et modules à inclure.

Hormis les définitions de plateforme, il est peu probable d'avoir à modifier le fichier de définition d'assemblage.

## Problèmes

Définir des *assemblies* influence la reconnaissances des *packages* dans le projet. Par exemple, pour utiliser la librairies TextMeshPro (`using TMPro;`), il faut éditer l'*assembly définition* et ajouter dans `Assembly Definition References` :
- `Unity.TextMeshPro`,
- `Unity.TextMeshPro.Editor`.

Un autre problème est celui des **références en boucle** où deux assemblages se référencent l'un l'autre. Ceci est source d'erreur. Le problème ici n'est pas technique mais structurel : si deux assemblages se référencent l'un l'autre, alors ne faut-il pas les fusionner en un seul ou bien refactoriser le code ?