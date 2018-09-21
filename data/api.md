# API Reference

```typescript
class Api {
    public token?: string;
    constructor(token?: string) {
        this.token = token;
    }
}
```

### Authorization
- Request (`POST ./token`)
    
    | Parameters |   Type   |
    | :--------- | :------- |
    | usernmae   | `string` |
    | password   | `string` |

- Response
    
    | Status |          body          |    Meaning     |
    | :----- | :--------------------- | :------------- |
    | 200    | `token: string`        | Authorized     |
    | 401    | `null`                 | Not authorized |

```typescript
interface Api {
    postToken(username: string, password: string): Promise<string | null>;
}
Api.prototype.postToken = async function(username: string, password: string) {
    const body = new URLSearchParams();
    body.append("username", username);
    body.append("password", password);
    const response = await fetch(`./token`, {
        body, method: "POST",
    });
    if (response.status === 200) {
        const text = await response.text();
        return text;
    } else {
        return null;
    }
};
```

### postDataing
- Request (`POST ./data/:filename`)
    
    |  Parameters  |   Type   |
    | :----------- | :------- |
    | filename     | `string` |
    | token | `string` |
    | content      | `Blob`   |

- Response
    
    | Status |      Content      |   Meaning             |
    | :----- | :---------------- | :-------------------- |
    | 200    | `content: string` | Update content        |
    | 401    | `null`            | Didn't update content |

```typescript
interface Api {
    postData(filename: string, content: string): Promise<string | null>;
}
Api.prototype.postData = async function(filename: string, content: string) {
    if (this.token === undefined) {
        return null;
    }
    const body = new URLSearchParams();
    body.append("content", content);
    body.append("token", this.token);
    const response = await fetch(`./data/${filename}`, {
        body, method: "POST",
    });
    if (response.status === 200) {
        const text = await response.text();
        return text;
    } else {
        return null;
    }
};
```

#### Source
- Request (`GET ./data/:filename`)
    
    | Parameters |   Type   |
    | :--------- | :------- |
    | filename   | `string` |

- Response  
    
    | Status |      Content      |       Meaning       |
    | :----- | :---------------- | :------------------ |
    | 200    | `content: string` | content of filename |
    | 404    | `null`            | file not found      |


```typescript
interface Api {
    getData(filename: string): Promise<string | null>;
}
Api.prototype.getData = async function(filename: string) {
    const response = await fetch(`./data/${filename}`);
    if (response.status === 200) {
        const text = await response.text();
        return text;
    } else {
        return null;
    }
};
```

```typescript
export default Api;
```
