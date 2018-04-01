var len;
var row = new Array();
var cell = new Array();
var atb;
var lbl, tb, btn;
var form, tbl;
var a;

function getElements() {
    lbl = document.getElementById("label1");
    tb = document.getElementById("text1");
    btn = document.getElementById("button1");
    form = document.getElementById("form1");
    tbl = document.getElementById("table1");
}

function create() {
    len = parseInt(tb.value);
    if (document.title == "LinearSearch")
        lbl.innerHTML = "Enter numbers: ";
    else
        lbl.innerHTML = "Enter numbers in ascending order: ";
    form.removeChild(tb);
    form.removeChild(btn);

    atb = new Array(len);
    for (i = 0; i < len; i++) {
        atb[i] = document.createElement("input");
        atb[i].type = "text";
        atb[i].size = "1";
        form.appendChild(atb[i]);
    }
    btn.innerHTML = "Add";
    btn.setAttribute("onclick", "getNumbers();return false");
    form.appendChild(btn);
}

function getNumbers() {
    a = new Array(len);
    for (i = 0; i < len; i++)
        a[i] = atb[i].value;
    lbl.innerHTML = "Enter a number to search: ";
    for (i = 0; i < len; i++) {
        form.removeChild(atb[i]);
    }
    form.removeChild(btn);
    tb.value = "";
    form.appendChild(tb);
    btn.innerHTML = "Search";
    if (document.title == "LinearSearch")
        btn.setAttribute("onclick", "linearSearch();return false");
    else if (document.title == "BinarySearch")
        btn.setAttribute("onclick", "binarySearch();return false");
    else if (document.title == "JumpSearch")
        btn.setAttribute("onclick", "jumpSearch();return false");
    form.appendChild(btn);
}

function linearSearch() {
    var find = parseInt(tb.value);
    while (tbl.hasChildNodes())
        tbl.removeChild(tbl.lastChild);
    var c = 0;
    for (i = 0; i < len; i++) {
        row[i] = document.createElement("tr");
        for (j = 0; j < len; j++) {
            cell[c] = document.createElement("td");
            cell[c].innerHTML = a[j];
            row[i].appendChild(cell[c++]);
        }
        tbl.appendChild(row[i]);
        if (a[i] != find) {
            cell[len * i + i].setAttribute("bgcolor", "pink");
            if (i == len - 1)
                alert("Number not found!");
        }
        else {
            cell[len * i + i].setAttribute("bgcolor", "plum");
            break;
        }
    }
}

function binarySearch() {
    var find = parseInt(tb.value);
    var first = 0, last = len - 1;
    var mid;
    var found = 0;

    while(tbl.hasChildNodes())
	tbl.removeChild(tbl.lastChild);
    var r = 0, c = 0;
    while(found==0){
        mid = Math.floor((first + last) / 2);

        row[r] = document.createElement("tr");
        for (j = 0; j < len; j++) {
            cell[c] = document.createElement("td");
            row[r].appendChild(cell[c++]);
        }
        tbl.appendChild(row[r++]);
        c -= len;

        for(i=0;i<len;i++){
            if (i <= last && i >= first) {
                if (i == mid) {
                    cell[c].setAttribute("bgcolor", "pink");
                    cell[c++].innerHTML = a[i];
                }
                else
                    cell[c++].innerHTML = a[i];
            }
            else
                c++;
        }

        if(a[mid]>find){
            last=mid-1;
        }
        else if(a[mid]<find){
            first=mid+1;
        }
        else if(a[mid]==find){
            found=1;
        }

        row[r] = document.createElement("tr");
        for (j = 0; j < len; j++) {
            cell[c] = document.createElement("td");
            row[r].appendChild(cell[c++]);
        }
        tbl.appendChild(row[r++]);
        c -= len;

        if (found != 1) {
            for(i=0;i<len;i++){
                if (i <= last && i >= first)
                    cell[c++].innerHTML = a[i];
                else
                    c++;
            }
        }
        else{
            for(i=0;i<len;i++){
                if (a[i] == find) {
                    cell[c].setAttribute("bgcolor", "plum");
                    cell[c++].innerHTML = a[i];
                }
                else
                    c++;
            }
        }
    }
}

function jumpSearch() {
    var find = parseInt(tb.value);
    var sum=0;
    var min=0,max=0;
    var found=0;
    var count = Math.floor(Math.sqrt(len));

    while (tbl.hasChildNodes())
        tbl.removeChild(tbl.lastChild);
    var r = 0, c = 0;
    while(sum<len){
        row[r] = document.createElement("tr");
        for (j = 0; j < len; j++) {
            cell[c] = document.createElement("td");
            row[r].appendChild(cell[c++]);
        }
        tbl.appendChild(row[r++]);
        c -= len;

        for(i=0;i<len;i++){
            if(i<min)
                c++;
            else{
                if (i == sum) {
                    cell[c].setAttribute("bgcolor", "pink");
                    cell[c++].innerHTML = a[i];
                }
                else
                    cell[c++].innerHTML = a[i];
            }
        }
        if(a[sum]>=find){
            max=sum;
            break;
        }
        else
            min=sum+1;
        sum+=count;
        if(sum>=len)
            max=len-1;
    }

    for(j=min;j<=max;j++){
        if (a[j] == find) {
            row[r] = document.createElement("tr");
            for (j = 0; j < len; j++) {
                cell[c] = document.createElement("td");
                row[r].appendChild(cell[c++]);
            }
            tbl.appendChild(row[r]);
            c -= len;

            for(i=0;i<len;i++){
                if(i<min||i>max)
                    c++
                else{
                    if(a[i]==find){
                        cell[c].setAttribute("bgcolor", "plum");
                        cell[c++].innerHTML = a[i];
                    }
                    else
                        cell[c++].innerHTML = a[i];
                }
            }
            break;
        }
    }
}
