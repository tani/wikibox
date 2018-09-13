class Api {
    public sessionToken?: string;
    constructor(sessionToken?: string) {
        this.sessionToken = sessionToken;
    }
}
interface Api {
    token(username: string, password: string): Promise<string | null>;
}
Api.prototype.token = async function(username: string, password: string) {
    const body = new FormData();
    body.append("username", username);
    body.append("password", password);
    if (process.env.NODE_ENV === "development") {
        return "development";
    }
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
interface Api {
    edit(filename: string, content: Blob): Promise<string | null>;
}
Api.prototype.edit = async function(filename: string, content: Blob) {
    if (this.sessionToken === undefined) {
        return null;
    }
    const body = new FormData();
    body.append("content", content);
    body.append("sessionToken", this.sessionToken);
    const response = await fetch(`./data/${filename}`, {
        body, method: "PUT",
    });
    if (response.status === 200) {
        const text = await response.text();
        return text;
    } else {
        return null;
    }
};
interface Api {
    src(filename: string): Promise<string | null>;
}
Api.prototype.src = async function(filename: string) {
    const response = await fetch(`./data/${filename}`);
    if (response.status === 200) {
        const text = await response.text();
        return text;
    } else {
        return null;
    }
};
export default Api;
