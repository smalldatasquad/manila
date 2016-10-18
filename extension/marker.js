console.log('==========================');
console.log('marker.js is making marks!');
console.log('==========================');

javascript: (function() {
    var c, d, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D;
    d = ['red', 'lime', 'blue', 'black', 'yellow', 'orange', 'purple', 'pink'   ];
    f = 3;
    C = '';
    j = window;
    k = document;
    l = k.body;

    function E(a) {
        return document.createElement(a)
    };

    function F(a, b) {
        a.appendChild(b)
    };
    D = document.body.scrollTop;
    g = 'absolute';
    h = 'px';
    i = '0px';
    q = 0;
    p = d[0];
    y = [];
    r = E('canvas');
    with(r.style) {
        position = g;
        left = top = i;
        zIndex = '200';
        cursor = 'crosshair'
    }


    ////////////////////////////
    //imageData = canv.elt.toDataURL();

    // var blobBin = atob(imageData.split(',')[1]);
    // var array = [];
    // for (var i = 0; i < blobBin.length; i++) {
    //   array.push(blobBin.charCodeAt(i));
    // }
    // var imageFile = new Blob([new Uint8Array(array)], {
    //   type: 'image/png'
    // });
    //
    // var formData = new FormData();
    // formData.append('userPhoto', imageFile);
    //
    // $.ajax({
    //  // url: "http://107.170.164.22/api/photo",
    //   url: "https://doppel.camera/api/photo",
    //   type: "POST",
    //   data: formData,
    //   processData: false,
    //   contentType: false,
    //   enctype: 'multipart/form-data',
    //   success: function(data) {
    //    console.log(data);
    //    gotNewImage(data, 0);
    //   },
    //   error: startOver
    // });

    //////////////////////////


    F(l, r);
    s = r.getContext('2d');
    n = E('div');
    F(n, document.createTextNode('Use ⬆︎/⬇︎ to change the color. Press ESC to close.'));
    with(n.style) {
        background = '#FFF';
        border = '1px solid #bc42f4';
        padding = '15px';
        color = '#bc42f4'
        font = 'bold 14px sans-serif';
        position = g;
        zIndex = '2099';
        background = '#42f489';
        opacity = MozOpacity = '0.8';
        top = i
    }
    F(l, n);
    m = E('input');
    with(m.style) {
        position = g;
        left = '-1000' + h;
        top = D + h
    }
    document.onfocus = function() {
        with(m) {
            value = C;
            focus();
            select()
        }
    };
    F(l, m);
    document.onfocus();

    function G() {
        if (m.value.length < 3) {
            m.value = '';
            return
        }
        y = m.value.split(/,/g);
        window.resizeBy(y.shift() - l.clientWidth, 0);
        q = parseInt(y.shift());
        p = d[q];
        H();
        I();
        document.onfocus()
    }
    m.addEventListener('input', G, false);

    function H() {
        with(s) {
            clearRect(0, 0, r.offsetWidth, r.offsetHeight);
            u = y.length;
            t = 0;
            A = -1;
            B = -1;
            beginPath();
            while (t < u) {
                if (y[t] == -1) {
                    strokeStyle = p;
                    lineWidth = 3;
                    stroke();
                    beginPath();
                    A = -1;
                    ++t
                } else if (A == -1) {
                    A = y[t++];
                    B = y[t++] - D;
                    moveTo(A, B)
                } else {
                    lineTo(y[t++], y[t++] - D)
                }
            }
            stroke()
        }
    };

    function I() {
        y.unshift(q);
        y.unshift(l.clientWidth);
        C = y.join(',');
        m.value = C;
        m.focus();
        m.select();
        y.shift();
        y.shift()
    }
    z = false;
    t = window.onresize = function() {
        r.style.top = D + h;
        r.width = document.body.clientWidth;
        r.height = window.innerHeight;
        H()
    };
    t();
    t = j.onscroll = function() {
        D = document.body.scrollTop || document.documentElement.scrollTop;
        n.style.top = D + h;
        r.style.top = D + h;
        m.style.top = D + h;
        H()
    };
    t();
    r.onmousedown = function(e) {
        z = true;
        A = e.clientX;
        B = e.clientY;
        y.push(A);
        y.push(B + D)
    };
    r.onmouseup = function(e) {
        z = false;
        y.push(e.clientX);
        y.push(e.clientY + D);
        y.push(-1);
        I();
        H()
    };
    r.onmousemove = function(e) {
        if (!z) return;
        t = e.clientX;
        u = e.clientY;
        y.push(t);
        y.push(u + D);
        with(s) {
            beginPath();
            moveTo(A, B);
            lineTo(t, u);
            strokeStyle = p;
            lineWidth = f;
            stroke()
        }
        A = t;
        B = u
    };
    m.onkeyup = function(e) {
        switch (e.keyCode) {
            case 86:
                if (e.ctrlKey) G();
                break;
            case 27:
            case 88:
                l.removeChild(r);
                l.removeChild(n);
                l.removeChild(m);
                document.onfocus = window.onresize = window.onscroll = null;
                m.removeEventListener('input', G, false);
                break;
            case 38:
            case 40:
                q += 39 - e.keyCode;
                if (q < 0) q = d.length - 1;
                p = d[q % d.length];
                I();
                H();
                break;
            case 46:
                y.length = 0;
                I();
                H()
        }
    }

})();
void(0);
