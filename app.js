const include = document.getElementById("include");
const NOTinclude = document.getElementById("NOTinclude");
const possition = Array.from(document.querySelectorAll(".possition"));
const output = document.getElementById("output");
var allWords = [];

const filter = () => {
    const possitions = possition.map(e => e.value.toLowerCase());
    const includes = include.value.split("").map(e => e.toLowerCase());
    const NOTincludes = NOTinclude.value.split("").map(e => e.toLowerCase());

    var possibleWords;

    possibleWords = allWords.filter(w => {
        const wl = possitions.filter(e => e).length;
        var n = 0;
        for(let i=0; i<5; ++i){
            const l = possitions[i];
            if(!l) continue;
            if(w[i] === l) n++;
        }
        if(wl === n) return true;
        return false;
    })

    for(let i=0; i<includes.length; ++i){
        const v = includes[i];
        possibleWords = possibleWords.filter(w => w.includes(v));
    }
    
    for(let i=0; i<NOTincludes.length; ++i){
        const v = NOTincludes[i];
        possibleWords = possibleWords.filter(w => !w.includes(v));
    }
    const list = possibleWords.map(w => `<li class="bg-blue-300 py-2 rounded md my-2 text-gray-900 text-xl w-4/5">${w}</li>`).join("");
    output.innerHTML = `<h1 class="text-white text-2xl my-2">Suggested words</h1><ul>${list}</ul>`;
}

include.addEventListener("input", filter);
NOTinclude.addEventListener("input", filter);
possition.map(e => e.addEventListener("input", () => {
    for(let i=0; i<possition.length; ++i){
        if(!possition[i].value){
            possition[i].focus();
            break;
        }
    }

    filter();
}));

const main = async () => {
    const getWords = await fetch('./allwords.txt');
    allWords = await (await getWords.text()).split(/\n/);
    console.log(allWords);
}

export default main;
