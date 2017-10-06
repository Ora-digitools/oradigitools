define(['ojs/ojcore', 'knockout', 'jquery',
        'ojs/ojknockout', 'ojs/ojfilmstrip', 'ojs/ojradioset','ojs/ojcollapsible','ojs/ojbutton', 'ojs/ojdialog','ojs/ojtabs', 'ojs/ojconveyorbelt', 'ojs/ojdialog','ojs/ojaccordion'],
	function (oj, ko, $) {
        function CatalogViewModel() {

			var self = this;
			
			// getter
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
						  
			self.ecacore_enablement_block_1 = ko.observable();
			self.ecacore_enablement_block_2 = ko.observable();
			self.ecacore_enablement_block_3 = ko.observable();
			self.ecacore_enablement_block_4 = ko.observable();
			self.ecacore_enablement_block_5 = ko.observable();
			self.ecacore_enablement_block_6 = ko.observable();

			var id_ecacore_enablement_block_1;
			var id_ecacore_enablement_block_2;
			var id_ecacore_enablement_block_3;
			var id_ecacore_enablement_block_4;
			var id_ecacore_enablement_block_5;
			var id_ecacore_enablement_block_6;

			var editable_data_array = [{
		            "content_id": id_ecacore_enablement_block_1,
		            "category_content": self.ecacore_enablement_block_1
	          	},{
		            "content_id": id_ecacore_enablement_block_2,
		            "category_content": self.ecacore_enablement_block_2
	          	},{
		            "content_id": id_ecacore_enablement_block_3,
		            "category_content": self.ecacore_enablement_block_3
	          	},{
		            "content_id": id_ecacore_enablement_block_4,
		            "category_content": self.ecacore_enablement_block_4
	          	},{
		            "content_id": id_ecacore_enablement_block_5,
		            "category_content": self.ecacore_enablement_block_5
	          	},{
		            "content_id": id_ecacore_enablement_block_6,
		            "category_content": self.ecacore_enablement_block_6
	          	}]

			self.enablement_load_content = function(sub_cat_1, sub_cat_2, sub_cat_3, text_div){
	          	var certification_approach_data = {
		            CATEGORY_NAME: 'ECA OPS',
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
							self.ecacore_enablement_block_1(data.content);
							id_ecacore_enablement_block_1 = data.content_id;
							}
						else if(text_div == 'e2'){
							self.ecacore_enablement_block_2(data.content);
							id_ecacore_enablement_block_2 = data.content_id;
							}
						else if(text_div == 'e3'){
							self.ecacore_enablement_block_3(data.content);
							id_ecacore_enablement_block_3 = data.content_id;
							}
						else if(text_div == 'e4'){
							self.ecacore_enablement_block_4(data.content);
							id_ecacore_enablement_block_4 = data.content_id;
							}
						else if(text_div == 'e5'){
							self.ecacore_enablement_block_5(data.content);
							id_ecacore_enablement_block_5 = data.content_id;
							}
						else if(text_div == 'e6'){
							self.ecacore_enablement_block_6(data.content);
							id_ecacore_enablement_block_6 = data.content_id;
							}
				   	    }
	          		});

				};
			self.ecacoreSaveFirstBlockValue = function(){
	          	var editable_data = {
		            "content_id": id_ecacore_enablement_block_1,
		            "category_content": self.ecacore_enablement_block_1
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							ecacoreFirstBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });

			};
			self.ecacoreSaveSecondBlockValue = function(){
				var editable_data = {
		            "content_id": id_ecacore_enablement_block_2,
		            "category_content": self.ecacore_enablement_block_2
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							ecacoreSecondBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			self.ecacoreSaveThirdBlockValue = function(){
				var editable_data = {
		            "content_id": id_ecacore_enablement_block_3,
		            "category_content": self.ecacore_enablement_block_3
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							ecacoreThirdBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });

			};
			self.ecacoreSaveFourthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_ecacore_enablement_block_4,
		            "category_content": self.ecacore_enablement_block_4
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							ecacoreFourthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.ecacoreSaveFifthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_ecacore_enablement_block_5,
		            "category_content": self.ecacore_enablement_block_5
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							ecacoreFifthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.ecacoreSaveSixthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_ecacore_enablement_block_6,
		            "category_content": self.ecacore_enablement_block_6
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							ecacoreSixthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.enablement_load_content('What You Need to Know', '', '', 'e1');
			self.enablement_load_content('Methods and Types', '', '', 'e2');
			self.enablement_load_content('Methods and Types', 'SCRM', 'SCRM','e3');
			self.enablement_load_content('Methods and Types', 'SCRM and SE Services', 'SCRM and SE Services', 'e4');
			self.enablement_load_content('Methods and Types', 'Sales Analytics', 'Sales Analytics', 'e5');
			self.enablement_load_content('Methods and Types', 'ASR Lookup', 'ASR Lookup', 'e6');

			self.ecacoreFirstBlockOpen = function() { 
				$("#ecacoreFirstBlockDialog").ojDialog("open");
			};
			ecacoreFirstBlockClose = function() { 
				$("#ecacoreFirstBlockDialog").ojDialog("close");
			};

			self.ecacoreSecondBlockOpen = function() { 
				$("#ecacoreSecondBlockDialog").ojDialog("open");
			};
			ecacoreSecondBlockClose = function() { 
				$("#ecacoreSecondBlockDialog").ojDialog("close");
			};

			self.ecacoreThirdBlockOpen = function() { 
				$("#ecacoreThirdBlockDialog").ojDialog("open");
			};
			ecacoreThirdBlockClose = function() { 
				$("#ecacoreThirdBlockDialog").ojDialog("close");
			};

			self.ecacoreFourthBlockOpen = function() { 
				$("#ecacoreFourthBlockDialog").ojDialog("open");
			};
			ecacoreFourthBlockClose = function() { 
				$("#ecacoreFourthBlockDialog").ojDialog("close");
			};

			self.ecacoreFifthBlockOpen = function() { 
				$("#ecacoreFifthBlockDialog").ojDialog("open");
			};
			ecacoreFifthBlockClose = function() { 
				$("#ecacoreFifthBlockDialog").ojDialog("close");
			};

			self.ecacoreSixthBlockOpen = function() { 
				$("#ecacoreSixthBlockDialog").ojDialog("open");
			};
			ecacoreSixthBlockClose = function() { 
				$("#ecacoreSixthBlockDialog").ojDialog("close");
			};

		}
	        return new CatalogViewModel();
	});   

