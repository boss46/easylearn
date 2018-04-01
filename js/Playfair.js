var lbl, tb, btn;
var key;
var cell;
var alpha="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var beta="";
var a = new Array(5);
for (i = 0; i < 5; i++)
    a[i] = new Array(5);
var pt = "";
var ct = "";

function getElements() {
    lbl = document.getElementById("label1");
    tb = document.getElementById("text1");
    btn = document.getElementById("button1");
}

function includes(container, value) {
    var pos = container.indexOf(value);
    if (pos >= 0)
        return true;
    return false;
}
function generate() {
    key = tb.value;
    key = key.toUpperCase();
    var tbl = document.getElementById("table1");
    var row = new Array(5);
    cell = new Array(25);
    var c = 0;
    for (i = 0; i < 5; i++) {
        row[i] = document.createElement("tr");
        for (j = 0; j < 5; j++) {
            cell[c] = document.createElement("td");
            row[i].appendChild(cell[c++]);
        }
        tbl.appendChild(row[i]);
    }

    for (i = 0; i < key.length; i++) {
        if(includes(alpha,key.charAt(i))){
            if (!includes(beta,key.charAt(i)))
                beta+=key.charAt(i);
        }      
    }
    var len=beta.length;
    for(i=0;i<alpha.length;i++){
        if (!includes(beta,alpha.charAt(i))) {
            if(i!=16)
                beta+=alpha.charAt(i);
        }
    }
    for(i=0;i<25;i++)
        cell[i].innerHTML = beta.charAt(i);
    c=0;
    for(i=0;i<5;i++){
        for(j=0;j<5;j++)
            a[i][j]=beta.charAt(c++);
    }

    lbl.innerHTML = "Enter plain-text: ";
    tb.value = "";
    btn.innerHTML = "Start";
    btn.setAttribute("onclick", "encrypt();return false");
}

function encrypt() {
    pt = tb.value;
    pt=pt.toUpperCase();
    var len=pt.length;
    if(len%2!=0){
        pt+="X";
        len++;
    }
        
    var p,q,r,s;
    var t,u,v,w;
    var j = 0;
    for(i=0;i<len/2;i++) {
        var t1 = find(pt.charAt(j++));
        var t2 = find(pt.charAt(j++));

        p = parseInt(t1.charAt(0));
        q = parseInt(t1.charAt(1));
        r = parseInt(t2.charAt(0));
        s = parseInt(t2.charAt(1));

        if (r > p && s > q) {
            t = p; u = q + (s - q);
            v = r; w = s - (s - q);
        }
        else if (r > p && s < q) {
            t = p; u = q - (q - s);
            v = r; w = s + (q - s);
        }
        else if (p > r && q < s) {
            t = p; u = q + (s - q);
            v = r; w = s - (s - q);
        }
        else if (p > r && q > s) {
            t = p; u = q - (q - s);
            v = r; w = s + (q - s);
        }
        else if (p == r) {
            t = p; u = (q + 1) % 5;
            v = r; w = (s + 1) % 5;
        }
        else if (q == s) {
            t = (p + 1) % 5; u = q;
            v = (r + 1) % 5; w = s;
        }
        ct += a[t][u];
        ct += a[v][w];
    }

    lbl.innerHTML = "Cipher-text is: ";
    tb.value = "";
    btn.innerHTML = "Next";
    btn.setAttribute("onclick", "next();return false");
}

var k = 0;
var s = "";
function next() {
    var t1=""+pt.charAt(k)+pt.charAt(k+1);
    var t2=""+ct.charAt(k)+ct.charAt(k+1);
    display(t1,t2);
    s+=t2;
    tb.value=s;
    if (k == pt.length - 2) {
        btn.innerHTML = "Finish";
        btn.setAttribute("onclick", "return true");
    }
    k+=2;
}

function find(ch){
    var s;
    for(i=0;i<5;i++){
        for(j=0;j<5;j++){
            if(a[i][j]==ch)
                s=""+i+j;
	    }
    }
    return s;
}
function display(t1,t2){
    var c=0;
    for(i=0;i<25;i++){
        if (includes(t2,beta.charAt(i)))
            cell[c++].setAttribute("bgcolor", "plum");
        else if (includes(t1,beta.charAt(i)))
            cell[c++].setAttribute("bgcolor", "pink");
        else
            cell[c++].setAttribute("bgcolor", "white");
    }
}
