# Visual Studio

Le 13-08-2024

L'environnement de développement intégré proposé par Microsoft.

## Généralités

**Visual Studio** est l'*IDE* (*Integrated Development Environment*) proposé par Microsoft pour les développeurs qui codent en .NET mais aussi en C++ par exemple. Il contient un ensemble d'outils permettant de travailler efficacement, par exemple :
- Git et les relations avec GitHub ou Azure DevOps. [Plus d'Infos](https://learn.microsoft.com/fr-fr/visualstudio/version-control/git-with-visual-studio _blank),
- une fenêtre de tâches (*tasks*) qu'on alimente par mots-clés. [Plus d'infos](https://learn.microsoft.com/fr-fr/visualstudio/ide/using-the-task-list _blank),
- des thèmes, par exemple [One Dark Pro](https://marketplace.visualstudio.com/items?itemName=adrianwilczynski.one-dark-pro _blank),
- un compilateur qui vérifie la syntaxe des scripts,
- un débogueur pour tester le programme pendant son exécution.

Documentations : [Portail Visual Studio](https://docs.microsoft.com/fr-FR/visualstudio _blank), [Actions rapides](https://docs.microsoft.com/fr-fr/visualstudio/ide/common-quick-actions _blank)

## Installation

Visual Studio s'installe en local. Une fois fait, un outil nommé **Visual Studio Installer** permet de gérer les ressources installées. 

Une fois cet outil lancé, il nous propose de choisir des **charges de travail**, c'est-à-dire des ensembles d'outils qui sont spécifiques des projets à développer, selon la nature de ces projets. Par exemple, **Développement .NET Multi-Platform App UI** pour développer des projets **MAUI**. Cliquer sur le bouton **Modifier** pour ouvrir la fenêtre de sélection.

Dans cette fenêtre, on choisit donc les charges de travail. On peut également choisir des **composants individuels**, c'est-à-dire chaque élément faisant partie d'une ou plusieurs charges de travail. Par exemple, une version précédente du *runtime* .NET. Cliquer sur l'onglet **Composants individuels** pour obtenir la liste de ces ressources.

## Télémétrie

Comme pour .NET, Visual Studio est configuré pour envoyer des données de diagnostic à Microsoft. Pour la désactiver :
- menu `Aide`,
- choisir `Confidentialité > Paraètres de confidentialité...`,
- choisir `Non, je ne souhaite pas participer`.

## Console spéciale

Chercher une application installée dans l'ordinateur nommée ***Developer Command Prompt for Visual Studio***. Entrer la commande suivante pour connaître la version de C# prise en charge :

```
csc -langversion:?
```

Source : [Stack Overflow](https://stackoverflow.com/questions/19532942/which-version-of-c-sharp-am-i-using _blank)

## Des raccourcis

|Raccourci|Description|
|-|-|
|`F1` sur un terme|Ouvre le navigateur à la page de documentation de Microsoft.|
|`F12` sur un terme|Idem pour afficher la définition.|
|`MAJ F12` sur une instruction|Afficher les références.|
|`CTRL F`|Menu rechercher.|
|`CTRL H`|Menu rechercher-remplacer.|
|`CTRL MAJ F` ou `CTRL MAJ H`|Menu rechercher/remplacer avec des options.|
|`CTRL D`|Dupliquer une ligne.|
|`CTRL M H`/`CTRL M U`|Réduire/Développer une sélection de code.|
|`CTRL K F`|Formater du code sélectionné.|
|`cw` puis `TAB`|`Console.WriteLine()`.|
|`ctor` puis `TAB`|Créer un constructeur.|
|`TAB`|Autocomplétion|

Sélection multiple :
- avec `ALT` pressée, dessiner à la souris un cadre de sélection,
- `ALT CTRL` pressées pour opérer une sélection multiple à la souris (ex : sélectionner des mots un peu partout dans le document).

Avec `CTRL` pressée, la sélection permet d'obtenir l'instruction directement (pas besoin de sélectionner tout le terme). Attention car `CTRL` permet aussi, lorsque c'est possible, de cliquer sur l'instruction pour atteindre sa définition.

Le retour ligne est nommé « enveloppement de mot ». Remplacer le raccourci par celui-ci : `ALT Z` (idem VSCode).

Sélectionner du code puis taper `CTRL K S` : affiche un menu pour sélectionner un *snippet* (bloc de code prérempli, par exemple `for`).

## Paramètres utiles

**Mettre en forme le document** 
- Menu `Edition > Avancé > Mettre le document en forme`.

**Colorisation des accolades**
- Menu `Outils > Options... > Éditeur de texte` : cocher la case `Activer la colorisation des paires d’accolades`.

**Mise en forme adaptative & IntelliSense**
- Après avoir pressé la touche `TAB`, l'IntelliSense insère le code choisi avec des espaces. Pourquoi pas des tabulations ?
- Menu `Outils > Options... > Éditeur de textes > Avancé`, décocher la case `Utiliser la mise en forme adaptative`.
- Menu `Outils > Options... > Éditeur de textes`, choisir `Tabulation uniquement` dans le menu déroulant `Mode de complétion IntelliSense par défaut`.

**Défilement épinglé**
- Menu `Outils > Options... > Éditeur de texte > Général > Défilement collant`. 

**Nettoyer le cache NuGet**
- Menu `Outils > Options... > Gestionnaire de package NuGet`, presser le bouton `Effacer tout le stockage`.

## Solution et projets

Une **solution** est un ensemble de **projets**. Un projet ajouté à la solution peut être défini en des versions différentes de .NET. Lorsqu'il y a plusieurs projets, un menu déroulant dans la barre d'outils principale permet de sélectionner celui que l'on veut au démarrage (ou bien clic droit dans l'explorateur puis `Définir en tant que projet de démarrage`).

L'arborescence de contenus de l'**Explorateur de solution** peut ne pas correspondre à celle de l'**Explorateur de fichiers Windows**. Pour organiser l'un selon l'autre, il faut intervenir sur les deux aspects séparément. Par exemple : créer un dossier de solution pour représenter un dossier physique sur le disque.

En plus des classes C# que l'on rédige, on peut ajouter à un projet toute sorte de choses, par exemple :
- des projets existants (clic droit puis `Ajouter > Projet existant`),
- des fichiers existants (clic droit puis `Ajouter > Elément existant`),
- de nouveaux dossiers (clic droit puis `Ajouter > Nouveau dossier de solution`).

## .csproj

La configuration du projet s'effectue à deux endroits dans l'`Explorateur de solutions` :
- double-clic sur le nom du projet ouvre le fichier `.csproj`, c'est un fichier XML, 
- clic droit sur le nom du projet puis choisir `Propriétés` ouvre la fenêtre d'UI d'édition.

On y trouve une propriété `Nullable`. Par défaut, elle est activée. On peut remplacer par `disable` pour éviter que Visual Studio ne produise des avertissements lorsqu'il évalue qu'une variable peut être `null`.

Le fichier `.csproj` est éditable. On y crée des groupes de propriétés. Ces groupes peuvent être contraints par une condition. Exemple :

```XML
<PropertyGroup>
	<TargetFramework>net5.0</TargetFramework>
	<ApplicationIcon />
	<StartupObject />
</PropertyGroup>

<PropertyGroup Condition=" '$(Configuration)' == 'Debug' ">
	<OutputType>Exe</OutputType>
</PropertyGroup>

<PropertyGroup Condition=" '$(Configuration)' == 'Release' ">
	<OutputType>WinExe</OutputType>
</PropertyGroup>
```

Sources : [aakinshin](https://aakinshin.net/posts/msbuild-configurations _blank), [MS Learn](https://learn.microsoft.com/fr-fr/visualstudio/msbuild/msbuild-conditions _blank)

Les **ressources** de notre programme qui sont **exportées** (images, fichiers Excel...) sont regroupées dans une section `<ItemGroup>`. Ces ressources sont paramétrable depuis la fenêtre `Propriétés` de Visual Studio. Donc, paramétrer ces ressources par cette fenêtre a pour effet de modifier le `.csproj`.

```XML
<ItemGroup>
	<None Update="MesFichiers\MaRessource.xlsx">
		<CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
	</None>
</ItemGroup>
```

Les références de *packages* apparaissent également dans le fichier avec leur version.

```XML
<ItemGroup>
	<PackageReference Include="ClosedXML" Version="0.101.0" />
	<PackageReference Include="Oracle.ManagedDataAccess.Core" Version="3.21.100" />
</ItemGroup>
```

`.csproj` peut accueillir des **commandes personnaliées**, par exemple supprimer les répertoires `bin` et `obj`, voire `.vs`, à chaque lancement de la commande `Nettoyer la solution`. Source : [Stack Overflow](https://stackoverflow.com/questions/1088593/how-to-fully-clean-bin-and-obj-folders-within-visual-studio _blank)

```XML
<Target Name="Nettoyer la solution" AfterTargets="Clean">
	<RemoveDir Directories="$(TargetDir)" /> <!-- bin -->
	<RemoveDir Directories="$(SolutionDir).vs" /> <!-- .vs (omettre si jugé excessif) -->
	<RemoveDir Directories="$(ProjectDir)$(BaseIntermediateOutputPath)" /> <!-- obj -->
</Target>
```

Autre exemple :

```XML
<Target Name="NettoyagePerso" AfterTargets="Clean">
	<Message Importance="high" Text="Nettoyage personnalisé en cours..."/>
	<RemoveDir Directories="bin;obj"/>
</Target>
```

## Ressources d'*assembly*

Source : [Stack Overflow](https://stackoverflow.com/questions/433171/how-to-embed-a-text-file-in-a-net-assembly _blank)

Des ressources peuvent être ajoutées à l'*assembly* de notre programme. Par exemple des images, des textes de requête SQL...

**Préparation**
- Ajouter par exemple un fichier texte nommé `fichier.txt` dans la solution.
- Faire un clic droit sur le projet puis choisir `Propriétés`.
- Choisir l'onglet `Ressources`.
- Cliquer sur le lien pour créer un fichier de ressources (le contenu de la fenêtre peut changer selon les versions de Visual Studio).
- Dans l'en-tête de la nouvelle fenêtre, sélectionner le menu déroulant puis choisir `Fichiers`.
- Cliquer sur `Ajouter une ressource` ou bien glisser-déposer une ressource déjà présente dans le projet. 
- La ressource est identifiée par un nom, par défaut le nom de la ressource. Ce nom est modifiable.
- Enregistrer le fichier (oui, on a modifié `.csproj`).
- Par défaut, un dossier `Properties` a été généré dans la solution. Il contient le fichier `Resources.resx` que l'on peut éditer directement (cela renvoie à la fenêtre d'édition que l'on vient d'utiliser).

**Utilisation**
- Les ressources s'appellent avec la classe `Resources`.
- On navigue dans les ressources avec l'opérateur `.`.

```C#
// Lire un fichier texte
Console.WriteLine(Resources.MonFichier);
```

```C#
// ClosedXML : écrire une copie quelque-part avant d'insérer des données
System.IO.File.WriteAllBytes(cheminSortieFichier, Properties.Resources.nomRessource);
```

Si le fichier de ressource est modifié au cours du développement, penser à ouvrir à nouveau la fenêtre des ressources du projet puis réenregistrer **car ce n'est pas fait automatiquement**.

## Déboguer

Plusieurs orthographes pour le débogueur, débugger, debugger... Il permet :
- d'obtenir des informations sur les exceptions,
- de poser des points d'arrêts, 
- de suivre pas à pas,
- de poser des espions (valeurs de variables),
- de vérifier la pile des appels de fonctions.

Les **points d'arrêts** se placent en cliquant dans la marge, à gauche des numéros. Cliquer sur **Démarrer** avec l'option Debug (sinon, il ne se passera rien). La ligne du code surlignée en **orange** indique là où s'arrête le programme en mode debug, c'est-à-dire que **la ligne n'est pas encore lancée**.

Lorsqu'on a cliqué sur **Démarrer**, l'application se lance. Si point d'arrêt posé, on peut avec les boutons de la barre de navigation avancer dans le programme pas à pas.
- **Pas à pas principal** : avancer d'une ligne à chaque clic.
- **Pas à pas détaillé** : avancer en entrant dans le corps des méthodes.

Des informations s'affichent en bas de l'écran : **valeurs de variable** et **pile d'appels**.

Avec ASP.NET, si le débogueur ne suffit pas, on peut consulter les **journaux** dans `Mes Documents\IISExpress\TraceLogFiles` et `Mes Documents\IISExpress\logs`.

## .pdb

Visual Studio génère un fichier `.pdb` lors de la compilation ; l'extension de fichier est l'acronyme de *Program Database*. Ce fichier permet de déboguer l'application, pour un *build* effectué en *Debug* ou en *Release* et ce lors de l'exécution (en temps réel). On appelle ce fichier un **fichier de symboles**. 

Il met en relation le code produit et le débogueur de Visual Studio par un **mappage de données** : le fichier contient les informations sur le point de débogage pour le débogueur et les ressources qui sont utilisées ou référencées. 

Sources : [MSDN fichier de symbole](https://docs.microsoft.com/fr-fr/visualstudio/debugger/specify-symbol-dot-pdb-and-source-files-in-the-visual-studio-debugger _blank), [Discussion](https://stackoverflow.com/questions/5457095/release-generating-pdb-files-why _blank).

Pour annuler la génération de fichier (ce qui n'est pas souhaitable néanmoins), aller dans le menu `Projet > Propriétés > Build`, cliquer sur `Avancé...` puis dans `Informations de débogage`, sélectionner `Aucun`.

Pour le déploiement, ce fichier n'est pas utile et est exclu de la génération lorsqu'il s'agit de publier l'application. Pour voir cela : menu `Projet > Propriétés > Publier`.

Maintenant, qu'en est-il de l'obfuscation ?
- **Avec** fichier `.pdb`, certains noms de variable peuvent encore apparaître en clair.
- **Sans** fichier `.pdb`, ces noms peuvent avoir été renommés.
