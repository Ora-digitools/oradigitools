define(['ojs/ojcore', 'knockout', 'jquery',
        'ojs/ojknockout', 'ojs/ojfilmstrip', 'ojs/ojradioset','ojs/ojcollapsible','ojs/ojbutton', 'ojs/ojdialog','ojs/ojanimation'],
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
    $('.cardcontainer').removeClass("flipped");
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
$('.cardcontainer').removeClass("flipped");
    // self.showingFront = !self.showingFront;

};
			self.textarea_data1 = ko.observable();
			self.textarea_data2 = ko.observable();
			self.textarea_data3 = ko.observable();
			self.textarea_data4 = ko.observable();
			self.certification_caledar_text = ko.observable();

			/** LOADS EDITABLE DATA ON PAGE LOAD */
			self.load_content = function(sub_cat_1, text_area_div, sub_cat_2){
		          	var certification_approach_data = {
			            CATEGORY_NAME: 'HOME',
			            SUB_CATEGORY_1: sub_cat_1,
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
							if (text_area_div == "oca")
								self.textarea_data1(data.content);
							else if (text_area_div == "ocpa")
								self.textarea_data2(data.content);
							else if (text_area_div == "ycr")
								self.textarea_data3(data.content);
							else if (text_area_div == "cba")
								self.textarea_data4(data.content);
							else if (text_area_div == "cc")
								self.certification_caledar_text(data.content);
			            }
		          });
		
			};
			self.edit_certification_approach = function(){
		          	var certification_approach_post_data = {
			            "content_id": 1,
			            "category_content": self.textarea_data1
		          	};
		          $.ajax({
		            url:eca_put_url,
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
		            url:eca_put_url,
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
		            url:eca_put_url,
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
		            url:eca_put_url,
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

			self.save_certification_caledar = function(){
		          	var certification_calendar_post_data = {
			            "content_id": 102,
			            "category_content": self.certification_caledar_text
		          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
		  			data: ko.toJSON(certification_calendar_post_data),
		            success: function (data) {
							certificationCalendarClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
		  				alert(err);
		        });
			};

			self.load_content('Our Certification Approach', 'oca');
			self.load_content('Our Certification Process Approach', 'ocpa');
			self.load_content('Your Certification Responsibilities', 'ycr');
			self.load_content('Certification Board Area', 'cba');
			self.load_content('Certification Calendar', 'cc', 'Board Dates / Locations');


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
			self.certificationCalendarOpen = function() { 
			$("#certificationCalendarDialog").ojDialog("open");
			};
			certificationCalendarClose = function() { 
			$("#certificationCalendarDialog").ojDialog("close");
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
