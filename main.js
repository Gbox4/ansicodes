window.onload = () => {

    document.getElementById("copy").onclick = () => {
        document.getElementById("output").select()
        document.execCommand("copy")
    }

    const codes = {
        "Reset": 0,
        "Red-fg": 31,
        "Green-fg": 32,
        "Yellow-fg": 33,
        "Blue-fg": 34,

        "Bold": 1,
        "Italic": 3,
        "Underline": 4,
        "Strikethrough": 9,
    }

    const all_btns = document.querySelectorAll("button")
    const fgcolor_btns = document.querySelectorAll(".fgcolor-btn")
    const style_btns = document.querySelectorAll(".style-btn")

    let settings = {
        fgcolor: "",
        style: [],
        reset: false,
    }

    let selFgcolor = (e) => {
        if (settings.fgcolor === e.innerHTML){
            settings.fgcolor = ""
        }
        else{
            settings.fgcolor = e.innerHTML
        }

        updateOutput()
    }
    let selStyle = (e) => {
        if (settings.style.includes(e.innerHTML)) {
            settings.style.splice(settings.style.indexOf(e.innerHTML), 1)
        }
        else {
            settings.style.push(e.innerHTML)
        }
        
        updateOutput()
    }
    let selReset = (e) => {
        settings.reset = !settings.reset
        updateOutput()
    }

    let updateOutput = () => {

        all_btns.forEach(x => {
            x.style.backgroundColor = "#777777"
        })

        let output = ""
        if (settings.fgcolor){
            output += codes[settings.fgcolor + "-fg"] + ";"
            fgcolor_btns.forEach(b => {
                if (b.innerHTML === settings.fgcolor) {
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

        
        document.getElementsByClassName("reset-btn")[0].style.backgroundColor = "#507f9b"
        if (output === "") {
            output = "0;"
            document.getElementById('output').value = "\\x1b[" + output.slice(0, -1) + "m"
        }
        else {
            document.getElementById('output').value = "\\x1b[" + output.slice(0, -1) + "m"
        }
    }

    fgcolor_btns.forEach(x => {
        x.onclick = () => {selFgcolor(x)}
    })

    style_btns.forEach(x => {
        x.onclick = () => {selStyle(x)}
    })

    document.getElementsByClassName("reset-btn")[0].onclick = () => {selReset()}
}