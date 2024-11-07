---
sidebar_position: 2
title: Community Solutions Solution Development Standards
sidebar_label: Development Standards
---

These Community Solutions Standards, including recommended best practices, are to ensure that Community Solutions Solutions are created that meet OneStream solution development requirements.

### Base Standards

The following are the core coding and development standards that should be in place for any solution submitted to be included in Community Solutions.

_FUTURE: Any solution which meets these base requirements will receive X # OF DEV COMMUNITY POINTS towards their DEV COMMUNITY LEVEL and/or DEV COMMUNITY LEVEL X._

#### Testing

Before submitting solutions to Community Solutions, it is expected that developers have performed reasonable unit testing, performance testing, and quality assurance testing.

- Developers are encouraged to test for any functional issues or bugs.
- Developers must also perform security testing and provide testing logs to OneStream upon request.

#### API Usage

- Solutions must use the OneStream Business Rule API (BRApi) unless otherwise agreed upon.
- OneStream may change published and non-published public functions without prior notice. To request access to a non-published function, use the [Unpublished API Request Form](https://forms.office.com/r/pt6YfpyS6C).

#### Security

- Solutions must parameterize SQL queries to prevent vulnerabilities like SQL injection attacks.
- All parameters must be validated before and after running the solution.

#### Performance

- Solutions with long-running synchronous jobs may be subject to suspension.
- Excessive error logging may also lead to suspension.

#### Code Quality

- Solutions must have commented code, error-handling checks, and user messages.

#### Installation and Uninstallation

- Solutions must have an installer and an uninstaller that removes all created artifacts and data
- A partial uninstall routine can also be provided.

#### Naming Convention

- Solutions must follow the OneStream Solution naming convention standards.

#### Support

- Solutions are community supported via OneStream Community.
- Developers are encouraged, but not required, to support their solutions.

#### External Libraries

- Solutions must only use native core OneStream platform DLLs.

## OneStream Solution Review

### Scans & Review Requirements

#### Code Scanning

- All solutions created on Platform Version 8.0 (MP3-1618) will be scanned using Marketplace Solution Tools (MST) and/or other code-checking tools.
- For solutions on v8.0 developers should use MST during development and before submission. MST checks for various potential issues, including:
  - Unsafe SQL queries
  - Unused SQL queries within command-type parameters
  - Unsupported solution or file types
  - Solution initialization failures
  - Missing database connection statements (`Using()` statements)
  - Uninitialized or untyped variables
  - Functions missing return types
  - References to external assemblies (.dll files), databases, or processes
  - Security violations related to user and group modifications

#### Code Review

- OneStream may manually review solution code before approval.
- Encrypted submissions must be resent in an unencrypted format.

#### Security Review

- OneStream will conduct a manual security review and scan of solutions in an unencrypted format.
- Encrypted submissions must be resent unencrypted.
- Security tests will cover areas like access control and injection flaws.

#### Installation Tests

- Solutions must pass installation tests, including:
  - Loading and uncompressing all solution files.
  - Verifying the presence of all created tables, dashboards, and business rules.
  - Ensuring data structure matches the solution's install guide.
  - Successful compilation of all business rules.
  - Successful loading of the solution.

#### Uninstall Tests

- Solutions must pass uninstall tests, including:
  - Having an uninstall option in the solution settings.
  - Providing options for full and UI uninstallation in the uninstall dashboard.
- Full uninstallation tests include:
  - Executing the full uninstall option.
  - Verifying the removal of all solution dashboards, UI elements, and business rules.
  - Verifying the removal of all solution tables and data.

## Solution Removal

Any solution that causes performance or functional issues with OneStream offerings may immediately be suspended or removed. The solution will not be reinstated until the developer resolves the issue and resubmits it for approval by OneStream.

## Supporting Documentation
