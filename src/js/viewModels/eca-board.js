define(['ojs/ojcore', 'knockout', 'jquery',
        'ojs/ojknockout', 'ojs/ojfilmstrip', 'ojs/ojradioset','ojs/ojcollapsible','ojs/ojbutton','ojs/ojaccordion'],
    function (oj, ko, $) {
        function CatalogViewModel() {
			this.currentModule = ko.observable("second");
            var self = this;
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
   			//var eca_get_url="http://solutionengineering.us.oracle.com:7003/ords/seaas/seaas/GetEcaContent";
			//var eca_put_url="http://solutionengineering.us.oracle.com:7003/ords/seaas/seaas/PutEcaData";
						  
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
		            SUB_CATEGORY_1: 'ECA Board',
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
		            SUB_CATEGORY_1: 'ECA Board',
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
		            "content_id": 103,
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
		            "content_id": 109,
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
		            "content_id": 104,
		            "category_content": self.board_second_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							boardSecondGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			board_edit_second_link = function(){
	          	var editable_data = {
		            "content_id": 110,
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
		            "content_id": 105,
		            "category_content": self.board_third_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							boardThirdGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			board_edit_third_link = function(){
	          	var editable_data = {
		            "content_id": 111,
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
		            "content_id": 106,
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
		            "content_id": 112,
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
		            "content_id": 107,
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
		            "content_id": 113,
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
		            "content_id": 108,
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
		            "content_id": 114,
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

    		
			self.board_load_content('Can I Sell and Do I Lead?', '108', 'g6');
			self.board_load_content('Board Event Schedule and Evaluation Resources', '107', 'g5');
			self.board_load_content('Nominations for Review', '106', 'g4');
			self.board_load_content('Board Scheduling / Board Attendance', '105', 'g3');
			self.board_load_content('Certification Criteria', '104', 'g2');
			self.board_load_content('Board Role and Responsibilities', '103', 'g1');

			self.board_load_link('Can I Sell and Do I Lead?', '114', 'g6');
			self.board_load_link('Board Event Schedule and Evaluation Resources', '113', 'g5');
			self.board_load_link('Nominations for Review', '112', 'g4');
			self.board_load_link('Board Scheduling / Board Attendance', '111', 'g3');
			self.board_load_link('Certification Criteria', '110', 'g2');
			self.board_load_link('Board Role and Responsibilities', '109', 'g1');

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
				$("#boardThirdGuidanceDialog").ojDialog("open");
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
					// access for visibility of edit 
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
          
          // code for edit visibility end               
    }
                return new CatalogViewModel();
        });  
