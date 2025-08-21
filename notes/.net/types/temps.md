# Le temps

Le 21-08-2025

Manipuler le temps, tout un programme.

## Types, formats

Deux types principaux pour gérer le temps en C# :
- `DateTime` pour décrire un **instant**,
- `TimeSpan` pour décrire une **durée**.

Le temps est **formaté** lorsqu'il s'emploie en `string`. Par défaut :
- `DateTime.ToString()` retourne la date et l'heure détaillée au format de la **culture informatique** en cours,
- `TimeSpan.ToString()` retourne un nombre de jours et l'heure détaillée. 

Les exemples ci-après ont été réalisés en culture `fr-FR`.

```C#
DateTime debut = new(year: 2025, month: 12, day: 31, hour: 12, minute: 30, second: 00);
// 31/12/2025 12:30:00

TimeSpan duree = new(hours: 1, minutes: 00, seconds: 00);
// 01:00:00
```

```C#
DateTime maintenant = DateTime.Now;

maintenant.ToString(); 
// 20/08/2025 09:20:18

maintenant.ToLongDateString();
// mercredi 20 août 2025

maintenant.ToShortDateString();
// 20/08/2025

maintenant.ToLongTimeString();
// 09:20:18

maintenant.ToShortTimeString();
// 09:20
```

## Opérations

On peut effectuer des opérations sur les instants et les durées.

```C#
DateTime debut = new(year: 2025, month: 12, day: 31, hour: 12, minute: 30, second: 00);
TimeSpan duree = new(hours: 1, minutes: 00, seconds: 00);
// 31/12/2025 12:30:00
// 01:00:00

DateTime fin = debut + duree; 
// 31/12/2025 13:30:00

DateTime maintenant = DateTime.Now;
// 20/08/2025 19:17:28

TimeSpan attente = début - maintenant;
// 132.17:12:31.6715869
```

`DateTime` et `TimeSpan` proposent des méthodes pour manipuler le temps ; [MS *DateTime*](https://learn.microsoft.com/fr-fr/dotnet/api/system.datetime "DateTime" _blank), [MS *TimeSpan*](https://learn.microsoft.com/fr-fr/dotnet/api/system.timespan "TimeSpan" _blank).

```C#
DateTime maintenant = DateTime.Now;
DateTime fin = maintenant.AddHours(3);
```

## Fuseaux horaires

Quand on parle de temps, on doit aussi penser aux **fuseaux horaires**. Ceci concerne la date (pas la durée) et prend la forme du type `DateTimeOffset`. On peut utiliser ce type tout du long et effectuer une conversion au moment opportun.

```C#
DateTimeOffset debut = new(year: 2025, month: 08, day: 20, hour: 12, minute: 30, second: 00, offset: TimeSpan.FromHours(1));
TimeSpan duree = new(hours: 1, minutes: 00, seconds: 00);

DateTimeOffset finAvecFuseauHoraire = debut + duree; 

// Conversions
DateTime finDateTime1 = finAvecFuseauHoraire.DateTime;
DateTime finDateTime2 = (debut + duree).DateTime;
```

