---
sidebar_position: 8
title: Defining & Initializing Variables
sidebar_label: Defining & Initializing Variables
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

There are two ways to create variables; implicitly typed and explicitly typed.

## Implicitly typed variables

Local variables can be declared without giving an explicit type. In C#, for instance, the var keyword instructs the compiler to infer the type of the variable from the expression on the right side of the initialization statement. The inferred type may be a built-in type, an anonymous type, a user-defined type, or a type defined in the .NET class library.

<Tabs>
<TabItem value="vb" label="VB.NET (Implicit declaration)">

```vb
Dim msg = New StringBuilder("This is a string.")
```

</TabItem>
<TabItem value="csharp" label="C# (Implicit declaration)">

```csharp
var msg = new System.Text.StringBuilder("This is a string.");
```

</TabItem>
</Tabs>

## Explicitly typed variables

Local variables can also be given an explicit type at the time they are declared. This is done by defining the variables type on both the left and right side of the initialization.

<Tabs>
<TabItem value="vb" label="VB.NET (Explicit declaration)">

```vb
Dim msg As StringBuilder = New StringBuilder("This is a string.")
```

</TabItem>
<TabItem value="csharp" label="C# (Explicit declaration)">

```csharp
 System.Text.StringBuilder msg = new System.Text.StringBuilder("This is a string.");
```

</TabItem>
</Tabs>

## Recommended practice

It’s recommended to always use explicitly typed variables. There are many reasons for this. Implicitly typed variables cannot be used in all instances.

For example (when writing in C#):

- `var` can only be used when a local variable is declared and initialized in the same statement; the variable cannot be initialized to null, or to a method group or an anonymous function.
- `var` cannot be used on fields at class scope.
- Variables declared by using `var` cannot be used in the initialization expression. In other words, this expression is legal: `int i = (i = 20);` but this expression produces a compile-time error: `var i = (i = 20);`
- Multiple implicitly-typed variables cannot be initialized in the same statement.
- If a type named `var` is in scope, then the `var` keyword will resolve to that type name and will not be treated as part of an implicitly typed local variable declaration.

Implicit typing with the `var` keyword can only be applied to variables at local method scope. Implicit typing is not available for class fields as the C# compiler would encounter a logical paradox as it processed the code: the compiler needs to know the type of the field, but it cannot determine the type until the assignment expression is analyzed, and the expression cannot be evaluated without knowing the type.

Although the compiler may generate the same bytecode for both, from a code readability/maintenance point of view surely, it's better for variables to be clearly typed as it avoids ambiguity and makes it clearer to read and understand. For this reason and to avoid having to worry about the restrictions of implicitly-typed variables, it’s recommended that explicitly-typed variables are always used.

That said, this is mostly a syntax and style preference, and OneStream solution creators are free to use either pattern or a combination of both.
