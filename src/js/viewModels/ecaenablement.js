define(['ojs/ojcore', 'knockout', 'jquery',
        'ojs/ojknockout', 'ojs/ojfilmstrip', 'ojs/ojradioset','ojs/ojcollapsible','ojs/ojbutton', 'ojs/ojdialog','ojs/ojdialog','ojs/ojdialog','chatbotsettings','chatbotwidget'],
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
    $('.ecaenablementcardcontainer').removeClass("flipped");
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
$('.ecaenablementcardcontainer').removeClass("flipped");
    // self.showingFront = !self.showingFront;

};
						  
			self.enablement_block_1 = ko.observable();
			self.enablement_block_2 = ko.observable();
			self.enablement_block_3 = ko.observable();
			self.enablement_block_4 = ko.observable();

			var id_enablement_block_1;
			var id_enablement_block_2;
			var id_enablement_block_3;
			var id_enablement_block_4;

			var editable_data_array = [{
		            "content_id": id_enablement_block_1,
		            "category_content": self.enablement_block_1
	          	},{
		            "content_id": id_enablement_block_2,
		            "category_content": self.enablement_block_2
	          	},{
		            "content_id": id_enablement_block_3,
		            "category_content": self.enablement_block_3
	          	},{
		            "content_id": id_enablement_block_4,
		            "category_content": self.enablement_block_4
	          	}]

			self.enablement_load_content = function(category_name_value, sub_cat_1, text_div){
	          	var certification_approach_data = {
		            CATEGORY_NAME: category_name_value,
		            SUB_CATEGORY_1: sub_cat_1,
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
							self.enablement_block_1(data.content);
							id_enablement_block_1 = data.content_id;
							}
						else if(text_div == 'e2'){
							self.enablement_block_2(data.content);
							id_enablement_block_2 = data.content_id;
							}
						else if(text_div == 'e3'){
							self.enablement_block_3(data.content);
							id_enablement_block_3 = data.content_id;
							}
						else if(text_div == 'e4'){
							self.enablement_block_4(data.content);
							id_enablement_block_4 = data.content_id;
							}
		        	    }
	          		});

				};
			self.saveFirstBlockValue = function(){
	          	var editable_data = {
		            "content_id": id_enablement_block_1,
		            "category_content": self.enablement_block_1
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							firstBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });

			};
			self.saveSecondBlockValue = function(){
				var editable_data = {
		            "content_id": id_enablement_block_2,
		            "category_content": self.enablement_block_2
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							secondBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};
			self.saveThirdBlockValue = function(){
				var editable_data = {
		            "content_id": id_enablement_block_3,
		            "category_content": self.enablement_block_3
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							thirdBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });

			};
			self.saveFourthBlockValue = function(param1, param2){
				var editable_data = {
		            "content_id": id_enablement_block_4,
		            "category_content": self.enablement_block_4
	          	};
		          $.ajax({
		            url:eca_put_url,
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(editable_data),
		            success: function (data) {
							fourthBlockClose();
			            }
		          }).fail(function (xhr, textStatus, err) {
          				alert(err);
		        });
			};

			self.enablement_load_content('Our Enablement Strategy','', 'e1');
			self.enablement_load_content('Our Delivery Approach','', 'e2');
			self.enablement_load_content('Your Enablement Responsibilities','', 'e3');
			self.enablement_load_content('ECA Community Resources', 'Whats New', 'e4');

			self.firstBlockOpen = function() { 
				$("#firstBlockDialog").ojDialog("open");
			};
			firstBlockClose = function() { 
				$("#firstBlockDialog").ojDialog("close");
			};

			self.secondBlockOpen = function() { 
				$("#secondBlockDialog").ojDialog("open");
			};
			secondBlockClose = function() { 
				$("#secondBlockDialog").ojDialog("close");
			};

			self.thirdBlockOpen = function() { 
				$("#thirdBlockDialog").ojDialog("open");
			};
			thirdBlockClose = function() { 
				$("#thirdBlockDialog").ojDialog("close");
			};

			self.fourthBlockOpen = function() { 
				$("#fourthBlockDialog").ojDialog("open");
			};
			fourthBlockClose = function() { 
				$("#fourthBlockDialog").ojDialog("close");
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

