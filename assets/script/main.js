function getBaseFromSelect(select) {
    const val = select.options[select.selectedIndex].value
    switch (val) {
        case "Decimal (Base 10)":
            return 10
        case "Binary (Base 2)":
            return 2
        case "Hexadecimal (Base 16)":
            return 16
        case "Octal (Base 8)":
            return 8
        default:
            return Number(val.replace("Base ", ""))
    }
}
const fromBaseElem = document.getElementById("from-base-select")
const toBaseElem = document.getElementById("to-base-select")
window.fromBase = getBaseFromSelect(fromBaseElem)
window.toBase = getBaseFromSelect(toBaseElem)
fromBaseElem.addEventListener("change", (evt) => {
    window.fromBase = getBaseFromSelect(fromBaseElem)
    Array.from(toBaseElem.options).forEach(element => {
        element.disabled = false
    });
    toBaseElem.options[fromBaseElem.selectedIndex].disabled = true
    update()
})
toBaseElem.addEventListener("change", (evt) => {
    window.toBase = getBaseFromSelect(toBaseElem)
    Array.from(fromBaseElem.options).forEach(element => {
        element.disabled = false
    });
    fromBaseElem.options[toBaseElem.selectedIndex].disabled = true
    update()
})

const chrs = "0123456789ABCDEFG"

function validate(input, base) {
    const chrs_ = chrs.slice(0, base)
    return input.split("").every((ch) => chrs_.includes(ch))
}

toBase10 = (input, fromBase) => input.split("").reverse().map((chr, index) => Number(chr)*fromBase**index).reduce((a, b) => a+b)
fromBase10 = (input, toBase) => {
    console.log(input);
    res = ""
    input = Number(input)
    var h = 0
    while (input >= toBase**(h+1)) {
        h++
    }
    for (let i = h; i >= 0; i--) {
        res += chrs[Math.floor(input/(toBase**i))]
        input %= toBase**i
    }
    return res
}

const copyElem = document.getElementById("msg-click-to-copy")
function update() {
    inElem.value = inElem.value.toUpperCase();
    const val = inElem.value
    if (!val) {
        outElem.innerHTML = "..."
        copyElem.style.display = "none"
        return
    }
    copyElem.style.display = "block"
    if (!validate(val, window.fromBase)) {
        outElem.innerHTML = "Invalid input"
        return
    }
    if (window.fromBase == 10) {
        outElem.innerHTML = fromBase10(val, window.toBase)
    }
    else if (window.toBase == 10) {
        outElem.innerHTML = toBase10(val, window.fromBase)
    }
    else {
        outElem.innerHTML = fromBase10(toBase10(val, window.fromBase), window.toBase)
    }
}

const inElem = document.getElementById("in")
const outElem = document.getElementById("out")
inElem.addEventListener("input", update)
update()