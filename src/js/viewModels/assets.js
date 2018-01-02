/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery','ojs/ojdialog','ojs/ojinputtext'],
 function(oj, ko, $) {
  
    function AboutViewModel() {
      var self = this;
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function(info) {
        // Implement if needed
      };
self.listofhubs = ko.observableArray([]);

self.allassets = ko.observableArray([]);


	
self.createAsset = ko.observable();
            self.createAsset({
                id: ko.observable(''),
                asset_name: ko.observable(''),
                image: ko.observable(''),
                imageurl: ko.observable(''),
            });
			
			
/*edit asset*/							
self.editassets = function (asset) {
	          var assetid = asset.id;			 
			   if (assetid != undefined) {
                    self.createAsset().id(assetid);
                   self.createAsset().asset_name(asset.asset_name);
				   self.createAsset().image(asset.image);
				    self.createAsset().imageurl('http://solutionengineering.us.oracle.com:7003/ords/seaas/TAB_REST/GetKeyAssetImage/'+assetid);
                     $("#editasset").ojDialog("open");
                }   
			};	
/*save image*/						
saveImage = function(event)
		{
		var preview = document.querySelector('#preview');
		var reader = new FileReader();
		var mimetype = event.target.files[0].type;
        reader.onload = function () {
			var image = new Image();
			image.height = 150;        
			image.src = this.result;			
            var assetdata = {
                    id: self.createAsset().id(),
                    asset_name: self.createAsset().asset_name(),
                    mimetype: mimetype
                }				
          var imagedata = reader.result.split('base64,')[1];
                var url = 'http://solutionengineering.us.oracle.com:7003/ords/seaas/TAB_REST/KeyAssets';
                $.ajax({
                    url: url,
					headers: assetdata,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: imagedata,
                    success: function (data) {                        
                        alert("Image Successfully Updated");						
                     preview.replaceWith( image );				 
                       
                    }
                }).fail(function (xhr, textStatus, err) {
                    alert(err);                    
                });
			};
			 reader.readAsDataURL(event.target.files[0]);
		}
		
		
/*save asset*/	
self.saveAsset = function()
		{
		var input = document.getElementById('preview');
		 var assetdata = {
                    id: self.createAsset().id(),
                    asset_name: self.createAsset().asset_name(),                   
                }
        var imagedata;
			 var assets = new Array();
                assets.push(assetdata);
				console.log(assets);
				var url = 'http://solutionengineering.us.oracle.com:7003/ords/seaas/TAB_REST/KeyAssets';
                $.ajax({
                    url: url,
					headers: assetdata,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: imagedata,
                    success: function (data) {                        
                        console.log("Asset Successfully Updated");						
                        $("#editasset").ojDialog("close");
                       self.load_assets();
					   input.refresh();
                    }
                }).fail(function (xhr, textStatus, err) {
                    alert(err);                    
                });
		}
		
/*load asset*/		
self.load_assets = function(){
	       
$.getJSON('http://solutionengineering.us.oracle.com:7003/ords/seaas/TAB_REST/KeyAssets', function (data) { 
/*$.getJSON('js/assetType.json', function (data) {*/
        console.log("Retrieving content types from JSON File");
		 self.allassets([]);
        for (var i = 0; i < data.items.length; i++) {
                        self.allassets.push({                            
                            id: data.items[i].id,
							asset_name: data.items[i].asset_name,
							image: data.items[i].image,
							imageurl: 'http://solutionengineering.us.oracle.com:7003/ords/seaas/TAB_REST/GetKeyAssetImage/'+data.items[i].id,
                        });
                    }
		
        console.log(self.allassets());
});
				};
				
self.load_assets();
      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

		
      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new AboutViewModel();
  }
);
