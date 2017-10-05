define(['ojs/ojcore', 'knockout', 'jquery',
        'ojs/ojknockout', 'ojs/ojfilmstrip', 'ojs/ojradioset','ojs/ojcollapsible','ojs/ojbutton'],
    function (oj, ko, $) {
        function CatalogViewModel() {
			this.currentModule = ko.observable("second");
            var self = this;

   			var eca_get_url="http://solutionengineering.us.oracle.com:7003/ords/seaas/seaas/GetEcaContent";
			var eca_put_url="http://solutionengineering.us.oracle.com:7003/ords/seaas/seaas/PutEcaData";
						  
			self.board_first_guidance_data = ko.observable();
			self.board_second_guidance_data = ko.observable();
			self.board_third_guidance_data = ko.observable();
			self.board_fourth_guidance_data = ko.observable();
			self.board_fifth_guidance_data = ko.observable();
			self.board_sixth_guidance_data = ko.observable();

			self.board_first_link_data = ko.observable();
			self.board_second_link_data = ko.observable();
			self.board_third_link_data = ko.observable();
			self.board_fourth_link_data = ko.observable();
			self.board_fifth_link_data = ko.observable();
			self.board_sixth_link_data = ko.observable();

			self.board_load_content = function(sub_cat_2, id_value, text_div){
	          	var certification_approach_data = {
		            CATEGORY_NAME: 'ECA CERTIFICATION PROCESS MODEL',
		            SUB_CATEGORY_1: 'Qualification Overview',
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
							self.board_first_guidance_data(data.content);
							}
						else if(text_div == 'g2'){
							self.board_second_guidance_data(data.content);
							}
						else if(text_div == 'g3'){
							self.board_third_guidance_data(data.content);
							}
						else if(text_div == 'g4'){
							self.board_fourth_guidance_data(data.content);
							}
						else if(text_div == 'g5'){
							self.board_fifth_guidance_data(data.content);
							}
						if(text_div == 'g6'){
							self.board_sixth_guidance_data(data.content);
							}
		        	    }
	          		});

				};

			self.board_load_link= function(sub_cat_2, id_value, text_div){
	          	var certification_approach_data = {
		            CATEGORY_NAME: 'ECA CERTIFICATION PROCESS MODEL',
		            SUB_CATEGORY_1: 'Qualification Overview',
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
							self.board_first_link_data(data.content);
							}
						else if(text_div == 'g2'){
							self.board_second_link_data(data.content);
							}
						else if(text_div == 'g3'){
							self.board_third_link_data(data.content);
							}
						else if(text_div == 'g4'){
							self.board_fourth_link_data(data.content);
							}
						else if(text_div == 'g5'){
							self.board_fifth_link_data(data.content);
							}
						if(text_div == 'g6'){
							self.board_sixth_link_data(data.content);
							}
		        	    }
	          		});

				};

			board_edit_first_guidance = function(){
	          	var editable_data = {
		            "content_id": 21,
		            "category_content": self.board_first_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							boardFirstGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			board_edit_first_link = function(){
	          	var editable_data = {
		            "content_id": 1000,
		            "category_content": self.board_first_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							boardFirstLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			board_edit_second_guidance = function(){
	          	var editable_data = {
		            "content_id": 22,
		            "category_content": self.board_second_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							boardsecondGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			board_edit_second_link = function(){
	          	var editable_data = {
		            "content_id": 1001,
		            "category_content": self.board_second_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							boardSecondLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			board_edit_third_guidance = function(){
	          	var editable_data = {
		            "content_id": 23,
		            "category_content": self.board_third_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							boardthirdGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			board_edit_third_link = function(){
	          	var editable_data = {
		            "content_id": 41,
		            "category_content": self.board_third_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							boardThirdLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			board_edit_fourth_guidance = function(){
	          	var editable_data = {
		            "content_id": 24,
		            "category_content": self.board_fourth_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							boardFourthGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			board_edit_fourth_link = function(){
	          	var editable_data = {
		            "content_id": 42,
		            "category_content": self.board_fourth_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							boardFourthLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			board_edit_fifth_guidance = function(){
	          	var editable_data = {
		            "content_id": 25,
		            "category_content": self.board_fifth_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							boardFifthGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			board_edit_fifth_link = function(){
	          	var editable_data = {
		            "content_id": 43,
		            "category_content": self.board_fifth_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							boardFifthLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};


			board_edit_sixth_guidance = function(){
	          	var editable_data = {
		            "content_id": 26,
		            "category_content": self.board_sixth_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							boardSixthGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			board_edit_sixth_link = function(){
	          	var editable_data = {
		            "content_id": 44,
		            "category_content": self.board_sixth_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							boardSixthLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

    		
			self.board_load_content('What is your Role in Solution Engineering?', '21', 'g1');
			self.board_load_content('Do I and My Manager believe I have the Core Skills?', '22', 'g2');
			self.board_load_content('Am I an ECA Practitioner?', '23', 'g3');
			self.board_load_content('Have I Produced Cloud Success?', '24', 'g4');
			self.board_load_content('What Are My ECA Community Contributions?', '25', 'g5');
			self.board_load_content('Can I Sell and Do I Lead?', '26', 'g6');

			self.board_load_link('What is your Role in Solution Engineering?', '1000', 'g1');
			self.board_load_link('Do I and My Manager believe I have the Core Skills?', '1001', 'g2');
			self.board_load_link('Am I an ECA Practitioner?', '41', 'g3');
			self.board_load_link('Have I Produced Cloud Success?', '42', 'g4');
			self.board_load_link('What Are My ECA Community Contributions?', '43', 'g5');
			self.board_load_link('Can I Sell and Do I Lead?', '44', 'g6');

            self.boardFirstGuidanceEditOpen = function() { 
				$("#boardFirstGuidanceDialog").ojDialog("open");
			};
			boardFirstGuidanceEditClose = function() { 
				$("#boardFirstGuidanceDialog").ojDialog("close");
			};

			self.boardSecondGuidanceEditOpen = function() { 
				$("#boardSecondGuidanceDialog").ojDialog("open");
			};
			boardSecondGuidanceEditClose = function() { 
				$("#boardSecondGuidanceDialog").ojDialog("close");
			};

			self.boardThirdGuidanceEditOpen = function() { 
				$("#boardthirdGuidanceDialog").ojDialog("open");
			};
			boardThirdGuidanceEditClose = function() { 
				$("#boardThirdGuidanceDialog").ojDialog("close");
			};

			self.boardFourthGuidanceEditOpen = function() { 
				$("#boardFourthGuidanceDialog").ojDialog("open");
			};
			boardFourthGuidanceEditClose = function() { 
				$("#boardFourthGuidanceDialog").ojDialog("close");
			};

			self.boardFifthGuidanceEditOpen = function() { 
				$("#boardFifthGuidanceDialog").ojDialog("open");
			};
			boardFifthGuidanceEditClose = function() { 
				$("#boardFifthGuidanceDialog").ojDialog("close");
			};

			self.boardSixthGuidanceEditOpen = function() { 
				$("#boardSixthGuidanceDialog").ojDialog("open");
			};
			boardSixthGuidanceEditClose = function() { 
				$("#boardSixthGuidanceDialog").ojDialog("close");
			};

			self.boardFirstLinkEditOpen = function() { 
				$("#boardFirstLinkDialog").ojDialog("open");
			};
			boardFirstLinkEditClose = function() { 
				$("#boardFirstLinkDialog").ojDialog("close");
			};

			self.boardSecondLinkEditOpen = function() { 
				$("#boardSecondLinkDialog").ojDialog("open");
			};
			boardSecondLinkEditClose = function() { 
				$("#boardSecondLinkDialog").ojDialog("close");
			};

			self.boardThirdLinkEditOpen = function() { 
				$("#boardThirdLinkDialog").ojDialog("open");
			};
			boardThirdLinkEditClose = function() { 
				$("#boardThirdLinkDialog").ojDialog("close");
			};

			self.boardFourthLinkEditOpen = function() { 
				$("#boardFourthLinkDialog").ojDialog("open");
			};
			boardFourthLinkEditClose = function() { 
				$("#boardFourthLinkDialog").ojDialog("close");
			};

			self.boardFifthLinkEditOpen = function() { 
				$("#boardFifthLinkDialog").ojDialog("open");
			};
			boardFifthLinkEditClose = function() { 
				$("#boardFifthLinkDialog").ojDialog("close");
			};

			self.boardSixthLinkEditOpen = function() { 
				$("#boardSixthLinkDialog").ojDialog("open");
			};
			boardSixthLinkEditClose = function() { 
				$("#boardSixthLinkDialog").ojDialog("close");
			};
             
    }
                return new CatalogViewModel();
        });  
