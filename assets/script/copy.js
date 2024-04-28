window.mousePosition = [0, 0]
window.addEventListener("mousemove", (evt) => {
    window.mousePosition = [evt.clientX, evt.clientY]
})

function copy(text) {
    if (text === "...") {
        return
    }
    navigator.clipboard.writeText(text);
    const msg = document.getElementById("copied").style;
    msg.display = "block";
    msg.marginLeft = window.mousePosition[0].toString() + "px"
    msg.marginTop = window.mousePosition[1].toString() + "px"

    window.addEventListener("mousemove", () => {
        msg.display = "none"
    })
}
