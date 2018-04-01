var len;
var cell;
var atb;
function create() {
    var tb = document.getElementById("text1");
    len = parseInt(tb.value);
    var tbl = document.getElementById("table1");
    var row = new Array(len);
    cell = new Array(len * len);
    var c = 0;
    for (i = 0; i < len; i++) {
        row[i] = document.createElement("tr");
        for (j = 0; j < len; j++) {
            cell[c] = document.createElement("td");
            row[i].appendChild(cell[c++]);
        }
        tbl.appendChild(row[i]);
    }
    var form = document.getElementById("form1");
    var lbl = document.getElementById("label1");
    lbl.innerHTML = "Enter numbers: ";
    form.removeChild(tb);
    var btn = document.getElementById("button1");
    form.removeChild(btn);
    atb = new Array(len);
    for (i = 0; i < len; i++) {
        atb[i] = document.createElement("input");
        atb[i].type="text";
        atb[i].size="1";
        form.appendChild(atb[i]);
    }
    btn.innerHTML = "Sort";
    if(document.title=="SelectionSort")
	btn.setAttribute("onclick", "selectionSort();return false");
    else if (document.title=="InsertionSort")
	btn.setAttribute("onclick", "insertionSort();return false");
    form.appendChild(btn);
}
function selectionSort() {
    var a = new Array(len);
    for (i = 0; i < len; i++)
        a[i] = parseInt(atb[i].value);
    var c = 0;
    var pos=0;
    for (j = 1; j < len; j++) {
        if (a[pos] > a[j])
            pos = j;
    }
    for(i=0;i<len;i++){
	cell[c].setAttribute("bgcolor", "white");
	if(i==pos)
	    cell[c].setAttribute("bgcolor","plum");
        cell[c++].innerHTML = a[i];	
    }
    for (i = 0; i < len - 1; i++) {
        pos = i;
        for (j = i + 1; j < len; j++) {
            if (a[pos] > a[j])
                pos = j;
        }
        if (pos != i) {
            var temp = a[i];
            a[i] = a[pos];
            a[pos] = temp;
        }
	pos=i+1;
	for (j = i + 2; j < len; j++) {
            if (a[pos] > a[j])
                pos = j;
        }
        for (k = 0; k < len ; k++) {
	    if(i==len-2)
		cell[c].setAttribute("bgcolor", "pink");
	    else{
	        cell[c].setAttribute("bgcolor", "white");
                if (k <= i)
                    cell[c].setAttribute("bgcolor", "pink");
	        if(k==pos)
		    cell[c].setAttribute("bgcolor", "plum");
	    }
            cell[c++].innerHTML = a[k];
        }
    }
}
function insertionSort() {
    var a = new Array(len);
    for (i = 0; i < len; i++)
        a[i] = parseInt(atb[i].value);
    var c=0;
    for (j = 0; j < len; j++){
	if(j==0){
	    cell[0].setAttribute("bgcolor","pink");
	    cell[1].setAttribute("bgcolor","plum");
	}
        cell[c++].innerHTML = a[j];	
    }
    for (i = 1; i < len; i++) {
        var temp = a[i];
        var j=i;
        while (j > 0 && temp < a[j - 1]) {
            a[j] = a[j - 1];
            j--;
        }
        a[j] = temp;
        for (k = 0; k < len ; k++) {
            if (k <= i)
                cell[c].setAttribute("bgcolor", "pink");
	    if(k==i && k<len-1)
		cell[c+1].setAttribute("bgcolor", "plum");
            cell[c++].innerHTML = a[k];
        }
    }
}