/*!
 Buttons for DataTables 1.6.1
 ©2016-2019 SpryMedia Ltd - datatables.net/license
 */
(function(d) {
    "function" === typeof define && define.amd ? define(["jquery", "datatables.net"], function(u) {
        return d(u, window, document)
    }) : "object" === typeof exports ? module.exports = function(u, t) {
        u || (u = window);
        t && t.fn.dataTable || (t = require("datatables.net")(u, t).$);
        return d(t, u, u.document)
    } : d(jQuery, window, document)
})(function(d, u, t, p) {
    function y(a) {
        a = new m.Api(a);
        var b = a.init().buttons || m.defaults.buttons;
        return (new n(a, b)).container()
    }
    var m = d.fn.dataTable,
        B = 0,
        C = 0,
        q = m.ext.buttons,
        n = function(a, b) {
            if (!(this instanceof n)) return function(b) {
                return (new n(b, a)).container()
            };
            "undefined" === typeof b && (b = {});
            !0 === b && (b = {});
            d.isArray(b) && (b = {
                buttons: b
            });
            this.c = d.extend(!0, {}, n.defaults, b);
            b.buttons && (this.c.buttons = b.buttons);
            this.s = {
                dt: new m.Api(a),
                buttons: [],
                listenKeys: "",
                namespace: "dtb" + B++
            };
            this.dom = {
                container: d("<" + this.c.dom.container.tag + "/>").addClass(this.c.dom.container.className)
            };
            this._constructor()
        };
    d.extend(n.prototype, {
        action: function(a, b) {
            a = this._nodeToButton(a);
            if (b === p) return a.conf.action;
            a.conf.action =
                b;
            return this
        },
        active: function(a, b) {
            var c = this._nodeToButton(a);
            a = this.c.dom.button.active;
            c = d(c.node);
            if (b === p) return c.hasClass(a);
            c.toggleClass(a, b === p ? !0 : b);
            return this
        },
        add: function(a, b) {
            var c = this.s.buttons;
            if ("string" === typeof b) {
                b = b.split("-");
                var e = this.s;
                c = 0;
                for (var d = b.length - 1; c < d; c++) e = e.buttons[1 * b[c]];
                c = e.buttons;
                b = 1 * b[b.length - 1]
            }
            this._expandButton(c, a, e !== p, b);
            this._draw();
            return this
        },
        container: function() {
            return this.dom.container
        },
        disable: function(a) {
            a = this._nodeToButton(a);
            d(a.node).addClass(this.c.dom.button.disabled);
            return this
        },
        destroy: function() {
            d("body").off("keyup." + this.s.namespace);
            var a = this.s.buttons.slice(),
                b;
            var c = 0;
            for (b = a.length; c < b; c++) this.remove(a[c].node);
            this.dom.container.remove();
            a = this.s.dt.settings()[0];
            c = 0;
            for (b = a.length; c < b; c++)
                if (a.inst === this) {
                    a.splice(c, 1);
                    break
                }
            return this
        },
        enable: function(a, b) {
            if (!1 === b) return this.disable(a);
            a = this._nodeToButton(a);
            d(a.node).removeClass(this.c.dom.button.disabled);
            return this
        },
        name: function() {
            return this.c.name
        },
        node: function(a) {
            if (!a) return this.dom.container;
            a = this._nodeToButton(a);
            return d(a.node)
        },
        processing: function(a, b) {
            var c = this.s.dt,
                e = this._nodeToButton(a);
            if (b === p) return d(e.node).hasClass("processing");
            d(e.node).toggleClass("processing", b);
            d(c.table().node()).triggerHandler("buttons-processing.dt", [b, c.button(a), c, d(a), e.conf]);
            return this
        },
        remove: function(a) {
            var b = this._nodeToButton(a),
                c = this._nodeToHost(a),
                e = this.s.dt;
            if (b.buttons.length)
                for (var g = b.buttons.length - 1; 0 <= g; g--) this.remove(b.buttons[g].node);
            b.conf.destroy && b.conf.destroy.call(e.button(a),
                e, d(a), b.conf);
            this._removeKey(b.conf);
            d(b.node).remove();
            a = d.inArray(b, c);
            c.splice(a, 1);
            return this
        },
        text: function(a, b) {
            var c = this._nodeToButton(a);
            a = this.c.dom.collection.buttonLiner;
            a = c.inCollection && a && a.tag ? a.tag : this.c.dom.buttonLiner.tag;
            var e = this.s.dt,
                g = d(c.node),
                f = function(a) {
                    return "function" === typeof a ? a(e, g, c.conf) : a
                };
            if (b === p) return f(c.conf.text);
            c.conf.text = b;
            a ? g.children(a).html(f(b)) : g.html(f(b));
            return this
        },
        _constructor: function() {
            var a = this,
                b = this.s.dt,
                c = b.settings()[0],
                e = this.c.buttons;
            c._buttons || (c._buttons = []);
            c._buttons.push({
                inst: this,
                name: this.c.name
            });
            for (var g = 0, f = e.length; g < f; g++) this.add(e[g]);
            b.on("destroy", function(b, e) {
                e === c && a.destroy()
            });
            d("body").on("keyup." + this.s.namespace, function(b) {
                if (!t.activeElement || t.activeElement === t.body) {
                    var c = String.fromCharCode(b.keyCode).toLowerCase(); - 1 !== a.s.listenKeys.toLowerCase().indexOf(c) && a._keypress(c, b)
                }
            })
        },
        _addKey: function(a) {
            a.key && (this.s.listenKeys += d.isPlainObject(a.key) ? a.key.key : a.key)
        },
        _draw: function(a, b) {
            a || (a = this.dom.container,
                b = this.s.buttons);
            a.children().detach();
            for (var c = 0, e = b.length; c < e; c++) a.append(b[c].inserter), a.append(" "), b[c].buttons && b[c].buttons.length && this._draw(b[c].collection, b[c].buttons)
        },
        _expandButton: function(a, b, c, e) {
            var g = this.s.dt,
                f = 0;
            b = d.isArray(b) ? b : [b];
            for (var h = 0, k = b.length; h < k; h++) {
                var r = this._resolveExtends(b[h]);
                if (r)
                    if (d.isArray(r)) this._expandButton(a, r, c, e);
                    else {
                        var l = this._buildButton(r, c);
                        l && (e !== p ? (a.splice(e, 0, l), e++) : a.push(l), l.conf.buttons && (l.collection = d("<" + this.c.dom.collection.tag +
                            "/>"), l.conf._collection = l.collection, this._expandButton(l.buttons, l.conf.buttons, !0, e)), r.init && r.init.call(g.button(l.node), g, d(l.node), r), f++)
                    }
            }
        },
        _buildButton: function(a, b) {
            var c = this.c.dom.button,
                e = this.c.dom.buttonLiner,
                g = this.c.dom.collection,
                f = this.s.dt,
                h = function(b) {
                    return "function" === typeof b ? b(f, l, a) : b
                };
            b && g.button && (c = g.button);
            b && g.buttonLiner && (e = g.buttonLiner);
            if (a.available && !a.available(f, a)) return !1;
            var k = function(a, b, c, e) {
                e.action.call(b.button(c), a, b, c, e);
                d(b.table().node()).triggerHandler("buttons-action.dt", [b.button(c), b, c, e])
            };
            g = a.tag || c.tag;
            var r = a.clickBlurs === p ? !0 : a.clickBlurs,
                l = d("<" + g + "/>").addClass(c.className).attr("tabindex", this.s.dt.settings()[0].iTabIndex).attr("aria-controls", this.s.dt.table().node().id).on("click.dtb", function(b) {
                    b.preventDefault();
                    !l.hasClass(c.disabled) && a.action && k(b, f, l, a);
                    r && l.blur()
                }).on("keyup.dtb", function(b) {
                    13 === b.keyCode && !l.hasClass(c.disabled) && a.action && k(b, f, l, a)
                });
            "a" === g.toLowerCase() && l.attr("href", "#");
            "button" === g.toLowerCase() && l.attr("type", "button");
            e.tag ? (g = d("<" + e.tag + "/>").html(h(a.text)).addClass(e.className), "a" === e.tag.toLowerCase() && g.attr("href", "#"), l.append(g)) : l.html(h(a.text));
            !1 === a.enabled && l.addClass(c.disabled);
            a.className && l.addClass(a.className);
            a.titleAttr && l.attr("title", h(a.titleAttr));
            a.attr && l.attr(a.attr);
            a.namespace || (a.namespace = ".dt-button-" + C++);
            e = (e = this.c.dom.buttonContainer) && e.tag ? d("<" + e.tag + "/>").addClass(e.className).append(l) : l;
            this._addKey(a);
            this.c.buttonCreated && (e = this.c.buttonCreated(a, e));
            return {
                conf: a,
                node: l.get(0),
                inserter: e,
                buttons: [],
                inCollection: b,
                collection: null
            }
        },
        _nodeToButton: function(a, b) {
            b || (b = this.s.buttons);
            for (var c = 0, e = b.length; c < e; c++) {
                if (b[c].node === a) return b[c];
                if (b[c].buttons.length) {
                    var d = this._nodeToButton(a, b[c].buttons);
                    if (d) return d
                }
            }
        },
        _nodeToHost: function(a, b) {
            b || (b = this.s.buttons);
            for (var c = 0, e = b.length; c < e; c++) {
                if (b[c].node === a) return b;
                if (b[c].buttons.length) {
                    var d = this._nodeToHost(a, b[c].buttons);
                    if (d) return d
                }
            }
        },
        _keypress: function(a, b) {
            if (!b._buttonsHandled) {
                var c =
                    function(e) {
                        for (var g = 0, f = e.length; g < f; g++) {
                            var h = e[g].conf,
                                k = e[g].node;
                            h.key && (h.key === a ? (b._buttonsHandled = !0, d(k).click()) : !d.isPlainObject(h.key) || h.key.key !== a || h.key.shiftKey && !b.shiftKey || h.key.altKey && !b.altKey || h.key.ctrlKey && !b.ctrlKey || h.key.metaKey && !b.metaKey || (b._buttonsHandled = !0, d(k).click()));
                            e[g].buttons.length && c(e[g].buttons)
                        }
                    };
                c(this.s.buttons)
            }
        },
        _removeKey: function(a) {
            if (a.key) {
                var b = d.isPlainObject(a.key) ? a.key.key : a.key;
                a = this.s.listenKeys.split("");
                b = d.inArray(b, a);
                a.splice(b,
                    1);
                this.s.listenKeys = a.join("")
            }
        },
        _resolveExtends: function(a) {
            var b = this.s.dt,
                c, e = function(c) {
                    for (var e = 0; !d.isPlainObject(c) && !d.isArray(c);) {
                        if (c === p) return;
                        if ("function" === typeof c) {
                            if (c = c(b, a), !c) return !1
                        } else if ("string" === typeof c) {
                            if (!q[c]) throw "Unknown button type: " + c;
                            c = q[c]
                        }
                        e++;
                        if (30 < e) throw "Buttons: Too many iterations";
                    }
                    return d.isArray(c) ? c : d.extend({}, c)
                };
            for (a = e(a); a && a.extend;) {
                if (!q[a.extend]) throw "Cannot extend unknown button type: " + a.extend;
                var g = e(q[a.extend]);
                if (d.isArray(g)) return g;
                if (!g) return !1;
                var f = g.className;
                a = d.extend({}, g, a);
                f && a.className !== f && (a.className = f + " " + a.className);
                var h = a.postfixButtons;
                if (h) {
                    a.buttons || (a.buttons = []);
                    f = 0;
                    for (c = h.length; f < c; f++) a.buttons.push(h[f]);
                    a.postfixButtons = null
                }
                if (h = a.prefixButtons) {
                    a.buttons || (a.buttons = []);
                    f = 0;
                    for (c = h.length; f < c; f++) a.buttons.splice(f, 0, h[f]);
                    a.prefixButtons = null
                }
                a.extend = g.extend
            }
            return a
        },
        _popover: function(a, b, c) {
            var e = this.c,
                g = d.extend({
                    align: "button-left",
                    autoClose: !1,
                    background: !0,
                    backgroundClassName: "dt-button-background",
                    contentClassName: e.dom.collection.className,
                    collectionLayout: "",
                    collectionTitle: "",
                    dropup: !1,
                    fade: 400,
                    rightAlignClassName: "dt-button-right",
                    tag: e.dom.collection.tag
                }, c),
                f = b.node(),
                h = function() {
                    d(".dt-button-collection").stop().fadeOut(g.fade, function() {
                        d(this).detach()
                    });
                    d(b.buttons('[aria-haspopup="true"][aria-expanded="true"]').nodes()).attr("aria-expanded", "false");
                    d("div.dt-button-background").off("click.dtb-collection");
                    n.background(!1, g.backgroundClassName, g.fade, f);
                    d("body").off(".dtb-collection");
                    b.off("buttons-action.b-internal")
                };
            !1 === a && h();
            c = d(b.buttons('[aria-haspopup="true"][aria-expanded="true"]').nodes());
            c.length && (f = c.eq(0), h());
            c = d("<div/>").addClass("dt-button-collection").addClass(g.collectionLayout).css("display", "none");
            a = d(a).addClass(g.contentClassName).attr("role", "menu").appendTo(c);
            f.attr("aria-expanded", "true");
            f.parents("body")[0] !== t.body && (f = t.body.lastChild);
            g.collectionTitle && c.prepend('<div class="dt-button-collection-title">' + g.collectionTitle + "</div>");
            c.insertAfter(f).fadeIn(g.fade);
            var k = d(b.table().container());
            e = c.css("position");
            "dt-container" === g.align && (f = f.parent(), c.css("width", k.width()));
            if ("absolute" === e) {
                e = f.position();
                c.css({
                    top: e.top + f.outerHeight(),
                    left: e.left
                });
                var r = c.outerHeight(),
                    l = c.outerWidth(),
                    w = k.offset().top + k.height();
                w = e.top + f.outerHeight() + r - w;
                var D = e.top - r,
                    m = k.offset().top;
                r = e.top - r - 5;
                (w > m - D || g.dropup) && -r < m && c.css("top", r);
                (c.hasClass(g.rightAlignClassName) || "button-right" === g.align) && c.css("left", e.left + f.outerWidth() - l);
                r = e.left + l;
                k = k.offset().left +
                    k.width();
                r > k && c.css("left", e.left - (r - k));
                k = f.offset().left + l;
                k > d(u).width() && c.css("left", e.left - (k - d(u).width()))
            } else e = c.height() / 2, e > d(u).height() / 2 && (e = d(u).height() / 2), c.css("marginTop", -1 * e);
            g.background && n.background(!0, g.backgroundClassName, g.fade, f);
            d("div.dt-button-background").on("click.dtb-collection", function() {});
            d("body").on("click.dtb-collection", function(b) {
                var c = d.fn.addBack ? "addBack" : "andSelf";
                d(b.target).parents()[c]().filter(a).length || h()
            }).on("keyup.dtb-collection", function(a) {
                27 ===
                a.keyCode && h()
            });
            g.autoClose && setTimeout(function() {
                b.on("buttons-action.b-internal", function(a, b, c, e) {
                    e[0] !== f[0] && h()
                })
            }, 0)
        }
    });
    n.background = function(a, b, c, e) {
        c === p && (c = 400);
        e || (e = t.body);
        a ? d("<div/>").addClass(b).css("display", "none").insertAfter(e).stop().fadeIn(c) : d("div." + b).stop().fadeOut(c, function() {
            d(this).removeClass(b).remove()
        })
    };
    n.instanceSelector = function(a, b) {
        if (a === p || null === a) return d.map(b, function(a) {
            return a.inst
        });
        var c = [],
            e = d.map(b, function(a) {
                return a.name
            }),
            g = function(a) {
                if (d.isArray(a))
                    for (var f =
                        0, k = a.length; f < k; f++) g(a[f]);
                else "string" === typeof a ? -1 !== a.indexOf(",") ? g(a.split(",")) : (a = d.inArray(d.trim(a), e), -1 !== a && c.push(b[a].inst)) : "number" === typeof a && c.push(b[a].inst)
            };
        g(a);
        return c
    };
    n.buttonSelector = function(a, b) {
        for (var c = [], e = function(a, b, c) {
            for (var d, g, f = 0, k = b.length; f < k; f++)
                if (d = b[f]) g = c !== p ? c + f : f + "", a.push({
                    node: d.node,
                    name: d.conf.name,
                    idx: g
                }), d.buttons && e(a, d.buttons, g + "-")
        }, g = function(a, b) {
            var f, h = [];
            e(h, b.s.buttons);
            var k = d.map(h, function(a) {
                return a.node
            });
            if (d.isArray(a) ||
                a instanceof d)
                for (k = 0, f = a.length; k < f; k++) g(a[k], b);
            else if (null === a || a === p || "*" === a)
                for (k = 0, f = h.length; k < f; k++) c.push({
                    inst: b,
                    node: h[k].node
                });
            else if ("number" === typeof a) c.push({
                inst: b,
                node: b.s.buttons[a].node
            });
            else if ("string" === typeof a)
                if (-1 !== a.indexOf(","))
                    for (h = a.split(","), k = 0, f = h.length; k < f; k++) g(d.trim(h[k]), b);
                else if (a.match(/^\d+(\-\d+)*$/)) k = d.map(h, function(a) {
                    return a.idx
                }), c.push({
                    inst: b,
                    node: h[d.inArray(a, k)].node
                });
                else if (-1 !== a.indexOf(":name"))
                    for (a = a.replace(":name", ""), k =
                        0, f = h.length; k < f; k++) h[k].name === a && c.push({
                        inst: b,
                        node: h[k].node
                    });
                else d(k).filter(a).each(function() {
                        c.push({
                            inst: b,
                            node: this
                        })
                    });
            else "object" === typeof a && a.nodeName && (h = d.inArray(a, k), -1 !== h && c.push({
                    inst: b,
                    node: k[h]
                }))
        }, f = 0, h = a.length; f < h; f++) g(b, a[f]);
        return c
    };
    n.defaults = {
        buttons: ["copy", "excel", "csv", "pdf", "print"],
        name: "main",
        tabIndex: 0,
        dom: {
            container: {
                tag: "div",
                className: "dt-buttons"
            },
            collection: {
                tag: "div",
                className: ""
            },
            button: {
                tag: "ActiveXObject" in u ? "a" : "button",
                className: "dt-button",
                active: "active",
                disabled: "disabled"
            },
            buttonLiner: {
                tag: "span",
                className: ""
            }
        }
    };
    n.version = "1.6.1";
    d.extend(q, {
        collection: {
            text: function(a) {
                return a.i18n("buttons.collection", "Collection")
            },
            className: "buttons-collection",
            init: function(a, b, c) {
                b.attr("aria-expanded", !1)
            },
            action: function(a, b, c, e) {
                a.stopPropagation();
                e._collection.parents("body").length ? this.popover(!1, e) : this.popover(e._collection, e)
            },
            attr: {
                "aria-haspopup": !0
            }
        },
        copy: function(a, b) {
            if (q.copyHtml5) return "copyHtml5";
            if (q.copyFlash && q.copyFlash.available(a,
                    b)) return "copyFlash"
        },
        csv: function(a, b) {
            if (q.csvHtml5 && q.csvHtml5.available(a, b)) return "csvHtml5";
            if (q.csvFlash && q.csvFlash.available(a, b)) return "csvFlash"
        },
        excel: function(a, b) {
            if (q.excelHtml5 && q.excelHtml5.available(a, b)) return "excelHtml5";
            if (q.excelFlash && q.excelFlash.available(a, b)) return "excelFlash"
        },
        pdf: function(a, b) {
            if (q.pdfHtml5 && q.pdfHtml5.available(a, b)) return "pdfHtml5";
            if (q.pdfFlash && q.pdfFlash.available(a, b)) return "pdfFlash"
        },
        pageLength: function(a) {
            a = a.settings()[0].aLengthMenu;
            var b = d.isArray(a[0]) ?
                    a[0] : a,
                c = d.isArray(a[0]) ? a[1] : a;
            return {
                extend: "collection",
                text: function(a) {
                    return a.i18n("buttons.pageLength", {
                        "-1": "Show all rows",
                        _: "Show %d rows"
                    }, a.page.len())
                },
                className: "buttons-page-length",
                autoClose: !0,
                buttons: d.map(b, function(a, b) {
                    return {
                        text: c[b],
                        className: "button-page-length",
                        action: function(b, c) {
                            c.page.len(a).draw()
                        },
                        init: function(b, c, d) {
                            var e = this;
                            c = function() {
                                e.active(b.page.len() === a)
                            };
                            b.on("length.dt" + d.namespace, c);
                            c()
                        },
                        destroy: function(a, b, c) {
                            a.off("length.dt" + c.namespace)
                        }
                    }
                }),
                init: function(a, b, c) {
                    var d = this;
                    a.on("length.dt" + c.namespace, function() {
                        d.text(c.text)
                    })
                },
                destroy: function(a, b, c) {
                    a.off("length.dt" + c.namespace)
                }
            }
        }
    });
    m.Api.register("buttons()", function(a, b) {
        b === p && (b = a, a = p);
        this.selector.buttonGroup = a;
        var c = this.iterator(!0, "table", function(c) {
            if (c._buttons) return n.buttonSelector(n.instanceSelector(a, c._buttons), b)
        }, !0);
        c._groupSelector = a;
        return c
    });
    m.Api.register("button()", function(a, b) {
        a = this.buttons(a, b);
        1 < a.length && a.splice(1, a.length);
        return a
    });
    m.Api.registerPlural("buttons().active()",
        "button().active()",
        function(a) {
            return a === p ? this.map(function(a) {
                return a.inst.active(a.node)
            }) : this.each(function(b) {
                b.inst.active(b.node, a)
            })
        });
    m.Api.registerPlural("buttons().action()", "button().action()", function(a) {
        return a === p ? this.map(function(a) {
            return a.inst.action(a.node)
        }) : this.each(function(b) {
            b.inst.action(b.node, a)
        })
    });
    m.Api.register(["buttons().enable()", "button().enable()"], function(a) {
        return this.each(function(b) {
            b.inst.enable(b.node, a)
        })
    });
    m.Api.register(["buttons().disable()",
        "button().disable()"
    ], function() {
        return this.each(function(a) {
            a.inst.disable(a.node)
        })
    });
    m.Api.registerPlural("buttons().nodes()", "button().node()", function() {
        var a = d();
        d(this.each(function(b) {
            a = a.add(b.inst.node(b.node))
        }));
        return a
    });
    m.Api.registerPlural("buttons().processing()", "button().processing()", function(a) {
        return a === p ? this.map(function(a) {
            return a.inst.processing(a.node)
        }) : this.each(function(b) {
            b.inst.processing(b.node, a)
        })
    });
    m.Api.registerPlural("buttons().text()", "button().text()", function(a) {
        return a ===
        p ? this.map(function(a) {
            return a.inst.text(a.node)
        }) : this.each(function(b) {
            b.inst.text(b.node, a)
        })
    });
    m.Api.registerPlural("buttons().trigger()", "button().trigger()", function() {
        return this.each(function(a) {
            a.inst.node(a.node).trigger("click")
        })
    });
    m.Api.register("button().popover()", function(a, b) {
        return this.map(function(c) {
            return c.inst._popover(a, this.button(this[0].node), b)
        })
    });
    m.Api.register("buttons().containers()", function() {
        var a = d(),
            b = this._groupSelector;
        this.iterator(!0, "table", function(c) {
            if (c._buttons) {
                c =
                    n.instanceSelector(b, c._buttons);
                for (var d = 0, g = c.length; d < g; d++) a = a.add(c[d].container())
            }
        });
        return a
    });
    m.Api.register("buttons().container()", function() {
        return this.containers().eq(0)
    });
    m.Api.register("button().add()", function(a, b) {
        var c = this.context;
        c.length && (c = n.instanceSelector(this._groupSelector, c[0]._buttons), c.length && c[0].add(b, a));
        return this.button(this._groupSelector, a)
    });
    m.Api.register("buttons().destroy()", function() {
        this.pluck("inst").unique().each(function(a) {
            a.destroy()
        });
        return this
    });
    m.Api.registerPlural("buttons().remove()", "buttons().remove()", function() {
        this.each(function(a) {
            a.inst.remove(a.node)
        });
        return this
    });
    var v;
    m.Api.register("buttons.info()", function(a, b, c) {
        var e = this;
        if (!1 === a) return this.off("destroy.btn-info"), d("#datatables_buttons_info").fadeOut(function() {
            d(this).remove()
        }), clearTimeout(v), v = null, this;
        v && clearTimeout(v);
        d("#datatables_buttons_info").length && d("#datatables_buttons_info").remove();
        a = a ? "<h2>" + a + "</h2>" : "";
        d('<div id="datatables_buttons_info" class="dt-button-info"/>').html(a).append(d("<div/>")["string" ===
        typeof b ? "html" : "append"](b)).css("display", "none").appendTo("body").fadeIn();
        c !== p && 0 !== c && (v = setTimeout(function() {
            e.buttons.info(!1)
        }, c));
        this.on("destroy.btn-info", function() {
            e.buttons.info(!1)
        });
        return this
    });
    m.Api.register("buttons.exportData()", function(a) {
        if (this.context.length) return E(new m.Api(this.context[0]), a)
    });
    m.Api.register("buttons.exportInfo()", function(a) {
        a || (a = {});
        var b = a;
        var c = "*" === b.filename && "*" !== b.title && b.title !== p && null !== b.title && "" !== b.title ? b.title : b.filename;
        "function" ===
        typeof c && (c = c());
        c === p || null === c ? c = null : (-1 !== c.indexOf("*") && (c = d.trim(c.replace("*", d("head > title").text()))), c = c.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, ""), (b = x(b.extension)) || (b = ""), c += b);
        b = x(a.title);
        b = null === b ? null : -1 !== b.indexOf("*") ? b.replace("*", d("head > title").text() || "Exported data") : b;
        return {
            filename: c,
            title: b,
            messageTop: z(this, a.message || a.messageTop, "top"),
            messageBottom: z(this, a.messageBottom, "bottom")
        }
    });
    var x = function(a) {
            return null === a || a === p ? null : "function" === typeof a ?
                a() : a
        },
        z = function(a, b, c) {
            b = x(b);
            if (null === b) return null;
            a = d("caption", a.table().container()).eq(0);
            return "*" === b ? a.css("caption-side") !== c ? null : a.length ? a.text() : "" : b
        },
        A = d("<textarea/>")[0],
        E = function(a, b) {
            var c = d.extend(!0, {}, {
                    rows: null,
                    columns: "",
                    modifier: {
                        search: "applied",
                        order: "applied"
                    },
                    orthogonal: "display",
                    stripHtml: !0,
                    stripNewlines: !0,
                    decodeEntities: !0,
                    trim: !0,
                    format: {
                        header: function(a) {
                            return e(a)
                        },
                        footer: function(a) {
                            return e(a)
                        },
                        body: function(a) {
                            return e(a)
                        }
                    },
                    customizeData: null
                }, b),
                e = function(a) {
                    if ("string" !==
                        typeof a) return a;
                    a = a.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
                    a = a.replace(/<!\-\-.*?\-\->/g, "");
                    c.stripHtml && (a = a.replace(/<[^>]*>/g, ""));
                    c.trim && (a = a.replace(/^\s+|\s+$/g, ""));
                    c.stripNewlines && (a = a.replace(/\n/g, " "));
                    c.decodeEntities && (A.innerHTML = a, a = A.value);
                    return a
                };
            b = a.columns(c.columns).indexes().map(function(b) {
                var d = a.column(b).header();
                return c.format.header(d.innerHTML, b, d)
            }).toArray();
            var g = a.table().footer() ? a.columns(c.columns).indexes().map(function(b) {
                    var d =
                        a.column(b).footer();
                    return c.format.footer(d ? d.innerHTML : "", b, d)
                }).toArray() : null,
                f = d.extend({}, c.modifier);
            a.select && "function" === typeof a.select.info && f.selected === p && a.rows(c.rows, d.extend({
                selected: !0
            }, f)).any() && d.extend(f, {
                selected: !0
            });
            f = a.rows(c.rows, f).indexes().toArray();
            var h = a.cells(f, c.columns);
            f = h.render(c.orthogonal).toArray();
            h = h.nodes().toArray();
            for (var k = b.length, m = [], l = 0, n = 0, q = 0 < k ? f.length / k : 0; n < q; n++) {
                for (var u = [k], t = 0; t < k; t++) u[t] = c.format.body(f[l], n, t, h[l]), l++;
                m[n] = u
            }
            b = {
                header: b,
                footer: g,
                body: m
            };
            c.customizeData && c.customizeData(b);
            return b
        };
    d.fn.dataTable.Buttons = n;
    d.fn.DataTable.Buttons = n;
    d(t).on("init.dt plugin-init.dt", function(a, b) {
        "dt" === a.namespace && (a = b.oInit.buttons || m.defaults.buttons) && !b._buttons && (new n(b, a)).container()
    });
    m.ext.feature.push({
        fnInit: y,
        cFeature: "B"
    });
    m.ext.features && m.ext.features.register("buttons", y);
    return n
});