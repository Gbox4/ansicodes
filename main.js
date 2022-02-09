window.onload = () => {

    document.getElementById("copy").onclick = () => {
        document.getElementById("output").select()
        document.execCommand("copy")
    }

    const codes = {
        "Reset": 0,

        "Black-fg":30,
        "Red-fg":31,
        "Green-fg":32,
        "Yellow-fg":33,
        "Blue-fg":34,
        "Magenta-fg":35,
        "Cyan-fg":36,
        "White-fg":37,
        "Default-fg":39,
        
        "Black-bg": 40,
        "Red-bg": 41,
        "Green-bg": 42,
        "Yellow-bg": 43,
        "Blue-bg": 44,
        "Magenta-bg": 45,
        "Cyan-bg": 46,
        "White-bg": 47,
        "Default-bg": 49,        

        "Bold": 1,
        "Italic": 3,
        "Underline": 4,
        "Strikethrough": 9,
    }

    const all_btns = document.querySelectorAll("button")
    const fgcolor_btns = document.querySelectorAll(".fgcolor-btn")
    const bgcolor_btns = document.querySelectorAll(".bgcolor-btn")
    const style_btns = document.querySelectorAll(".style-btn")
    const escape_btns = document.querySelectorAll(".escape-btn")

    let settings = {
        fgcolor: "",
        bgcolor: "",
        style: [],
        reset: false,
        escape: "\\x1b",
    }

    let selFgcolor = (e) => {
        if (settings.fgcolor === e.innerHTML){
            settings.fgcolor = ""
        }
        else{
            settings.fgcolor = e.innerHTML
        }

        settings.reset = false
        updateOutput()
    }
    let selBgcolor = (e) => {
        if (settings.bgcolor === e.innerHTML){
            settings.bgcolor = ""
        }
        else{
            settings.bgcolor = e.innerHTML
        }

        settings.reset = false
        updateOutput()
    }
    let selStyle = (e) => {
        if (settings.style.includes(e.innerHTML)) {
            settings.style.splice(settings.style.indexOf(e.innerHTML), 1)
        }
        else {
            settings.style.push(e.innerHTML)
        }
        settings.reset = false
        updateOutput()
    }
    let selReset = (e) => {
        settings.reset = !settings.reset
        updateOutput()
    }
    let selEscape = (e) => {
        settings.escape = e.innerHTML
        updateOutput()
    }

    let updateOutput = () => {

        all_btns.forEach(x => {
            x.style.backgroundColor = "#777777"
        })

        if (settings.reset) {
            settings = {
                fgcolor: "",
                bgcolor: "",
                style: [],
                reset: true,
                escape: settings.escape,
            }
        }

        let output = ""
        if (settings.fgcolor){
            output += codes[settings.fgcolor + "-fg"] + ";"
            fgcolor_btns.forEach(b => {
                if (b.innerHTML === settings.fgcolor) {
                    b.style.backgroundColor = "#507f9b"
                }
            })
        }
        if (settings.bgcolor){
            output += codes[settings.bgcolor + "-bg"] + ";"
            bgcolor_btns.forEach(b => {
                if (b.innerHTML === settings.bgcolor) {
                    b.style.backgroundColor = "#507f9b"
                }
            })
        }
        settings.style.forEach(x => {
            output += codes[x] + ";"
            style_btns.forEach(b => {
                if (b.innerHTML === x) {
                    b.style.backgroundColor = "#507f9b"
                }
            })
        })
        escape_btns.forEach(b => {
            if (b.innerHTML === settings.escape) {
                b.style.backgroundColor = "#507f9b"
            }
        })

        if (settings.reset) {
            document.getElementsByClassName("reset-btn")[0].style.backgroundColor = "#507f9b"
            document.getElementById('output').value = settings.escape + "[0m"
        }
        else if (output === "") {
            document.getElementsByClassName("reset-btn")[0].style.backgroundColor = "#777777"
            document.getElementById('output').value = ""
        }
        else {
            document.getElementsByClassName("reset-btn")[0].style.backgroundColor = "#777777"
            document.getElementById('output').value = settings.escape + "[" + output.slice(0, -1) + "m"
        }
    }

    fgcolor_btns.forEach(x => {
        x.onclick = () => {selFgcolor(x)}
    })
    bgcolor_btns.forEach(x => {
        x.onclick = () => {selBgcolor(x)}
    })
    style_btns.forEach(x => {
        x.onclick = () => {selStyle(x)}
    })
    escape_btns.forEach(x => {
        x.onclick = () => {selEscape(x)}
    })

    document.getElementsByClassName("reset-btn")[0].onclick = () => {selReset()}
    updateOutput()
}
