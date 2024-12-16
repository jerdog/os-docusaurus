---
sidebar_position: 2
title: Solution Naming Conventions
sidebar_label: Naming Conventions
---

C# and VB.net naming conventions play a crucial role in ensuring code readability, maintainability, and consistency across projects.  These conventions assist developers in quickly understanding the purpose and usage of code elements like classes, methods, variables, and more.  Adhering to established naming standards/conventions promotes teamwork and facilitates smoother code reviews and maintenance.

## General Guidelines

1. Choose easily readable, preferably grammatically correct names. For example, HorizontalAlignment is more readable than AlignmentHorizontal.
2. Favor readability and clarity over brevity and abbreviated names.
3. Avoid using names that conflict with reserved keywords of used programming languages.
4. Use **PascalCase** for class names, file names, namespaces, all method names, and public member names. Use **camelCase** for private fields, parameters and local variables. See below for reference:

| Name  | Case Type  | Example  |
|---|---|---|
| Namespace  | Pascal  | `namespace CompanyName.ProjectName{…}` |
| Class/Type  | Pascal  | `public class ClassName {…}` |
| Interface  | Pascal  | `public interface IBusinessService {…}` |
| Method  | Pascal  | `private void MethodName()` |
| Property/Field  | Pascal  | `public int PropertyName {get; set;}` |
| Enum  | Pascal  | `public enum ErrorLevel` |
| Enum Member  | Pascal  | **CriticalLevel** |
| Constant  | Snake, All Caps  | `public const string TEST_BASE_URL` |
| Parameters  | Camel  | `private string GetParameter(string parameterName)` |
| Local Variables  | Camel  | `var localVariable = “Test”` |
| Struct  | Pascal  | `public struct StructName` |
| Resource Key  | Pascal  | `SaveButtonTooltipText` |


5. Do not use abbreviations. For example, use ButtonOnClick rather than `BtnOnClick`.
6. Name a ***Variable*** in a most descriptive way possible. Example: if a _SessionInfo_ variable that is passed to other calls, is allowed to be null, name it **sessionInfoOrNull** instead of the usual **sessionInfo**.
7. Name ***Classes*** and ***Structs*** as Nouns or Noun phrases.
8. Do not prefix class names (ex. “C”).
9. End the name of a derived class with the name of the base class.
10. Name ***Interfaces*** as adjective phrases or occasionally as nouns or noun phrases.
11. Prefix ***Interfaces*** with the letter "I", to indicate that the type is an interface.
12. Name ***Methods*** as Verbs or Verb phrases.
13. Name ***Properties*** and ***Fields*** as a Nouns, Noun phrases, or Adjectives.
14. Do not prefix property names with Get or Set; these typically indicate that the property should be a method.
15. Name collection properties with a plural phrase; not something like _ItemList_ or _ItemCollection_.
16. Name Boolean properties with a positive phrase (`CanSeek` instead of `CantSeek`).
17. Use 'var' to declare a variable if the type can be easily inferred from the name, otherwise use the type.
18. Use syntactically interesting names, rather than a language-specific keywords for type names. For example, `GetLength` is a better name than `GetInt`.
19. Use a singular type name for an enumeration unless its values are bit fields.
20. Use a plural type name for an enumeration with bit fields as values.
21. Do not use “Enum” or “Flag(s)” as a suffix for an enum type name.
22. Do not use a prefix for a name on an enumeration value.
23. Name ***Events*** as a Verb or Verb Phrase (ex. `Clicked`, `Show`, `ShowDialog`).
24. Use -ing and -ed to express pre-events and post-events. For example:

  - *Deleting:* Occurs just before the object is getting deleted.
  - *Delete:* Occurs when the object needs to be deleted by the event handler.
  - *Deleted:* Occurs when the object is already deleted.

25. Prefix an event handler with "On". For example, a method that handles its own Closing event should be named `OnClosing`.
26. Use descriptive names for ***Parameters***.
27. Use parameter names based on its meaning rather than its type.
28. Postfix asynchronous methods with *Async* or *TaskAsync*
