define(['ojs/ojcore', 'knockout', 'jquery',
        'ojs/ojknockout', 'ojs/ojfilmstrip', 'ojs/ojradioset','ojs/ojcollapsible','ojs/ojbutton', 'ojs/ojdialog','ojs/ojtabs', 'ojs/ojconveyorbelt', 'ojs/ojdialog','ojs/ojaccordion'],
	function (oj, ko, $) {
        function CatalogViewModel() {

			var baseurl="http://solutionengineering.us.oracle.com:7003/ords/seaas/seaas/";
			var self = this;
						  
			self.textarea_data1 = ko.observable();

			self.textarea_data2 = ko.observable("Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.");

			self.editbox1 = function() { 
			$("#editDialog1").ojDialog("open");
			};
			self.editbox2 = function() { 
			$("#editDialog2").ojDialog("open");
			};

			self.closebutton1 = function() { 
			$("#editDialog1").ojDialog("close");
			};
			    
			self.load_content = function(){
		          	var certification_approach_data = {
			            CATEGORY_NAME: 'HOME',
			            SUB_CATEGORY_1: 'Our Certification Approach',
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
							console.log(ko.toJSON(data));
							self.textarea_data1(data.content);

							var content_id = data.content_id;
							var content_data = data.content;

			            }
		          });
		        
				
			};

			self.edit_certification_approach1 = function(){
		          	var certification_approach_post_data = {
			            CONTENT_ID: content_id,
			            CATEGORY_CONTENT: content_data
		          	};
		          $.ajax({
		            url:'http://solutionengineering.us.oracle.com:7003/ords/seaas/seaas/PutEcaData',
		            cache: false,
		            type: 'POST',
		            contentType: 'application/json; charset=utf-8',
          			data: ko.toJSON(certification_approach_post_data),
		            success: function (data) {
							//load_content();
			            }
		          });
		        
				
			};
			self.load_content();

			self.edit_certification_approach2 = function(){
				//-----
			};
		}
	        return new CatalogViewModel();
	});   

