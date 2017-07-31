require(['ojs/ojcore', 'knockout', 'jquery',
        'ojs/ojknockout', 'ojs/ojfilmstrip', 'ojs/ojradioset'],
        function (oj, ko, $) {
                function CatalogViewModel() {
                        var self = this;
                        self.router = oj.Router.rootInstance;
                        alert("loaded");

                }
                return new CatalogViewModel();
        });  
