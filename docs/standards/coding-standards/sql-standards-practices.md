---
sidebar_position: 7
title: Good practices when writing SQL in OneStream business rules
sidebar_label: SQL Standards and Practices
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

There are many cases where you will need to write queries to access data in your application database tables. We’ll provide both requirements that must be followed as well as recommendations for making your code and readable and maintainable as possible.

Check your queries and ensure that they are in a clearly readable format (string interpolation), use appropriate keyword casing, and include the WITH (NOLOCK) syntax, where applicable.

:::caution
TODO

(more content here)

Discuss the reasons for parameterizing SQL

Examples of parameterizing

why we should use dynamic SQL in business rules rather than embedded in the data adapter

discuss the option of using stored proceedures and why they can be beneficial

Explain the limitations of encrypting stored procedures to protect IP
:::

## The SQL_QueryBuilder class

If your solution consumes SQL data, whenever possible, try to include and use this provided helper class `SQL_QueryBuilder`.  This may alleviate the heavy lifting associated with your application’s data access.

You can utilize the below helper class in your solutions.

### `SQL_QueryBuilder` Code Examples

:::caution
TODO

C# CONVERSION STILL NEEDS TO BE REVIEWED
:::

<Tabs>
<TabItem value="vb" label="VB.NET">

```vb  showLineNumbers
Public Class SQL_QueryBuilder

#Region "Properties"

    Private Property SI As SessionInfo = Nothing
    Private Property Query As New Text.StringBuilder
    Public Property Params As New List(Of DbParamInfo)

#End Region

#Region "Constructors"

    Public Sub New(si As SessionInfo)
        Try
            Me.SI = si

        Catch ex As Exception
            Throw ErrorHandler.LogWrite(Me.SI, New XFException(Me.SI, ex))
        End Try
    End Sub

#End Region

#Region "Conditions & Parameters"

    Public Sub AddLine(ByVal newLine As String)
        Try
            Me.Query.AppendLine(newLine)

        Catch ex As Exception
            Throw ErrorHandler.LogWrite(Me.SI, New XFException(Me.SI, ex))
        End Try
    End Sub

    Public Sub AddParameter(paramName As String, paramValue As Object)
        Try
            Me.Params.Add(New DbParamInfo(paramName, paramValue))

        Catch ex As Exception
            Throw ErrorHandler.LogWrite(Me.SI, New XFException(Me.SI, ex))
        End Try
    End Sub

    Public Function CreateInClause(ByVal itemList As Object) As String
        Try
            Dim inClause As New Text.StringBuilder
            Dim itemListType As Type = itemList.GetType()

            'Validate The Object Is Of List Type
            If itemListType.IsGenericType AndAlso itemListType.GetGenericTypeDefinition.IsAssignableFrom(GetType(List(Of))) Then

                For Each i As Object In itemList

                    Dim paramCount As Integer = Me.Params.Count + 1

                    inClause.Append(If(inClause.Length = 0, $"@{paramCount}", $", @{paramCount}"))

                    Me.AddParameter(paramCount, i)

                Next

            Else

                Dim msg As String = $"In Clause must be created from type List(Of T), not {itemListType}."

                Throw New XFUserMsgException(SI, Nothing, Nothing, msg)

            End If

            Return inClause.ToString

        Catch ex As Exception
            Throw ErrorHandler.LogWrite(Me.SI, New XFException(Me.SI, ex))
        End Try
    End Function

    Public Sub AddParamsToDbCommand(ByVal dbParamInfos As List(Of DbParamInfo), ByVal dbCommand As DbCommand)

        If dbParamInfos IsNot Nothing Then

            For Each dbParamInfo As DbParamInfo In dbParamInfos

                Dim dbParameter As DbParameter = dbCommand.CreateParameter()

                dbParameter.Direction = dbParamInfo.Direction
                dbParameter.IsNullable = False
                dbParameter.ParameterName = dbParamInfo.Name
                dbParameter.Value = dbParamInfo.Value
                dbCommand.Parameters.Add(dbParameter)

            Next

        End If

    End Sub

#End Region

#Region "SQL Operations"

    Public Function GetDataTable(Optional ByVal dbLocation As DbLocation = DbLocation.Application, Optional ByVal useCommandTimeoutLarge As Boolean = False, Optional ByVal includePrimaryKeyInfo As Boolean = False) As DataTable
        Try
            Dim dt As DataTable = Nothing

            Select Case dbLocation

                Case DbLocation.Application

                    Using dbConnApp As DbConnInfo = BRApi.Database.CreateApplicationDbConnInfo(Me.SI)

                        Using dbCommand As DbCommand = dbConnApp.CreateCommand(useCommandTimeoutLarge)

                            dbCommand.CommandText = Me.Query.ToString

                            Me.AddParamsToDbCommand(Me.Params, dbCommand)

                            dt = DbSql.GetDataTable(dbConnApp, dbCommand, includePrimaryKeyInfo, False)

                        End Using

                    End Using

                Case DbLocation.Framework

                    Using dbConnFW As DbConnInfo = BRApi.Database.CreateFrameworkDbConnInfo(Me.SI)

                        Using dbCommand As DbCommand = dbConnFW.CreateCommand(useCommandTimeoutLarge)

                            dbCommand.CommandText = Me.Query.ToString
                            Me.AddParamsToDbCommand(Me.Params, dbCommand)
                            dt = DbSql.GetDataTable(dbConnFW, dbCommand, includePrimaryKeyInfo, False)

                        End Using

                    End Using

            End Select

            Return dt

        Catch ex As Exception
            Throw ErrorHandler.LogWrite(Me.SI, New XFException(Me.SI, ex))
        End Try
    End Function

    Public Function ExecuteAndReturnDataTable(Optional ByVal tableName As String = Nothing, Optional ByVal dbLocation As DbLocation = DbLocation.Application, Optional ByVal useCommandTimeoutLarge As Boolean = False) As DataTable
        Try
            Dim dt As DataTable = Nothing

            Select Case dbLocation

                Case DbLocation.Application

                    Using dbConnApp As DbConnInfoApp = BRApi.Database.CreateApplicationDbConnInfo(Me.SI)

                        dt = BRApi.Database.ExecuteSql(dbConnApp, Me.Query.ToString, Me.Params, useCommandTimeoutLarge)

                    End Using

                Case DbLocation.Framework

                    Using dbConnFW As DbConnInfoFW = BRApi.Database.CreateFrameworkDbConnInfo(Me.SI)

                        dt = BRApi.Database.ExecuteSql(dbConnFW, Me.Query.ToString, Me.Params, useCommandTimeoutLarge)

                    End Using

                Case Else

                    Exit Select

            End Select

            If tableName IsNot Nothing Then dt.TableName = tableName

            Return dt

        Catch ex As Exception
            Throw ErrorHandler.LogWrite(Me.SI, New XFException(Me.SI, ex))
        End Try
    End Function

    Public Function ExecuteAndReturnDataReader(Optional ByVal tableName As String = Nothing, Optional ByVal dbLocation As DbLocation = DbLocation.Application, Optional ByVal useCommandTimeoutLarge As Boolean = False) As DataTable
        Try
            Dim dt As DataTable = Nothing

            Select Case dbLocation

                Case DbLocation.Application

                    Using dbConnApp As DbConnInfoApp = BRApi.Database.CreateApplicationDbConnInfo(Me.SI)

                        dt = BRApi.Database.ExecuteSqlUsingReader(dbConnApp, Me.Query.ToString, Me.Params, useCommandTimeoutLarge)

                    End Using

                Case DbLocation.Framework

                    Using dbConnFW As DbConnInfoFW = BRApi.Database.CreateFrameworkDbConnInfo(Me.SI)

                        dt = BRApi.Database.ExecuteSqlUsingReader(dbConnFW, Me.Query.ToString, Me.Params, useCommandTimeoutLarge)

                    End Using

                Case Else

                    Exit Select

            End Select

            If tableName IsNot Nothing Then dt.TableName = tableName

            Return dt

        Catch ex As Exception
            Throw ErrorHandler.LogWrite(Me.SI, New XFException(Me.SI, ex))
        End Try
    End Function

    Public Function ExecuteActionQuery(Optional ByVal dbLocation As DbLocation = DbLocation.Application, Optional ByVal useCommandTimeoutLarge As Boolean = False) As Long
        Try
            Select Case dbLocation

                Case DbLocation.Application

                    Using dbConnApp As DbConnInfoApp = BRApi.Database.CreateApplicationDbConnInfo(Me.SI)

                        Return BRApi.Database.ExecuteActionQuery(dbConnApp, Me.Query.ToString, Me.Params, useCommandTimeoutLarge, True)

                    End Using

                Case DbLocation.Framework

                    Using dbConnFW As DbConnInfoFW = BRApi.Database.CreateFrameworkDbConnInfo(Me.SI)

                        Return BRApi.Database.ExecuteActionQuery(dbConnFW, Me.Query.ToString, Me.Params, useCommandTimeoutLarge, True)

                    End Using

                Case Else

                    Return -1

            End Select

        Catch ex As Exception
            Throw ErrorHandler.LogWrite(Me.SI, New XFException(Me.SI, ex))
        End Try
    End Function

#End Region

#Region "Miscellaneous"

    Public Function QueryString() As String

        Return Query.ToString

    End Function

    Public Sub WriteQueryToLog()
        Try
            Dim msg As New Text.StringBuilder(Me.Query.ToString)

            msg.AppendLine()
            msg.AppendLine("Parameters:")

            For Each param As DbParamInfo In Me.Params

                msg = msg.Replace(String.Format("@{0}", param.Name), String.Format("'{0}'", param.Value.ToString))
                msg.AppendLine(String.Format("{0} - {1}", param.Name, param.Value.ToString))

            Next

            BRApi.ErrorLog.LogMessage(Me.SI, msg.ToString)

        Catch ex As Exception
            Throw ErrorHandler.LogWrite(Me.SI, New XFException(Me.SI, ex))
        End Try
    End Sub

    Public Sub Reset()

        Params.Clear()
        Query.Clear()

    End Sub

#End Region

End Class

```

</TabItem>

<TabItem value="csharp" label="C#">

```csharp showLineNumbers
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Security;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualBasic;

public class SQL_QueryBuilder
{
    private SessionInfo SI { get; set; } = null/* TODO Change to default(_) if this is not a reference type */;
    private Text.StringBuilder Query { get; set; } = new System.Text.StringBuilder();
    public List<DbParamInfo> Params { get; set; } = new List<DbParamInfo>();



    public SQL_QueryBuilder(SessionInfo si)
    {
        try
        {
            this.SI = si;
        }
        catch (Exception ex)
        {
            throw ErrorHandler.LogWrite(this.SI, new XFException(this.SI, ex));
        }
    }



    public void AddLine(string newLine)
    {
        try
        {
            this.Query.AppendLine(newLine);
        }
        catch (Exception ex)
        {
            throw ErrorHandler.LogWrite(this.SI, new XFException(this.SI, ex));
        }
    }

    public void AddParameter(string paramName, object paramValue)
    {
        try
        {
            this.Params.Add(new DbParamInfo(paramName, paramValue));
        }
        catch (Exception ex)
        {
            throw ErrorHandler.LogWrite(this.SI, new XFException(this.SI, ex));
        }
    }

    public string CreateInClause(object itemList)
    {
        try
        {
            System.Text.StringBuilder inClause = new System.Text.StringBuilder();
            Type itemListType = itemList.GetType();

            // Validate The Object Is Of List Type
            if (itemListType.IsGenericType && itemListType.GetGenericTypeDefinition().IsAssignableFrom(typeof(List<>)))
            {
                foreach (object i in itemList)
                {
                    int paramCount = this.Params.Count + 1;

                    inClause.Append(inClause.Length == 0 ? $"@{paramCount}" : $", @{paramCount}");

                    this.AddParameter(paramCount, i);
                }
            }
            else
            {
                string msg = $"In Clause must be created from type List(Of T), not {itemListType}.";

                throw new XFUserMsgException(SI, null, null, msg);
            }

            return inClause.ToString();
        }
        catch (Exception ex)
        {
            throw ErrorHandler.LogWrite(this.SI, new XFException(this.SI, ex));
        }
    }

    public void AddParamsToDbCommand(List<DbParamInfo> dbParamInfos, DbCommand dbCommand)
    {
        if (dbParamInfos != null)
        {
            foreach (DbParamInfo dbParamInfo in dbParamInfos)
            {
                DbParameter dbParameter = dbCommand.CreateParameter();

                dbParameter.Direction = dbParamInfo.Direction;
                dbParameter.IsNullable = false;
                dbParameter.ParameterName = dbParamInfo.Name;
                dbParameter.Value = dbParamInfo.Value;
                dbCommand.Parameters.Add(dbParameter);
            }
        }
    }



    public DataTable GetDataTable(DbLocation dbLocation = DbLocation.Application, bool useCommandTimeoutLarge = false, bool includePrimaryKeyInfo = false)
    {
        try
        {
            DataTable dt = null/* TODO Change to default(_) if this is not a reference type */;

            switch (dbLocation)
            {
                case object _ when DbLocation.Application:
                    {
                        using (DbConnInfo dbConnApp = BRApi.Database.CreateApplicationDbConnInfo(this.SI))
                        {
                            using (DbCommand dbCommand = dbConnApp.CreateCommand(useCommandTimeoutLarge))
                            {
                                dbCommand.CommandText = this.Query.ToString();

                                this.AddParamsToDbCommand(this.Params, dbCommand);

                                dt = DbSql.GetDataTable(dbConnApp, dbCommand, includePrimaryKeyInfo, false);
                            }
                        }

                        break;
                    }

                case object _ when DbLocation.Framework:
                    {
                        using (DbConnInfo dbConnFW = BRApi.Database.CreateFrameworkDbConnInfo(this.SI))
                        {
                            using (DbCommand dbCommand = dbConnFW.CreateCommand(useCommandTimeoutLarge))
                            {
                                dbCommand.CommandText = this.Query.ToString();
                                this.AddParamsToDbCommand(this.Params, dbCommand);
                                dt = DbSql.GetDataTable(dbConnFW, dbCommand, includePrimaryKeyInfo, false);
                            }
                        }

                        break;
                    }
            }

            return dt;
        }
        catch (Exception ex)
        {
            throw ErrorHandler.LogWrite(this.SI, new XFException(this.SI, ex));
        }
    }

    public DataTable ExecuteAndReturnDataTable(string tableName = null, DbLocation dbLocation = DbLocation.Application, bool useCommandTimeoutLarge = false)
    {
        try
        {
            DataTable dt = null/* TODO Change to default(_) if this is not a reference type */;

            switch (dbLocation)
            {
                case object _ when DbLocation.Application:
                    {
                        using (DbConnInfoApp dbConnApp = BRApi.Database.CreateApplicationDbConnInfo(this.SI))
                        {
                            dt = BRApi.Database.ExecuteSql(dbConnApp, this.Query.ToString(), this.Params, useCommandTimeoutLarge);
                        }

                        break;
                    }

                case object _ when DbLocation.Framework:
                    {
                        using (DbConnInfoFW dbConnFW = BRApi.Database.CreateFrameworkDbConnInfo(this.SI))
                        {
                            dt = BRApi.Database.ExecuteSql(dbConnFW, this.Query.ToString(), this.Params, useCommandTimeoutLarge);
                        }

                        break;
                    }

                default:
                    {
                        break;
                        break;
                    }
            }

            if (tableName != null)
                dt.TableName = tableName;

            return dt;
        }
        catch (Exception ex)
        {
            throw ErrorHandler.LogWrite(this.SI, new XFException(this.SI, ex));
        }
    }

    public DataTable ExecuteAndReturnDataReader(string tableName = null, DbLocation dbLocation = DbLocation.Application, bool useCommandTimeoutLarge = false)
    {
        try
        {
            DataTable dt = null/* TODO Change to default(_) if this is not a reference type */;

            switch (dbLocation)
            {
                case object _ when DbLocation.Application:
                    {
                        using (DbConnInfoApp dbConnApp = BRApi.Database.CreateApplicationDbConnInfo(this.SI))
                        {
                            dt = BRApi.Database.ExecuteSqlUsingReader(dbConnApp, this.Query.ToString(), this.Params, useCommandTimeoutLarge);
                        }

                        break;
                    }

                case object _ when DbLocation.Framework:
                    {
                        using (DbConnInfoFW dbConnFW = BRApi.Database.CreateFrameworkDbConnInfo(this.SI))
                        {
                            dt = BRApi.Database.ExecuteSqlUsingReader(dbConnFW, this.Query.ToString(), this.Params, useCommandTimeoutLarge);
                        }

                        break;
                    }

                default:
                    {
                        break;
                        break;
                    }
            }

            if (tableName != null)
                dt.TableName = tableName;

            return dt;
        }
        catch (Exception ex)
        {
            throw ErrorHandler.LogWrite(this.SI, new XFException(this.SI, ex));
        }
    }

    public long ExecuteActionQuery(DbLocation dbLocation = DbLocation.Application, bool useCommandTimeoutLarge = false)
    {
        try
        {
            switch (dbLocation)
            {
                case object _ when DbLocation.Application:
                    {
                        using (DbConnInfoApp dbConnApp = BRApi.Database.CreateApplicationDbConnInfo(this.SI))
                        {
                            return BRApi.Database.ExecuteActionQuery(dbConnApp, this.Query.ToString(), this.Params, useCommandTimeoutLarge, true);
                        }

                        break;
                    }

                case object _ when DbLocation.Framework:
                    {
                        using (DbConnInfoFW dbConnFW = BRApi.Database.CreateFrameworkDbConnInfo(this.SI))
                        {
                            return BRApi.Database.ExecuteActionQuery(dbConnFW, this.Query.ToString(), this.Params, useCommandTimeoutLarge, true);
                        }

                        break;
                    }

                default:
                    {
                        return -1;
                    }
            }
        }
        catch (Exception ex)
        {
            throw ErrorHandler.LogWrite(this.SI, new XFException(this.SI, ex));
        }
    }



    public string QueryString()
    {
        return Query.ToString();
    }

    public void WriteQueryToLog()
    {
        try
        {
            System.Text.StringBuilder msg = new System.Text.StringBuilder(this.Query.ToString());

            msg.AppendLine();
            msg.AppendLine("Parameters:");

            foreach (DbParamInfo param in this.Params)
            {
                msg = msg.Replace(string.Format("@{0}", param.Name), string.Format("'{0}'", param.Value.ToString));
                msg.AppendLine(string.Format("{0} - {1}", param.Name, param.Value.ToString));
            }

            BRApi.ErrorLog.LogMessage(this.SI, msg.ToString());
        }
        catch (Exception ex)
        {
            throw ErrorHandler.LogWrite(this.SI, new XFException(this.SI, ex));
        }
    }

    public void Reset()
    {
        Params.Clear();
        Query.Clear();
    }
}

```

</TabItem>
</Tabs>

:::caution
TODO

Detail additional reasons why these helper classes can save time and increase productivity when writing SQL queries
:::
