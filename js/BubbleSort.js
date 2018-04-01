var len;
var cell;
var atb;
var form, btn;
function create() {
    var tb = document.getElementById("text1");
    len = parseInt(tb.value);
    form = document.getElementById("form1");
    var lbl = document.getElementById("label1");
    lbl.innerHTML = "Enter numbers: ";
    form.removeChild(tb);
    btn = document.getElementById("button1");
    form.removeChild(btn);
    atb = new Array(len);
    for (i = 0; i < len; i++) {
        atb[i] = document.createElement("input");
        atb[i].type = "text";
        atb[i].size = "1";
        form.appendChild(atb[i]);
    }
    btn.innerHTML = "Sort";
    btn.setAttribute("onclick", "bubbleSort();return false");
    form.appendChild(btn);
}
function bubbleSort() {
    a = new Array(len);
    for (i = 0; i < len; i++)
        a[i] = parseInt(atb[i].value);
    var tbl = document.getElementById("table1");
    var row = new Array();
    cell = new Array();
    var c = 0;
    for (i = 0; i < len - 1; i++) {
        row[i] = document.createElement("tr");
        for (j = 0; j < len; j++) {
            cell[c] = document.createElement("td");
            row[i].appendChild(cell[c++]);
        }
        tbl.appendChild(row[i]);
    }
    btn.innerHTML = "Start";
    btn.setAttribute("onclick", "next();return false");
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    form.appendChild(btn);
}
var k = 0;
function next() {
    var c = 0;
    for (j = 0; j < len - 1; j++) {
        if (a[j] > a[j + 1]) {
            var t = a[j];
            a[j] = a[j + 1];
            a[j + 1] = t;
            for (i = 0; i < len; i++) {
                if (i == j) {
                    cell[c].setAttribute("bgcolor", "plum");
                    cell[c + 1].setAttribute("bgcolor", "plum");
                }
                cell[c++].innerHTML = a[i];
            }
        }
        else {
            for (i = 0; i < len; i++) {
                if (i == j) {
                    cell[c].setAttribute("bgcolor", "pink");
                    cell[c + 1].setAttribute("bgcolor", "pink");
                }
                cell[c++].innerHTML = a[i];
            }
        }
    }
    k++;
    if (k == len - 1) {
        btn.innerHTML = "Finish";
        btn.setAttribute("onclick", "return true");
    }
    else
        btn.innerHTML = "Next";
}