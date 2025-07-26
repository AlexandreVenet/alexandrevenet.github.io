# *DLL*

Le 19-08-2024

Fonctionnalités sous forme de fichier `.dll`.

## Principe

Sources
- [Microsoft *Learn*](https://learn.microsoft.com/fr-fr/nuget/quickstart/create-and-publish-a-package-using-visual-studio?tabs=netcore-cli _blank)
- [Bonnes pratiques](https://learn.microsoft.com/en-us/nuget/create-packages/package-authoring-best-practices _blank)
- [*Assembly*](https://learn.microsoft.com/fr-fr/dotnet/standard/assembly _blank)

De nombreuses fonctionnalités du système Windows ou des programmes Windows, sont fournies sous forme de ***Dynamic Link Library (DLL)***. Ce sont des fichiers contenant du code compilé. Ces bibliothèques encapsulent des fonctionnalités et ont l'avantage d'être chargées à la demande du programme lorsque celui-ci en a besoin. Ceci fonde une **dépendance**. [Plus d'infos sur Wikipédia](https://fr.wikipedia.org/wiki/Dynamic_Link_Library _blank).

En général, un programme Windows peut avoir été compilé en **intégrant** ses dépendances (cela fait partie de l'*assembly*, un seul `.exe` très lourd), ou bien simplement en les **ajoutant** au programme (les *DLL* existent de façon indépendante par exemple dans le dossier du programme). Dans ce dernier cas, la bibliothèque est donc disponible à un certain chemin de fichier ; par conséquent, elle peut être utilisée par plusieurs programmes. 

.NET fournit un ensemble de *DLL* qui se situent dans le ***Global Assembly Cache (GAC)***. Ces bibliothèques sont destinées à être utilisées par plusieurs programmes. 

Maintenant, les *DLL* réalisées avec .NET sous forme d'*assemblies* de bibliothèque diffèrent des *DLL* Microsoft Win32. Pourquoi ? Parce qu'en .NET, il existe le *CLR* qui assure la gestion de ces dépendances : manifeste, versions, exécution... [Microsoft *Learn*](https://learn.microsoft.com/fr-fr/troubleshoot/windows-client/setup-upgrade-and-drivers/dynamic-link-library _blank)

La communauté des développeurs et développeuses crée aussi des *DLL* .NET. La distribution de ces bibliothèques s'effectue par un empaquetage sous forme de ***packages* NuGet** (fichier ZIP contenant la *DLL*). Ces dépendances ne sont pas nécessairement installées dans le *GAC* mais peuvent être intégrées à l'*assembly* du programme (par exemple un seule `.exe` très lourd) ou bien générées à côté du programme (un fichier `.exe` très léger et toutes les dépendances à côté de lui). [Microsoft *Learn* NuGet](https://learn.microsoft.com/fr-fr/nuget/what-is-nuget _blank)

## Créer la *DLL*

On peut créer avec Visual Studio une **solution de bibliothèque** et ainsi compiler un fichier `.dll` et/ou un *package* NuGet (pouvant contenir d'ailleurs plusieurs *assemblies*).

Les classes à exporter doivent être précédées du mot-clé `public`, sans quoi elles restent `internal` et ne sont donc pas exposées.

Dans Visual Studio, configurer le *package* depuis l'**Explorateur de solutions**, avec clic droit sur le projet puis choisir `Propriétés`.

Pour générer les fichiers `.dll` et `.nupkg` :
- clic droit sur le projet dans l'**Explorateur de solutions**,
- choisir `Compresser` (en anglais : *Pack*),
- les fichiers se trouvent dans le dossier `Debug` (ou `Release` pour une version de production).

Les *packages* sont copiés dans le disque local à ce chemin : `C:\Users\[nom_utilisateur]\.nuget\packages`

Lorsqu'on crée une nouvelle version de *package*, il faudrait supprimer l'ancien de ce chemin pour ensuite seulement, dans Visual Studio, pouvoir installer ou mettre à jour le *package* en question représentant une dépendance dans la solution que l'on programme. Ceci n'étant absolument pas pratique, on préfère gérer les **numéros de version** de façon à générer un *package* tout neuf à chaque fois et simplement mettre à niveau la dépendance dans notre programme. La gestion des versions s'effectue dans les **propriétés du projet** :
- fenêtre **Explorateur de solutions**, 
- clic droit sur le projet, choisir **Propriétés**, 
- choisir l'onglet **Package** puis **Général**,
- enfin renseigner les différents champs concernant la version.

## Annotations

Pour que les annotations de code (ex : `///<summary>`) soient pris en charge, ajouter ceci dans le `.csproj` :

```XML
<GenerateDocumentationFile>true</GenerateDocumentationFile>
<GeneratePackageOnBuild>true</GeneratePackageOnBuild>
```

Ou bien, faire un clic droit sur le projet, choisir `Propriétés`. Dans la fenêtre, sélectionner l'onglet `Build` puis choisir `Sortie`. Cocher la case **Fichier de documentation XML** ou **Générer un fichier contenant la documentation de l’API**.

Source [Microsoft *Learn*](https://learn.microsoft.com/fr-fr/visualstudio/ide/reference/generate-xml-documentation-comments?view=vs-2022#enable-documentation-generation _blank)

## Charger la *DLL*, référence dynamique

Source : [CSharp Corner](https://www.c-sharpcorner.com/UploadFile/1e050f/creating-and-using-dll-class-library-in-C-Sharp _blank)

Utiliser une *DLL* située **dans le même répertoire que l'exécutable** ou **dans des répertoires du système d'exploitation stockant par défaut des *DLL*** (on peut ainsi charger des *DLL* du système, de .NET...) :

```C#
using System;
using System.Runtime.InteropServices;

public class Program
{
	[DllImport("MaLib.dll")]
	public static extern bool Faire();

	public static void Main()
	{
		bool resultat = Faire();
		Console.WriteLine("Le résultat de Faire() est : " + resultat);
	}
}
```

Le même attribut permet en fait de charger un fichier *DLL* situé n'importe-où dans le disque :

```C#
[DllImport("chemin_complet\\MaLib.dll")]
public static extern bool Faire();
```

## Contenu d'une *DLL*

Comment connaître le contenu d'une *DLL* ?
- Lire la documentation, évidemment ! 😄
- Logiciel **ILSpy** ou **dotPeek**.
- En C#, l'espace de nom `Reflection`.

Voir mon *repository* de test où il s'agit de charger et explorer une bibliothèque dont on ne connaît pas le contenu : [Charger *DLL* à l'exécution](https://github.com/AlexandreVenet/CSharp_ChargerDLLRuntime _blank)
