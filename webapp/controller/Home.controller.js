sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "./BaseController"
], (Controller, formatter, BaseController) => {
    "use strict";

    return BaseController.extend("cucedolino.controller.Home", {
        formatter: formatter,
        onInit() {
            this.getOwnerComponent()
                .getRouter()
                .getRoute("RouteFirstPage")
                .attachPatternMatched(this._onRouteMatched, this);

            this.getOwnerComponent()
                .getRouter()
                .getRoute("RouteHome")
                .attachPatternMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function (oEvent) {
            this.initModel()
            //set min and max date 
            let datePicker = this.getView().byId("datePicker")
            datePicker.setMaxDate(new Date())
            datePicker.setMinDate(new Date("2015-01-01"))
            //set logo
            let { Logo } = oEvent.getParameter("arguments")
            if (Logo) this.getView().getModel("modello").setProperty("/pathLogo", Logo)
        },
        initModel() {
            this.getView().setModel(new sap.ui.model.json.JSONModel({
                anno: new Date(),
                tipoDocumento: "CU",
                tableVisible: false,
                enableButton: false,
                pathLogo: this.getUrlParams()
            }), "modello")
        },
        onSearch: function (oEvent) {
            this.getView().setBusy(true)
            let { anno, tipoDocumento } = this.getView().getModel("modello").getData()
            anno = anno.getFullYear()
            setTimeout(() => {
                this.setDataTable(anno, tipoDocumento)
            }, 50)
        },
        onShowFile: function () {
            if (!this.getOwnerComponent().getModel("device").getProperty("/system/desktop")) {
                return this.onDownloadFile()
            }
            if (!this._showPDF) {
                new sap.ui.core.Fragment.load({
                    id: this.getView().getId(),
                    name: "cucedolino.view.Fragments.showFile",
                    controller: this,
                }).then((oValueDialog) => {

                    this.getView().addDependent(oValueDialog);
                    this._showPDF = oValueDialog
                    return oValueDialog;
                }).then(function (oValueDialog) {
                    oValueDialog.open();
                });
            }
        },
        onDownloadFile: function (oEvent) {
            let FileNameSelected
            if (this.byId("table")) {
                let { filename } = this.byId("table").getSelectedItem().getBindingContext("modello").getObject()
                FileNameSelected = filename
            } else {
                let { filename } = this.byId("tableUI").getRows()[this.byId("tableUI").getSelectedIndex()].getBindingContext("modello").getObject()
                FileNameSelected = filename
            }
            sap.ui.core.BusyIndicator.show(0);
            try {
                let link = document.createElement('a');
                link.href = "./attachments/FileEsempi.pdf";
                link.download = FileNameSelected;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            } catch (err) {
                console.log(err)
            }
            sap.ui.core.BusyIndicator.hide(0);

        },
        setDataTable: function (anno, tipoDocumento) {
            this.getView().setBusy(false)
            this.getView().getModel("modello").setProperty("/rowTable", null)
            this.getView().getModel("modello").setProperty("/tableVisible", true)
            //set title
            let titleTable = 'Cedolini'
            if (tipoDocumento == 'CU') titleTable = 'Certificazione Unica'
            this.getView().getModel("modello").setProperty("/titleTable", titleTable)
            let mockObj = [
                {
                    "esercizio": anno.toString(),
                    "mese": "",
                    "soc": "Alpha S.r.l.",
                    "filename": "report_finanziario_gennaio_2025.pdf"
                },
                {
                    "esercizio": anno.toString(),
                    "mese": "",
                    "soc": "Beta S.p.A.",
                    "filename": "report_finanziario_febbraio_2025.pdf"
                },
                {
                    "esercizio": anno.toString(),
                    "mese": "",
                    "soc": "Gamma Consulting S.r.l.",
                    "filename": "report_finanziario_marzo_2025.pdf"
                },
                {
                    "esercizio": anno.toString(),
                    "mese": "",
                    "soc": "Delta Group S.p.A.",
                    "filename": "report_finanziario_aprile_2025.pdf"
                },
                {
                    "esercizio": anno.toString(),
                    "mese": "",
                    "soc": "Epsilon S.r.l.",
                    "filename": "report_finanziario_maggio_2025.pdf"
                },
                {
                    "esercizio": anno.toString(),
                    "mese": "",
                    "soc": "Alpha S.r.l.",
                    "filename": "report_finanziario_gennaio_2025.pdf"
                },
                {
                    "esercizio": anno.toString(),
                    "mese": "",
                    "soc": "Beta S.p.A.",
                    "filename": "report_finanziario_febbraio_2025.pdf"
                },
                {
                    "esercizio": anno.toString(),
                    "mese": "",
                    "soc": "Gamma Consulting S.r.l.",
                    "filename": "report_finanziario_marzo_2025.pdf"
                },
                {
                    "esercizio": anno.toString(),
                    "mese": "",
                    "soc": "Delta Group S.p.A.",
                    "filename": "report_finanziario_aprile_2025.pdf"
                },
                {
                    "esercizio": anno.toString(),
                    "mese": "",
                    "soc": "Epsilon S.r.l.",
                    "filename": "report_finanziario_maggio_2025.pdf"
                },
                {
                    "esercizio": anno.toString(),
                    "mese": "",
                    "soc": "Alpha S.r.l.",
                    "filename": "report_finanziario_gennaio_2025.pdf"
                },
                {
                    "esercizio": anno.toString(),
                    "mese": "",
                    "soc": "Beta S.p.A.",
                    "filename": "report_finanziario_febbraio_2025.pdf"
                },
                {
                    "esercizio": anno.toString(),
                    "mese": "",
                    "soc": "Gamma Consulting S.r.l.",
                    "filename": "report_finanziario_marzo_2025.pdf"
                },
                {
                    "esercizio": anno.toString(),
                    "mese": "",
                    "soc": "Delta Group S.p.A.",
                    "filename": "report_finanziario_aprile_2025.pdf"
                },
                {
                    "esercizio": anno.toString(),
                    "mese": "",
                    "soc": "Epsilon S.r.l.",
                    "filename": "report_finanziario_maggio_2025.pdf"
                }
            ]
            if (anno == 2025) {
                this.getView().getModel("modello").setProperty("/rowTable", mockObj)

            }
        },
        onClear: function (oEvent) {
            this.initModel()
        },
        onCloseDialog: function (oEvent) {
            if (this._showPDF) {
                this._showPDF.destroy();
                this._showPDF = undefined;
            }
        },
        onSelectionChange: function (oEvent) {
            if (!oEvent.getSource().sId.includes("tableUI")) {
                if (oEvent.getSource().getSelectedItem()) {
                    this.getView().getModel("modello").setProperty("/enableButton", true)
                }
            } else if (Math.sign(oEvent.getSource().getSelectedIndex()) == -1) {
                this.getView().getModel("modello").setProperty("/enableButton", false)
            } else {
                this.getView().getModel("modello").setProperty("/enableButton", true)

            }
        }
    });
});