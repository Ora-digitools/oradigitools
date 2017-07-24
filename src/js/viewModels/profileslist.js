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
      self.url = "http://digital-db.us.oracle.com:7003/ords/seaas_stage/seaas/GetUserProfiles";
      self.next = "";
      self.prev = "";
      self.data = ko.observableArray();
      self.renderData = ko.observableArray();
      self.currentItemId = ko.observable();
      self.keywords = ko.observableArray(['employee_key', 'u', 'm', 'uuid', 'first_name',
        'last_name', 'display_name', 'title', 'work_phone', 'mobile_phone', 'work_email',
        'city', 'state', 'local_time', 'created', 'created_by', 'last_updated', 'last_updated_by',
        'ou', 'cost_center', 'target_dn', 'country', 'manager_email', 'profile_photo_id',
        'profile_photo_url', 'skills', 'customers', 'category', 'value', 'desc_text',]);

      self.hubslist = ko.observableArray([]);
      self.listofpillers = ko.observableArray([]);
      self.selectechubs=ko.observableArray([]);

       self.openthefilterpanel = function () {
        $('#slider').addClass('open');
        $('#fixb').addClass('close');
      }

      self.closethefilterpanel = function () {
		  $('#slider').removeClass('open');
        $('#fixb').removeClass('close');
      }

      //switch to different html page
      self.logSelected = function (event, ui) {
         console.log("event", event)
         console.log("ui", ui)
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

      self.getFilters = function () {
        $.getJSON("http://digital-db.us.oracle.com:7003/ords/seaas_stage/seaas/ListValues/SOLUTION_HUBS").
          then(function (hubs) {
            $.each(hubs.items, function () {
              console.log("hub value is", this.value);
              // var hub = {
              //   value: this.value
              // }
              self.hubslist.push(this.value);
            })
          });

        $.getJSON("http://digital-db.us.oracle.com:7003/ords/seaas_stage/seaas/ListValues/ENGAGEMENT_PILLAR").
          then(function (pillers) {
            $.each(pillers.items, function () {
              console.log("pillar value is", this.value);
              // var piller = {
              //   value: this.value
              // }
              self.listofpillers.push(this.value);
            })
          });
      }

      self.getUserList = function () {
        $.getJSON(self.url).
          then(function (profiles) {
            console.log(">> " + profiles.items.length);
            self.data([]);
            self.renderData([]);
            self.next = profiles.next!=undefined?profiles.next.$ref:'';
            self.prev = profiles.previous!=undefined?profiles.previous.$ref:'';
            $.each(profiles.items, function () {

              var imageurl = 'https://raw.githubusercontent.com/Ora-digitools/oradigitools/master/UI_Assets/Profile-list-page/default-user-icon.png';
              if (!this.profile_photo_url.endsWith("GetPhoto/")) {
                imageurl = this.profile_photo_url;
              }
              // var profilejson = stripkeys(JSON.stringify(this));
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
                uuid: this.uuid
              };
              if (this.work_email != 'matthew.orsie@oracle.com') {
                self.data.push(profile);
                self.renderData.push(profile);
              }
              console.log("Parse completed - succesfully loaded all user profiles");
            });

          });
      }

      self.applyFilter=function(){
        console.log(self.selectechubs);
      }

      self.loadNextPage = function () {
        self.url = self.next;
        self.getUserList();
      }

      self.loadPrevPage = function () {
        self.url = self.prev;
        self.getUserList();
      }
      self.loadFirstPage = function () {
        self.url = "http://digital-db.us.oracle.com:7003/ords/seaas_stage/seaas/GetUserProfiles";
        self.getUserList();
      }

      self.getFilters();
      self.getUserList();
      self.dataSource = new oj.ArrayTableDataSource(self.renderData, { idAttribute: "uuid" })
    }
    return new DashboardViewModel();
  }
);
