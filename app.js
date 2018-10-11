/*jshint esversion: 6 */
// Qiita.comは、認証していない場合は1時間に60リクエスト

let range = (n) => [...Array(n).keys()];
let showLocalStoreageInConsole = () => console.log(window.localStorage);
let clearLocalStorage = () => window.localStorage.clear();

let request = (url, key) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4)
            localStorage.setItem(key, JSON.stringify(xhr.response));
    };
    xhr.responseType = 'json';
    xhr.open("GET", url);
    xhr.send();
};

let getLanguageData = () => {
    const per_page = 100;
    range(15)
        .map((n, i, a) => `https://qiita.com` + `/api/v2/tags?page=${n + 1}&per_page=${per_page}&sort=count`)
        .forEach(v => request(v, v));
};

let langs = [
    'JavaScript', 'Python', 'Ruby', 'PHP', 'Java', 'Swift', 'C#', 'C++', 'Go', 'CSS',
    'Objective-C', 'HTML', 'Bash', 'Scala', 'R', 'C', 'TypeScript', 'Kotlin',
    'Haskell', 'SQL', 'PowerShell', 'Perl', 'Elixir', 'Clojure', 'Groovy', 'Erlang', 'C言語',
    'processing', 'Lua', 'Julia', 'AppleScript', 'ExcelVBA', 'awk', 'common-lisp', 'sed',
    'Delphi', 'ActionScript', 'LINQ', 'flash', 'F#', 'Scheme', 'Nim', 'Prolog', 'OCaml', 'ClojureScript',
    'アセンブラ',
    'Smalltalk', 'vvvv',
    'Rust'
];

let fillterByLang = () =>
    range(localStorage.length)
        .map(n => localStorage.key(n))
        .map(key => JSON.parse(localStorage.getItem(key)))
        //.flat()
        .reduce((acc, val) => acc.concat(val), [])
        .filter(o => langs.includes(o.id))
        .sort((a, b) => b.items_count - a.items_count);
