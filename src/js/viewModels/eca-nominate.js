define(['ojs/ojcore', 'knockout', 'jquery',
        'ojs/ojknockout', 'ojs/ojfilmstrip', 'ojs/ojradioset','ojs/ojcollapsible','ojs/ojbutton'],
    function (oj, ko, $) {
        function CatalogViewModel() {
			this.currentModule = ko.observable("second");
            var self = this;

   			var eca_get_url="http://solutionengineering.us.oracle.com:7003/ords/seaas/seaas/GetEcaContent";
			var eca_put_url="http://solutionengineering.us.oracle.com:7003/ords/seaas/seaas/PutEcaData";
						  
			self.nominate_first_guidance_data = ko.observable();
			self.nominate_second_guidance_data = ko.observable();
			self.nominate_third_guidance_data = ko.observable();
			self.nominate_fourth_guidance_data = ko.observable();
			self.nominate_fifth_guidance_data = ko.observable();
			self.nominate_sixth_guidance_data = ko.observable();

			self.nominate_first_link_data = ko.observable();
			self.nominate_second_link_data = ko.observable();
			self.nominate_third_link_data = ko.observable();
			self.nominate_fourth_link_data = ko.observable();
			self.nominate_fifth_link_data = ko.observable();
			self.nominate_sixth_link_data = ko.observable();

			self.nominate_load_content = function(sub_cat_2, id_value, text_div){
	          	var certification_approach_data = {
		            CATEGORY_NAME: 'ECA CERTIFICATION PROCESS MODEL',
		            SUB_CATEGORY_1: 'Nomination Overview',
		            SUB_CATEGORY_2: sub_cat_2,
		            SUB_CATEGORY_5: 'ECA CERTIFICATION',
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
						if(text_div == 'g1'){
							self.nominate_first_guidance_data(data.content);
							}
						else if(text_div == 'g2'){
							self.nominate_second_guidance_data(data.content);
							}
						else if(text_div == 'g3'){
							self.nominate_third_guidance_data(data.content);
							}
						else if(text_div == 'g4'){
							self.nominate_fourth_guidance_data(data.content);
							}
						else if(text_div == 'g5'){
							self.nominate_fifth_guidance_data(data.content);
							}
						if(text_div == 'g6'){
							self.nominate_sixth_guidance_data(data.content);
							}
		        	    }
	          		});

				};

			self.nominate_load_link= function(sub_cat_2, id_value, text_div){
	          	var certification_approach_data = {
		            CATEGORY_NAME: 'ECA CERTIFICATION PROCESS MODEL',
		            SUB_CATEGORY_1: 'Nomination Overview',
		            SUB_CATEGORY_2: sub_cat_2,
		            SUB_CATEGORY_3: 'LINK',
		            SUB_CATEGORY_5: 'ECA CERTIFICATION',
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
						if(text_div == 'g1'){
							self.nominate_first_link_data(data.content);
							}
						else if(text_div == 'g2'){
							self.nominate_second_link_data(data.content);
							}
						else if(text_div == 'g3'){
							self.nominate_third_link_data(data.content);
							}
						else if(text_div == 'g4'){
							self.nominate_fourth_link_data(data.content);
							}
						else if(text_div == 'g5'){
							self.nominate_fifth_link_data(data.content);
							}
						if(text_div == 'g6'){
							self.nominate_sixth_link_data(data.content);
							}
		        	    }
	          		});

				};

			nominate_edit_first_guidance = function(){
	          	var editable_data = {
		            "content_id": 27,
		            "category_content": self.nominate_first_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							nominateFirstGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			nominate_edit_first_link = function(){
	          	var editable_data = {
		            "content_id": 45,
		            "category_content": self.nominate_first_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							nominateFirstLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			nominate_edit_second_guidance = function(){
	          	var editable_data = {
		            "content_id": 28,
		            "category_content": self.nominate_second_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							nominatesecondGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			nominate_edit_second_link = function(){
	          	var editable_data = {
		            "content_id": 46,
		            "category_content": self.nominate_second_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							nominateSecondLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			nominate_edit_third_guidance = function(){
	          	var editable_data = {
		            "content_id": 29,
		            "category_content": self.nominate_third_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							nominatethirdGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			nominate_edit_third_link = function(){
	          	var editable_data = {
		            "content_id": 47,
		            "category_content": self.nominate_third_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							nominateThirdLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			nominate_edit_fourth_guidance = function(){
	          	var editable_data = {
		            "content_id": 30,
		            "category_content": self.nominate_fourth_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							nominateFourthGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			nominate_edit_fourth_link = function(){
	          	var editable_data = {
		            "content_id": 48,
		            "category_content": self.nominate_fourth_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							nominateFourthLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			nominate_edit_fifth_guidance = function(){
	          	var editable_data = {
		            "content_id": 31,
		            "category_content": self.nominate_fifth_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							nominateFifthGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			nominate_edit_fifth_link = function(){
	          	var editable_data = {
		            "content_id": 49,
		            "category_content": self.nominate_fifth_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							nominateFifthLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};


			nominate_edit_sixth_guidance = function(){
	          	var editable_data = {
		            "content_id": 32,
		            "category_content": self.nominate_sixth_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							nominateSixthGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			nominate_edit_sixth_link = function(){
	          	var editable_data = {
		            "content_id": 50,
		            "category_content": self.nominate_sixth_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							nominateSixthLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

    		
			self.nominate_load_content('Build Your Customer Solution Summary', '27', 'g1');
			self.nominate_load_content('Complete the Qualification Checklist', '28', 'g2');
			self.nominate_load_content('Publish Your Engagement Deliverables', '29', 'g3');
			self.nominate_load_content('Define and Present your Contributions', '30', 'g4');
			self.nominate_load_content('Manager Review and Validation', '31', 'g5');
			self.nominate_load_content('Submit Nomination for Certification', '32', 'g6');

			self.nominate_load_link('Build Your Customer Solution Summary', '45', 'g1');
			self.nominate_load_link('Complete the Qualification Checklist', '46', 'g2');
			self.nominate_load_link('Publish Your Engagement Deliverables', '47', 'g3');
			self.nominate_load_link('Define and Present your Contributions', '48', 'g4');
			self.nominate_load_link('Manager Review and Validation', '49', 'g5');
			self.nominate_load_link('Submit Nomination for Certification', '50', 'g6');

            self.nominateFirstGuidanceEditOpen = function() { 
				$("#nominateFirstGuidanceDialog").ojDialog("open");
			};
			nominateFirstGuidanceEditClose = function() { 
				$("#nominateFirstGuidanceDialog").ojDialog("close");
			};

			self.nominateSecondGuidanceEditOpen = function() { 
				$("#nominateSecondGuidanceDialog").ojDialog("open");
			};
			nominateSecondGuidanceEditClose = function() { 
				$("#nominateSecondGuidanceDialog").ojDialog("close");
			};

			self.nominateThirdGuidanceEditOpen = function() { 
				$("#nominaTethirdGuidanceDialog").ojDialog("open");
			};
			nominateThirdGuidanceEditClose = function() { 
				$("#nominateThirdGuidanceDialog").ojDialog("close");
			};

			self.nominateFourthGuidanceEditOpen = function() { 
				$("#nominateFourthGuidanceDialog").ojDialog("open");
			};
			nominateFourthGuidanceEditClose = function() { 
				$("#nominateFourthGuidanceDialog").ojDialog("close");
			};

			self.nominateFifthGuidanceEditOpen = function() { 
				$("#nominateFifthGuidanceDialog").ojDialog("open");
			};
			nominateFifthGuidanceEditClose = function() { 
				$("#nominateFifthGuidanceDialog").ojDialog("close");
			};

			self.nominateSixthGuidanceEditOpen = function() { 
				$("#nominateSixthGuidanceDialog").ojDialog("open");
			};
			nominateSixthGuidanceEditClose = function() { 
				$("#nominateSixthGuidanceDialog").ojDialog("close");
			};

			self.nominateFirstLinkEditOpen = function() { 
				$("#nominateFirstLinkDialog").ojDialog("open");
			};
			nominateFirstLinkEditClose = function() { 
				$("#nominateFirstLinkDialog").ojDialog("close");
			};

			self.nominateSecondLinkEditOpen = function() { 
				$("#nominateSecondLinkDialog").ojDialog("open");
			};
			nominateSecondLinkEditClose = function() { 
				$("#nominateSecondLinkDialog").ojDialog("close");
			};

			self.nominateThirdLinkEditOpen = function() { 
				$("#nominateThirdLinkDialog").ojDialog("open");
			};
			nominateThirdLinkEditClose = function() { 
				$("#nominateThirdLinkDialog").ojDialog("close");
			};

			self.nominateFourthLinkEditOpen = function() { 
				$("#nominateFourthLinkDialog").ojDialog("open");
			};
			nominateFourthLinkEditClose = function() { 
				$("#nominateFourthLinkDialog").ojDialog("close");
			};

			self.nominateFifthLinkEditOpen = function() { 
				$("#nominateFifthLinkDialog").ojDialog("open");
			};
			nominateFifthLinkEditClose = function() { 
				$("#nominateFifthLinkDialog").ojDialog("close");
			};

			self.nominateSixthLinkEditOpen = function() { 
				$("#nominateSixthLinkDialog").ojDialog("open");
			};
			nominateSixthLinkEditClose = function() { 
				$("#nominateSixthLinkDialog").ojDialog("close");
			};
             
    }
                return new CatalogViewModel();
        });  
