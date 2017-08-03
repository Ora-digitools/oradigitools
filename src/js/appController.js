/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas'],
  function (oj, ko) {
    function ControllerViewModel() {
      var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

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
        'cookies': { label: 'Cookie Preferences' }
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
      self.headerLinks = ko.observableArray([
        new headerLink('Home', 'home', '?root=home'),
        new headerLink('Our People', 'profileslist', '?root=profileslist'),
		new headerLink('Our Hubs', 'cloudhubs', '?root=cloudhubs'),
        new headerLink('Our Services', 'catalogs', '?root=catalogs'),
        new headerLink('Our Assets', 'assets', 'http://innovate.us.oracle.com/', '_blank')

      ]);
	
self.addActive = function(routername, pid){
	
			 if(routername===pid){
				
				 return 'active';
				 }
				 
			}


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




      // Footer
      function footerLink(name, id, linkTarget, linkTarget1) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
		this.linkTarget1 = linkTarget1;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('Home', 'home', '?root=home'),
        new footerLink('ECAL Site', 'ecal', 'http://innovate.us.oracle.com/ecal/',  '_blank'),
        new footerLink('Cloud Accelerate Site', 'cloudaccelerate', 'http://innovate.us.oracle.com/cloudaccelerate/',  '_blank'),
		new footerLink('Internal Privacy Statement', 'internalprivacy', '?root=terms'),
		new footerLink('Contact Site Administrator', 'contactadmin', 'mailto:oraclecloudhubs_us@oracle.com'),
        new footerLink('Contact Us', 'contactUs', 'mailto:oraclecloudhubs_us@oracle.com')

      ]);
    }

    return new ControllerViewModel();
  }
);
