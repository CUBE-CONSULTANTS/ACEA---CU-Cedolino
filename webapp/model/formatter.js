sap.ui.define([], function() {
  "use strict";
  return {
    formatLogoPath: function(pathLogo) {
      return sap.ui.require.toUrl("cucedolino/public/" + pathLogo);
    }
  };
});
