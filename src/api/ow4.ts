import secrets from "../secrets";

const OW4_BASE = "https://online.ntnu.no/api/v1/";

export default {
    authenticate: (): Promise<Response> => (
        fetch(
            `${OW4_BASE}auth/?client_id=` +
            `${encodeURIComponent(secrets.clientId)}&client_secret=${encodeURIComponent(secrets.clientSecret)}` +
            "&grant_type=client_credentials",
            { method: "post" },
        )
    ),
    retrieveStoreItems: (): Promise<Response> => (
        fetch(`${OW4_BASE}inventory/`)
    ),
};
