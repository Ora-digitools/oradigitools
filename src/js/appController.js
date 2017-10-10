/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas','ojs/ojtoolbar', 'ojs/ojmenu','ojs/ojnavigationlist',],
  function (oj, ko) {
    function ControllerViewModel() {
      var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
      self.ssowindow;
      self.mentoringinterest = false;
      // Router setup
      self.router = oj.Router.rootInstance;
      self.router.configure({
        'home': { label: 'Home', isDefault: true },
        'welcome': { label: 'Welcome' },
        'cloudhubs': { label: 'Cloud Hubs' },
        'profileslist': { label: 'SE Faces' },
        'profiledetails': { label: 'ProfileDetails' },
        'catalogs': { label: 'SEaaS Catalog' },
        'assets': { label: 'Assets' },
        'performance': { label: 'Performance' },
        'sitemap': { label: 'Sitemap' },
        'terms': { label: 'Terms of Use & Privacy' },
        'cookies': { label: 'Cookie Preferences' },
		'mentorship': { label: 'The Cloud Solution Mentor Community' },
		'huboperations': { label: 'Hub Operations' },
		'ecacertification': { label: 'ECA Certification' },
		'eca-qualify': { label: 'ECA Qualify' },
		'eca-certify': { label: 'ECA Certify' },
		'eca-nominate': { label: 'ECA Nominate' },
		'eca-board': { label: 'ECA Board' },
		'ecaenablement': { label: 'ECA Enablement' },
		'salesstrategy': { label: 'Sales, Strategy Platform' },
		'ecacore': { label: 'ECA Core' },
		'ecaops': { label: 'ECA OPS' },
      });
	  

      //welcome,cloud hubs, profiles,catalogs, assets, performance
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();



      // Footer
      function headerLink(name, id, linkTarget, linkTarget1) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
        this.linkTarget1 = linkTarget1;

      }
	  var arr1 = [
        new headerLink('Home', 'home', '?root=home'),
        new headerLink('Our People', 'profileslist', '?root=profileslist'),
        new headerLink('Our Hubs', 'cloudhubs', '?root=cloudhubs'),
        new headerLink('Our Services', 'catalogs', '?root=catalogs'),
        new headerLink('Our Assets', 'assets', '?root=assets'),
   
    
      ];
      var arr2 = [
        new headerLink('Home', 'ecacertification', '?root=ecacertification'),
        new headerLink('Qualify', 'eca-qualify', '?root=eca-qualify'),
        new headerLink('Nominate', 'eca-nominate', '?root=eca-nominate'),
        new headerLink('Certify', 'eca-certify', '?root=eca-certify')

      ];
	  var arr3 = [
        new headerLink('Home', 'ecaenablement', '?root=ecaenablement'),
		new headerLink('Sales, Strategy Platform', 'salesstrategy', '?root=salesstrategy'),
		new headerLink('ECA Core', 'ecacore', '?root=ecacore'),
		new headerLink('ECA OPS', 'ecaops', '?root=ecaops'),
		
       
    
      ];
	  // Footer
      function footerLink(name, id, linkTarget, linkTarget1) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
        this.linkTarget1 = linkTarget1;
      }
	  var footer1 = [
         new footerLink('Home', 'home', '?root=home'),
        new footerLink('ECAL Site', 'ecal', 'http://innovate.us.oracle.com/ecal/', '_blank'),
        new footerLink('Cloud Accelerate Site', 'cloudaccelerate', 'http://innovate.us.oracle.com/cloudaccelerate/', '_blank'),
        new footerLink('Contact Site Administrator', 'contactadmin', 'mailto:cloudsolutionhub_siteadmin_us_grp@oracle.com'),
        new footerLink('Contact Us', 'contactUs', 'mailto:oraclecloudhubs_us@oracle.com')
   
    
      ];
      var footer2 = [
         new footerLink('Home', 'home', '?root=ecacertification'),
        new footerLink('ECAL Site', 'ecal', 'http://innovate.us.oracle.com/ecal/', '_blank'),
        new footerLink('Contact PMO Team', 'contactpmo', 'mailto:eca-pmo-grp_us_grp@oracle.com'),
         new footerLink('Contact Site Administrator', 'contactadmin', 'mailto:cloudsolutionhub_siteadmin_us_grp@oracle.com'),

      ];
	  var footer3 = [
           new footerLink('Home', 'home', '?root=ecaenablement'),
        new footerLink('ECAL Site', 'ecal', 'http://innovate.us.oracle.com/ecal/', '_blank'),
        new footerLink('Contact PMO Team', 'contactpmo', 'mailto:eca-pmo-grp_us_grp@oracle.com'),        
         new footerLink('Contact Site Administrator', 'contactadmin', 'mailto:cloudsolutionhub_siteadmin_us_grp@oracle.com'),
		
      ];
	  var footer4 = [
           new footerLink('Home', 'home', '?root=ecaenablement'),
        new footerLink('ECAL Site', 'ecal', 'http://innovate.us.oracle.com/ecal/', '_blank'),
        new footerLink('Contact PMO Team', 'contactpmo', 'mailto:eca-pmo-grp_us_grp@oracle.com'),
        new footerLink('Contact Board', 'contactmoard', 'mailto:ecal-pmo-grp_us_grp@oracle.com'),
         new footerLink('Contact Site Administrator', 'contactadmin', 'mailto:cloudsolutionhub_siteadmin_us_grp@oracle.com'),
		
      ];
	  
      var str = window.location.href;
    var res = str.split("root=");
	// console.log(res[1]);
	  
	  if(res[1] == "ecacertification" || res[1] == "eca-qualify"|| res[1] == "eca-certify"|| res[1] == "eca-nominate")
	  {
		  this.currentModule = ko.observable("eca");
		  self.headerLinks = ko.observableArray(arr2);  
		  self.footerLinks = ko.observableArray(footer2);  
		 
	  }
	  else if(res[1] == "ecaenablement" || res[1] == "salesstrategy" || res[1] == "ecacore" || res[1] == "ecaops")
	  {
		  this.currentModule = ko.observable("ecaenablement");
		  self.headerLinks = ko.observableArray(arr3);
		  self.footerLinks = ko.observableArray(footer3);  
		 
	  }
	   else if(res[1] == "eca-board"){
		   this.currentModule = ko.observable("eca");
		  self.headerLinks = ko.observableArray(arr2);  
		  self.footerLinks = ko.observableArray(footer4);  
		   }
	  else{
		   this.currentModule = ko.observable("cloudhubs");
		   self.headerLinks = ko.observableArray(arr1);
		   self.footerLinks = ko.observableArray(footer1);  
		   
	  }
	  
              var self = this;
              self.logoPath = ko.pureComputed(
                function()
                {
                  return ('logo/' + self.currentModule());
                }
              );
			  self.footerPath = ko.pureComputed(
                function()
                {
                  return ('footer/' + self.currentModule());
                }
              );

      // GET THE DOMAIN URL FOR PROFILE LINK
      getprofilebaseurl = function () {
        var url = window.location.href;
        url = url.split('?')[0];
        profilelink = url + '?root=profiledetails#';

      }

      getprofilebaseurl();

      isloggedin = function () {
        if (ssoemail.length > 0) {
          if (self.registerMentor) {
            registerMentor();
            self.registerMentor = false;
          }
          document.getElementById('loginbutton').style.display = 'none';
          if (uuid.length > 0) {
            document.getElementById('myprofile').style.display = 'inline-block';
          }

          if (self.ssowindow != undefined) {
            debuglog('closing sso window');
            self.ssowindow.close();
          }
        } else {
          document.getElementById('loginbutton').style.display = 'inline-block';
          document.getElementById('myprofile').style.display = 'none';
        }
      }


      // SSO RELATED ACTIVITY CODE HERE
      initsso = function () {
        if (ssoemail.length == 0) {
          // document.getElementById('ssodialog').style.display = 'block';
          self.ssowindow = window.open("http://solutionengineering.us.oracle.com/seaas/");
        }
      }
      gotomyprofile = function () {
        window.open(profilelink.split('#')[0] + '#' + uuid, "_self");
      }

      getemailfromcookie = function () {

        // debuglog('~~~~~~~~~~~~~~~  COOKIE  ~~~~~~~~~~~~~');
        // debuglog(document.cookie);
        // debuglog('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        // get user email
        var user = document.cookie.split(';').map(function (x) {
          return x.trim().split('=');
        }).reduce(
          function (a, b) {
            a[b[0]] = b[1];
            return a;
          }, {})["ORA_UCM_INFO"];
        user = typeof user !== "undefined" ? user : "";
        var n = user.lastIndexOf("~");

        email = user.substr(n + 1, user.length);
        if (email) {
          ssoemail = email;
        } else {
          ssoemail = "";
        }
      }

      getusertype = function () {
        if (ssoemail.length > 0) {
          $.getJSON(baseurl + "GetEmployeeType/" + ssoemail).
            then(function (hubs) {
              $.each(hubs.items, function () {
                //debuglog(this.type);
                usertype = this.type;
                uuid = this.uuid;
                self.mentoringinterest = this.mentoring_interest.toLowerCase() === 'yes' ? true : false;
              })
            });
        }
      }

      setInterval(function () {
        getemailfromcookie();
        isloggedin();
        setMentorStatus();
        getusertype();
      }, 500);
      // END OF SSO RELATED CODE

      //~~~~~~~~~~~~ SET MENTORSHIP STATUS ~~~~~~~~~~~~~//
      setMentorStatus = function () {
        if (self.mentoringinterest) {//menteelist
          document.getElementById('regmentor').style.display = 'none';
          var newmentor = localStorage.getItem('newmentor')
          if (newmentor != undefined && newmentor == 'true') {
            gotomyprofile();
          }
        } else {
          if (ssoemail.length > 0) {
            document.getElementById('regmentor').style.display = 'inline-block';
          }
        }
      }
      //~~~~~~~~~~~~  MENTORSHIP CODE ~~~~~~~~~~~~~//

      //~~~~~~~~~~~~ Resign as Mentor code ~~~~~~~~//
      initmentorderegister = function () {
        if (uuid.length) {
          $.ajax({
            url: baseurl + 'Update_Mentor_Preference/' + uuid,
            cache: false,
            type: 'PUT',
            success: function (data) {
              debuglog("Mentor deregistered success");
            }
          }).fail(function (xhr, textStatus, err) {
            alert(err);
          });
        }
      }
      // ~~~~~~~~~~~~~~   END OF METHOD   ~~~~~~~~~~~~~~~~//

      //---------------   MENTOR & MENTEE   ----------------//
      // INITIATE SSO TO GET EMAIL 
      initmentorregister = function () {
        if (ssoemail.length == 0) {
          self.registerMentor = true;
          initsso();
        } else {
          registerMentor();
        }
      }

      // INITIATE REQUEST TO REGISTER AS MENTOR
      registerMentor = function () {
        var targeturl = baseurl + 'INS_EXTERNAL_PROFILE/' + ssoemail;
        console.log(targeturl);
        $.ajax({
          url: targeturl,
          cache: false,
          type: 'POST',
          success: function (data) {
            requestregistermentor = true;
            localStorage.setItem('newmentor', 'true');
            console.log("Mentor registration request submitted successfully.");
          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
        });
      }

      //------ END OF MENTOR MENTEE CODE

      self.addActive = function (routername, pid) {
		  
        if (routername === pid) {

          return 'active';
        }
		
		

      }
      debuglog = function (msg) {
        if (debug) {
          console.log('-------------------------');
          console.log(msg);
          console.log('-------------------------');
        }
      };

      // Drawer
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function () { oj.OffcanvasUtils.close(self.drawerParams); });
      self.drawerParams = {
        displayMode: 'overlay',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function () {
        return oj.OffcanvasUtils.toggle(self.drawerParams);
      }
      // Add a close listener so we can move focus back to the toggle button when the drawer closes
      $("#navDrawer").on("ojclose", function () { $('#drawerToggleButton').focus(); });

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("App Name");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.hancock@oracle.com");




      
      
    }

    return new ControllerViewModel();
  }
);
