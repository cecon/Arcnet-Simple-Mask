/**
 * Created by Weslley Neri on 19/02/14.
 */
(function (f) {
    var y = function (a, h, g) {
        var k = this,
            x;
        a = f(a);
        h = "function" === typeof h ? h(a.val(), void 0, a, g) : h;
        k.init = function () {
            g = g || {};
            k.byPassKeys = [9, 16, 17, 18, 36, 37, 38, 39, 40, 91];
            k.translation = {
                0: {
                    pattern: /\d/
                },
                9: {
                    pattern: /\d/,
                    optional: !0
                },
                "#": {
                    pattern: /\d/,
                    recursive: !0
                },
                A: {
                    pattern: /[a-zA-Z0-9]/
                },
                S: {
                    pattern: /[a-zA-Z]/
                }
            };
            k.translation = f.extend({}, k.translation, g.translation);
            k = f.extend(!0, {}, k, g);
            a.each(function () {
                !1 !== g.maxlength && a.attr("maxlength", h.length);
                a.attr("autocomplete", "off");
                d.destroyEvents();
                d.events();
                d.val(d.getMasked())
            })
        };
        var d = {
            getCaret: function () {
                var c;
                c = 0;
                var b = a.get(0),
                    d = document.selection,
                    e = b.selectionStart;
                if (d && !~navigator.appVersion.indexOf("MSIE 10")) b.focus(), c = d.createRange(), c.moveStart("character", -b.value.length), c = c.text.length;
                else if (e || "0" === e) c = e;
                return c
            },
            setCaret: function (c) {
                var b;
                b = a.get(0);
                b.setSelectionRange ? (b.focus(), b.setSelectionRange(c, c)) : b.createTextRange && (b = b.createTextRange(), b.collapse(!0), b.moveEnd("character", c), b.moveStart("character", c), b.select())
            },
            events: function () {
                a.on("keydown.mask", function () {
                    x = d.val()
                });
                a.on("keyup.mask", d.behaviour);
                a.on("paste.mask", function () {
                    setTimeout(function () {
                        a.keydown().keyup()
                    }, 100)
                })
            },
            destroyEvents: function () {
                a.off("keydown.mask keyup.mask paste.mask")
            },
            val: function (c) {
                var b = a.is(f.zepto ? "input" : ":input");
                return 0 < arguments.length ? b ? a.val(c) : a.text(c) : b ? a.val() : a.text()
            },
            behaviour: function (c) {
                c = c || window.event;
                var b = c.keyCode || c.which;
                if (-1 === f.inArray(b, k.byPassKeys)) {
                    var a, e = d.getCaret();
                    e < d.val().length &&
                    (a = !0);
                    var g = d.getMasked();
                    g !== d.val() && d.val(g);
                    !a || 65 === b && c.ctrlKey || d.setCaret(e);
                    return d.callbacks(c)
                }
            },
            getMasked: function (a) {
                var b = [],
                    f = d.val(),
                    e = 0,
                    p = h.length,
                    l = 0,
                    s = f.length,
                    m = 1,
                    t = "push",
                    q = -1,
                    n, u;
                g.reverse ? (t = "unshift", m = -1, n = 0, e = p - 1, l = s - 1, u = function () {
                    return -1 < e && -1 < l
                }) : (n = p - 1, u = function () {
                    return e < p && l < s
                });
                for (; u();) {
                    var v = h.charAt(e),
                        w = f.charAt(l),
                        r = k.translation[v];
                    if (r) w.match(r.pattern) ? (b[t](w), r.recursive && (-1 === q ? q = e : e === n && (e = q - m), n === q && (e -= m)), e += m) : r.optional && (e += m, l -= m), l += m;
                    else {
                        if (!a) b[t](v);
                        w === v && (l += m);
                        e += m
                    }
                }
                a = h.charAt(n);
                p !== s + 1 || k.translation[a] || b.push(a);
                return b.join("")
            },
            callbacks: function (c) {
                var b = d.val(),
                    f = d.val() !== x;
                if (!0 === f && "function" === typeof g.onChange) g.onChange(b, c, a, g);
                if (!0 === f && "function" === typeof g.onKeyPress) g.onKeyPress(b, c, a, g);
                if ("function" === typeof g.onComplete && b.length === h.length) g.onComplete(b, c, a, g)
            }
        };

        w = {
            isNumber: function(evt){
                var charCode = (evt.which) ? evt.which : event.keyCode;
                if (charCode > 31 && (charCode < 48 || charCode > 57))
                    return false;
                return true;
            }
        }
        k.remove = function () {
            d.destroyEvents();
            d.val(k.getCleanVal()).removeAttr("maxlength")
        };
        k.getCleanVal = function () {
            return d.getMasked(!0)
        };
        k.init()
    };
    f.fn.mask = function (a, h) {
        return this.each(function () {
            f(this).data("mask", new y(this, a, h))
        })
    };
    f.fn.unmask = function () {
        return this.each(function () {
            try {
                f(this).data("mask").remove()
            } catch (a) {}
        })
    };
    f.fn.cleanVal = function () {
        return f(this).data("mask").getCleanVal()
    };
    f("*[data-mask]").each(function () {
        var a = f(this),
            h = {};
        "true" === a.attr("data-mask-reverse") && (h.reverse = !0);
        "false" === a.attr("data-mask-maxlength") && (h.maxlength = !1);
        a.mask(a.attr("data-mask"), h)
    })
    var phonesMasks = ['(00) 00000-0000', '(00) 0000-00009'];
    $('[data-inputmask="celular"], [data-inputmask="cellphone"]').mask(phonesMasks[1], {onKeyPress:
        function(val, e, field, options) {
            field.mask(val.length > 14 ? phonesMasks[0] : phonesMasks[1], options) ;
        }
    });

    $('[data-inputmask^="#"]').mask($('[data-inputmask^="#"]').data("inputmask"));
    $('[data-inputmask="cnpj"]').mask("00.000.000/0000-00");
    $('[data-inputmask="cpf"]').mask("000.000.000-00");
    $('[data-inputmask="telefone"], [data-inputmask="phone"]').mask("(00) 0000-0000");
    $('[data-inputmask="fax"]').mask("(00) 0000-0000");
    $('[data-inputmask="ncm"]').mask("00000000");
    $('[data-inputmask="data"]').mask("00/00/0000");
    $('[data-inputmask="date"]').mask("0000/00/00");
    $('[data-inputmask="hora"]').mask("00:00:00");
    $('[data-inputmask="time"]').mask("00:00:00");
    $('[data-inputmask="data_hora"]').mask("00/00/0000 00:00:00");
    $('[data-inputmask="date_time"]').mask("0000/00/00 00:00:00");
    $('[data-inputmask="cep"]').mask("00000-000");
    $('[data-inputmask="porcetagem"], [data-inputmask="percent"]').mask('##0,00%', {reverse: true, maxlength: false});
    $('[data-inputmask="dinheiro"], [data-inputmask="money"]').mask("#.##0,00", {reverse: true, maxlength: false});


    $('[data-inputmask="numeros"], [data-inputmask="numbers"]').keypress(function(evt){
        return w.isNumber(evt);
    });

    $('[data-inputmask="letras"], [data-inputmask="letters"]').keypress(function(evt){
        evt = (evt) ? evt : event;
        var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
            ((evt.which) ? evt.which : 0));
        if (charCode > 31 && (charCode < 65 || charCode > 90) &&
            (charCode < 97 || charCode > 122)) {
            return false;
        }
        return true;
    });

    $('[data-inputmask="money3"], [data-inputmask="dinheiro3"]').val('0,00');
    $('[data-inputmask="money3"], [data-inputmask="dinheiro3"]').keypress(function(evento){
        if(!w.isNumber(evento))
            return false;

        var posto = false;
        var keyCode = (evento.keyCode ? evento.keyCode : evento.which ? evento.which : evento.charCode);
        var letter = String.fromCharCode( evento.keyCode || evento.which );
        if(document.getSelection().toString() != '')
            $(this).val('0,00');

        if (letter.length < 10 || keyCode == 8 || keyCode == 46 || keyCode == 9) {
            if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || keyCode == 8 || keyCode == 46) {
                var resultado;
                resultado = $(this).val() + letter;
                resultado = resultado.replace(",", "").replace(".", "");

                while (resultado.substring(0, 1) == "0") {
                    resultado = resultado.substring(1, resultado.length);
                }

                var r;
                switch(resultado.length){
                    case 0:
                        var end = resultado;
                        r = (posto) ? "0,000" : "0,00";
                        break;
                    case 1:
                        var end = resultado;
                        r = (posto) ? ("0,00" + end) : ("0,0" + end);
                        break;
                    case 2:
                        var end = resultado;
                        r = (posto) ? ("0,0" + end) : ("0," + end);
                        break;
                    case 3:
                        if(posto){
                            var end = resultado;
                            r = "0," + end;
                        } else{
                            var ini = resultado.substring(0, (resultado.length - 2));
                            var end = resultado.substring(resultado.length - 2);

                            r = ini +","+ end;
                        }
                        break;
                    default:
                        var ini = resultado.substring(0, (resultado.length - ((posto) ? 3 : 2)));
                        var end = resultado.substring(resultado.length - ((posto) ? 3 : 2));
                        r = ini +","+ end;
                        break;
                }
                $(this).val(r);
                if (resultado.length >= 6)
                    $(this).mask("#.##0,00", {reverse: true, maxlength: false});
                return false;
            }
        }
    }).keydown(function(evento){
            var keyCode = (evento.keyCode ? evento.keyCode : evento.which ? evento.which : evento.charCode);
            var val = "";
            size = $(this).val().replace(",", "").replace(".", "").length
            number = $(this).val().replace(",", "").replace(".", "").substring(0, size - 1)
            if(size <= 3)
                if (keyCode === 8){
                    switch  (size - 1){
                        case 3:
                            val = "0,0" + number
                            break;
                        case 2:
                            val = "0," + number
                            break;
                    }
                    $(this).val(val);
                    return false;
                }
        });

    $('[data-inputmask="alfanumerico"], [data-inputmask="alphanumeric"]').keypress(function(evt){
        e = evt || window.event;
        var bad = /[^\sa-z\d]/i,
            key = String.fromCharCode( e.keyCode || e.which );
        if ( e.which !== 0 && e.charCode !== 0 && bad.test(key) ) {
            return false;
        }
        return true;
    });

    $('[data-inputmask-restrict]').keypress(function(evt){
        var returns = true;
        var letter = String.fromCharCode( evt.keyCode || evt.which );
        var stxPass = $('[data-inputmask-restrict], [data-inputmask-restrict]').data("inputmask-restrict").replace(/\s+/g, '');
        var restrictedWords = stxPass.split('');
        $.each(restrictedWords, function(index, data){
            if(letter === data){
                returns = false;
                return false;
            }
            return true;
        })
        return returns;
    });

})(window.jQuery || window.Zepto);

