/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery'],
 function(oj, ko, $) {
  
    function DashboardViewModel() {
      var self = this;
      self.profile=ko.observable();


      $.getJSON(baseurl + "ords/seaas_stage/seaas/GetFullUserProfile/GWRIGHT").
        then(function (profiles) {
            self.profile({
              icon: 'https://raw.githubusercontent.com/Ora-digitools/oradigitools/master/UI_Assets/Profile-list-page/default-user-icon.png',
              name: ko.observable(profiles.items[0].display_name),
              title: ko.observable(profiles.items[0].title),
              work_email: ko.observable(profiles.items[0].work_email),
              work_phone: ko.observable(profiles.items[0].work_phone),
              mobile_phone: ko.observable(profiles.items[0].mobile_phone),
              city: ko.observable(profiles.items[0].city),
              state: ko.observable(profiles.items[0].state),
              country: ko.observable(profiles.items[0].country),
              uuid:ko.observable(profiles.items[0].uuid)
            });
            // alert(self.profile().work_email());
           
        });
      
    }

    
    return new DashboardViewModel();
  }
);
