var textArray = ['Have Fun', 'Learn More']
var typingDelay = 100
var erasingDelay = 100
var newTextDelay = 2000
var typedTextSpan;
var cursorSpan;
let textArrayIndex = 0
let charIndex = 0

let bgColor = document.getElementById("bgTextColor")
let textColor = document.getElementById("textColor")
let movingTxtColor = document.getElementById("movingTxtColor")
let mainText = document.getElementById("mainText")
let movingText = document.getElementById("movingText")
let movingTextBtn = document.getElementById("movingTextBtn")

bgColor.addEventListener("input", function (event) {
    document.getElementById("textcontainer").style.backgroundColor = bgColor.value
    localStorage.setItem("bgColor", bgColor.value)
});
textColor.addEventListener("input", function (event) {
    document.getElementById("textHeader").style.color = textColor.value
    localStorage.setItem("textColor", textColor.value)
})
movingTxtColor.addEventListener("input", function (event) {
    document.getElementById("typing").style.color = movingTxtColor.value
    localStorage.setItem("movingTxtColor", movingTxtColor.value)
})
mainText.addEventListener("input", function (event) {
    document.getElementById("textHeader").innerHTML = mainText.value
    localStorage.setItem("mainText", mainText.value)
})
movingTextBtn.addEventListener("click", function () {
    if (dupTextArray.length == 0) {
        textArray = []
    }
    if (textArray.length < 8) {
        textArray.push(movingText.value)
    } else {
        alert("you can add max 8 moving Texts")
    }
    textArray = textArray.filter((item, index) => textArray.indexOf(item) === index)
   
    localStorage.setItem('textArray', textArray)
    listing();
    location.reload()
    //    type()
})

window.addEventListener("load", function (event) {
    document.getElementById("textcontainer").style.backgroundColor = localStorage.getItem('bgColor')
    document.getElementById("textHeader").style.color = localStorage.getItem('textColor')
    document.getElementById("typing").style.color = localStorage.getItem('movingTxtColor')
    if (this.localStorage.getItem('mainText') !== null) {
        this.document.getElementById("textHeader").innerHTML = this.localStorage.getItem('mainText')
        mainText.value = this.localStorage.getItem('mainText')
    } else {
        this.document.getElementById("textHeader").innerHTML = "VISHWA"
        mainText.value = "VISHWA"
    }
    bgColor.value = localStorage.getItem('bgColor')
    textColor.value = this.localStorage.getItem("textColor")
    this.localStorage.getItem("movingTxtColor") !== null ? movingTxtColor.value = this.localStorage.getItem("movingTxtColor") : ''
    if (this.localStorage.getItem('textArray') !== null) {
        let data
        data = this.localStorage.getItem('textArray')
        textArray = data.split(",")
    }
    listing();
    fisrtTimeVisit()
    if (textArray.length) {
        type();
    }
    
})
function fisrtTimeVisit(){
    if(localStorage.getItem('fisrtTimeVisit') == null){
        let styles = {
            "margin-left": "10px",
            "cursor": "pointer",
            "border-radius": "inherit",
            "padding": "0.5rem",
            "font-size": "13px"
        }
        let span = document.createElement("SPAN");
        span.classList.add("tooltiptext")
        span.innerText = "you can customize background color"
        let btn = document.createElement("button");
        Object.assign(btn.style, styles)
        btn.innerHTML = "OK";
        span.append(btn)
        let t1 = document.getElementById("t1")
        t1.append(span)
        window.addEventListener("click", function(){
            t1.removeChild(span)
            tooltip2();
        })
        function tooltip2(){
            let span = document.createElement("SPAN");
        span.classList.add("tooltiptext")
        span.innerText = "you can customize text color"
        let btn = document.createElement("button");
        Object.assign(btn.style, styles)
        btn.innerHTML = "OK";
        span.append(btn)
        let t2 = document.getElementById("t2")
        t2.append(span)
        window.addEventListener("click", function(){
            t2.removeChild(span)
            tooltip3();
        })
        }
        function tooltip3(){
            let span = document.createElement("SPAN");
        span.classList.add("tooltiptext")
        span.innerText = "you can customize moving text color"
        let btn = document.createElement("button");
        Object.assign(btn.style, styles)
        btn.innerHTML = "OK";
        span.append(btn)
        let t3 = document.getElementById("t3")
        t3.append(span)
        window.addEventListener("click", function(){
            t3.removeChild(span)
            tooltip4();
        })
        }
        function tooltip4(){
            let span = document.createElement("SPAN");
        span.classList.add("tooltiptext")
        span.innerText = "you can customize text"
        let btn = document.createElement("button");
        Object.assign(btn.style, styles)
        btn.innerHTML = "OK";
        span.append(btn)
        let t4 = document.getElementById("t4")
        t4.append(span)
        window.addEventListener("click", function(){
            t4.removeChild(span)
            tooltip5();
        })
        }
        function tooltip5(){
            let span = document.createElement("SPAN");
        span.classList.add("tooltiptext")
        span.innerText = "you can customize moving text"
        let btn = document.createElement("button");
        Object.assign(btn.style, styles)
        btn.innerHTML = "OK";
        span.append(btn)
        let t5 = document.getElementById("t5")
        t5.append(span)
        window.addEventListener("click", function(){
            t5.removeChild(span)
        })
        }
        localStorage.setItem("fisrtTimeVisit", true)
    }
}

function listing() {
    dupTextArray = textArray
    dupTextArray = textArray.filter((item, index) => dupTextArray.indexOf(item) === index)
    this.document.getElementById("list").innerHTML = ''
    for (var i of dupTextArray) {
        let li = this.document.createElement("li")
        let t = this.document.createTextNode(i)
        li.appendChild(t)
        let span = document.createElement("SPAN");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        this.document.getElementById("list").append(li)
        span.onclick = function () {
            li.style.display = "none"
            let index = dupTextArray.indexOf(i)
            let deletedData = dupTextArray.splice(index, 1)
            if (dupTextArray.length && deletedData !== dupTextArray) {
                console.log(textArray, "dupTextArray", dupTextArray, "deletedData", deletedData)
                textArray = dupTextArray
                localStorage.setItem('textArray', textArray)
                location.reload()
            } else if (dupTextArray.length == 0) {
                localStorage.removeItem("textArray")
                textArray = ["Please add text"]
            }
        }
    }
}


function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan?.classList?.contains("typing")) {
            cursorSpan?.classList?.add("typing");
            document.getElementById("typing").textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            charIndex < textArray[textArrayIndex].length ? setTimeout(type, typingDelay) : setTimeout(type, 0)
        }
    } else {
        cursorSpan?.classList.remove("typing")
        setTimeout(erase, newTextDelay)
    }
}
function erase() {
    if (charIndex > 0) {
        if (!cursorSpan?.classList?.contains("typing"))
            cursorSpan?.classList.add("typing")
        document.getElementById("typing").innerText = textArray[textArrayIndex].substring(0, charIndex - 1)
        charIndex--
        charIndex ? setTimeout(erase, erasingDelay) : setTimeout(erase, 0)
    } else {
        cursorSpan?.classList.remove("typing")
        if (textArrayIndex !== textArray.length - 1) {
            textArrayIndex++
        } else {
            textArrayIndex = 0
        }
        setTimeout(type, typingDelay + 1100)
    }
}

