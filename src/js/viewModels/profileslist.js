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
      var selectedLocations = "", selectedSkills = "", selectedPillers = "";
      self.data = ko.observableArray();
      self.renderData = ko.observableArray();
      self.currentItemId = ko.observable();
      self.keywords = ko.observableArray(['employee_key', 'u', 'm', 'uuid', 'first_name',
        'last_name', 'display_name', 'title', 'work_phone', 'mobile_phone', 'work_email',
        'city', 'state', 'local_time', 'created', 'created_by', 'last_updated', 'last_updated_by',
        'ou', 'cost_center', 'target_dn', 'country', 'manager_email', 'profile_photo_id',
        'profile_photo_url', 'skills', 'customers', 'category', 'value', 'desc_text',]);

      self.openthefilterpanel = function () {
        $('#slider').toggleClass('open');
        $('button.fixedButton').hide();
      }

      self.closethefilterpanel = function () {
        $('#slider').toggleClass('open');
        $('button.fixedButton').show();
      }

      self.logSelected = function (event, ui) {

        if (ui.option === 'currentItem') {
          selecteduuid = ui.item.attr('id');
          self.router = oj.Router.rootInstance;
          self.router.go('profiledetails');

        }
      }

      this.searchhandler = function (context, ui) {
        var searchkey = ui.value.length > 0 ? ui.value[0].toLowerCase() : "";

        if (searchkey != "") {
          $.getJSON(baseurl + "ords/seaas_stage/seaas/SearchUserProfiles/" + searchkey).
            then(function (profiles) {
              console.log(">> " + profiles.items.length);
              self.data([]);
              self.renderData([]);
              $.each(profiles.items, function () {

                var imageurl = 'https://raw.githubusercontent.com/Ora-digitools/oradigitools/master/UI_Assets/Profile-list-page/default-user-icon.png';
                if (!this.profile_photo_url.endsWith("GetPhoto/")) {
                  imageurl = this.profile_photo_url;
                }
                var profilejson = stripkeys(JSON.stringify(this));
                var profile = {
                  icon: imageurl,
                  name: this.display_name,
                  title: this.title,
                  work_email: this.work_email,
                  work_phone: this.work_phone,
                  mobile_phone: this.mobile_phone,
                  city: this.city,
                  state: this.state,
                  country: this.country,
                  uuid: this.uuid,
                  json: profilejson
                };
                if (this.work_email != 'matthew.orsie@oracle.com') {
                  self.data.push(profile);
                  self.renderData.push(profile);
                }
                console.log("Parse completed");
              });

            });
        } else {
          self.getUserList();
        }


      }

      self.getUserList = function () {
        $.getJSON(baseurl + "ords/seaas_stage/seaas/GetUserProfiles").
          then(function (profiles) {
            console.log(">> " + profiles.items.length);
            self.data([]);
            self.renderData([]);
            $.each(profiles.items, function () {

              var imageurl = 'https://raw.githubusercontent.com/Ora-digitools/oradigitools/master/UI_Assets/Profile-list-page/default-user-icon.png';
              if (!this.profile_photo_url.endsWith("GetPhoto/")) {
                imageurl = this.profile_photo_url;
              }
              var profilejson = stripkeys(JSON.stringify(this));
              var profile = {
                icon: imageurl,
                name: this.display_name,
                title: this.title,
                work_email: this.work_email,
                work_phone: this.work_phone,
                mobile_phone: this.mobile_phone,
                city: this.city,
                state: this.state,
                country: this.country,
                uuid: this.uuid,
                json: profilejson
              };
              if (this.work_email != 'matthew.orsie@oracle.com') {
                self.data.push(profile);
                self.renderData.push(profile);
              }
              console.log("Parse completed");
            });

          });
      }

      self.skillFilterClicked = function (val, evnt) {
        var elemvalue = evnt.currentTarget.value;
        selectedSkills = selectedSkills.includes(elemvalue) ? selectedSkills.replace(elemvalue + ',', '') : selectedSkills + elemvalue + ",";
        selectedSkills.replace(',,', ',');
        console.log(selectedSkills);
      }

      self.locationFilterClicked = function (val, evnt) {
        var elemvalue = evnt.currentTarget.value;
        selectedLocations = selectedLocations.includes(elemvalue) ? selectedLocations.replace(elemvalue + ',', '') : selectedLocations + elemvalue + ",";
        selectedLocations.replace(',,', ',');
        console.log(selectedLocations);
      }

      self.pillerFilterClicked = function (val, evnt) {
        var elemvalue = evnt.currentTarget.value;
        selectedPillers = selectedPillers.includes(elemvalue) ? selectedPillers.replace(elemvalue + ',', '') : selectedPillers + elemvalue + ",";
        selectedPillers.replace(',,', ',');
        console.log(selectedPillers);
      }

      function stripkeys(profilejson) {
        for (var i = 0; i < self.keywords().length; i++) {
          profilejson = profilejson.replace(self.keywords()[i], '');
        }
        return profilejson;
      }

      self.getUserList();
      self.dataSource = new oj.ArrayTableDataSource(self.renderData, { idAttribute: "uuid" })
    }
    return new DashboardViewModel();
  }
);
