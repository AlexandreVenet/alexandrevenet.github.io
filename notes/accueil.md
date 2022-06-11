# Github // Alexandre Venet

Le 28-05-2022

Bienvenue dans mon espace GitHub consacré à l'environnement 3D temps réel Unity et le C#.

## Présentation

Je publie ici mes notes de cours à la **3WA**, des parcours officiels **Unity Technologies** et de mon **expérience personnelle**. Par souci de pédagogie, les articles suivent une certaine progressivité par catégorie, mais Unity dépendant du langage C#, on n'hésitera pas à relier les articles d'une catégorie à ceux d'une autre.

Les **documentations officielles** :
- [Microsoft C#](https://docs.microsoft.com/fr-fr/dotnet/csharp "Microsoft C#")
- [Microsoft .NET API](https://docs.microsoft.com/fr-fr/dotnet/api "Microsoft .NET API")
- [Unity : manuel](https://docs.unity3d.com/Manual "Unity : manuel")
- [Unity : API](https://docs.unity3d.com/ScriptReference "Unity : API")

Pour en savoir plus sur moi-même, consulter mon site [Alhomepage.com](https://www.alhomepage.com "Alhomepage"). Pour mes dépôts GitHub, c'est ici : [Github Alexandre Venet](https://github.com/AlexandreVenet "Github Alexandre Venet").

## Contenus

La partie **Généralités** présente Unity dans son contexte industriel.

La partie **C# dans Unity** présente l'essentiel du langage C# dans le contexte du framework.

Dans les **Fonctionnalités**, on trouvera un tour d'horizon des briques élémentaires d'Unity.

Dans **Patrons de conception** sont regroupés des *design patterns* utilisables dans Unity.

## Colophon

L'ergonomie du présent site est ***responsive*** avec un palier à 1024px de large.

Les typographies sont **Montserrat** et **Roboto** et sont chargées à partir de **Google Fonts** ; les typographies pour le `code` sont à chasse fixe et font partie des standards (installées par défaut dans le système d'exploitation du terminal de consultation) : **Consolas**, **Lucida Console**, **Courier**.

Le site est en ce qu'on appelle « mode sombre » afin de réduire la consommation électrique (écran) et reposer les yeux. J'essaie de trouver un contraste de couleur satisfaisant entre le fond et le texte, d'un côté pour le confort de lecture, de l'autre pour réduire voire éviter l'effet de bandes horizontales en persistance rétinienne.

Les blocs de code sont présentés de cette manière : 
```
entrée de code
    ligne indentée
```
```
entrée 
{
	Cette ligne est indentée et très longue pour afficher la barre de défilement horizontale. On peut naviguer avec SHIFT + molette souris...
	
	saut de ligne
	
	Les chevrons sont transformés en HTML entities : <button>
}
```

Les images sont centrées dans la page et suivies d'une légende. La largeur est limitée à la largeur de la page.
![Exemple d'une image au format SVG, 320x240px, suivie de sa légende, légende qui peut être sur plusieurs lignes.](../media/ImageSVG.svg)

Pour les grandes largeurs d'écran, la fin d'une page présente un bloc vide haut : contrainte technique afin que le sommaire, affiché à droite de l'écran, soit correctement mis à jour.

Le présent site est herbergé sur **Github** et utilise la fonction **Github Pages**.

Du fait des limitations de Github (et aussi pour le plaisir), j'ai tenté de réaliser un **convertisseur personnel de Markdown en HTML côté client en Javascript**, ce qui me permet d'éditer les contenus de ce site seulement avec des fichiers `.md` (le script utilisé ici est une version `class` de mon script de travail et adaptée pour Github).