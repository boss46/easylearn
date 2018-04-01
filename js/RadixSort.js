var row, cell;
var len;
var atb;
var a, out;
var max;
var form, btn;

function accept() {
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
    btn.setAttribute("onclick", "radixSort();return false");
    form.appendChild(btn);
}
function radixSort() {
    a = new Array(len);
    for (i = 0; i < len; i++)
        a[i] = parseInt(atb[i].value);
    max = a[0];
    for (i = 1; i < len; i++) {
        if (a[i] > max)
            max = a[i];
    }
    out = new Array(len);

    var tbl1 = document.getElementById("table1");
    row = new Array();
    cell = new Array();
    var c = 0;
    for (i = 0; i < 2; i++) {
        row[i] = document.createElement("tr");
        for (j = 0; j < 10; j++) {
            cell[c] = document.createElement("td");
            if (i == 0) {
                cell[c].setAttribute("bgcolor", "pink");
                cell[c].innerHTML = j;
            }
            else
                cell[c].setAttribute("align", "right");
            row[i].appendChild(cell[c++]);
        }
        tbl1.appendChild(row[i]);
    }

    btn.innerHTML = "Start";
    btn.setAttribute("onclick", "next();return false");
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    form.appendChild(btn);
}

var exp = 1;
function next() {
    for (j = 0; j < 10; j++) {
        cell[j + 10].innerHTML = "";
    }
    var bucket = new Array(10);
    for (i = 0; i < 10; i++)
        bucket[i] = 0;
    for (i = 0; i < len; i++) {
        var k = Math.floor(a[i] / exp) % 10;
        bucket[k]++;
        cell[k + 10].innerHTML += a[i];
        cell[k + 10].appendChild(document.createElement("br"));
    }
    for (i = 1; i < 10; i++)
        bucket[i] += bucket[i - 1];
    for (i = len - 1; i >= 0; i--)
        out[--bucket[Math.floor(a[i] / exp) % 10]] = a[i];
    for (i = 0; i < len; i++)
        a[i] = out[i];
    exp *= 10;

    if (Math.floor(max / exp) == 0) {
        btn.innerHTML = "Finish";
        btn.setAttribute("onclick", "return true");
    }
    else
        btn.innerHTML = "Next";
}
