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
						  
			self.certify_first_guidance_data = ko.observable();
			self.certify_second_guidance_data = ko.observable();
			self.certify_third_guidance_data = ko.observable();
			self.certify_fourth_guidance_data = ko.observable();
			self.certify_fifth_guidance_data = ko.observable();

			self.certify_first_link_data = ko.observable();
			self.certify_second_link_data = ko.observable();
			self.certify_third_link_data = ko.observable();
			self.certify_fourth_link_data = ko.observable();
			self.certify_fifth_link_data = ko.observable();

			self.certify_load_content = function(sub_cat_2, id_value, text_div){
	          	var certification_approach_data = {
		            CATEGORY_NAME: 'ECA CERTIFICATION PROCESS MODEL',
		            SUB_CATEGORY_1: 'Certification Overview',
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
							self.certify_first_guidance_data(data.content);
							}
						else if(text_div == 'g2'){
							self.certify_second_guidance_data(data.content);
							}
						else if(text_div == 'g3'){
							self.certify_third_guidance_data(data.content);
							}
						else if(text_div == 'g4'){
							self.certify_fourth_guidance_data(data.content);
							}
						else if(text_div == 'g5'){
							self.certify_fifth_guidance_data(data.content);
							}
		        	    }
	          		});

				};

			self.certify_load_link= function(sub_cat_2, id_value, text_div){
	          	var certification_approach_data = {
		            CATEGORY_NAME: 'ECA CERTIFICATION PROCESS MODEL',
		            SUB_CATEGORY_1: 'Certification Overview',
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
							self.certify_first_link_data(data.content);
							}
						else if(text_div == 'g2'){
							self.certify_second_link_data(data.content);
							}
						else if(text_div == 'g3'){
							self.certify_third_link_data(data.content);
							}
						else if(text_div == 'g4'){
							self.certify_fourth_link_data(data.content);
							}
						else if(text_div == 'g5'){
							self.certify_fifth_link_data(data.content);
							}
		        	    }
	          		});

				};

			certify_edit_first_guidance = function(){
	          	var editable_data = {
		            "content_id": 33,
		            "category_content": self.certify_first_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							certifyFirstGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			certify_edit_first_link = function(){
	          	var editable_data = {
		            "content_id": 61,
		            "category_content": self.certify_first_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							certifyFirstLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			certify_edit_second_guidance = function(){
	          	var editable_data = {
		            "content_id": 34,
		            "category_content": self.certify_second_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							certifysecondGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			certify_edit_second_link = function(){
	          	var editable_data = {
		            "content_id": 62,
		            "category_content": self.certify_second_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							certifySecondLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			certify_edit_third_guidance = function(){
	          	var editable_data = {
		            "content_id": 35,
		            "category_content": self.certify_third_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							certifyThirdGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			certify_edit_third_link = function(){
	          	var editable_data = {
		            "content_id": 63,
		            "category_content": self.certify_third_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							certifyThirdLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			certify_edit_fourth_guidance = function(){
	          	var editable_data = {
		            "content_id": 36,
		            "category_content": self.certify_fourth_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							certifyFourthGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			certify_edit_fourth_link = function(){
	          	var editable_data = {
		            "content_id": 64,
		            "category_content": self.certify_fourth_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							certifyFourthLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			certify_edit_fifth_guidance = function(){
	          	var editable_data = {
		            "content_id": 37,
		            "category_content": self.certify_fifth_guidance_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							certifyFifthGuidanceEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			certify_edit_fifth_link = function(){
	          	var editable_data = {
		            "content_id": 65,
		            "category_content": self.certify_fifth_link_data
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							certifyFifthLinkEditClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};


			self.certify_load_content('Nomination Acceptance and Scheduling', '33', 'g1');
			self.certify_load_content('My Certification Board', '34', 'g2');
			self.certify_load_content('Preparing for the Board', '35', 'g3');
			self.certify_load_content('What to Expect?', '36', 'g4');
			self.certify_load_content('Certification Board Findings', '37', 'g5');

			self.certify_load_link('Nomination Acceptance and Scheduling', '61', 'g1');
			self.certify_load_link('My Certification Board', '62', 'g2');
			self.certify_load_link('Preparing for the Board', '63', 'g3');
			self.certify_load_link('What to Expect?', '64', 'g4');
			self.certify_load_link('Certification Board Findings', '65', 'g5');

            self.certifyFirstGuidanceEditOpen = function() { 
				$("#certifyFirstGuidanceDialog").ojDialog("open");
			};
			certifyFirstGuidanceEditClose = function() { 
				$("#certifyFirstGuidanceDialog").ojDialog("close");
			};

			self.certifySecondGuidanceEditOpen = function() { 
				$("#certifySecondGuidanceDialog").ojDialog("open");
			};
			certifySecondGuidanceEditClose = function() { 
				$("#certifySecondGuidanceDialog").ojDialog("close");
			};

			self.certifyThirdGuidanceEditOpen = function() { 
				$("#certifyThirdGuidanceDialog").ojDialog("open");
			};
			certifyThirdGuidanceEditClose = function() { 
				$("#certifyThirdGuidanceDialog").ojDialog("close");
			};

			self.certifyFourthGuidanceEditOpen = function() { 
				$("#certifyFourthGuidanceDialog").ojDialog("open");
			};
			certifyFourthGuidanceEditClose = function() { 
				$("#certifyFourthGuidanceDialog").ojDialog("close");
			};

			self.certifyFifthGuidanceEditOpen = function() { 
				$("#certifyFifthGuidanceDialog").ojDialog("open");
			};
			certifyFifthGuidanceEditClose = function() { 
				$("#certifyFifthGuidanceDialog").ojDialog("close");
			};

			self.certifyFirstLinkEditOpen = function() { 
				$("#certifyFirstLinkDialog").ojDialog("open");
			};
			certifyFirstLinkEditClose = function() { 
				$("#certifyFirstLinkDialog").ojDialog("close");
			};

			self.certifySecondLinkEditOpen = function() { 
				$("#certifySecondLinkDialog").ojDialog("open");
			};
			certifySecondLinkEditClose = function() { 
				$("#certifySecondLinkDialog").ojDialog("close");
			};

			self.certifyThirdLinkEditOpen = function() { 
				$("#certifyThirdLinkDialog").ojDialog("open");
			};
			certifyThirdLinkEditClose = function() { 
				$("#certifyThirdLinkDialog").ojDialog("close");
			};

			self.certifyFourthLinkEditOpen = function() { 
				$("#certifyFourthLinkDialog").ojDialog("open");
			};
			certifyFourthLinkEditClose = function() { 
				$("#certifyFourthLinkDialog").ojDialog("close");
			};

			self.certifyFifthLinkEditOpen = function() { 
				$("#certifyFifthLinkDialog").ojDialog("open");
			};
			certifyFifthLinkEditClose = function() { 
				$("#certifyFifthLinkDialog").ojDialog("close");
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
		        setssostatus('.ecalboardshow', 'block');
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
