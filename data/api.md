# API Reference

```typescript
class Api {
    public token?: string;
    constructor(token?: string) {
        this.token = token;
    }
}
```

## Get Data
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
