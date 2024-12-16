---
sidebar_position: 9
title: Development Tips
sidebar_label: Development Tips
---

import TOCInline from '@theme/TOCInline';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Below is a collection of helpful pointers to steer you towards implementing better code within the OneStream solution space.

<TOCInline toc={toc.filter((node) => node.level === 2 )} />

## Text Box Input

While using the OneStream Text Box component to capture user input, it is important to note that there are some potential risks to be mindful of.

### XF Component - Parameter Reference

When creating a parameter for usage with a Text Box and actionable component (button, checkbox, combo-box, etc.), it is common to pass this input as an argument to a Business Rule. This could present a problem if the input data referenced contains commas within the string, especially if your actionable component has multiple parameters. Be sure to wrap your referenced parameters in square brackets, to aid in safeguarding against input data with commas.

#### BEFORE

**XF Component - Function Call**

```
{Business Rule Name}{Function / Method Name}{Argument Name = |!Parameter Name!|}
```

#### AFTER

**XF Component - Function Call**

```
{Business Rule Name}{Function / Method Name}{Argument Name = [|!Parameter Name!|]}
```

### Business Rule - Parameter Retrieval

When consuming a Text Box input parameter from the UI, via Business Rule, it is common to extract this data using the NameValuePairs XFGetValue function. This could be problematic if the input data referenced contains square brackets within the string, especially a closing one. If you do pass a parameter, only pass the name of the parameter component, sans pipe and exclamation, which is linked to your Text Box.

#### BEFORE

**XF Component - Function Call**

```
{SolutionHelper}{SaveFormData}{ArgumentName = [|!ParameterName!|]}
```

**Business Rule - Get Parameter Value**

```csharp
string parameterValue = args.NameValuePairs.XFGetValue("ArgumentName", string.Empty);
```

#### AFTER

**XF Component - Function Call**

```
{SolutionHelper}{SaveFormData}{ArgumentName = [ParameterName]}
```

**Business Rule - Get Parameter Value (Option #1)**

```csharp
string parameterName = args.NameValuePairs.XFGetValue("ArgumentName", string.Empty);

string parameterValue = args.SelectionChangedTaskInfo.CustomSubstVarsWithUserSelectedValues.XFGetValue(parameterName, string.Empty);
```

**Business Rule - Get Parameter Value (Option #2)**

```csharp
string parameterValue = SelectInputValue(si, args, "ArgumentName");
// highlight-next-line
// This requires the Parameter Function (Option#2) below
```

**Business Rule - Parameter Function (Option #2)**

```csharp
// highlight-next-line
// Requires Get Parameter Value (Option #2) above
/// <summary>
/// Select input value
/// </summary>
/// <param name="si">Session Info</param>
/// <param name="args">Dashboard Extender Arguments</param>
/// <param name="keyName">Parameter Key Name</param>
/// <returns>string</returns>
public static string SelectInputValue(SessionInfo si, DashboardExtenderArgs args, String keyName)
{
    try
    {
        string parameter = args.NameValuePairs.XFGetValue($"{keyName}", string.Empty);
        if (args.SelectionChangedTaskInfo.CustomSubstVarsWithUserSelectedValues.ContainsKey(parameter))
        {
            return args.SelectionChangedTaskInfo.CustomSubstVarsWithUserSelectedValues[parameter];
        }
        return string.Empty;
    }
    catch (Exception ex)
    {
        MethodBase method = MethodBase.GetCurrentMethod();
        String methodName = (method != null ? method.Name : "Unknown");
        throw BRApi.ErrorLog.LogError(si, new XFException(si, $"An unhandled exception occurred in {methodName}", ex.Message, ex.InnerException));
    }
}
```

## Using Session State

When there is a need to access data across an application, modules of a solution, or even resuming the last state a user obtained within a system, OneStream session state may be an ideal choice. Expand below for details.

### Business Rule - Storing Session Data

It is important to note that session is only meant to store small amounts of data and should be used sparingly. At the moment, only String and Data Table objects are supported by default. However, some class objects may be serialized into a JSON string and stored. Session values are unique to a client instance and can be updated by calling the “Set” method a subsequent time.

#### STRING

**Business Rule - Store String Value**

```csharp
var sessionStateKey = "{YOUR PARAMETER NAME}";
var sessionStateValue = "{YOUR PARAMETER VALUE}";

BRApi.State.SetSessionState(si, false, si.ClientModuleType, string.Empty, string.Empty, sessionStateKey, string.Empty, sessionStateValue, null);
```

#### DATA TABLE

**Business Rule - Serialize Function**

```csharp
/// <summary>
/// Serialize class object
/// </summary>
/// <typeparam name="TObject">Type Object</typeparam>
/// <param name="classObject">Class Object To Serialize</param>
/// <returns>byte[]</returns>
public static byte[]? SerializeObject<TObject>(TObject classObject)
{
    byte[]? serializedObject = null;
    if (classObject != null) { serializedObject = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(classObject)); }
    return serializedObject;
}
```

**Business Rule - Store Data Table Object**

```csharp
var sessionStateKey = "{YOUR PARAMETER NAME}";
var serializedObject = SerializeObject({YOUR DATATABLE OBJECT});

BRApi.State.SetSessionState(si, false, si.ClientModuleType, string.Empty, string.Empty, sessionStateKey, string.Empty, string.Empty, serializedObject);
```

### Business Rule - Retrieving Session Data
Retrieving session values or objects are pretty straightforward, although checking for potential null values is essential.

#### STRING

**Business Rule - Obtain String Value**

```csharp
var sessionStateKey = "{YOUR PARAMETER NAME}";
var userStateObject = BRApi.State.GetSessionState(si, false, si.ClientModuleType, string.Empty, string.Empty, sessionStateKey, string.Empty);

var text = string.Empty;

if (userStateObject != null)
{
    text = userStateObject.TextValue;
}
```

#### DATA TABLE

**Business Rule - Deserialize Function**

```csharp
/// <summary>
/// Deserialize session object
/// </summary>
/// <typeparam name="TResult">Type Result</typeparam>
/// <param name="sessionObject">Session Object To Deserialize</param>
/// <returns>TResult</returns>
public static TResult? DeserializeObject<TResult>(XFUserState sessionObject)
{
    TResult? deserializedObject = default;
    if (sessionObject != null) { deserializedObject = JsonConvert.DeserializeObject<TResult>(Encoding.UTF8.GetString(sessionObject.BinaryValue)); }
    return deserializedObject;
}
```

**Business Rule - Obtain Data Table Object**

```csharp
var sessionStateKey = "{YOUR PARAMETER NAME}";
var userStateObject = BRApi.State.GetSessionState(si, false, si.ClientModuleType, string.Empty, string.Empty, sessionStateKey, string.Empty);
var dt = new DataTable();
if (userStateObject != null)
{
    dt = DeserializeObject<DataTable>(userStateObject);
}
```

## Deserializing JSON

If you ever need to consume JSON payload data and parse through its contents, deserialization may be a critical step.

### Business Rule - Retrieving JSON Data

While retrieving and transforming JSON data is pretty simple, creating a class structure that matches your payload is essential.

#### INPUT DATA

**JSON Payload - Sample**

```json
{
    "Data" :
        [
            {
                "Category": "Category One",
                "Description": "This is category #1",
                "Items": [
                    {
                        "Name": "Item A",
                        "Details": "This is item A"
                    }
                ]
            },
            {
                "Category": "Category Two",
                "Description": "This is category #2",
                "Items": []
            }
        ]
}
```

#### LIBRARY REFERENCES

**Business Rule**

```csharp
using Newtonsoft.Json;
```

#### CLASS DEFINITIONS

**Business Rule - Sample**

```csharp
/// <summary>
/// JSON Data Object
/// </summary>
public class JsonData
{
    public List<JsonRoot> Data { get; set; }
}
/// <summary>
/// JSON Root Object
/// </summary>
public class JsonRoot
{
    public string Category { get; set; }
    public string Description { get; set; }
    public List<JsonItem> Items { get; set; }
}
/// <summary>
/// JSON Object Item
/// </summary>
public class JsonItem
{
    public string Name { get; set; }
    public string Details { get; set; }
}
```

#### DESERIALIZE FUNCTION

**Business Rule - Sample**

```csharp
var result = JsonConvert.DeserializeObject<JsonData>(payload);
```

## Code Organization (Assemblies)

After migrating your solution to version 8, or any above, it can be helpful to take advantage of workspace assembly features. This applies to developing new solutions as well.

### Business Rule - Code Structure

Many of us have already migrated our existing solutions to platform version 8 and relocated our business rules to workspace assemblies. However, there is an opportunity to break our code base down into smaller files, increasing organization and readability. The below is just a sample, and not a defacto standard. Be creative and apply what best suits your project requirements. Although when restructuring your solution, it is important to consider that Windows limits us to a file path length of 256 characters (XF Project Extract).

#### BEFORE

**Business Rule Assembly**

- Sample Hierarchy
  - **Dependencies**
  - **Files**
    - ZZZ_HelperQueries.cs
    - ZZZ_ParamHelper.cs
    - ZZZ_SharedHelper.cs
    - ZZZ_SolutionHelper.cs

#### AFTER

**Business Rule Assembly**

- Sample Hierarchy
  - **Dependencies**
  - **Files**
    - _Business_
      - DashboardDataSets.cs
      - DashboardExtenders.cs
      - DashboardStrings.cs
    - _Database_
      - DatabaseHelper.cs
      - Queries.cs
    - _Extensions_
      - ExtendedTaskResult.cs
    - _Installation_
      - Setup.cs
    - _Shared_
      - Common.cs

## Business Rule -

:::caution
TODO

This is a work in progress, with more documentation to come.
Stay tuned ;)
:::

<!-- Use the below when creating a new tip

## Template - New Title

Template - new content summary.

### Template - new content detail #1
Template - new content overview / explanation #1

#### Your common example #1

```
code block here
```

#### Your best practice #1

```
code block here
```

-->
