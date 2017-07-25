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
      var selectedLocations = "", selectedPillars = "";
      self.url = baseurl + "GetUserProfiles";
      self.next = "";
      self.prev = "";
      self.data = ko.observableArray();
      self.renderData = ko.observableArray();
      self.currentItemId = ko.observable();

      self.hubslist = ko.observableArray([]);
      self.listofpillers = ko.observableArray([]);
      self.searchtext = ko.observable('');

      self.openthefilterpanel = function () {
        $('#slider').addClass('open');
        $('#fixb').addClass('close');
      }

      self.closethefilterpanel = function () {
        $('#slider').removeClass('open');
        $('#fixb').removeClass('close');
      }

      self.logSelected = function (event, ui) {

        if (ui.option === 'currentItem') {
          selecteduuid = ui.item.attr('id');
          self.router = oj.Router.rootInstance;
          self.router.go('profiledetails');

        }
      }

      this.searchhandler = function (context, ui) {
        self.closethefilterpanel();
        var searchkey = self.searchtext() != "" ? self.searchtext()[0] : "";//;
        selectedLocations = selectedLocations.length > 0 ? selectedLocations : 'All';
        selectedPillars = selectedPillars.length > 0 ? selectedPillars : 'All';
        searchkey = searchkey.length > 0 ? searchkey : 'All';
        var url = baseurl + 'SearchProfiles?hub=' + selectedLocations + '&pillar=' + selectedPillars + '&search=' + searchkey;
        console.log(url);
        $.getJSON(url).
          then(function (profiles) {
            console.log(">> " + profiles.items.length);
            self.data([]);
            self.renderData([]);
            $.each(profiles.items, function () {

              var imageurl = 'https://raw.githubusercontent.com/Ora-digitools/oradigitools/master/UI_Assets/Profile-list-page/default-user-icon.png';
              if (!this.profile_photo_url.endsWith("GetPhoto/")) {
                imageurl = this.profile_photo_url;
              }
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
              console.log("Parse completed");
            });


          }).fail(function (xhr, textStatus, err) {
            alert(err);
          });
      }

      self.getFilters = function () {
        self.hubslist = ko.observableArray([]);
        self.listofpillers = ko.observableArray([]);

        $.getJSON(baseurl + "ListValues/SOLUTION_HUBS").
          then(function (hubs) {
            $.each(hubs.items, function () {
              console.log(this.value);
              self.hubslist.push(this.value);
            })
          });

        $.getJSON(baseurl + "ListValues/ENGAGEMENT_PILLAR").
          then(function (pillers) {
            $.each(pillers.items, function () {
              console.log(this.value);
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
            self.next = profiles.next != undefined ? profiles.next.$ref : '';
            self.prev = profiles.previous != undefined ? profiles.previous.$ref : '';
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
              console.log("Parse completed");
            });

          });
      }

      filteredhubs = function (desc) {

        if (desc.checked) {
          selectedLocations += selectedLocations.length > 0 ? ',' + desc.defaultValue : desc.defaultValue;
        } else {
          selectedLocations = selectedLocations.replace(desc.defaultValue + ',', '');
          selectedLocations = selectedLocations.replace(',' + desc.defaultValue, '');
          selectedLocations = selectedLocations.replace(desc.defaultValue, '');
        }
      }

      filteredpillars = function (desc) {

        if (desc.checked) {
          selectedPillars += selectedPillars.length > 0 ? ',' + desc.defaultValue : desc.defaultValue;
        } else {
          selectedPillars = selectedPillars.replace(desc.defaultValue + ',', '');
          selectedPillars = selectedPillars.replace(',' + desc.defaultValue, '');
          selectedPillars = selectedPillars.replace(desc.defaultValue, '');
        }
      }
      loadNextPage = function () {
        self.url = self.next;
        self.getUserList();
      }

      loadPrevPage = function () {
        self.url = self.prev;
        self.getUserList();
      }
      loadFirstPage = function () {
        self.url = baseurl + "GetUserProfiles";
        self.getUserList();
      }

      self.getFilters();
      self.getUserList();
      self.dataSource = new oj.ArrayTableDataSource(self.renderData, { idAttribute: "uuid" });

    }
    return new DashboardViewModel();
  }
);
=======
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
      var selectedLocations = "", selectedPillars = "";
      self.url = baseurl + "GetUserProfiles";
      self.next = "";
      self.prev = "";
      self.data = ko.observableArray();
      self.renderData = ko.observableArray();
      self.currentItemId = ko.observable();

      self.hubslist = ko.observableArray([]);
      self.listofpillers = ko.observableArray([]);
      self.searchtext = ko.observable('');

      self.openthefilterpanel = function () {
        $('#slider').addClass('open');
        $('#fixb').addClass('close');
      }

      self.closethefilterpanel = function () {
        $('#slider').removeClass('open');
        $('#fixb').removeClass('close');
      }

      self.logSelected = function (event, ui) {

        if (ui.option === 'currentItem') {
          selecteduuid = ui.item.attr('id');
          self.router = oj.Router.rootInstance;
          self.router.go('profiledetails');

        }
      }

      this.searchhandler = function (context, ui) {
        self.closethefilterpanel();
        var searchkey = self.searchtext() != "" ? self.searchtext()[0] : "";//;

        var searchheader = {
          'search_terms': searchkey,
          'pillar': selectedPillars,
          'hub': selectedLocations
        }

        console.log(searchheader);
        $.ajax({
          url: baseurl + 'SearchUserProfiles',
          cache: false,
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Access-Control-Allow-origin', 'http://solutionengineering.us.oracle.com');
            xhr.setRequestHeader('search_terms', searchkey);
            xhr.setRequestHeader('pillar',selectedPillars);
            xhr.setRequestHeader('hub',selectedLocations);
          },
          type: 'GET',
          crossDomain: true,
          success: function (profiles) {
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

          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
        });

        // if (searchkey != "") {
        //   $.getJSON(baseurl + "SearchUserProfiles/" + searchkey).
        //     then(function (profiles) {
        //       console.log(">> " + profiles.items.length);
        //       self.data([]);
        //       self.renderData([]);
        //       $.each(profiles.items, function () {

        //         var imageurl = 'https://raw.githubusercontent.com/Ora-digitools/oradigitools/master/UI_Assets/Profile-list-page/default-user-icon.png';
        //         if (!this.profile_photo_url.endsWith("GetPhoto/")) {
        //           imageurl = this.profile_photo_url;
        //         }
        //         var profilejson = stripkeys(JSON.stringify(this));
        //         var profile = {
        //           icon: imageurl,
        //           name: this.display_name,
        //           title: this.title,
        //           work_email: this.work_email,
        //           work_phone: this.work_phone,
        //           mobile_phone: this.mobile_phone,
        //           city: this.city,
        //           state: this.state,
        //           country: this.country,
        //           uuid: this.uuid,
        //           json: profilejson
        //         };
        //         if (this.work_email != 'matthew.orsie@oracle.com') {
        //           self.data.push(profile);
        //           self.renderData.push(profile);
        //         }
        //         console.log("Parse completed");
        //       });
        //     });
        // } else {
        //   self.getUserList();
        // }
      }

      self.getFilters = function () {
        $.getJSON(baseurl + "ListValues/SOLUTION_HUBS").
          then(function (hubs) {
            $.each(hubs.items, function () {
              console.log(this.value);
              // var hub = {
              //   value: this.value
              // }
              self.hubslist.push(this.value);
            })
          });

        $.getJSON(baseurl + "ListValues/ENGAGEMENT_PILLAR").
          then(function (pillers) {
            $.each(pillers.items, function () {
              console.log(this.value);
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
            self.next = profiles.next != undefined ? profiles.next.$ref : '';
            self.prev = profiles.previous != undefined ? profiles.previous.$ref : '';
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
              console.log("Parse completed");
            });

          });
      }

      filteredhubs = function (desc) {

        if (desc.checked) {
          selectedLocations += selectedLocations.length > 0 ? ',' + desc.defaultValue : desc.defaultValue;
        } else {
          selectedLocations = selectedLocations.replace(desc.defaultValue + ',', '');
          selectedLocations = selectedLocations.replace(',' + desc.defaultValue, '');
          selectedLocations = selectedLocations.replace(desc.defaultValue, '');
        }
      }

      filteredpillars = function (desc) {

        if (desc.checked) {
          selectedPillars += selectedPillars.length > 0 ? ',' + desc.defaultValue : desc.defaultValue;
        } else {
          selectedPillars = selectedPillars.replace(desc.defaultValue + ',', '');
          selectedPillars = selectedPillars.replace(',' + desc.defaultValue, '');
          selectedPillars = selectedPillars.replace(desc.defaultValue, '');
        }
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
        self.url = baseurl + "GetUserProfiles";
        self.getUserList();
      }

      self.getFilters();
      self.getUserList();
      self.dataSource = new oj.ArrayTableDataSource(self.renderData, { idAttribute: "uuid" })
    }
    return new DashboardViewModel();
  }
);
