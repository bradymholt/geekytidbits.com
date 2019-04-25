---
title: 'One-way Hashing in C#'
author: Brady
permalink: /one-way-hashing/
dsq_thread_id: 90 http://www.geekytidbits.com/?p=90
---

Sensitive data stored in a database should always be encrypted. Sometimes sensitive data needs to be unencrypted for further processing such as when a credit card needs to be unencrypted occasionally to make a charge against it or when a social security number needs to be shown on a confidential report.

However, there are other scenarios when data should _never_ be able to be unencrypted.  A perfect example of this is **passwords**.  With this type of data, a &#8220;one-way hash&#8221; should be generated which means using an algorithm to change the data in a way that it cannot be changed back.

### The code

There are many ways to do this and I believe some are overly complicated.  Here is an easy way using the System.Security.Cryptography namespace.

```csharp
public static string HashText(string text, string salt, HashAlgorithmType hasher)
{
    byte[] textWithSaltBytes = Encoding.UTF8.GetBytes(string.Concat(text, salt));
    byte[] hashedBytes = hasher.ComputeHash(textWithSaltBytes);
    hasher.Clear();
    return Convert.ToBase64String(hashedBytes);
}
```

The **salt** parameter is used to increase the strength of the hash and defend against <a href="http://www.google.com/search?q=rainbow+table+hack" target="_blank">Rainbow Table Attacks</a>.  The salt value can be any text but the strongest salt is one that changes with each hash.  For instance, when hashing a user&#8217;s password, use their username or database identifier as the salt.

### Example usage

```csharp
string password = "WeakPassword";
string salt = "MySecretSalt";
string hashedPassword = HashText(password, salt, new SHA1CryptoServiceProvider());
```

Although I used the SHA1CryptoServiceProvider class to perform the hash, there are several others offered that will work fine too such as SHA512Managed and SHA384Managed. Do a Google search to determine the algorithm that meets your strength/performance needs.

### Putting it to use

If it is a password you are hashing, you should hash the value immediately after the user initially provides it to you (i.e. &#8220;Reset Your Password&#8221; page) and store the hashed value in the database.  Then, when they come back to your application and attempt to login with their password, you should re-hash the supplied password (with the original salt used!), compare to the stored hashed password and if they match, you should be safe to authenticate them.
