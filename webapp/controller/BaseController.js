sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        return Controller.extend("cucedolino.controller.BaseController", {
            getUrlParams: function (windowhref) {
                const url = window.location.href
                if (url.includes("/Acea")) {
                    return url.split("/Acea")?.[1] || "LOGO_ATOH.png"
                }
                return "LOGO_ATOH.png" //Immagine di default
            }
        })
    })