define(['ojs/ojcore', 'knockout', 'jquery',
        'ojs/ojknockout', 'ojs/ojfilmstrip', 'ojs/ojradioset','ojs/ojcollapsible','ojs/ojbutton', 'ojs/ojdialog'],
	function (oj, ko, $) {
        function CatalogViewModel() {

			var baseurl="http://solutionengineering.us.oracle.com:7003/ords/seaas/seaas/";
			var self = this;
						  
			self.textarea_data1 = ko.observable();
			self.textarea_data2 = ko.observable();
			self.textarea_data3 = ko.observable();
			self.textarea_data4 = ko.observable();

			/** LOADS EDITABLE DATA ON PAGE LOAD */
			self.load_content = function(sub_cat_1, text_area_div){
		          	var certification_approach_data = {
			            CATEGORY_NAME: 'HOME',
			            SUB_CATEGORY_1: sub_cat_1,
			            USERNAME:'premraj.sahu@oracle.com'
		          	};
		          $.ajax({
		            url:'http://solutionengineering.us.oracle.com:7003/ords/seaas/seaas/GetEcaContent',
		            cache: false,
		            type: 'POST',
		            //headers:certification_approach_data,
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(certification_approach_data),
		            success: function (data) {
							if (text_area_div == "oca")
								self.textarea_data1(data.content);
							else if (text_area_div == "ocpa")
								self.textarea_data2(data.content);
							else if (text_area_div == "ycr")
								self.textarea_data3(data.content);
							else if (text_area_div == "cba")
								self.textarea_data4(data.content);

			            }
		          });
				
			};
			self.edit_certification_approach = function(){
		          	var certification_approach_post_data = {
			            "content_id": 1,
			            "category_content": self.textarea_data1
		          	};
		          $.ajax({
		            url:'http://solutionengineering.us.oracle.com:7003/ords/seaas/seaas/PutEcaData',
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(certification_approach_post_data),
		            success: function (data) {
							certificationApproachClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.edit_certification_process_approach = function(){
		          	var certification_approach_post_data = {
			            "content_id": 3,
			            "category_content": self.textarea_data2
		          	};
		          $.ajax({
		            url:'http://solutionengineering.us.oracle.com:7003/ords/seaas/seaas/PutEcaData',
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
		  			data: ko.toJSON(certification_approach_post_data),
		            success: function (data) {
							certificationProcessApproachClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
		  				alert(err);
		        });
			};

			self.certification_responsibilities = function(){
		          	var certification_approach_post_data = {
			            "content_id": 4,
			            "category_content": self.textarea_data3
		          	};
		          $.ajax({
		            url:'http://solutionengineering.us.oracle.com:7003/ords/seaas/seaas/PutEcaData',
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
		  			data: ko.toJSON(certification_approach_post_data),
		            success: function (data) {
							certificationResponsibilitiesClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
		  				alert(err);
		        });
			};

			self.certification_board_area = function(){
		          	var certification_approach_post_data = {
			            "content_id": 5,
			            "category_content": self.textarea_data4
		          	};
		          $.ajax({
		            url:'http://solutionengineering.us.oracle.com:7003/ords/seaas/seaas/PutEcaData',
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
		  			data: ko.toJSON(certification_approach_post_data),
		            success: function (data) {
							certificationBoardAreaClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
		  				alert(err);
		        });
			};

			self.load_content('Our Certification Approach', 'oca');
			self.load_content('Our Certification Process Approach', 'ocpa');
			self.load_content('Your Certification Responsibilities', 'ycr');
			self.load_content('Certification Board Area', 'cba');


			self.certificationApproachOpen = function() { 
			$("#certificationApproachDialog").ojDialog("open");
			};
			certificationApproachClose = function() { 
			$("#certificationApproachDialog").ojDialog("close");
			};

			self.certificationProcessApproachOpen = function() { 
			$("#certificationProcessApproachDialog").ojDialog("open");
			};
			certificationProcessApproachClose = function() { 
			$("#certificationProcessApproachDialog").ojDialog("close");
			};

			self.certificationResponsibilitiesOpen = function() { 
			$("#certificationResponsibilitiesDialog").ojDialog("open");
			};
			certificationResponsibilitiesClose = function() { 
			$("#certificationResponsibilitiesDialog").ojDialog("close");
			};

			self.certificationBoardAreaOpen = function() { 
			$("#certificationBoardAreaDialog").ojDialog("open");
			};
			certificationBoardAreaClose = function() { 
			$("#certificationBoardAreaDialog").ojDialog("close");
			};

		}
	        return new CatalogViewModel();
	});   

