define(['ojs/ojcore', 'knockout', 'jquery',
        'ojs/ojknockout', 'ojs/ojfilmstrip', 'ojs/ojradioset','ojs/ojcollapsible','ojs/ojbutton', 'ojs/ojdialog','ojs/ojtabs', 'ojs/ojconveyorbelt', 'ojs/ojdialog','ojs/ojaccordion'],
	function (oj, ko, $) {
        function CatalogViewModel() {

	
			var self = this;
			
			// Keep track of whether the front or back is showing
    self.showingFront = true;
	    self.showingBack = true;
self.buttonClick = function(id) {
	
    var elem = document.getElementById(id);
    // Determine startAngle and endAngle
    var startAngle = self.showingFront ? '0deg' : '180deg';
    var endAngle = self.showingFront ? '180deg' : '0deg';


    var elemall = document.getElementsByClassName("flipped");

    oj.AnimationUtils['flipIn'](elemall, {
        'flipTarget': 'children',
        'persist': 'all',
        'startAngle': endAngle,
        'endAngle': startAngle
    });
    $('.salescardcontainer').removeClass("flipped");
    $('#' + id).toggleClass("flipped");

    // Animate the element
    oj.AnimationUtils['flipOut'](elem, {
        'flipTarget': 'children',
        'persist': 'all',
        'startAngle': startAngle,
        'endAngle': endAngle
    });

    // self.showingFront = !self.showingFront;
self.showingBack = true;
};

self.buttonClickclose = function(id) {
	
    var elem = document.getElementById(id);
	
    // Determine startAngle and endAngle
    var startAngle = self.showingBack ? '180deg' : '0deg';
    var endAngle = self.showingBack ? '0deg' : '180deg';

    // Animate the element
    oj.AnimationUtils['flipOut'](elem, {
        'flipTarget': 'children',
        'persist': 'all',
        'startAngle': startAngle,
        'endAngle': endAngle
    });
$('.salescardcontainer').removeClass("flipped");
    // self.showingFront = !self.showingFront;

};
			
			var expanded = $( "#accordionPage" ).ojAccordion( "option", "expanded" );
			$( document ).ready(function() {
    $("#accordionPage").ojAccordion( { "expanded": [], "multiple": true } );
});

self.expandall = function(){
					$("#accordionPage").ojAccordion( { "expanded": [0,1,2,3,4,5,6,8,9,10], "multiple": true } );
					$("#accordionPage1").ojAccordion( { "expanded": [0,1,2,3,4,5,6,8,9,10], "multiple": true } );
					$("#accordionPage2").ojAccordion( { "expanded": [0,1,2,3,4,5,6,8,9,10], "multiple": true } );
					}
					self.closeall = function(){
					$("#accordionPage").ojAccordion( { "expanded": [], "multiple": true } );
					$("#accordionPage1").ojAccordion( { "expanded": [], "multiple": true } );
					$("#accordionPage2").ojAccordion( { "expanded": [], "multiple": true } );
					}
						  
			self.sales_enablement_block_1 = ko.observable();
			self.sales_enablement_block_2 = ko.observable();
			self.sales_enablement_block_3 = ko.observable();
			self.sales_enablement_block_4 = ko.observable();
			self.sales_enablement_block_5 = ko.observable();
			self.sales_enablement_block_6 = ko.observable();
			self.sales_enablement_block_7 = ko.observable();
			self.sales_enablement_block_8 = ko.observable();
			self.sales_enablement_block_9 = ko.observable();
			self.sales_enablement_block_10 = ko.observable();

			var id_sales_enablement_block_1;
			var id_sales_enablement_block_2;
			var id_sales_enablement_block_3;
			var id_sales_enablement_block_4;
			var id_sales_enablement_block_5;
			var id_sales_enablement_block_6;
			var id_sales_enablement_block_7;
			var id_sales_enablement_block_8;
			var id_sales_enablement_block_9;
			var id_sales_enablement_block_10;

			var editable_data_array = [{
		            "content_id": id_sales_enablement_block_1,
		            "category_content": self.sales_enablement_block_1
	          	},{
		            "content_id": id_sales_enablement_block_2,
		            "category_content": self.sales_enablement_block_2
	          	},{
		            "content_id": id_sales_enablement_block_3,
		            "category_content": self.sales_enablement_block_3
	          	},{
		            "content_id": id_sales_enablement_block_4,
		            "category_content": self.sales_enablement_block_4
	          	},{
		            "content_id": id_sales_enablement_block_5,
		            "category_content": self.sales_enablement_block_5
	          	},{
		            "content_id": id_sales_enablement_block_6,
		            "category_content": self.sales_enablement_block_6
	          	},{
		            "content_id": id_sales_enablement_block_7,
		            "category_content": self.sales_enablement_block_7
	          	},{
		            "content_id": id_sales_enablement_block_8,
		            "category_content": self.sales_enablement_block_8
	          	},{
		            "content_id": id_sales_enablement_block_9,
		            "category_content": self.sales_enablement_block_9
	          	},{
		            "content_id": id_sales_enablement_block_10,
		            "category_content": self.sales_enablement_block_10
	          	}]

			self.enablement_load_content = function(sub_cat_1, sub_cat_2, sub_cat_3, text_div){
	          	var certification_approach_data = {
		            CATEGORY_NAME: 'Sales, Strategy Platform',
		            SUB_CATEGORY_1: sub_cat_1,
		            SUB_CATEGORY_2: sub_cat_2,
		            SUB_CATEGORY_3: sub_cat_3,
		            SUB_CATEGORY_5: 'ECA Enablement',
		            USERNAME:'premraj.sahu@oracle.com'
	          	};
	          $.ajax({
	            url:eca_get_url,
	            cache: false,
	            type: 'POST',
	            //headers:certification_approach_data,
	            contentType: 'application/json; charset=utf-8',
	  			data: ko.toJSON(certification_approach_data),
	            success: function (data) {
						if(text_div == 'e1'){
							self.sales_enablement_block_1(data.content);
							id_sales_enablement_block_1 = data.content_id;
							}
						else if(text_div == 'e2'){
							self.sales_enablement_block_2(data.content);
							id_sales_enablement_block_2 = data.content_id;
							}
						else if(text_div == 'e3'){
							self.sales_enablement_block_3(data.content);
							id_sales_enablement_block_3 = data.content_id;
							}
						else if(text_div == 'e4'){
							self.sales_enablement_block_4(data.content);
							id_sales_enablement_block_4 = data.content_id;
							}
						else if(text_div == 'e5'){
							self.sales_enablement_block_5(data.content);
							id_sales_enablement_block_5 = data.content_id;
							}
						else if(text_div == 'e6'){
							self.sales_enablement_block_6(data.content);
							id_sales_enablement_block_6 = data.content_id;
							}
						else if(text_div == 'e7'){
							self.sales_enablement_block_7(data.content);
							id_sales_enablement_block_7 = data.content_id;
							}
						else if(text_div == 'e8'){
							self.sales_enablement_block_8(data.content);
							id_sales_enablement_block_8 = data.content_id;
							}
						else if(text_div == 'e9'){
							self.sales_enablement_block_9(data.content);
							id_sales_enablement_block_9 = data.content_id;
							}
						else if(text_div == 'e10'){
							self.sales_enablement_block_10(data.content);
							id_sales_enablement_block_10 = data.content_id;
							}
				
		        	    }
	          		});

				};
			self.salesSaveFirstBlockValue = function(){
	          	var editable_data = {
		            "content_id": id_sales_enablement_block_1,
		            "category_content": self.sales_enablement_block_1
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							salesFirstBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });

			};
			self.salesSaveSecondBlockValue = function(){
				var editable_data = {
		            "content_id": id_sales_enablement_block_2,
		            "category_content": self.sales_enablement_block_2
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							salesSecondBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			self.salesSaveThirdBlockValue = function(){
				var editable_data = {
		            "content_id": id_sales_enablement_block_3,
		            "category_content": self.sales_enablement_block_3
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							salesThirdBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });

			};
			self.salesSaveFourthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_sales_enablement_block_4,
		            "category_content": self.sales_enablement_block_4
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							salesFourthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.salesSaveFifthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_sales_enablement_block_5,
		            "category_content": self.sales_enablement_block_5
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							salesFifthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.salesSaveSixthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_sales_enablement_block_6,
		            "category_content": self.sales_enablement_block_6
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							salesSixthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.salesSaveSeventhBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_sales_enablement_block_7,
		            "category_content": self.sales_enablement_block_7
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							salesSeventhBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.salesSaveEighthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_sales_enablement_block_8,
		            "category_content": self.sales_enablement_block_8
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							salesEighthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.salesSaveNinthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_sales_enablement_block_9,
		            "category_content": self.sales_enablement_block_9
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							salesNinthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.salesSaveTenthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_sales_enablement_block_10,
		            "category_content": self.sales_enablement_block_10
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							salesTenthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};


			self.enablement_load_content('What You Need to Know', '', '', 'e1');
			self.enablement_load_content('Methods and Types', '', '', 'e2');
			self.enablement_load_content('Methods and Types', 'Guided and On-Demand Sales Training', 'Guided and On-Demand Sales Training','e3');
			self.enablement_load_content('Methods and Types', 'Virtual and Live Product Training', 'Virtual and Live Product Training', 'e4');
			self.enablement_load_content('Methods and Types', 'On-Demand Product Resources', 'On-Demand Product Resources', 'e5');
			self.enablement_load_content('Methods and Types', 'Live Product Community Events', 'Live Product Community Events', 'e6');
			self.enablement_load_content('Methods and Types','Product and Solution Tutorials', 'Product and Solution Tutorials', 'e7');
			self.enablement_load_content('What You Need to Know','Sales Strategy and Positioning', '', 'e8');
			self.enablement_load_content('What You Need to Know','Cloud Platform and Product', '', 'e9');
			self.enablement_load_content('What You Need to Know','Cloud Value Propositions and Sales Messaging', '', 'e10');

			self.salesFirstBlockOpen = function() { 
				$("#salesFirstBlockDialog").ojDialog("open");
			};
			salesFirstBlockClose = function() { 
				$("#salesFirstBlockDialog").ojDialog("close");
			};

			self.salesSecondBlockOpen = function() { 
				$("#salesSecondBlockDialog").ojDialog("open");
			};
			salesSecondBlockClose = function() { 
				$("#salesSecondBlockDialog").ojDialog("close");
			};

			self.salesThirdBlockOpen = function() { 
				$("#salesThirdBlockDialog").ojDialog("open");
			};
			salesThirdBlockClose = function() { 
				$("#salesThirdBlockDialog").ojDialog("close");
			};

			self.salesFourthBlockOpen = function() { 
				$("#salesFourthBlockDialog").ojDialog("open");
			};
			salesFourthBlockClose = function() { 
				$("#salesFourthBlockDialog").ojDialog("close");
			};

			self.salesFifthBlockOpen = function() { 
				$("#salesFifthBlockDialog").ojDialog("open");
			};
			salesFifthBlockClose = function() { 
				$("#salesFifthBlockDialog").ojDialog("close");
			};

			self.salesSixthBlockOpen = function() { 
				$("#salesSixthBlockDialog").ojDialog("open");
			};
			salesSixthBlockClose = function() { 
				$("#salesSixthBlockDialog").ojDialog("close");
			};

			self.salesSeventhBlockOpen = function() { 
				$("#salesSeventhBlockDialog").ojDialog("open");
			};
			salesSeventhBlockClose = function() { 
				$("#salesSeventhBlockDialog").ojDialog("close");
			};

			self.salesEighthBlockOpen = function() { 
				$("#salesEighthBlockDialog").ojDialog("open");
			};
			salesEighthBlockClose = function() { 
				$("#salesEighthBlockDialog").ojDialog("close");
			};

			self.salesNinthBlockOpen = function() { 
				$("#salesNinthBlockDialog").ojDialog("open");
			};
			salesNinthBlockClose = function() { 
				$("#salesNinthBlockDialog").ojDialog("close");
			};

			self.salesTenthBlockOpen = function() { 
				$("#salesTenthBlockDialog").ojDialog("open");
			};
			salesTenthBlockClose = function() { 
				$("#salesTenthBlockDialog").ojDialog("close");
			};



						self.iseditpermitted = function () {
       
                if(usertype.includes("ECAL_ADMIN")){
                    setssostatus('.ecaladminshow', 'inline-block');
                    }
                else{
	                setssostatus('.ecaladminshow', 'none');
	                }
                        
                if(usertype.includes("ECAL_ADMIN")||usertype.includes("ECAL_BOARD")){
		        setssostatus('.ecalboardshow', 'inline-block');
		        }
		        else{
		                        setssostatus('.ecalboardshow', 'none');
		                        }
                                                    
		      }

		      setInterval(function () {
		        self.iseditpermitted();
		      }, 1000);
		                                                
                                                
        setssostatus = function (selector, visibility) {
        var nodes = document.querySelectorAll(selector),
          node,
          styleProperty = function (a, b) {
            return window.getComputedStyle ? window.getComputedStyle(a).getPropertyValue(b) : a.currentStyle[b];
          };
	 		[].forEach.call(nodes, function (a, b) {
	          node = a;
	          node.style.display = visibility;
		    });
    	  }

		}
	        return new CatalogViewModel();
	});   

