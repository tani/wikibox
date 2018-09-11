# API Reference

```typescript
class Api {
    public host: string;
    public sessionToken?: string;
    constructor(host = location.host, sessionToken?: string) {
        this.host = host;
        this.sessionToken = sessionToken;
    }
}
```

### Authorization
- Request (`POST /auth`)
    
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
    auth(username: string, password: string): Promise<AuthBody | null>;
}
Api.prototype.auth = async function(username: string, password: string) {
    const body = new FormData();
    body.append("username", username);
    body.append("password", password);
    if (process.env.NODE_ENV === "development") {
        return { sessionToken: "development" };
    }
    const response = await fetch(`${this.host}/auth`, {
        body, method: "POST",
    });
    if (response.status === 200) {
        const json = await response.json();
        return json;
    } else {
        return null;
    }
};
```

### Editing
- Request (`POST /:filename`)
    
    |  Parameters  |   Type   |
    | :----------- | :------- |
    | filename     | `string` |
    | sessionToken | `string` |
    | content      | `Blob`   |

- Response
    
    | Status |        Content        |   Meaning   |
    | :----- | :-------------------- | :---------- |
    | 200    | `{ content: string }` | Edited      |
    | 401    | `{}`                  | Didn't edit |

```typescript
interface EditBody {
    content: string;
}
interface Api {
    edit(filename: string, content: Blob): Promise<EditBody | null>;
}
Api.prototype.edit = async function(filename: string, content: Blob) {
    if (this.sessionToken === undefined) {
        return null;
    }
    const body = new FormData();
    body.append("content", content);
    body.append("sessionToken", this.sessionToken);
    const response = await fetch(`${this.host}/${filename}`, {
        body, method: "POST",
    });
    if (response.status === 200) {
        const json = await response.json();
        return json;
    } else {
        return null;
    }
};
```

#### Source
- Request (`GET /:filename`)
    
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
    src(filename: string): Promise<SourceBody | null>;
}
Api.prototype.src = async function(filename: string) {
    const response = await fetch(`${this.host}/${filename}`);
    if (response.status === 200) {
        const json = await response.json();
        return json;
    } else {
        return null;
    }
};
```

```typescript
export default Api;
```
