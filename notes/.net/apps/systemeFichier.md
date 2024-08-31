# Système de fichier

Le 31-08-2024

Manipuler des répertoires et fichiers.

## Classes

.NET fournit le *namespace* [System.IO](https://learn.microsoft.com/en-us/dotnet/api/system.io _blank) pour la manipulation de fichiers et répertoires. 

| Catégorie  | Classe(s) communes|
| - | - |
| Répertoire | [Directory](https://learn.microsoft.com/en-us/dotnet/api/system.io.directory _blank) statique, [DirectoryInfo](https://learn.microsoft.com/en-us/dotnet/api/system.io.directoryinfo _blank) concrète |
| Fichier | [File](https://learn.microsoft.com/en-us/dotnet/api/system.io.file _blank) statique, [FileInfo](https://learn.microsoft.com/en-us/dotnet/api/system.io.fileinfo _blank) concrète|
| Chemin | [Path](https://learn.microsoft.com/en-us/dotnet/api/system.io.path _blank) statique|


## Chemin

Le **chemin** ou l'adresse cible une entité sur le disque, un appareil, ou un emplacement mémoire. 

```
Windows
C:\monDossier\Toto\monFichier.txt
```

```
Linux
/mnt/nomDisque/Toto/monFichier.txt
/media/nomUtilisateur/nomDisque/Toto/monFichier.txt
```

```
MacOS
/Volumes/nomDisque/Toto/monFichier.txt
```

Quelques points importants
- Le chemin est **absolu** ou **complètement qualifié** lorsqu'il représente l'adresse du fichier ou répertoire depuis le **répertoire racine**. Le chemin est **relatif** lorsqu'il ne contient que le chemin depuis un répertoire spécifique ou un contexte.
- Certains éléments structurels du chemin dépendent du systèmes d'exploitation, par exemple le **nom du dossier racine**, le **séparateur de niveau**.
- Certains répertoires sont spécifiques du système d'exploitation ou de l'installation faite par l'utilisateur ou l'utilisatrice. Par exemple `Mes Documents` dans un système Windows francophone est une version localisée du dossier `MyDocuments`.

Maintenant, le chemin est traité en tant que chaîne de caractères. .NET fournit des entités pour faciliter la construction de chemin en s'assurant de l'interopérabilité. 

On dispose par exemple de  la classe [Path](https://learn.microsoft.com/fr-fr/dotnet/api/system.io.path _blank). Voici deux exemples qui construisent la même chaîne `MonDossier\MonFichier.txt` pour le système Windows :

```C#
string chemin = Path.Combine("MonDossier", "MonFichier.txt");
```

```C#
string chemin = $"MonDossier{Path.DirectorySeparatorChar}MonFichier.txt";
```

[Path](https://learn.microsoft.com/en-us/dotnet/api/system.io.path _blank) fournit des champs et méthodes.  

```C#
string fichier = @"D:\MonDossier\monFichier.txt";
string extension = Path.GetExtension(fichier);
// .txt
```

```C#
if(Path.HasExtension("monFichier.txt"))
{
	// Le fichier se termine par une extension
}
```

Pour les dossiers spécifiques du système, .NET fournit l'*enum* [Environment.SpecialFolder](https://learn.microsoft.com/en-us/dotnet/api/system.environment.specialfolder _blank) que l'on utilise avec une méthode de la classe [Environment](https://learn.microsoft.com/en-us/dotnet/api/system.environment _blank).

```C#
string cheminDocument = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
// Chemin absolu vers le répertoire : Mes Documents
```

## Chemin du programme

Comment obtenir le chemin absolu vers le répertoire de notre programme en cours d'exécution ? La réponse dépend du type de programme. Prenons par exemple une application Console.

```C#
string cheminDossierProgramme = AppDomain.CurrentDomain.BaseDirectory;
// Chemin absolu avec séparateur à la fin
```

Les commandes suivantes cherchent aussi le répertoire du programme mais plutôt dans le **lieu du processus**. Par conséquent, cela ne signifie pas nécessairement que c'est le répertoire où se trouve le programme (cas de la *DLL* par exemple).

```C#
System.IO.Directory.GetCurrentDirectory()
// Chemin absolu sans séparateur à la fin
```

```C#
Environment.CurrentDirectory
// Idem
```

Plus d'infos sur [StackOverflow](https://stackoverflow.com/questions/6041332/best-way-to-get-application-folder-path _blank).

## File, Directory

Les deux classes [File](https://learn.microsoft.com/en-us/dotnet/api/system.io.file _blank) et [Directory](https://learn.microsoft.com/en-us/dotnet/api/system.io.directory _blank) sont statiques. Elles permettent de manipuler les fichiers et répertoires facilement. 

```C#
// Le répertoire existe-t-il ?
string chemin = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "monDossier");
bool repertoireExiste = Directory.Exists(monChemin);

// Le fichier existe-t-il avec File.Exists() 
```

```C#
// Lister dossiers
IEnumerable<string> dossiers = Directory.EnumerateDirectories("dossier");
foreach (var dir in dossiers)
{
	Console.WriteLine(dir);
}

// Lister fichiers avec Directory.EnumerateFiles()
```

```C#
// Chercher les fichiers d'un certain nom, 
// avec insensibilité à la casse 
// et récursivité
string cheminProgramme = AppDomain.CurrentDomain.BaseDirectory;
IEnumerable<string> fichiers = Directory.EnumerateFiles(cheminProgramme, "monfichier.txt", SearchOption.AllDirectories);
foreach (string f in fichiers)
{
	Console.WriteLine(f);
}
```

```C#
// Chercher tous les fichiers d'extension .txt, 
// avec insensibilité à la casse 
// et seulement dans le répertoire courant (pas de récursivité)
string cheminProgramme = AppDomain.CurrentDomain.BaseDirectory;
IEnumerable<string> fichiers = Directory.EnumerateFiles(cheminProgramme, "*.txt", SearchOption.TopDirectoryOnly);
foreach (string f in fichiers)
{
	Console.WriteLine(f);
}
```

```C#
// Créer un répertoire
string chemin = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "monDossier");
Directory.CreateDirectory(chemin);
```

La création de fichier diffère de la création de dossier car, même si le fichier est vide, il doit être traité en tant que c'est une entité qui est faite pour un contenu, contenu d'un certain type, encodé d'une certaine manière. L'écriture du fichier peut être réalisée diversement.

```C#
// Créer un fichier texte. Remplacer fichier si existant. Remplacer contenu.
string chemin = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "MonFichier.txt");
File.WriteAllText(chemin, "Coucou !");
```

```C#
// Ajouter du texte au contenu existant. Si fichier inexistant, le créer.
File.AppendAllText(chemin, "Message");
```

## FileInfo, DirectoryInfo

Les classes précédentes classes sont statiques et cette staticité est pertinente pour des actions complexes, répétées dans le programme. Lorsqu'il s'agit d'effectuer une seule action, Microsoft conseille l'utilisation des classes concrètes [FileInfo](https://learn.microsoft.com/en-us/dotnet/api/system.io.fileinfo _blank) ou [DirectoryInfo](https://learn.microsoft.com/en-us/dotnet/api/system.io.directoryinfo _blank) car il faut moins de mémoire pour que le programme fonctionne.

[FileInfo](https://learn.microsoft.com/en-us/dotnet/api/system.io.fileinfo _blank) et [DirectoryInfo](https://learn.microsoft.com/en-us/dotnet/api/system.io.directoryinfo _blank) sont aussi préférables lorsqu'il s'agit de réutiliser une entité. En effet, [File](https://learn.microsoft.com/en-us/dotnet/api/system.io.file _blank) et [Directory](https://learn.microsoft.com/en-us/dotnet/api/system.io.directory _blank) effectuent des vérifications de sécurité pour chacune de leurs méthodes à chaque déclenchement, ce qui peut être inutile lorsque ces vérifications ont déjà été effectuées sur l'entité à réutiliser.

```C#
// Créer un fichier
FileInfo fichierInfo = new FileInfo("monFichier.txt");
FileStream fs = fi.Create(); // le fichier est créé
fs.Close();
fichierInfo.Delete(); // le fichier est supprimé
```

## Les *streams*

Les données ont une **source** : fichier sur le disque, information en RAM, dans le réseau, entrées saisies par l'utilisateur ou l'utilisatrice...  Ces données sont à chaque fois une séquence d'octets. 

Pour faciliter le traitement de ces données (lecture, écriture...) quelle que soit leur source, .NET fournit la classe abstraite, *disposable*, [Stream](https://learn.microsoft.com/fr-fr/dotnet/api/system.io.stream _blank), dont on utilise les classes dérivées spécifiques de la source : [FileStream](https://learn.microsoft.com/en-us/dotnet/api/system.io.filestream _blank), [MemoryStream](https://learn.microsoft.com/fr-fr/dotnet/api/system.io.memorystream _blank), [BufferedStream](https://learn.microsoft.com/en-us/dotnet/api/system.io.bufferedstream _blank)...
