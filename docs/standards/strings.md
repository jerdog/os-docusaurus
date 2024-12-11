---
sidebar_position: 3
title: String Manipulation
sidebar_label: Strings
---

Various methods are available in .NET to build simple strings.  However, unless there is a significant performance reason, or functional circumstance, the following guidance should be adhered to for code readability and maintainability.

The following string manipulation code is typically used when writing code. There are many ways to accomplish similar results. In truth, as long as these aren’t being performed within a loop, there really isn’t much of a performance difference between any of these. Beware of falling into the trap of micro-optimizations when writing your code. All of the following methods are completely valid used in relatively small string operations (100,000 iterations or less).

We are more concerned about the maintainability and readability of the code more than we are about a 20-30ms difference between each method.

### `StringBuilder (Mutable)`

This is a good option because it will create a string object in memory that can be changed and will, therefore, not create a new string instance every time it is changed.

```vb
Dim demo_A As String = "Demo A"
Dim demo_B As String = "Demo B"

Dim sample As StringBuilder = New StringBuilder("Concatenate")
sample.Append(" ").Append(demo_A).Append(" and ").Append(demo_B)
```

### `String.Format`

This is a good method to use for creating a single string with a fixed number of dynamic values. Not recommended for large strings with a large number of values as its readability suffers the larger it gets.

```vb
Dim sample As String = String.Format("Concatenate {0} and {1}", demo_A, demo_B)
```

### `String.Concat`

Again, this is good for smaller single strings with a small number of variables. Generally, less than 10.

```vb
Dim sample As String = String.Concat("Concatenate ", demo_A, " and ", demo_B)
```

### `Concatenation`

Since strings are immutable in VB.NET and C#, creating strings using concatenation is generally discouraged, unless dealing with very small strings. Each string requires initialization and memory allocation and the new string created through concatenation is simply a new string initialized with another memory allocation created. Again, this is fine for very small strings, but like the above examples, readability suffers.

```vb
Dim sample As String = "Concatenate " & demo_A & " and " & demo_B
```

### `Interpolation`

This method is the best for readability and therefore is our recommended method to use whenever possible.

```vb
Dim demo_A As String = "Demo A"
Dim demo_B As String = "Demo B"
Dim sample As String = $"Concatenate {demo_A} and {demo_B}"
```
