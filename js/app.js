const controllers = document.getElementsByClassName("app__controllers")[0];
const textInput = document.querySelector(".app__textInput > label > textarea");
const textOutput = document.querySelector(
    ".app__textOutput > label > textarea"
);

class Utils {
    static manipulate(text, type) {
        if (type === "reverse") return this.reverse(text);
        if (type === "kripkerize") return this.kripkerize(text);
        if (type === "margonize") return this.margonize(text);
        if (type === "numeronymize") return this.numeronymize(text);
    }

    static reverse(text) {
        return text.split("").reverse().join("");
    }

    static kripkerize(text) {
        return "kripkerize";
    }

    static margonize(text) {
        const chars = text.split("");
        for (let i = 0; i < chars.length; i++) {
            if (Math.random() > 0.5) {
                chars[i] = chars[i].toUpperCase();
            } else {
                chars[i] = chars[i].toLowerCase();
            }
        }
        return chars.join("");
    }

    static numeronymize(text) {
        return "numeronymize";
    }
}

controllers.addEventListener("click", (event) => {
    const isBtn = event.target.matches("button");

    if (!isBtn) {
        return;
    }

    const inputText = textInput.value;
    const manipulateType = event.target.outerText;
    const manipulatedText = Utils.manipulate(inputText, manipulateType);

    textOutput.value = manipulatedText;
});
