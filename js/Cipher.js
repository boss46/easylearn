function encrypt() {
    var tb1 = document.getElementById("text1");
    var pt = tb1.value;
    pt = pt.toUpperCase();
    var tb2 = document.getElementById("text2");
    var key = tb2.value;
    key = key.toUpperCase();
    var len = pt.length;

    if (document.title == "VigenerCipher") {
        while(key.length<=len)
            key += key;
        key = key.substring(0, len);
    }
    
    var tbl = document.getElementById("table1");
    while(tbl.hasChildNodes())
	    tbl.removeChild(tbl.lastChild);
    var row = new Array(9);
    var cell = new Array(9 * len);
    var c = 0;
    for (i = 0; i < 9; i++) {
        row[i] = document.createElement("tr");
        for (j = 0; j < len; j++) {
            cell[c] = document.createElement("td");
            row[i].appendChild(cell[c++]);
        }
        tbl.appendChild(row[i]);
    }
    row[1].setAttribute("bgcolor", "pink");
    row[3].setAttribute("bgcolor", "pink");
    row[7].setAttribute("bgcolor", "plum");

    var ct = "";
    var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (i = 0; i < len; i++) {
        var index1 = alpha.indexOf(pt.charAt(i));
        var index2 = alpha.indexOf(key.charAt(i));
        var index3 = (index1 + index2) % 26;
        ct += alpha.charAt(index3);
    }

    c = 0;
    for (j = 0; j < len; j++)
        cell[c++].innerHTML = pt.charAt(j);

    for (j = 0; j < len; j++) {
        var index1 = alpha.indexOf(pt.charAt(j));
        cell[c++].innerHTML = index1;
    }
    for (j = 0; j < len; j++)
        cell[c++].innerHTML = key.charAt(j);

    for (j = 0; j < len; j++) {
        var index2 = alpha.indexOf(key.charAt(j));
        cell[c++].innerHTML = index2;
    }
    for (j = 0; j < len; j++) {
        var index1 = alpha.indexOf(pt.charAt(j));
        cell[c++].innerHTML = "+"+index1;
    }
    for (j = 0; j < len; j++) {
        var index1 = alpha.indexOf(pt.charAt(j));
        var index2 = alpha.indexOf(key.charAt(j));
        cell[c++].innerHTML = index1+index2;
    }
    for (j = 0; j < len; j++)
        cell[c++].innerHTML = "%26";

    for (j = 0; j < len; j++) {
        var index1 = alpha.indexOf(pt.charAt(j));
        var index2 = alpha.indexOf(key.charAt(j));
        var index3 = (index1 + index2) % 26;
        cell[c++].innerHTML = index3;
    }
    for (j = 0; j < len; j++)
        cell[c++].innerHTML = ct.charAt(j);
}