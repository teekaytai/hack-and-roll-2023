import axios from 'axios';

async function getTokens(site) {
    let res = await axios.get(
        site
    );
    const tokens = [];
    tokens.push(res.headers['set-cookie'][0].split(";")[0]);
    tokens.push(res.data.substring(res.data.search("csrfToken")).split(",")[0].replace(/"/g, '').split(":")[1]);
    return tokens;
}

async function getResponse(site, body, headers) {
    let res = await axios.post(
        site, body, { headers }
    );
    const text = res.data;
    return text;
}

function getData(query, fields) {
    let l = query.data.results.length;
    let data = [];
    for (let i = 0; i < l; i++) {
        let temp = [];
        for (let j = 0; j < fields.length; j++) {
            temp[j] = query.data.results[i].listingCard[fields[j]];
        }
        data[i] = temp;
    }
    return data;
}

const body = {
    "bestMatchEnabled": true,
    "canChangeKeyword": false,
    "count": 40,
    "countryCode": "SG",
    "countryId": "1880251",
    "filters": [],
    "includeEducationBanner": true,
    "includeSuggestions": true,
    "locale": "en",
    "sortParam": {fieldName: "3"},
    "prefill": {}
    //"query": "PS5"
};

const headers = {
    'cookie': "",
    'csrf-token': ""
};

const tokens = await getTokens("https://carousell.sg");
headers['cookie'] = tokens[0];
headers['csrf-token'] = tokens[1];

export async function search(query, count = 40, filters) {
    body.query = query;
    body.count = count;
    body.filters = filters;
    const response = await getResponse('https://www.carousell.sg/api-service/filter/cf/4.0/search/', body, headers);
    return response.data.results.map(i => i.listingCard);
}
