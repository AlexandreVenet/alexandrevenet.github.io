# Editeurs C#

Le 10-08-2024

Utiliser **Visual Studio Community** ou **Visual Studio Code** avec Unity.

## Visual Studio

En 2020, **Visual Studio Community** est installé par défaut avec Unity, **mais** les deux applications peuvent ne pas être liées automatiquement. Dans ce cas, pour les lier, aller dans : `Edit > Preferences > External tool > External script editor` et modifier la valeur si elle ne convient pas.

28/11/2020 : Visual Studio Community est la solution installée par défaut. **Mais** pour exporter sur Windows, il faut **en plus** installer le **SDK Windows**, disponible ici : [Windows SDK](https://developer.microsoft.com/fr-fr/windows/downloads/windows-sdk "Windows SDK").

Dans Visual Studio, menu `Click Edit > Advanced > Format document` permet d'appliquer un **format d'indentation** à tout le document. 

Pour que `CTRL+’` ouvre le navigateur avec la **documentation officielle** : 
- `Outils > Options > Environnement > Clavier`,
- chercher « Unity »,
- cliquer sur `Aide.InformationsderéférencesurAPIUnity`,
- dans le champ à côté de `Global`, faire le raccourci `CTRL+’` puis cliquer assigner,
- dans le menu déroulant juste au-dessus, choisir le raccourci voulu si non sélectionné.

On peut écrire des **regions** pour organiser des blocs de code à **réduire/développer**. Par exemple pour classer ce qui est *private*, *Show in inspector*, ou *Frame cycle*... Ce sont des **préprocesseurs**. [Directives de préprocesseur](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/preprocessor-directives "Directives de préprocesseur").
```
#region Titre de ma région
//... code...
#endregion  
```

Les même préprocesseurs permettent de **spécialiser du code pour une certaine destination**. [Compilation sous conditions](https://docs.unity3d.com/Manual/PlatformDependentCompilation.html "Compilation sous conditions").
```
#define UNITY_EDITOR // ligne pouvant être requise en début de script
//...
#if UNITY_EDITOR
	// Mon code
#endif
```

Le **retour ligne automatique** est dénommé « enveloppement de mots » dans Visual Studio 2019. On trouve cette fonction dans :
- `Edition > Avancé` pour modifier au cas par cas,
- `Outils > Options > Editeur de texte` pour paramétrer en général ou par langage.

Dans Visual Studio 2022, pour le paramétrage global : `Options > Editeur de texte > Tous les langages` et cocher/décocher la case  `Retour automatique à la ligne`.

Avec Windows, `CTRL+T` cherche quelque chose dans tout le projet.

`CTRL+K+C` passe la ligne en commentaire. `CTRL+K+U` pour décommenter. On peut remplacer cela par `CTRL + /` dans les options de raccourcis.

`CTRL+SHIFT+SPACE` affiche la signature de la fonction en vignette.

## Visual Studio Code

On peut aussi utiliser **Visual Studio Code**. Pour l'installation : 
- se souvenir du lieu de l'installation,
- en option, ne cocher que la case du changement de PATH (si le reste est intéressant, cocher),
- redémarrer la machine après installation,
- dans Unity : menu `Edit > Preferences > External tools > External script editor` et modifier la valeur du menu si elle ne convient pas. Et si Visual Studio Code n'apparaît pas, cliquer sur `Browse` et taper le lien dont on se souvient,
- on lance Visual Studio Code pour qu'il prenne en charge les éléments d'Unity,
- télécharger l'extension **unity3d-pack**, ensemble d'extensions qui évite de les télécharger les unes après les autres,
- une fois fait, créer un fichier c# dans un projet Unity pour voir si ça marche. Dans Visual Studio Code, en sortie, il peut encore y avoir des téléchargements de dépendances, donc attendre que cela s'effectue,
- maintenant, dans Unity, menu `Window > Package Manager` puis chercher `Visual Studio Code Editor`. Ce package permet la compatibilité des deux logiciels. S'il y a des bugs, penser à le mettre à jour.

D'autres modules peuvent être utiles (par exemple pour avoir **toutes** les commandes en *Intellisense*):
- Debugger for Unity,
- Unity Code Snippets,
- .NET nécessaire : [Développement Unity avec VS Code](https://code.visualstudio.com/docs/other/unity "Développement Unity avec VS Code").
