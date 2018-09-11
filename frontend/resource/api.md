# API Reference

```typescript
class Api {
    host: string;
    sessionToken?: string;
    constructor(host = location.host, sessionToken?:string) {
        this.host = host;
        this.sessionToken = sessionToken;
    }
}
```

### Authorization
- Request (`POST /auth/:username`)
    
    | Parameters |   Type   |
    | :--------- | :------- |
    | usernmae   | `string` |
    | password   | `string` |

- Response
    
    | Status |            body            |    Meaning     |
    | :----- | :------------------------- | :------------- |
    | 200    | `{ sessionToken: string }` | Authorized     |
    | 401    | `{}`                       | Not authorized |

```typescript
interface AuthBody {
    sessionToken: string;
}
interface Api {
    auth(username: string, password: string): Promise<AuthBody|null>
}
Api.prototype.auth = async function (username: string, password: string) {
    const body = new FormData();
    body.append("username", username);
    body.append("password", password);
    if ( process.env.NODE_ENV === "development") {
        return { sessionToken: "development" };
    }
    const response = await fetch(`${this.host}/auth/${username}`, {
        method: "POST", body
    });
    if ( response.status === 200) {
        const body = await response.json();
        return body
    } else {
        return null;
    }
}
```

### Editing
- Request (`POST /edit/:filename`)
    
    |  Parameters  |     Type      |
    | :----------- | :------------ |
    | filename     | `string`      |
    | sessionToken | `string`      |
    | content      | `Blob`        |

- Response
    
    | Status | Content |   Meaning   |
    | :----- | :------ | :---------- |
    | 200    | `{}`    | Edited      |
    | 401    | `{}`    | Didn't edit |

```typescript
interface EditBody {}
interface Api {
    edit(filename: string, content: Blob): Promise<EditBody|null>;
}
Api.prototype.edit = async function (filename: string, content: Blob) {
    if (this.sessionToken === undefined) {
        return null
    }
    const body = new FormData();
    body.append("content", content);
    body.append("sessionToken", this.sessionToken);
    const response = await fetch(`${this.host}/edit/${filename}`, {
        method: "POST", body
    });
    if ( response.status === 200 ) {
        const body = await response.json();
        return body
    } else {
        return null
    }
}
```

#### Source
- Request (`GET /src/:filename`)
    
    | Parameters |   Type   |
    | :--------- | :------- |
    | filename   | `string` |

- Response  
    
    | Status |        Content        |       Meaning       |
    | :----- | :-------------------- | :------------------ |
    | 200    | `{ content: string }` | content of filename |
    | 404    | `{}`                  | file not found      |


```typescript
interface SourceBody {
    content: string;
}
interface Api {
    src(filename: string): Promise<SourceBody|null>
}
Api.prototype.src = async function(filename: string) {
    const response = await fetch(`${this.host}/src/${filename}`);
    if ( response.status === 200 ) {
        const body = await response.json();
        return body
    } else {
        return null
    }
}
```

#### History
- Request (`GET /hist/:filename`)
    
    | Parameters |   Type   |
    | :--------- | :------- |
    | filename   | `string` |

- Response
    
    | Status |                         Content                          |       Meaning       |
    | :----- | :------------------------------------------------------- | :------------------ |
    | 200    | `{ history: { username: string, timestamp: string }[] }` | history of filename |
    | 404    | `{}`                                                     | file not found      |

```typescript
interface HistoryBody {
    history: { username: string, timestamp: string }[];
}
interface Api {
    hist(filename: string): Promise<HistoryBody|null>;
}
Api.prototype.hist = async function(filename: string) {
    const response = await fetch(`${this.host}/hist/${filename}`);
    if ( response.status ) {
        const body = await response.json();
        return body;
    } else {
        return null;
    }
}
```

```typescript
export default Api;
```
