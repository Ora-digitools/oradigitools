/**
 Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 The Universal Permissive License (UPL), Version 1.0
 @Auther angan.sen@oracle.com
 */
/*
 * Your Profilelist ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojarraytabledatasource', 'ojs/ojselectcombobox'],
  function (oj, ko, $, app) {

    function DashboardViewModel() {
      var self = this;
      self.data = ko.observableArray();
      self.renderData = ko.observableArray();
     self.selectedItems = ko.observableArray([]);

      self.opendetails = function (event,ui) {
         self.router = oj.Router.rootInstance;
         self.router.go('profiledetails');
      }

      self.logSelected = function(event, ui)
        {
            // Custom logic on selected elements
            if (ui.option === 'selection')
            {
                // Access selected elements via ui.items
                var selectedIdsArray = $.map(ui.items, function(selectedListItem) {
                    return selectedListItem.id;
                });
                alert(selectedIdsArray); // show selected list item elements' ids
            }

            // Custom logic on current item element
            if (ui.option === 'currentItem')
            {
                // Access current item via ui.item
                var currentItemId = ui.item.attr('id');
                alert("currentItemId:"+ currentItemId)
                // launch popup to show current item element's id when current item changes
            
            }
        }

      this.tags = ko.observableArray([]);

      this.keyword = ko.observableArray();

      this.valueChangeHandle = function (context, ui) {
        console.log(self.data().length);
        self.renderData.removeAll();
        if (ui.value != 'Search a profile...' && ui.value != '' && ui.value.length > 1) {
          for (var i = 0; i < self.data().length; i++) {
            try {
              console.log(self.data()[i].name.toLowerCase() + "   " + ui.value.toLowerCase());
              console.log(self.data()[i].name.indexOf(ui.value));

              if (self.data()[i].name != undefined && self.data()[i].name.toLowerCase().indexOf(ui.value.toLowerCase()) != -1) {
                self.renderData.push(self.data()[i]);
              }

            } catch (error) {
              console.log("Error in index: " + i + " msg: " + error);
            }

          };
        } else if (ui.value === '') {
          for (var i = 0; i < self.data().length; i++) {
            self.renderData.push(self.data()[i]);
          }
        }
      }
      
      $.getJSON(baseurl + "ords/seaas_stage/seaas/GetUserProfiles").
        then(function (profiles) {
          console.log(">> " + profiles.items.length);
          $.each(profiles.items, function () {
            var profile = {
              icon: 'https://raw.githubusercontent.com/Ora-digitools/oradigitools/master/UI_Assets/Profile-list-page/default-user-icon.png',
              name: this.display_name,
              title: this.title,
              work_email: this.work_email,
              work_phone: this.work_phone,
              mobile_phone: this.mobile_phone,
              city: this.city,
              state: this.state,
              country: this.country,
              uuid:this.uuid
            };
            if (this.display_name != "Subrah Kalaga") {
              self.data.push(profile);
              self.renderData.push(profile);
            }
          });
        });
      self.dataSource = new oj.ArrayTableDataSource(self.renderData, { idAttribute: "uuid" })
    }
    return new DashboardViewModel();
  }
);
