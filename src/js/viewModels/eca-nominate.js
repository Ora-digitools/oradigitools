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

			self.load_content = function(sub_cat_2, id_value, text_div){
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

			self.load_link= function(sub_cat_2, id_value, text_div){
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
		            "content_id": 21,
		            "category_content": self.nominate_first_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							firstGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			nominate_edit_first_link = function(){
	          	var editable_data = {
		            "content_id": 1000,
		            "category_content": self.nominate_first_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							firstLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			nominate_edit_second_guidance = function(){
	          	var editable_data = {
		            "content_id": 22,
		            "category_content": self.nominate_second_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							secondGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			nominate_edit_second_link = function(){
	          	var editable_data = {
		            "content_id": 1001,
		            "category_content": self.nominate_second_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							secondLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			nominate_edit_third_guidance = function(){
	          	var editable_data = {
		            "content_id": 23,
		            "category_content": self.nominate_third_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							thirdGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			nominate_edit_third_link = function(){
	          	var editable_data = {
		            "content_id": 41,
		            "category_content": self.nominate_third_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							thirdLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			nominate_edit_fourth_guidance = function(){
	          	var editable_data = {
		            "content_id": 24,
		            "category_content": self.nominate_fourth_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							fourthGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			nominate_edit_fourth_link = function(){
	          	var editable_data = {
		            "content_id": 42,
		            "category_content": self.nominate_fourth_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							fourthLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			nominate_edit_fifth_guidance = function(){
	          	var editable_data = {
		            "content_id": 25,
		            "category_content": self.nominate_fifth_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							fifthGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			nominate_edit_fifth_link = function(){
	          	var editable_data = {
		            "content_id": 43,
		            "category_content": self.nominate_fifth_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							fifthLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};


			nominate_edit_sixth_guidance = function(){
	          	var editable_data = {
		            "content_id": 26,
		            "category_content": self.nominate_sixth_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							sixthGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			nominate_edit_sixth_link = function(){
	          	var editable_data = {
		            "content_id": 44,
		            "category_content": self.nominate_sixth_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							sixthLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

    		
			self.load_content('What is your Role in Solution Engineering?', '21', 'g1');
			self.load_content('Do I and My Manager believe I have the Core Skills?', '22', 'g2');
			self.load_content('Am I an ECA Practitioner?', '23', 'g3');
			self.load_content('Have I Produced Cloud Success?', '24', 'g4');
			self.load_content('What Are My ECA Community Contributions?', '25', 'g5');
			self.load_content('Can I Sell and Do I Lead?', '26', 'g6');

			self.load_link('What is your Role in Solution Engineering?', '1000', 'g1');
			self.load_link('Do I and My Manager believe I have the Core Skills?', '1001', 'g2');
			self.load_link('Am I an ECA Practitioner?', '41', 'g3');
			self.load_link('Have I Produced Cloud Success?', '42', 'g4');
			self.load_link('What Are My ECA Community Contributions?', '43', 'g5');
			self.load_link('Can I Sell and Do I Lead?', '44', 'g6');

            self.firstGuidanceEditOpen = function() { 
				$("#firstGuidanceDialog").ojDialog("open");
			};
			firstGuidanceEditClose = function() { 
				$("#firstGuidanceDialog").ojDialog("close");
			};

			self.secondGuidanceEditOpen = function() { 
				$("#secondGuidanceDialog").ojDialog("open");
			};
			secondGuidanceEditClose = function() { 
				$("#secondGuidanceDialog").ojDialog("close");
			};

			self.thirdGuidanceEditOpen = function() { 
				$("#thirdGuidanceDialog").ojDialog("open");
			};
			thirdGuidanceEditClose = function() { 
				$("#thirdGuidanceDialog").ojDialog("close");
			};

			self.fourthGuidanceEditOpen = function() { 
				$("#fourthGuidanceDialog").ojDialog("open");
			};
			fourthGuidanceEditClose = function() { 
				$("#fourthGuidanceDialog").ojDialog("close");
			};

			self.fifthGuidanceEditOpen = function() { 
				$("#fifthGuidanceDialog").ojDialog("open");
			};
			fifthGuidanceEditClose = function() { 
				$("#fifthGuidanceDialog").ojDialog("close");
			};

			self.sixthGuidanceEditOpen = function() { 
				$("#sixthGuidanceDialog").ojDialog("open");
			};
			sixthGuidanceEditClose = function() { 
				$("#sixthGuidanceDialog").ojDialog("close");
			};

			self.firstLinkEditOpen = function() { 
				$("#firstLinkDialog").ojDialog("open");
			};
			firstLinkEditClose = function() { 
				$("#firstLinkDialog").ojDialog("close");
			};

			self.secondLinkEditOpen = function() { 
				$("#secondLinkDialog").ojDialog("open");
			};
			secondLinkEditClose = function() { 
				$("#secondLinkDialog").ojDialog("close");
			};

			self.thirdLinkEditOpen = function() { 
				$("#thirdLinkDialog").ojDialog("open");
			};
			thirdLinkEditClose = function() { 
				$("#thirdLinkDialog").ojDialog("close");
			};

			self.fourthLinkEditOpen = function() { 
				$("#fourthLinkDialog").ojDialog("open");
			};
			fourthLinkEditClose = function() { 
				$("#fourthLinkDialog").ojDialog("close");
			};

			self.fifthLinkEditOpen = function() { 
				$("#fifthLinkDialog").ojDialog("open");
			};
			fifthLinkEditClose = function() { 
				$("#fifthLinkDialog").ojDialog("close");
			};

			self.sixthLinkEditOpen = function() { 
				$("#sixthLinkDialog").ojDialog("open");
			};
			sixthLinkEditClose = function() { 
				$("#sixthLinkDialog").ojDialog("close");
			};
             
    }
                return new CatalogViewModel();
        });  
