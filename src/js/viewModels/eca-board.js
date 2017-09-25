define(['ojs/ojcore', 'knockout', 'jquery',
        'ojs/ojknockout', 'ojs/ojfilmstrip', 'ojs/ojradioset','ojs/ojcollapsible','ojs/ojbutton'],
        function (oj, ko, $) {
                function CatalogViewModel() {
this.currentModule = ko.observable("second");
              var self = this;
             
                }
                return new CatalogViewModel();
        });  
