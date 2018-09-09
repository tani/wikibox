import { some, none, Option } from "fp-ts/lib/Option";

class Api {
    host: string;
    constructor(host = location.host) {
        this.host = host;
    }
}
interface AuthBody {
    sessionToken: string;
}
interface Api {
    sessionToken?: string;
    auth(username: string, password: string): Promise<Option<AuthBody>>
}
Api.prototype.auth = async function (username: string, password: string) {
    const body = new FormData();
    body.append("username", username);
    body.append("password", password);
    const response = await fetch(`${this.host}/auth/${username}`, {
        method: "POST", body
    });
    if ( response.status === 200) {
        const body = await response.json();
        this.sessionToken = body.sessionToken;
        return some(body)
    } else {
        this.sessionToken = undefined;
        return none;
    }
}
interface Api {
    readonly isAuthorized: boolean;
}

Object.defineProperty(Api.prototype, "isAuthorized", {
    get() {
        return this.sessionToken !== undefined
    }
})
interface EditBody {}
interface Api {
    edit(filename: string, content: Blob): Promise<Option<EditBody>>;
}
Api.prototype.edit = async function (filename: string, content: Blob) {
    if(!this.sessionToken) {
        return none;
    }
    const body = new FormData();
    body.append("content", content);
    body.append("sessionToken", this.sessionToken);
    const response = await fetch(`${this.host}/edit/${filename}`, {
        method: "POST", body
    });
    if ( response.status ) {
        const body = await response.json();
        return some(body)
    } else {
        return none
    }
}
interface SourceBody {
    content: string;
}
interface Api {
    src(filename: string): Promise<Option<SourceBody>>
}
Api.prototype.src = async function(filename: string) {
    const response = await fetch(`${this.host}/src/${filename}`);
    if ( response.status ) {
        const body = await response.json();
        return some(body)
    } else {
        return none
    }
}
interface HistoryBody {
    history: { username: string, timestamp: string }[];
}
interface Api {
    hist(filename: string): Promise<Option<HistoryBody>>;
}
Api.prototype.hist = async function(filename: string) {
    const response = await fetch(`${this.host}/hist/${filename}`);
    if ( response.status ) {
        const body = await response.json();
        return some(body);
    } else {
        return none
    }
}
export default Api;
