class Api {
    public token?: string;
    constructor(token?: string) {
        this.token = token;
    }
}
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
export default Api;
