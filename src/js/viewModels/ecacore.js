define(['ojs/ojcore', 'knockout', 'jquery',
        'ojs/ojknockout', 'ojs/ojfilmstrip', 'ojs/ojradioset','ojs/ojcollapsible','ojs/ojbutton', 'ojs/ojdialog','ojs/ojtabs', 'ojs/ojconveyorbelt', 'ojs/ojdialog','ojs/ojaccordion'],
	function (oj, ko, $) {
        function CatalogViewModel() {
			var self = this;
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
			self.ecacore_enablement_block_7 = ko.observable();
			self.ecacore_enablement_block_8 = ko.observable();
			self.ecacore_enablement_block_9 = ko.observable();
			self.ecacore_enablement_block_10 = ko.observable();
			self.ecacore_enablement_block_11 = ko.observable();
			self.ecacore_enablement_block_12 = ko.observable();
			self.ecacore_enablement_block_13 = ko.observable();
			self.ecacore_enablement_block_14 = ko.observable();
			self.ecacore_enablement_block_15 = ko.observable();
			self.ecacore_enablement_block_16 = ko.observable();
			self.ecacore_enablement_block_17 = ko.observable();

			var id_ecacore_enablement_block_1;
			var id_ecacore_enablement_block_2;
			var id_ecacore_enablement_block_3;
			var id_ecacore_enablement_block_4;
			var id_ecacore_enablement_block_5;
			var id_ecacore_enablement_block_6;
			var id_ecacore_enablement_block_7;
			var id_ecacore_enablement_block_8;
			var id_ecacore_enablement_block_9;
			var id_ecacore_enablement_block_10;
			var id_ecacore_enablement_block_11;
			var id_ecacore_enablement_block_12;
			var id_ecacore_enablement_block_13;
			var id_ecacore_enablement_block_14;
			var id_ecacore_enablement_block_15;
			var id_ecacore_enablement_block_16;
			var id_ecacore_enablement_block_17;

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
	          	},{
		            "content_id": id_ecacore_enablement_block_7,
		            "category_content": self.ecacore_enablement_block_7
	          	},{
		            "content_id": id_ecacore_enablement_block_8,
		            "category_content": self.ecacore_enablement_block_8
	          	},{
		            "content_id": id_ecacore_enablement_block_9,
		            "category_content": self.ecacore_enablement_block_9
	          	},{
		            "content_id": id_ecacore_enablement_block_10,
		            "category_content": self.ecacore_enablement_block_10
	          	},{
		            "content_id": id_ecacore_enablement_block_11,
		            "category_content": self.ecacore_enablement_block_11
	          	},{
		            "content_id": id_ecacore_enablement_block_12,
		            "category_content": self.ecacore_enablement_block_12
	          	},{
		            "content_id": id_ecacore_enablement_block_13,
		            "category_content": self.ecacore_enablement_block_13
	          	},{
		            "content_id": id_ecacore_enablement_block_14,
		            "category_content": self.ecacore_enablement_block_14
	          	},{
		            "content_id": id_ecacore_enablement_block_15,
		            "category_content": self.ecacore_enablement_block_15
	          	},{
		            "content_id": id_ecacore_enablement_block_16,
		            "category_content": self.ecacore_enablement_block_16
	          	},{
		            "content_id": id_ecacore_enablement_block_17,
		            "category_content": self.ecacore_enablement_block_17
	          	}]

			self.ecacore_enablement_load_content = function(sub_cat_1, sub_cat_2, sub_cat_3, text_div){
	          	var certification_approach_data = {
		            CATEGORY_NAME: 'ECA Core',
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
						else if(text_div == 'e7'){
							self.ecacore_enablement_block_7(data.content);
							id_ecacore_enablement_block_7 = data.content_id;
							}
						else if(text_div == 'e8'){
							self.ecacore_enablement_block_8(data.content);
							id_ecacore_enablement_block_8 = data.content_id;
							}
						else if(text_div == 'e9'){
							self.ecacore_enablement_block_9(data.content);
							id_ecacore_enablement_block_9 = data.content_id;
							}
						else if(text_div == 'e10'){
							self.ecacore_enablement_block_10(data.content);
							id_ecacore_enablement_block_10 = data.content_id;
							}
						else if(text_div == 'e11'){
							self.ecacore_enablement_block_11(data.content);
							id_ecacore_enablement_block_11 = data.content_id;
							}
						else if(text_div == 'e12'){
							self.ecacore_enablement_block_12(data.content);
							id_ecacore_enablement_block_12 = data.content_id;
							}
						else if(text_div == 'e13'){
							self.ecacore_enablement_block_13(data.content);
							id_ecacore_enablement_block_13 = data.content_id;
							}
						else if(text_div == 'e14'){
							self.ecacore_enablement_block_14(data.content);
							id_ecacore_enablement_block_14 = data.content_id;
							}
						else if(text_div == 'e15'){
							self.ecacore_enablement_block_15(data.content);
							id_ecacore_enablement_block_15 = data.content_id;
							}
						else if(text_div == 'e16'){
							self.ecacore_enablement_block_16(data.content);
							id_ecacore_enablement_block_16 = data.content_id;
							}
						else if(text_div == 'e17'){
							self.ecacore_enablement_block_17(data.content);
							id_ecacore_enablement_block_17 = data.content_id;
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

			self.ecacoreSaveSeventhBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_ecacore_enablement_block_7,
		            "category_content": self.ecacore_enablement_block_7
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							ecacoreSeventhBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.ecacoreSaveEighthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_ecacore_enablement_block_8,
		            "category_content": self.ecacore_enablement_block_8
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							ecacoreEighthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.ecacoreSaveNinthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_ecacore_enablement_block_9,
		            "category_content": self.ecacore_enablement_block_9
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							ecacoreNinthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.ecacoreSaveTenthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_ecacore_enablement_block_10,
		            "category_content": self.ecacore_enablement_block_10
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							ecacoreTenthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.ecacoreSaveEleventhBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_ecacore_enablement_block_11,
		            "category_content": self.ecacore_enablement_block_11
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							ecacoreEleventhBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.ecacoreSaveTwelvthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_ecacore_enablement_block_12,
		            "category_content": self.ecacore_enablement_block_12
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							ecacoreTwelvthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.ecacoreSaveThirteenthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_ecacore_enablement_block_13,
		            "category_content": self.ecacore_enablement_block_13
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							ecacoreThirteenthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.ecacoreSaveFourteenthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_ecacore_enablement_block_14,
		            "category_content": self.ecacore_enablement_block_14
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							ecacoreFourteenthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.ecacoreSaveFifteenthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_ecacore_enablement_block_15,
		            "category_content": self.ecacore_enablement_block_15
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							ecacoreFifteenthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.ecacoreSaveSixteenthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_ecacore_enablement_block_16,
		            "category_content": self.ecacore_enablement_block_16
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							ecacoreSixteenthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.ecacoreSaveSeventeenthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_ecacore_enablement_block_17,
		            "category_content": self.ecacore_enablement_block_17
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							ecacoreSeventeenthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.ecacore_enablement_load_content('What You Need to Know', '', '', 'e1');
			self.ecacore_enablement_load_content('Methods and Types', '', '', 'e2');
			self.ecacore_enablement_load_content('ECAL 101', 'Cloud Architecture Foundation', 'Cloud Architecture Foundation','e3');
			self.ecacore_enablement_load_content('ECAL 101', 'ECAL Framework', 'ECAL Framework', 'e4');
			self.ecacore_enablement_load_content('ECAL 101', 'ECAL Execution', 'ECAL Execution', 'e5');
			self.ecacore_enablement_load_content('ECAL 101', 'ECA Practitioner Assessment', 'ECA Practitioner Assessment', 'e6');
			self.ecacore_enablement_load_content('Cloud Architecture Skills', 'Cloud Solution Patterns', 'Cloud Solution Patterns', 'e7');
			self.ecacore_enablement_load_content('Cloud Architecture Skills', 'SE as a Service in ECAL', 'SE as a Service in ECAL','e8');
			self.ecacore_enablement_load_content('Cloud Architecture Skills', 'Cloud Vision', 'Cloud Vision', 'e9');
			self.ecacore_enablement_load_content('Cloud Architecture Skills', 'Portfolio Work Load Analysis', 'Portfolio Work Load Analysis', 'e10');
			self.ecacore_enablement_load_content('Cloud Architecture Skills', 'Future State', 'Future State', 'e11');
			self.ecacore_enablement_load_content('Cloud Architecture Skills', 'Architecture Deep Dive Content', 'Architecture Deep Dive Content', 'e12');
			self.ecacore_enablement_load_content('Cloud Architecture Skills', 'Cross Pillar Solutions', 'Cross Pillar Solutions', 'e13');
			self.ecacore_enablement_load_content('Cloud Architecture Skills', 'Oracle Architect Certification', 'Oracle Architect Certification','e14');
			self.ecacore_enablement_load_content('ECA Cloud Solutions', 'ECAL Field Repository', 'ECAL Field Repository', 'e15');
			self.ecacore_enablement_load_content('ECA Cloud Solutions', 'ECA Engagement and Contribution', 'ECA Engagement and Contribution', 'e16');
			self.ecacore_enablement_load_content('ECA Cloud Solutions', 'ECAL Industry Solutions', 'ECAL Industry Solutions', 'e17');


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

			self.ecacoreSeventhBlockOpen = function() { 
				$("#ecacoreSeventhBlockDialog").ojDialog("open");
			};
			ecacoreSeventhBlockClose = function() { 
				$("#ecacoreSeventhBlockDialog").ojDialog("close");
			};

			self.ecacoreEighthBlockOpen = function() { 
				$("#ecacoreEighthBlockDialog").ojDialog("open");
			};
			ecacoreEighthBlockClose = function() { 
				$("#ecacoreEighthBlockDialog").ojDialog("close");
			};

			self.ecacoreNinthBlockOpen = function() { 
				$("#ecacoreNinthBlockDialog").ojDialog("open");
			};
			ecacoreNinthBlockClose = function() { 
				$("#ecacoreNinthBlockDialog").ojDialog("close");
			};

			self.ecacoreTenthBlockOpen = function() { 
				$("#ecacoreTenthBlockDialog").ojDialog("open");
			};
			ecacoreTenthBlockClose = function() { 
				$("#ecacoreTenthBlockDialog").ojDialog("close");
			};

			self.ecacoreEleventhBlockOpen = function() { 
				$("#ecacoreEleventhBlockDialog").ojDialog("open");
			};
			ecacoreEleventhBlockClose = function() { 
				$("#ecacoreEleventhBlockDialog").ojDialog("close");
			};

			self.ecacoreTwelvthBlockOpen = function() { 
				$("#ecacoreTwelvthBlockDialog").ojDialog("open");
			};
			ecacoreTwelvthBlockClose = function() { 
				$("#ecacoreTwelvthBlockDialog").ojDialog("close");
			};

			self.ecacoreThirteenthBlockOpen = function() { 
				$("#ecacoreThirteenthBlockDialog").ojDialog("open");
			};
			ecacoreThirteenthBlockClose = function() { 
				$("#ecacoreThirteenthBlockDialog").ojDialog("close");
			};

			self.ecacoreFourteenthBlockOpen = function() { 
				$("#ecacoreFourteenthBlockDialog").ojDialog("open");
			};
			ecacoreFourteenthBlockClose = function() { 
				$("#ecacoreFourteenthBlockDialog").ojDialog("close");
			};

			self.ecacoreFifteenthBlockOpen = function() { 
				$("#ecacoreFifteenthBlockDialog").ojDialog("open");
			};
			ecacoreFifteenthBlockClose = function() { 
				$("#ecacoreFifteenthBlockDialog").ojDialog("close");
			};

			self.ecacoreSixteenthBlockOpen = function() { 
				$("#ecacoreSixteenthBlockDialog").ojDialog("open");
			};
			ecacoreSixteenthBlockClose = function() { 
				$("#ecacoreSixteenthBlockDialog").ojDialog("close");
			};

			self.ecacoreSeventeenthBlockOpen = function() { 
				$("#ecacoreSeventeenthBlockDialog").ojDialog("open");
			};
			ecacoreSeventeenthBlockClose = function() { 
				$("#ecacoreSeventeenthBlockDialog").ojDialog("close");
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

