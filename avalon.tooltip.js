define(["avalon.position"], function(avalon) {
    var widget = avalon.ui.tooltip = function(element, data, vmodels) {
        var $element = avalon(element), options = data.tooltipOptions, cat, cmy
        options.content = options.content || element.title || "no content"
        data.title = element.title
        element.title = ""
        element.removeAttribute(data.node)
        //data-tooltip-content="''" //字符串
        //data-tooltip-event="mouseover|click" 
        //data-tooltip-position="top left"   
        //data-tooltip-position-at="top left"   
        //data-tooltip-position-my="top left"   
        var positionAt = options.positionAt
        var positionMy = options.positionMy
        if (positionAt && positionMy) {
            cmy = positionMy
            cat = positionAt
        } else {
            var p = options.position || ""
            switch (p) {
                case "tc"://正上方
                    cat = "center top"
                    cmy = "center bottom"
                    break;
                case "tl": //上方靠左
                    cat = "left top"
                    cmy = "left bottom"
                    break
                case "tr": //上方靠右
                    cat = "right top"
                    cmy = "right bottom"
                    break
                case "lt"://左方靠上
                    cat = "left top"
                    cmy = "right top"
                    break
                case "lc"://正左方
                    cat = "left center"
                    cmy = "right center"
                    break
                case "lb"://左方靠下
                    cat = "left bottom"
                    cmy = "right bottom"
                    break
                case "rt"://右方靠上
                    cat = "right top"
                    cmy = "left top"
                    break
                case "rc"://正右方
                    cat = "right center"
                    cmy = "left center"
                    break
                case "rb"://右方靠下
                    cat = "right bottom"
                    cmy = "left bottom"
                    break
                case "bl"://下方靠左
                    cat = "left bottom"
                    cmy = "left top"
                    break
                case "bc"://正下方
                    cat = "center bottom"
                    cmy = "center top"
                    break
                case "br"://下方靠右
                    cat = "right bottom"
                    cmy = "right top"
                    break
                case "cc"://居中
                    cmy = cat = "center center"
                    break
                default:
                    cmy = "left top+15"
                    cat = "left bottom"
                    break
            }
        }

        var tooltip = '<div class="ui-tooltip ui-widget ui-corner-all ui-widget-content" ms-visible="toggle">' +
                '<div class="ui-tooltip-content">{{content|html}}</div></div>'
        tooltip = avalon.parseHTML(tooltip).firstChild
        var model = avalon.define(data.tooltipId, function(vm) {
            vm.content = options.content
            vm.toggle = false
            vm.$watch("toggle", function(bool) {
                if (bool) {
                    avalon(tooltip).position({
                        at: cat,
                        my: cmy,
                        of: element,
                        collision: "none"
                    })
                }
            })
        })
        switch (options.event) {
            case "click":
                $element.bind("click", function() {
                    model.toggle = !model.toggle
                })
                break;
            case "mouseover":
                $element.bind("mouseenter", function() {
                    model.toggle = true
                })
                $element.bind("mouseleave", function() {
                    model.toggle = false
                })
                break;
        }

        avalon.ready(function() {
            document.body.appendChild(tooltip)
            var models = [model].concat(vmodels)
            avalon.scan(tooltip, models)
        })
        return model
    }
    widget.defaults = {
        event: "mouseover"
    }
    return avalon
})
/*
 <div class="parent" ms-widget="tooltip" title="这是tooltip" data-tooltip-position="br"></div>
 */