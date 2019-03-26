class Api {
    public token?: string;
    constructor(token?: string) {
        this.token = token;
    }
}
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
