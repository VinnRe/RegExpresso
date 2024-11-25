// export const apiUrl = 'http://localhost:3000'

export const endpoints = {
    login: `/api/user/login`,
    signup: `/api/user/signup`,
    logout: `/api/user/logout`,
    fetch: `/api/user/fetch`,
    visualizeNFA: `/api/parse/visualizeNFA`,
    visualizeDFA: `/api/parse/visualizeDFA`,
    tuplesNFA: `/api/parse/to5TuplesNFA`,
    tuplesDFA: `/api/parse/to5TuplesDFA`,
    fetchRegex: `/api/parse/fetchAll`,
    saveRegex: `/api/parse/save`,
    deleteRegex: `/api/parse/delete/`,
} 