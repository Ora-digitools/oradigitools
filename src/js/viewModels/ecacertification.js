define(['ojs/ojcore', 'knockout', 'jquery',
        'ojs/ojknockout', 'ojs/ojfilmstrip', 'ojs/ojradioset','ojs/ojcollapsible','ojs/ojbutton', 'ojs/ojdialog'],
        function (oj, ko, $) {
                function CatalogViewModel() {

              var self = this;
			  
 self.editbox1 = function() { 
$("#editDialog1").ojDialog("open");
};

 self.closebutton1 = function() { 
$("#editDialog1").ojDialog("close");
};
    
             
                }
                return new CatalogViewModel();
        });   

