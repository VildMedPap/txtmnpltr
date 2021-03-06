const manipulatorButtons = document.getElementsByClassName(
    "app__controllers--manipulators"
)[0];
const actionButtons = document.getElementsByClassName(
    "app__controllers--actions"
)[0];
const textInput = document.querySelector(".app__textInput > label > textarea");
const textOutput = document.querySelector(
    ".app__textOutput > label > textarea"
);

class Utils {
    static manipulate(text, type) {
        if (type === "reverse") return this.reverse(text);
        if (type === "kripkerize") return this.kripkerize(text);
        if (type === "kripkerize_lambdacism")
            return this.kripkerize_lambdacism(text);
        if (type === "margonize") return this.margonize(text);
        if (type === "devowelize") return this.devowelize(text);
        if (type === "numeronymize") return this.numeronymize(text);
    }

    static reverse(text) {
        return text.split("").reverse().join("");
    }

    static kripkerize(text) {
        return text
            .split("")
            .map((char) => {
                return char === "r" ? "w" : char === "R" ? "W" : char;
            })
            .join("");
    }

    static kripkerize_lambdacism(text) {
        return text
            .split("")
            .map((char) => {
                return char === "r" || char === "l"
                    ? "w"
                    : char === "R" || char === "L"
                    ? "W"
                    : char;
            })
            .join("");
    }

    static margonize(text) {
        return text
            .split("")
            .map((char) => {
                return Math.random() > 0.65
                    ? char.toUpperCase()
                    : char.toLowerCase();
            })
            .join("");
    }

    static devowelize(text) {
        const vowels = "iyeauoæøå";
        return text
            .split("")
            .map((char) => {
                return vowels.includes(char) ? "" : char;
            })
            .join("");
    }

    static numeronymize(text) {
        const nonWords = /(?=[^\wæøåÆØÅ])|(?<=[^\wæøåÆØÅ])/g;
        const isWord = /[\wæøåÆØÅ]+/;

        return text
            .split(nonWords)
            .map((token) => {
                if (isWord.test(token)) {
                    const n = token.length;
                    if (n <= 2) return token;

                    return `${token.slice(0, 1)}${n - 2}${token.slice(-1)}`;
                }

                return token;
            })
            .join("");
    }
}

manipulatorButtons.addEventListener("click", (event) => {
    const isBtn = event.target.matches("button");
    if (!isBtn) return;

    const inputText = textInput.value;
    const manipulateType = event.target.id;
    const manipulatedText = Utils.manipulate(inputText, manipulateType);

    textOutput.value = manipulatedText;
});

manipulatorButtons.addEventListener("dblclick", (event) => {
    const isBtn = event.target.matches("button");
    if (!isBtn) return;

    let manipulateType = event.target.id;
    if (manipulateType !== "kripkerize") return;

    const inputText = textInput.value;
    manipulateType = "kripkerize_lambdacism";
    const manipulatedText = Utils.manipulate(inputText, manipulateType);

    textOutput.value = manipulatedText;
});

actionButtons.addEventListener("click", (event) => {
    const isBtn = event.target.matches("button");
    if (!isBtn) return;

    const actionType = event.target.outerText;

    if (actionType === "clear") {
        textInput.value = null;
        textOutput.value = null;
        textInput.select();
        return;
    }

    if (actionType === "copy") {
        if (textOutput.value) {
            textOutput.select();
        }
        navigator.clipboard.writeText(textOutput.value);
    }
});
