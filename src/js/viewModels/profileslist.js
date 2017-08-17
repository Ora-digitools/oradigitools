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
      self.defaultimage = 'css/images/avatar_24px_2x.png';
      var selectedLocations = "", selectedPillars = "";
      self.url = baseurl + "GetUserProfiles";
      self.next = ko.observable();
      self.prev = ko.observable();
      self.data = ko.observableArray();
      self.renderData = ko.observableArray();
      self.currentItemId = ko.observable();

      self.hubslist = ko.observableArray([]);
      self.listofpillers = ko.observableArray([]);
      self.searchtext = ko.observable('');
	  
	  			//  Checks that string ends with the specific string...
if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (str) {
        return this.slice(-str.length) == str;
    };
}

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
          var selecteduuid = ui.item.attr('id');
          // STORE THE SELECTED USER UUID in LOCASTORAGE
          localStorage.setItem('uuid', selecteduuid);

          // NAVIGATE TO PROFILE DETAILS PAGE
          self.router = oj.Router.rootInstance;
          self.router.go('profiledetails');

        }
      }

      this.searchhandler = function () {
        showdialog();
        self.closethefilterpanel();
        var searchkey = self.searchtext() != "" ? self.searchtext()[0] : "";//;
        selectedLocations = selectedLocations.length > 0 ? selectedLocations : 'All';
        selectedPillars = selectedPillars.length > 0 ? selectedPillars : 'All';
        searchkey = searchkey.length > 0 ? searchkey : 'All';
        var url = baseurl + 'SearchProfiles?hub=' + selectedLocations + '&pillar=' + selectedPillars + '&search=' + searchkey;
        self.data([]);
        console.log(url);
        $.getJSON(url).
          then(function (profiles) {
            dorefresh = false;
            console.log(">> " + profiles.items.length);
            var nxturl = profiles.next != undefined ? profiles.next.$ref : null;
            var prevurl = profiles.previous != undefined ? profiles.previous.$ref : null;
            self.next = (nxturl);
            self.prev = (prevurl);


            for (var i = 0; i < profiles.items.length; i++) {
              var obj = profiles.items[i];
              var imageurl = self.defaultimage;
              if (!obj.profile_photo_url.endsWith("GetPhoto/")) {
                imageurl = obj.profile_photo_url;
              }
              var profile = {
                icon: imageurl,
                name: obj.display_name,
                title: obj.title,
                work_email: obj.u,
                work_phone: obj.work_phone,
                mobile_phone: obj.mobile_phone,
                city: obj.city,
                state: obj.state,
                country: obj.country,
                uuid: obj.uuid
              };
              self.data.push(profile);
            }

            console.log("Parse completed");
            self.renderData([]);
            self.renderData(self.data.slice());
            debuglog(ko.toJSON(self.renderData()));
            hidedialog();

          }).fail(function (xhr, textStatus, err) {
            alert(err);
            hidedialog();
          });
      }

      self.getFilters = function () {
        self.hubslist = ko.observableArray([]);
        self.listofpillers = ko.observableArray([]);

        $.getJSON(baseurl + "ListValues/SOLUTION_HUBS").
          then(function (hubs) {
            $.each(hubs.items, function () {
              // console.log(this.value);
              self.hubslist.push(this.value);
            })
          });

        $.getJSON(baseurl + "ListValues/ENGAGEMENT_PILLAR").
          then(function (pillers) {
            $.each(pillers.items, function () {
              // console.log(this.value);
              self.listofpillers.push(this.value);
            })
          });
      }

      self.getUserList = function () {
        showdialog();
        $.getJSON(self.url).
          then(function (profiles) {
            debuglog(">> " + self.url);
            self.data([]);

            var nxturl = profiles.next != undefined ? profiles.next.$ref : null;
            var prevurl = profiles.previous != undefined ? profiles.previous.$ref : null;
            self.next = (nxturl);
            self.prev = (prevurl);
            checkvisible();

            for (var i = 0; i < profiles.items.length; i++) {
              var obj = profiles.items[i];
              var imageurl = self.defaultimage;
              if (!obj.profile_photo_url.endsWith("GetPhoto/")) {
                imageurl = obj.profile_photo_url;
              }
              var profile = {
                icon: imageurl,
                name: obj.display_name,
                title: obj.title,
                work_email: obj.u,
                work_phone: obj.work_phone,
                mobile_phone: obj.mobile_phone,
                city: obj.city,
                state: obj.state,
                country: obj.country,
                uuid: obj.uuid
              };
              self.data.push(profile);
            }
            self.renderData([]);
            self.renderData(self.data.slice());
            debuglog("Parse completed");
            debuglog(ko.toJSON(self.renderData()));
            hidedialog();

          }).fail(function (xhr, textStatus, err) {
            err = err.length == 0 ? "Could not reach server, try again later" : err;
            alert(err);
            hidedialog();
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
      setpaginationbutton = function () {
        if (self.prev != null && self.prev.length > 0) {
          $("PREV").show();
          $("FIRST").show();

        } else {
          $("PREV").hide();
          $("FIRST").hide();
        }

        if (self.next != null && self.next.length > 0) {
          $("NEXT").show();
        } else {
          $("NEXT").hide();
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
      checkvisible = function () {
        var elms = document.querySelectorAll("[name='navbtn']");

        for (var i = 0; i < elms.length; i++) {
          if (elms[i].id === 'PREV') {
            if (self.prev != null && self.prev.length > 0) {
              elms[i].style.visibility = 'visible';
            } else {
              elms[i].style.visibility = 'hidden';
            }
          }
          if (elms[i].id === 'FIRST') {
            if (self.prev != null && self.prev.length > 0) {
              elms[i].style.visibility = 'visible';
            } else {
              elms[i].style.visibility = 'hidden';
            }
          }

          if (elms[i].id === 'NEXT') {
            if (self.next != null && self.next.length > 0) {
              elms[i].style.visibility = 'visible';
            } else {
              elms[i].style.visibility = 'hidden';
            }
          }
        }

      }
      resetsearch = function () {

        // $('#hubcheck').attr('checked', false);
        //$('#slider').find('input:checkbox').prop('checked'); 
        $("#slider input[type=checkbox]").each(function () { this.checked = false; });
        selectedLocations = 'All';
        selectedPillars = 'All';
        searchkey = 'All';
        self.closethefilterpanel();
        self.getUserList();
      }

      self.handleAttached = function (info) {
        console.log('loading profile list. . .');

        self.router = oj.Router.rootInstance;
        var retrievedobject = self.router.retrieve();
        if (retrievedobject != undefined && retrievedobject.length > 0) {
          selectedLocations = retrievedobject;
          // self.getFilters();
          self.searchhandler();
        } else {
          if (dorefresh) {
            self.getFilters();
            self.getUserList();
          }
        }
      }

      self.dataSource = new oj.ArrayTableDataSource(self.renderData, { idAttribute: "uuid" });


      showdialog = function () {
        var elms = document.getElementById('dialog');
        elms.style.display = 'block';
      }

      hidedialog = function () {
        var elms = document.getElementById('dialog');
        elms.style.display = 'none';
      }

      debuglog = function (msg) {
        if (debug) {
          console.log(msg);
        }
      };

    }
    return new DashboardViewModel();
  }
);
