window.onload = () => {

    document.getElementById("copy").onclick = () => {
        document.getElementById("output").select()
        document.execCommand("copy")
    }

    const codes = {
        "Reset": "0",

        /*
        "Black-fg":"30",
        "Dark-Red-fg":"31",
        "Dark-Green-fg":"32",
        "Dark-Yellow-fg":"33",
        "Dark-Blue-fg":"34",
        "Dark-Magenta-fg":"35",
        "Dark-Cyan-fg":"36",
        "Light-Gray-fg":"37",*/
        "Black-fg":"38;5;0",
        "Dark-Red-fg":"38;5;1",
        "Dark-Green-fg":"38;5;2",
        "Dark-Yellow-fg":"38;5;3",
        "Dark-Blue-fg":"38;5;4",
        "Dark-Magenta-fg":"38;5;5",
        "Dark-Cyan-fg":"38;5;6",
        "Light-Gray-fg":"38;5;7",
        "Dark-Gray-fg":"38;5;8",
        "Light-Red-fg":"38;5;9",
        "Light-Green-fg":"38;5;10",
        "Light-Yellow-fg":"38;5;11",
        "Light-Blue-fg":"38;5;12",
        "Light-Magenta-fg":"38;5;13",
        "Light-Cyan-fg":"38;5;14",
        "White-fg":"38;5;15",
        "Default-fg":"39",

        /*
        "Black-bg":"40",
        "Dark-Red-bg":"41",
        "Dark-Green-bg":"42",
        "Dark-Yellow-bg":"43",
        "Dark-Blue-bg":"44",
        "Dark-Magenta-bg":"45",
        "Dark-Cyan-bg":"46",
        "Light-Gray-bg":"47",*/
        "Black-bg":"48;5;0",
        "Dark-Red-bg":"48;5;1",
        "Dark-Green-bg":"48;5;2",
        "Dark-Yellow-bg":"48;5;3",
        "Dark-Blue-bg":"48;5;4",
        "Dark-Magenta-bg":"48;5;5",
        "Dark-Cyan-bg":"48;5;6",
        "Light-Gray-bg":"48;5;7",
        "Dark-Gray-bg":"48;5;8",
        "Light-Red-bg":"48;5;9",
        "Light-Green-bg":"48;5;10",
        "Light-Yellow-bg":"48;5;11",
        "Light-Blue-bg":"48;5;12",
        "Light-Magenta-bg":"48;5;13",
        "Light-Cyan-bg":"48;5;14",
        "White-bg":"48;5;15",  
        "Default-bg":"49",

        "Bold": "1",
        "Italic": "3",
        "Underline": "4",
        "Strikethrough": "9",
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
        if (settings.fgcolor === e.innerHTML.replace(/ /g,"-")){
            settings.fgcolor = ""
        }
        else{
            settings.fgcolor = e.innerHTML.replace(/ /g,"-")
        }

        settings.reset = false
        updateOutput()
    }
    let selBgcolor = (e) => {
        if (settings.bgcolor === e.innerHTML.replace(/ /g,"-")){
            settings.bgcolor = ""
        }
        else{
            settings.bgcolor = e.innerHTML.replace(/ /g,"-")
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
                if (b.innerHTML.replace(/ /g,"-") === settings.fgcolor) {
                    b.style.backgroundColor = "#507f9b"
                }
            })
        }
        if (settings.bgcolor){
            output += codes[settings.bgcolor + "-bg"] + ";"
            bgcolor_btns.forEach(b => {
                if (b.innerHTML.replace(/ /g,"-") === settings.bgcolor) {
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
