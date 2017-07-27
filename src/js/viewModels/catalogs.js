require(['ojs/ojcore', 'knockout', 'jquery', 
         'ojs/ojknockout', 'ojs/ojfilmstrip', 'ojs/ojradioset'],
function(oj, ko, $)
{
  
     
        var self = this;
        
        self.chemicals = [
            { name: 'Hydrogen' },
            { name: 'Helium' },
            { name: 'Lithium' },
            { name: 'Beryllium' },
            { name: 'Boron' },
            { name: 'Carbon' },
            { name: 'Nitrogen' },
            { name: 'Oxygen' },
            { name: 'Fluorine' },
            { name: 'Neon' },
            { name: 'Sodium' },
            { name: 'Magnesium' }
        ];
        
        self.currentNavArrowPlacement = ko.observable("adjacent");
        self.currentNavArrowVisibility = ko.observable("auto");
        
        getItemInitialDisplay = function(index)
        {
          return index < 3 ? '' : 'none';
        };
     
       
      
      
      
    
});  
