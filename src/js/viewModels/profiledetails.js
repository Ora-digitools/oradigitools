/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojdialog', 'ojs/ojprogressbar'],
  function (oj, ko, $) {

    function DashboardViewModel() {
      var self = this;
      self.profile = ko.observableArray();
      self.skills_goodat = ko.observableArray();
      self.skills_thingstolearn = ko.observableArray();
      self.skills_interests = ko.observableArray();
      self.projectInterest = ko.observable();

      function getProfile() {
        $.getJSON(baseurl + "ords/seaas_stage/seaas/GetFullUserProfile/" + selecteduuid).
          then(function (profiles) {
            console.log(profiles.items[0].skills.length);
            // SKILLS GOOD AT

            for (var i = 0; i < profiles.items[0].skills.length; i++) {
              var skill = profiles.items[0].skills[i];
              console.log(skill.category);
              if (skill.category === 'Good At') {
                self.skills_goodat.push({
                  value: ko.observable(skill.value),
                  desc_text: ko.observable(skill.desc_text)
                });
              } else if (skill.category === 'Things to Learn') {
                self.skills_thingstolearn.push({
                  value: ko.observable(skill.value)
                });
              } else if (skill.category === 'Interests') {
                self.skills_interests.push({
                  value: ko.observable(skill.value)
                });
              }
            }
            var imageurl = 'https://raw.githubusercontent.com/Ora-digitools/oradigitools/master/UI_Assets/Profile-list-page/default-user-icon.png';
            if (!profiles.items[0].profile_photo_url.endsWith("GetPhoto/")) {
              imageurl = profiles.items[0].profile_photo_url;
            }

            // CREATE PROFILE DATA
            self.profile({
              icon: ko.observable(imageurl), //'https://raw.githubusercontent.com/Ora-digitools/oradigitools/master/UI_Assets/Profile-list-page/default-user-icon.png',
              name: ko.observable(profiles.items[0].display_name),
              title: ko.observable(profiles.items[0].title),
              work_email: ko.observable(profiles.items[0].work_email),
              work_phone: ko.observable(profiles.items[0].work_phone),
              mobile_phone: ko.observable(profiles.items[0].mobile_phone),
              city: ko.observable(profiles.items[0].city),
              state: ko.observable(profiles.items[0].state),
              country: ko.observable(profiles.items[0].country),
              uuid: ko.observable(profiles.items[0].uuid)
            });

            console.log("profile created");

          });
      }

      self.updateProject = function () {
        alert(self.projectInterest());
        $("#dialog1").ojDialog("close");
        self.projectInterest("");
      }

      self.openeditprojectdialog = function () {
        $("#dialog1").ojDialog("open");
      }
    }
    return new DashboardViewModel();
  }
);
