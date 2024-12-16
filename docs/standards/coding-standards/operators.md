---
sidebar_position: 4
title: Operators
sidebar_label: Operators
---

There are several operators and expressions that can be used to access a type member. These operators include the dot, indexer and invocation operators. When using the OneStream integrated development environment or another IDE, such as Visual Studio or VS Code, using the dot (period character) will activate IntelliSense, which will display a selection of available class members, methods, namespaces, etc.

- Member access ( `.` )
  - To access a member of a namespace or type.
- Array element or indexer access ( `[ ]` )
  - To access an array element or a type indexer.
- Index from end ( `^` )
  - To indicate that the element position is from the end of a sequence.
- Range ( `..` )
  - To specify a range of indices that you can use to obtain a range of sequence elements.
- Null-conditional operators ( `?.` and `?[ ]` )
  - To perform a member or element access operation only if an operand is non-null.
- Method invocation ( `( )` )
  - To call an accessed method or invoke a delegate.

## Member access expression

Use the `.` token to access a member of a namespace or a type.

Accessing a nested namespace such as a using directive:

### C#

```csharp
using System.Collections.Generic;
```

### VB.NET

```vb
Imports System.Collections.Generic
```

## Null-conditional operators

The null conditional operator in C# and VB is a useful feature that allows you to safely access members of an object without worrying about null reference exceptions.
