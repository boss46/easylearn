var nov;
var atb;
var a;
var src, dst;
var btn;
var cell;

function create() {
    var tb = document.getElementById("text1");
    nov = parseInt(tb.value);
    var form = document.getElementById("form1");
    var lbl = document.getElementById("label1");
    form.removeChild(lbl);
    form.removeChild(tb);
    btn = document.getElementById("button1");
    form.removeChild(btn);
    form.appendChild(document.createElement("br"));

    atb = new Array();
    var k = 0;
    for (i = 0; i < nov + 1; i++) {
        for (j = 0; j < nov + 1; j++) {
            atb[k] = document.createElement("input");
            atb[k].type = "text";
            atb[k].size = "1";
            if (i == j) {
                atb[k].value = 0;
                atb[k].readOnly = true;
                if (i == 0)
                    atb[k].value = "";
            }
            if (j == 0 && i > 0) {
                atb[k].value = i - 1;
                atb[k].readOnly = true;
                atb[k].style.backgroundColor = "yellow";
            }
            if (i == 0 && j > 0) {
                atb[k].value = j - 1;
                atb[k].readOnly = true;
                atb[k].style.backgroundColor = "yellow";
            }
            if (j > 0 && j < i) {
                atb[k].readOnly = true;
                atb[k].style.backgroundColor = "orange";
            }
            form.appendChild(atb[k++]);
        }
        var br = document.createElement("br");
        form.appendChild(br);
    }
    form.appendChild(document.createElement("br"));
    btn.innerHTML = "Submit";
    btn.setAttribute("onclick", "kruskal();return false");
    form.appendChild(btn);
}

function getData() {
    a = new Array(nov);
    for (i = 0; i < nov; i++)
        a[i] = new Array(nov);
    var k = 0;
    for (i = 0; i < nov + 1; i++) {
        for (j = 0; j < nov + 1; j++) {
            if (i != 0 && j != 0) {
                if (i == j)
                    a[i - 1][j - 1] = 0;
                if (j > i)
                    a[i - 1][j - 1] = parseInt(atb[k].value);
                if (j < i)
                    a[i - 1][j - 1] = a[j - 1][i - 1];
            }
            k++;
        }
    }
}

function kruskal() {
    getData();
    var wt = new Array();
    src = new Array();
    dst = new Array();
    k = 0;
    for (i = 0; i < nov; i++) {
        for (j = 0; j < nov; j++) {
            if (a[i][j] != 0 && j > i) {
                wt[k] = a[i][j];
                src[k] = i;
                dst[k++] = j;
            }
        }
    }
    var len = wt.length;
    for (i = 1; i < len; i++) {
        var t1 = wt[i];
        var t2 = src[i];
        var t3 = dst[i];
        var j = i;
        while (j > 0 && t1 < wt[j - 1]) {
            wt[j] = wt[j - 1];
            src[j] = src[j - 1];
            dst[j] = dst[j - 1];
            j--;
        }
        wt[j] = t1;
        src[j] = t2;
        dst[j] = t3;
    }
    
    var tbl = document.getElementById("table1");
    var row = new Array();
    cell = new Array();
    var c = 0;
    for (i = 0; i < 3; i++) {
        row[i] = document.createElement("tr");
        for (j = 0; j < len + 1; j++) {
            cell[c] = document.createElement("td");
            if (i == 0) {
                if (j == 0)
                    cell[c].innerHTML = "Weight";
                else
                    cell[c].innerHTML = wt[j - 1];
            }
            if (i == 1) {
                if (j == 0)
                    cell[c].innerHTML = "Src";
                else
                    cell[c].innerHTML = src[j - 1];
            }
            if (i == 2) {
                if (j == 0)
                    cell[c].innerHTML = "Dst";
                else
                    cell[c].innerHTML = dst[j - 1];
            }
            row[i].appendChild(cell[c++]);
        }
        tbl.appendChild(row[i]);
    }
}
