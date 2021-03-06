(function(g) {
    var a = function(b, d, c, l) {
        "string" === typeof b && (b = document.querySelector(b));
        c = function(c, f) {
            var a = {},
                b;
            for (b in c) a[b] = c[b];
            for (b in f) "undefined" !== typeof f[b] && (a[b] = f[b]);
            return a
        }(a.defaults, c);
        var f = b;
        g && f instanceof g && (f = b.get(0));
        "undefined" == typeof HTMLCanvasElement || f instanceof HTMLCanvasElement || (f = document.createElement("canvas"));
        if (!f.getContext) throw Error("The browser does not support canvas.");
        var r = "auto" == c.format ? new(a.autoSelectEncoder(d))(d) : new(a.getModule(c.format))(d);
        if (r.valid()) {
            var k;
            k = a.getCache(c.format, d);
            k || (k = r.encoded(), a.cache(c.format, d, k));
            d = function(a) {
                var b, k;
                k = c.height + c.textPadding;
                e.font = c.fontOptions + " " + c.fontSize + "px " + c.font;
                e.textBaseline = "bottom";
                e.textBaseline = "top";
                "left" == c.textAlign ? (b = c.quite, e.textAlign = "left") : "right" == c.textAlign ? (b = f.width - c.quite, e.textAlign = "right") : (b = f.width / 2, e.textAlign = "center");
                e.fillText(a, b, k)
            };
            var e = f.getContext("2d");
            f.width = k.length * c.width + 2 * c.quite;
            f.height = c.height + (c.displayValue ? 1.3 * c.fontSize :
                0) + c.textPadding;
            e.clearRect(0, 0, f.width, f.height);
            c.backgroundColor && (e.fillStyle = c.backgroundColor, e.fillRect(0, 0, f.width, f.height));
            e.fillStyle = c.lineColor;
            for (var h = 0; h < k.length; h++) {
                var m = h * c.width + c.quite;
                "1" == k[h] && e.fillRect(m, 0, c.width, c.height)
            }
            c.displayValue && d(r.getText());
            uri = f.toDataURL("image/png");
            g && b instanceof g ? b.get(0) instanceof HTMLCanvasElement || b.attr("src", uri) : "undefined" == typeof HTMLCanvasElement || b instanceof HTMLCanvasElement || b.setAttribute("src", uri);
            l && l(!0)
        } else if (l &&
            l(!1), !l) throw Error("The data is not valid for the type of barcode.");
    };
    a._barcodes = [];
    a.register = function(b, d, c) {
        var g = 0;
        if ("undefined" === typeof c) g = a._barcodes.length - 1;
        else
            for (var f = 0; f < a._barcodes.length && (g = f, c < a._barcodes[f].priority); f++);
        a._barcodes.splice(g, 0, {
            regex: d,
            module: b,
            priority: c
        })
    };
    a.getModule = function(b) {
        for (var d in a._barcodes)
            if (-1 !== b.search(a._barcodes[d].regex)) return a._barcodes[d].module;
        throw Error("Module " + b + " does not exist or is not loaded.");
    };
    a.autoSelectEncoder =
        function(b) {
            for (var d in a._barcodes)
                if ((new a._barcodes[d].module(b)).valid(b)) return a._barcodes[d].module;
            throw Error("Can't automatically find a barcode format matching the string '" + b + "'");
        };
    a._cache = {};
    a.cache = function(b, d, c) {
        a._cache[b] || (a._cache[b] = {});
        a._cache[b][d] = c
    };
    a.getCache = function(b, d) {
        return a._cache[b] && a._cache[b][d] ? a._cache[b][d] : ""
    };
    a._isNode = !1;
    if ("undefined" !== typeof module && module.exports) {
        module.exports = a;
        a._isNode = !0;
        var m = require("path"),
            n = m.join(__dirname, "barcodes"),
            p = require("fs").readdirSync(n),
            q;
        for (q in p) require(m.join(n, p[q])).register(a)
    }
    "undefined" !== typeof window && (window.JsBarcode = a);
    g && (g.fn.JsBarcode = function(b, d, c) {
        a(this, b, d, c);
        return this
    });
    a.defaults = {
        width: 2,
        height: 50,
        quite: 10,
        format: "auto",
        displayValue: !1,
        fontOptions: "",
        font: "monospace",
        textAlign: "center",
        textPadding: 0,
        fontSize: 12,
        backgroundColor: "",
        lineColor: "#000"
    }
})("undefined" != typeof jQuery ? jQuery : null);

function CODE128(g, a) {
    function m(c, a, b, e) {
        var h;
        h = "" + d(b);
        h += a(c);
        h += d(e(c, b));
        return h + "1100011101011"
    }

    function n(b) {
        for (var a = "", k = 0; k < b.length; k++) {
            var e;
            a: {
                for (e = 0; e < c.length; e++)
                    if (c[e][0] == b[k]) {
                        e = c[e][1];
                        break a
                    }
                e = void 0
            }
            a += e
        }
        return a
    }

    function p(c) {
        for (var a = "", b = 0; b < c.length; b += 2) a += d(parseInt(c.substr(b, 2)));
        return a
    }

    function q(b, a) {
        for (var d = 0, e = 0; e < b.length; e++) {
            var h;
            a: {
                for (h = 0; h < c.length; h++)
                    if (c[h][0] == b[e]) {
                        h = c[h][2];
                        break a
                    }
                h = void 0
            }
            d += h * (e + 1)
        }
        return (d + a) % 103
    }

    function b(b, a) {
        for (var c =
                0, e = 1, d = 0; d < b.length; d += 2) c += parseInt(b.substr(d, 2)) * e, e++;
        return (c + a) % 103
    }

    function d(b) {
        for (var a = 0; a < c.length; a++)
            if (c[a][2] == b) return c[a][1]
    }
    a = a || "B";
    this.string = g + "";
    this.valid = function() {
        return -1 == this.string.search(/^[!-~ ]+$/) ? !1 : !0
    };
    this.getText = function() {
        return this.string
    };
    this.encoded = function() {
        return l["code128" + a](g)
    };
    var c = [
            [" ", "11011001100", 0],
            ["!", "11001101100", 1],
            ['"', "11001100110", 2],
            ["#", "10010011000", 3],
            ["$", "10010001100", 4],
            ["%", "10001001100", 5],
            ["&", "10011001000", 6],
            ["'",
                "10011000100", 7
            ],
            ["(", "10001100100", 8],
            [")", "11001001000", 9],
            ["*", "11001000100", 10],
            ["+", "11000100100", 11],
            [",", "10110011100", 12],
            ["-", "10011011100", 13],
            [".", "10011001110", 14],
            ["/", "10111001100", 15],
            ["0", "10011101100", 16],
            ["1", "10011100110", 17],
            ["2", "11001110010", 18],
            ["3", "11001011100", 19],
            ["4", "11001001110", 20],
            ["5", "11011100100", 21],
            ["6", "11001110100", 22],
            ["7", "11101101110", 23],
            ["8", "11101001100", 24],
            ["9", "11100101100", 25],
            [":", "11100100110", 26],
            [";", "11101100100", 27],
            ["<", "11100110100", 28],
            ["=",
                "11100110010", 29
            ],
            [">", "11011011000", 30],
            ["?", "11011000110", 31],
            ["@", "11000110110", 32],
            ["A", "10100011000", 33],
            ["B", "10001011000", 34],
            ["C", "10001000110", 35],
            ["D", "10110001000", 36],
            ["E", "10001101000", 37],
            ["F", "10001100010", 38],
            ["G", "11010001000", 39],
            ["H", "11000101000", 40],
            ["I", "11000100010", 41],
            ["J", "10110111000", 42],
            ["K", "10110001110", 43],
            ["L", "10001101110", 44],
            ["M", "10111011000", 45],
            ["N", "10111000110", 46],
            ["O", "10001110110", 47],
            ["P", "11101110110", 48],
            ["Q", "11010001110", 49],
            ["R", "11000101110", 50],
            ["S", "11011101000", 51],
            ["T", "11011100010", 52],
            ["U", "11011101110", 53],
            ["V", "11101011000", 54],
            ["W", "11101000110", 55],
            ["X", "11100010110", 56],
            ["Y", "11101101000", 57],
            ["Z", "11101100010", 58],
            ["[", "11100011010", 59],
            ["\\", "11101111010", 60],
            ["]", "11001000010", 61],
            ["^", "11110001010", 62],
            ["_", "10100110000", 63],
            ["`", "10100001100", 64],
            ["a", "10010110000", 65],
            ["b", "10010000110", 66],
            ["c", "10000101100", 67],
            ["d", "10000100110", 68],
            ["e", "10110010000", 69],
            ["f", "10110000100", 70],
            ["g", "10011010000", 71],
            ["h", "10011000010",
                72
            ],
            ["i", "10000110100", 73],
            ["j", "10000110010", 74],
            ["k", "11000010010", 75],
            ["l", "11001010000", 76],
            ["m", "11110111010", 77],
            ["n", "11000010100", 78],
            ["o", "10001111010", 79],
            ["p", "10100111100", 80],
            ["q", "10010111100", 81],
            ["r", "10010011110", 82],
            ["s", "10111100100", 83],
            ["t", "10011110100", 84],
            ["u", "10011110010", 85],
            ["v", "11110100100", 86],
            ["w", "11110010100", 87],
            ["x", "11110010010", 88],
            ["y", "11011011110", 89],
            ["z", "11011110110", 90],
            ["{", "11110110110", 91],
            ["|", "10101111000", 92],
            ["}", "10100011110", 93],
            ["~", "10001011110",
                94
            ],
            [String.fromCharCode(127), "10111101000", 95],
            [String.fromCharCode(128), "10111100010", 96],
            [String.fromCharCode(129), "11110101000", 97],
            [String.fromCharCode(130), "11110100010", 98],
            [String.fromCharCode(131), "10111011110", 99],
            [String.fromCharCode(132), "10111101110", 100],
            [String.fromCharCode(133), "11101011110", 101],
            [String.fromCharCode(134), "11110101110", 102],
            [String.fromCharCode(135), "11010000100", 103],
            [String.fromCharCode(136), "11010010000", 104],
            [String.fromCharCode(137), "11010011100", 105]
        ],
        l = {
            code128B: function(a) {
                return m(a,
                    n, 104, q)
            },
            code128C: function(a) {
                a = a.replace(/ /g, "");
                return m(a, p, 105, b)
            }
        }
}

function CODE128B(g) {
    return new CODE128(g, "B")
}

function CODE128C(g) {
    return new CODE128(g, "C")
}
var register = function(g) {
    g.register(CODE128B, /^CODE128(.?B)?$/i, 2);
    g.register(CODE128C, /^CODE128.?C$/i, 2)
};
try {
    register(JsBarcode)
} catch (g) {}
try {
    module.exports.register = register
} catch (g) {};