/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 * 
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojtagcloud', 'ojs/ojknockout', 'ojs/ojgauge', 'ojs/ojselectcombobox', 'ojs/ojtabs', 'ojs/ojconveyorbelt', 'ojs/ojdialog'],
  function (oj, ko, $) {

    function DashboardViewModel() {

      var self = this;


      /* fadein animations effect for tab content */
      self.profileHistory = ko.observableArray([]);
      self.removementorreason = ko.observableArray([]);
      self.defaultimage = 'css/images/avatar_24px_2x.png';
      self.effect = ko.observable('fadeIn');
      self.enlargephotourl = ko.observable('');
      self.ratting = ko.observable(1);
      self.newSkill = ko.observableArray([]);
      self.linkurl = ko.observable('');
      self.achievementurl = ko.observable('');
      self.center = ko.observable('');
      self.pillar = ko.observable('');
      self.mobile_phone = ko.observable('');
      self.uuid = "";
      self.effectOptions = {};
      self.tabClick1 = function (data, event) {
        // Invoke the animation effect method with options
        oj.AnimationUtils[self.effect()]($('#tabs-1')[0], self.effectOptions);
      };
      self.tabClick2 = function (data, event) {
        // Invoke the animation effect method with options
        oj.AnimationUtils[self.effect()]($('#tabs-2')[0], self.effectOptions);
      };
      self.tabClick3 = function (data, event) {
        // Invoke the animation effect method with options
        oj.AnimationUtils[self.effect()]($('#tabs-3')[0], self.effectOptions);
      };
      /* fadein animations effect for tab content */
      self.val = ko.observableArray([]);
      self.profile = ko.observableArray([]);
      // self.photograph = ko.observableArray([]);
      self.skills_skills = ko.observableArray([]);

      //  Checks that string ends with the specific string...
      if (typeof String.prototype.endsWith != 'function') {
        String.prototype.endsWith = function (str) {
          return this.slice(-str.length) == str;
        };
      }


      self.skills_learning = ko.observableArray([]);
      self.skills_interests = ko.observableArray([]);
      self.projectInterest = ko.observableArray([]);
      self.listofhubs = ko.observableArray([]);
      self.listofpillars = ko.observableArray([]);
      self.personalphotoslist = ko.observableArray([]);
      self.achivements = ko.observableArray([]);
      self.links = ko.observableArray([]);
      self.skillStriing = ko.observable('');
      self.interestsString = ko.observable('');
      self.learningString = ko.observable('');
      self.customers = ko.observableArray([]);

      // VARIABLES FOR EDIT PROJECT
      self.project_employee_customer_profile_key = ko.observable();
      self.project_industry = ko.observable();
      self.project_customer_name = ko.observable();
      self.project_customer_division = ko.observable();
      self.project_type_of_work = ko.observable();
      self.project_artifacts_url = ko.observable();
      self.project_summary = ko.observable();
      self.project_description = ko.observable();
      self.project_outcome = ko.observable();
      // END OF PROKJECT VARIABLE

      // TAG CLOUD
      self.tags = ko.observableArray([]);
      //---- END ----//

      // MENTOR AND MENTEE variable
      self.skillarray = ko.observableArray([]);
      this.thresholdValues = [{ max: 1, shortDesc: 'Familiar' },
      { max: 2, shortDesc: 'Needs Improvement' },
      { max: 3, shortDesc: 'Proficient' },
      { max: 4, shortDesc: 'Expert' },
      { max: 5, shortDesc: 'Outstanding' }];

      self.recommendedMentors = ko.observableArray([]);
      self.associatedmentors = ko.observableArray([]);
      self.associatedmentees = ko.observableArray([]);
      //----- END -----//


      self.profile({
        profileicon: ko.observable(self.defaultimage),
        employee_key: ko.observable(),
        name: ko.observable(),
        title: ko.observable(),
        work_email: ko.observable(),
        work_phone: ko.observable(),
        mobile_phone: ko.observable(),
        city: ko.observable(),
        state: ko.observable(),
        country: ko.observable(),
        uuid: ko.observable(),
        Mentoring_Interest: ko.observable(),
        ou: ko.observable(),
        cost_center: ko.observable(),
        pillar: ko.observable(),
        center: ko.observable(),
        type: ko.observable(),
        mgr_email: ko.observable(),
        mgr_display_name: ko.observable(),
        profile_summary: ko.observable(),
        skills: self.skills_skills,
        interests: self.skills_interests,
        learnings: self.skills_learning,
        personalphotos: self.personalphotoslist,
        hublist: self.listofhubs,
        pillarlist: self.listofpillars,
        achivements: self.achivements,
        links: self.links,
        flatSkills: ko.observable(),
        flatlearnings: ko.observable(),
        flatinterests: ko.observable(),
        flatachivements: ko.observable(),
        flatlinks: ko.observable(),
        projects: self.customers,
        openmodalforicon: function () {
          $("#editimage1").ojDialog("open");
        },
        clearhub: ko.observable(false),
        clearPillar: ko.observable(false),
        clearMobile: ko.observable(false),
        clearHubValue: function () {
          this.center('');
          this.clearhub(true);
        },
        clearPillarValue: function () {
          this.pillar('');
          this.clearPillar(true);
        },
        clearMobileValue: function () {
          this.mobile('');
          this.clearMobile(true);
        }

      });


      self.getFilters = function () {
        self.listofhubs([]);
        self.listofpillars([]);
        $.getJSON(baseurl + "ListValues/SOLUTION_HUBS").
          then(function (hubs) {
            $.each(hubs.items, function () {
              self.listofhubs.push(this.value);
            })
          });

        $.getJSON(baseurl + "ListValues/ENGAGEMENT_PILLAR").
          then(function (pillers) {
            $.each(pillers.items, function () {
              self.listofpillars.push(this.value);
            })
          });
      }



      self.getProfile = function (uuid) {
        if (uuid.length != 0) {
          showdialog();
          self.resetValues();
          $.getJSON(baseurl + "GetFullUserProfile/" + uuid).
            then(function (profiles) {
              // SKILLS GOOD AT
              var skills_string = "";
              var interests_string = "";
              var learnings_string = "";
              var achivement_string = "";
              var link_string = "";

              for (var i = 0; i < profiles.items[0].list_values.length; i++) {
                var skill = profiles.items[0].list_values[i];
                if (skill.category === 'Skills') {
                  self.skills_skills.push({
                    employee_profile_key: ko.observable(skill.employee_profile_key),
                    category: ko.observable(skill.category),
                    value: ko.observable(skill.value),
                    scale: ko.observable(skill.scale)
                  });
                  skills_string = skills_string != undefined || skills_string.length > 0 ? skills_string + ";" + skill.value : skill.value;
                } else if (skill.category === 'Learning') {
                  self.skills_learning.push({
                    employee_profile_key: ko.observable(skill.employee_profile_key),
                    category: ko.observable(skill.category),
                    value: ko.observable(skill.value)
                  });
                  learnings_string = learnings_string != undefined || learnings_string.length > 0 ? learnings_string + ";" + skill.value : skill.value;

                } else if (skill.category === 'Interests') {

                  self.skills_interests.push({
                    employee_profile_key: ko.observable(skill.employee_profile_key),
                    category: ko.observable(skill.category),
                    value: ko.observable(skill.value)
                  });
                  interests_string = interests_string != undefined || interests_string.length > 0 ? interests_string + ";" + skill.value : skill.value;

                } else if (skill.category === 'Links') {
                  self.links.push({
                    employee_profile_key: ko.observable(skill.employee_profile_key),
                    category: ko.observable(skill.category),
                    value: ko.observable(skill.value),
                    url: ko.observable(skill.url)
                  });
                  link_string = link_string != undefined || link_string.length > 0 ? link_string + ";" + skill.value + "(" + skill.url + ")" : skill.value + "(" + skill.url + ")";

                } else if (skill.category === 'Achievements') {
                  self.achivements.push({
                    employee_profile_key: ko.observable(skill.employee_profile_key),
                    category: ko.observable(skill.category),
                    value: ko.observable(skill.value),
                    url: ko.observable(skill.url)
                  });
                  achivement_string = achivement_string != undefined || achivement_string.length > 0 ? achivement_string + ";" + skill.value : skill.value;
                }
              }

              for (var i = 0; i < profiles.items[0].customers.length; i++) {
                var customer = profiles.items[0].customers[i];
                //self.customers.push(customer);
                self.customers.push({
                  employee_customer_profile_key: ko.observable(customer.employee_customer_profile_key),
                  industry: ko.observable(customer.industry),
                  customer_name: ko.observable(customer.customer_name),
                  customer_division: ko.observable(customer.customer_division),
                  type_of_work: ko.observable(customer.type_of_work),
                  artifacts_url: ko.observable(customer.artifacts_url),
                  summary: ko.observable(customer.summary),
                  description: ko.observable(customer.description),
                  outcome: ko.observable(customer.outcome)
                });
              }
              // console.log("--- >>> " + ko.toJSON(self.customers()));


              var imageurl = self.defaultimage;
              if (!profiles.items[0].profile_photo_url.endsWith("GetPhoto/")) {
                imageurl = profiles.items[0].profile_photo_url;
              }

              self.profile().profileicon(imageurl);
              self.profile().employee_key(profiles.items[0].employee_key);
              self.profile().title(profiles.items[0].title);
              self.profile().name(profiles.items[0].display_name);
              self.profile().work_email(profiles.items[0].u);
              self.profile().work_phone(profiles.items[0].work_phone != undefined ? profiles.items[0].work_phone : profiles.items[0].mobile_phone);
              self.profile().mobile_phone(profiles.items[0].mobile_phone);
              self.mobile_phone(profiles.items[0].mobile_phone);
              self.profile().city(profiles.items[0].city);
              self.profile().state(profiles.items[0].state);
              self.profile().country(profiles.items[0].country);
              self.profile().uuid(profiles.items[0].uuid);
              self.profile().ou(profiles.items[0].ou);
              self.profile().Mentoring_Interest(profiles.items[0].Mentoring_Interest);
              self.profile().type(profiles.items[0].type);
              self.profile().cost_center(profiles.items[0].cost_center);
              self.profile().pillar(profiles.items[0].pillar);
              self.center().push(profiles.items[0].center);
              self.pillar().push(profiles.items[0].pillar);
              self.profile().center(profiles.items[0].center);
              self.profile().mgr_email(profiles.items[0].mgr_email);
              self.profile().mgr_display_name(profiles.items[0].mgr_display_name);
              self.profile().profile_summary(profiles.items[0].profile_summary);
              self.profile().flatSkills(skills_string);
              self.profile().flatlearnings(learnings_string);
              self.profile().flatinterests(interests_string);
              self.profile().flatachivements(achivement_string);
              self.profile().flatlinks(link_string);
              profilelink = profilelink.split('#')[0] + '#' + self.uuid;
              console.log("profile created");
              debuglog(ko.toJSON(self.profile()));

              // get recommended mentors
              getRecommendedMentors();

              // get associated mentors
              getAssociatedMentors();

              // get associated mentees
              getAssociatedMentees();

              // check for edit permission on the profile
              self.iseditpermitted();

              // Form a tag cloud
              self.settagcloud();

              // Hide progress dialog
              hidedialog();


            });
        } else {
          self.router = oj.Router.rootInstance;
          self.router.go('profileslist');
        }
      }

      // SETTING UP TAG CLOUDS FOR SKILLS
      self.settagcloud = function () {
        self.tags([]);
        for (var i = 0; i < self.skills_skills().length; i++) {
          var network = self.skills_skills()[i];
          var value = network.scale();
          var className = '';
          var color = '';
          if (network.scale() == '5') {
            className = 'rating5';
            color = '#942645';
          }
          if (network.scale() == '4') {
            className = 'rating4';
            color = '#F29111';
          }
          if (network.scale() == '3') {
            className = 'rating3';
            color = '#2A4455';
          }
          if (network.scale() == '2') {
            className = 'rating2';
            color = '#3A913F';
          }
          if (network.scale() == '1') {
            className = 'rating1';
            color = '#942645';
          }

          self.tags.push({
            id: network.value(),
            label: network.value(),
            value: value,
            className: className,
            color: color
          });

        }
      }


      self.getpersonalphotos = function () {
        showdialog();
        $.getJSON(baseurl + 'GetPersonalPhotoLinks/' + self.uuid).
          then(function (photos) {
            self.personalphotoslist([]);
            $.each(photos.items[0].personal_photos, function () {
              self.personalphotoslist.push({
                personal_photo_id: this.personal_photo_id,
                photo_value: this.value,
                photo_url: this.personal_photo_url
              });
              hidedialog();
            })
          });
      }

      self.handleAttached = function (info) {

        self.iseditpermitted();
        if (window.location.hash) {
          self.uuid = window.location.hash.replace('#', '');
          localStorage.setItem('uuid', self.uuid);
        }

        loadpage();
        dorefresh = false;
      };

      self.iseditpermitted = function () {
        if (self.profile().work_email() === ssoemail || usertype === 'ADMIN') {
          setssostatus('.ssoenabled', 'none');
        } else {
          setssostatus('.ssoenabled', 'inline-block');
        }
      }

      setInterval(function () {
        self.iseditpermitted();
      }, 1000);

      loadpage = function () {
        showdialog();
        self.uuid = localStorage.getItem('uuid');
        if (self.uuid != undefined) {
          self.getFilters();
          self.getProfile(self.uuid);
          self.getpersonalphotos();
          var newmentor = localStorage.getItem('newmentor');

          if (newmentor != undefined && newmentor == 'true') {
            showMentorRegAlert();
            localStorage.setItem('newmentor', 'false');
          }
        }


        hidedialog();
      }
      self.updateProject = function () {
        //alert(self.projectInterest());
        $("#dialog1").ojDialog("close");
        self.projectInterest("");
      }

      self.openeditprojectdialog = function () {
        $("#dialog1").ojDialog("open");
      }



      // ALL EDIT EVENTS ARE HANDLED DOWN
      self.resetValues = function () {
        self.customers([]);
        // self.personalphotoslist([]);
        self.achivements([]);
        self.links([]);
        self.skills_interests([]);
        self.skills_learning([]);
        self.skills_skills([]);
      }


      //------- SAVE PROFILE LOCATION INFORMATION ------------
      saveprofilepillarinfo = function () {
        closeeditprofiledialog();
        if (self.pillar()[0].length > 0 && self.center()[0].length > 0) {
          showdialog();
          var location = {
            employee_key: self.profile().employee_key(),
            pillar: self.pillar()[0],
            center: self.center()[0],
            mobile_phone: self.profile().mobile_phone(),
            profile_summary: self.profile().profile_summary()

          };
          debuglog(ko.toJSON(location));
          $.ajax({
            url: baseurl + 'ExtendedProfile',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(location),
            success: function (data) {
              //alert("Information saved successfully!");
              loadpage();
              hidedialog();
            }
          }).fail(function (xhr, textStatus, err) {
            alert(err);
            loadpage();
          });
        } else {
          alert('Please select Pillar and Hub.');
        }

      }


      //----- SAVE PROFILE SUMMARY -------
      saveSummary = function () {
        if (self.profile().profile_summary().length > 0) {
          showdialog();
          var summary = {
            employee_key: self.profile().employee_key(),
            pillar: self.profile().pillar(),
            center: self.profile().center(),
            mobile_phone: self.profile().mobile_phone(),
            profile_summary: self.profile().profile_summary()
          };
          debuglog(ko.toJSON(summary));
          $.ajax({
            url: baseurl + 'ExtendedProfile',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(summary),
            success: function (data) {
              //alert("Information saved successfully!");
              self.getProfile(self.uuid);

              hidedialog();
            }
          }).fail(function (xhr, textStatus, err) {
            alert(err);
            self.getProfile(self.uuid);

          });
        } else {
          alert("Please write a summary about your profile before we proceed.");
        }

      }


      resetprofilesummary = function () {
        self.getProfile(self.uuid);
      }

      //-----  SAVE SKILL LIST FOR USER -----
      saveSkills = function () {

        var updatedSkillList = ko.observableArray([]);
        var requestdata = ko.observable();

        for (var i = 0; i < self.skills_skills().length; i++) {
          var skill = self.skills_skills()[i];
          if (self.newSkill().length > 0) {
            if (skill.value() == self.newSkill()[0]) {
              alert(self.newSkill()[0] + " already exist in your Learning Interest.");
              return;
            }
          } else {
            return;
          }
          updatedSkillList.push(skill);

        }

        if (self.newSkill()[0].toLowerCase() == 'select') {
          return;
        }

        if (self.newSkill()[0].length > 0) {
          var selectedskill = self.newSkill()[0];
          selectedskill = selectedskill.replace('/', '$');
          updatedSkillList.push({
            employee_profile_key: '',
            value: selectedskill,
            scale: self.ratting(),
            category: 'Skills',
          });
        }


        requestdata = ({
          employee_key: self.profile().employee_key(),
          category: 'Skills',
          profileUpdates: updatedSkillList
        });

        console.log(ko.toJSON(requestdata));

        //     // SEND TO SERVER
        $.ajax({
          url: baseurl + 'UpdateProfile',
          cache: false,
          type: 'POST',
          contentType: 'application/json; charset=utf-8',
          data: ko.toJSON(requestdata),
          success: function (data) {
            self.getProfile(self.uuid);
            //alert("Information saved successfully!");
            self.newSkill([]);
            self.newSkill().push('Select');
            self.ratting(1);
            hidedialog();
          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
          self.getProfile(self.uuid);

        });
      }

      deleteskill = function (event, ui) {
        var skillid = event.employee_profile_key();

        var updatedSkillList = ko.observableArray([]);
        var requestdata = ko.observable();

        for (var i = 0; i < self.skills_skills().length; i++) {
          var item = self.skills_skills()[i];
          if (item.employee_profile_key() != skillid) {
            updatedSkillList.push(self.skills_skills()[i]);
          }
        }

        requestdata = ({
          employee_key: self.profile().employee_key(),
          category: 'Skills',
          profileUpdates: updatedSkillList
        });

        debuglog(ko.toJSON(requestdata));

        //     // SEND TO SERVER
        $.ajax({
          url: baseurl + 'UpdateProfile',
          cache: false,
          type: 'POST',
          contentType: 'application/json; charset=utf-8',
          data: ko.toJSON(requestdata),
          success: function (data) {
            self.getProfile(self.uuid);
            self.newSkill([]);
            self.ratting(1);
            hidedialog();
          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
          self.getProfile(self.uuid);

        });
      }

      //----- SAVE LEARNING INTEREST LIST FOR USER ------

      saveLearning = function () {

        var updatedSkillList = ko.observableArray([]);
        var requestdata = ko.observable();
        if (self.skills_learning().length < 3) {
          for (var i = 0; i < self.skills_learning().length; i++) {
            var skill = self.skills_learning()[i];
            if (self.newSkill().length > 0) {
              if (skill.value() == self.newSkill()[0]) {
                alert(self.newSkill()[0] + " already exist in your Learning Interest.");
                return;
              }
            } else {
              return;
            }
            updatedSkillList.push(self.skills_learning()[i]);
          }

          if (self.newSkill()[0].toLowerCase() == 'select') {
            return;
          }


          if (self.newSkill()[0].length > 0) {
            var selectedskill = self.newSkill()[0];

            while (selectedskill.indexOf('/') != -1) {
              selectedskill = selectedskill.replace('/', '$');
            }
            updatedSkillList.push({
              employee_profile_key: '',
              value: selectedskill,
              category: 'Learning',
            });
          }

          requestdata = ({
            employee_key: self.profile().employee_key(),
            category: 'Learning',
            profileUpdates: updatedSkillList
          });

          debuglog(ko.toJSON(requestdata));

          //     // SEND TO SERVER
          $.ajax({
            url: baseurl + 'UpdateProfile',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(requestdata),
            success: function (data) {
              self.getProfile(self.uuid);
              getRecommendedMentors();
              self.newSkill([]);
              self.newSkill().push('Select');
              self.ratting(1);
              hidedialog();
            }
          }).fail(function (xhr, textStatus, err) {
            alert(err);
            self.getProfile(self.uuid);

          });
        } else {
          alert("At max you can add upto three learning exterests");
        }
      }

      deletelearning = function (event, ui) {
        var skillid = event.employee_profile_key();

        var updatedSkillList = ko.observableArray([]);
        var requestdata = ko.observable();

        for (var i = 0; i < self.skills_learning().length; i++) {
          var item = self.skills_learning()[i];
          if (item.employee_profile_key() != skillid) {
            updatedSkillList.push(self.skills_learning()[i]);
          }
        }

        requestdata = ({
          employee_key: self.profile().employee_key(),
          category: 'Learning',
          profileUpdates: updatedSkillList
        });

        debuglog(ko.toJSON(requestdata));

        //     // SEND TO SERVER
        $.ajax({
          url: baseurl + 'UpdateProfile',
          cache: false,
          type: 'POST',
          contentType: 'application/json; charset=utf-8',
          data: ko.toJSON(requestdata),
          success: function (data) {
            self.getProfile(self.uuid);
            getRecommendedMentors();
            self.newSkill("");
            self.ratting(1);
            hidedialog();
          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
          self.getProfile(self.uuid);

        });
      }




      //----- SAVE OUTSIDE INTEREST LIST FOR USER ------//
      saveInterest = function () {

        var updatedSkillList = ko.observableArray([]);
        var requestdata = ko.observable();

        for (var i = 0; i < self.skills_interests().length; i++) {
          updatedSkillList.push(self.skills_interests()[i]);
        }


        updatedSkillList.push({
          employee_profile_key: '',
          category: 'Interests',
          value: self.newSkill()
        });

        requestdata = ({
          employee_key: self.profile().employee_key(),
          category: 'Interests',
          profileUpdates: updatedSkillList
        });

        debuglog(ko.toJSON(requestdata));

        // SEND TO SERVER
        $.ajax({
          url: baseurl + 'UpdateProfile',
          cache: false,
          type: 'POST',
          contentType: 'application/json; charset=utf-8',
          data: ko.toJSON(requestdata),
          success: function (data) {
            self.getProfile(self.uuid);
            //alert("Information saved successfully!");
            self.newSkill("");
            hidedialog();
          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
          self.getProfile(self.uuid);

        });
      }

      deleteInterest = function (event, ui) {
        var skillid = event.employee_profile_key();

        var updatedSkillList = ko.observableArray([]);
        var requestdata = ko.observable();

        for (var i = 0; i < self.skills_interests().length; i++) {
          var item = self.skills_interests()[i];
          if (item.employee_profile_key() != skillid) {
            updatedSkillList.push(self.skills_interests()[i]);
          }
        }

        requestdata = ({
          employee_key: self.profile().employee_key(),
          category: 'Interests',
          profileUpdates: updatedSkillList
        });

        debuglog(ko.toJSON(requestdata));

        // SEND TO SERVER
        $.ajax({
          url: baseurl + 'UpdateProfile',
          cache: false,
          type: 'POST',
          contentType: 'application/json; charset=utf-8',
          data: ko.toJSON(requestdata),
          success: function (data) {
            self.getProfile(self.uuid);
            //alert("Information saved successfully!");
            self.newSkill("");
            hidedialog();
          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
          self.getProfile(self.uuid);

        });
      }

      removeimage = function (event) {
        if (confirm('Please Confirm Deletion!')) {
          showdialog();
          var photoid = event.personal_photo_id;
          var url = baseurl + 'GetPhoto/' + photoid;
          //console.log(url);
          $.ajax({
            url: url,
            cache: false,
            type: 'DELETE',
            success: function (data) {
              self.getpersonalphotos();
              // alert("Deleted successfully!");
              hidedialog();
            }
          }).fail(function (xhr, textStatus, err) {
            alert(err);
            self.getProfile(self.uuid);

          });
        }
      }

      updateicon = function (event) {
        closeIconuploder();
        showdialog();
        var reader = new FileReader();
        var mimetype = event.target.files[0].type;
        reader.onload = function () {
          var uploadheader = {
            "in_employeekey": self.profile().employee_key(),
            "in_phototype": "Profile Picture",
            "in_value": "NA",
            "in_mimetype": mimetype
          }
          var imagedata = reader.result.split('base64,')[1];

          // SEND TO SERVER
          $.ajax({
            url: baseurl + 'UpdatePhoto',
            headers: uploadheader,
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: imagedata,
            success: function (data) {
              self.getProfile(self.uuid);
              //alert("Information saved successfully!");
              hidedialog();

            }
          }).fail(function (xhr, textStatus, err) {
            alert(err);
            self.getProfile(self.uuid);

          });
        };
        reader.readAsDataURL(event.target.files[0]);
        // console.log(event.target.files[0]);
      };

      openIconuploder = function () {
        $("#uploadicondialog").ojDialog("open");

      }
      closeIconuploder = function () {
        $("#uploadicondialog").ojDialog("close");
      }


      removementor = function (mentor, elem) {
        if (confirm('Delete Mentor?')) {
          $("#deletementor").ojDialog("open");
          //My mentoring activities completed - Gained skill
          self.removementorreason('My mentoring activities completed - Gained skill');
          self.handleOpen = $("#submitfeedbackbutton").click(function () {
            $("#deletementor").ojDialog("close");
            //showdialog();
            if (self.removementorreason().length > 0) {
              var mentordata = {
                ml_key: mentor.ml_key,
                reason: self.removementorreason()[0],
                status: 'removed'
              }
              console.log(ko.toJSON(mentordata));
              var url = baseurl + 'MentorUpdate';
              $.ajax({
                url: url,
                cache: false,
                type: 'DELETE',
                data: ko.toJSON(mentordata),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                  getAssociatedMentors();
                  getRecommendedMentors();
                  hidedialog();
                }
              }).fail(function (xhr, textStatus, err) {
                getAssociatedMentors();
                getRecommendedMentors();
                alert(err);
              });
            }
          });
        }
      }
	  
	    menteepopup = function () {        
        $("#menteereq").ojDialog("open");
      }

      openpersonalimageuploder = function () {
        // alert('click');
        // document.getElementById('uploadpersonalphotodialog').style.display = 'block';
        $("#uploadpersonalphotodialog").ojDialog("open");
      }
	   
      closepersonalimageuploder = function () {
        // alert('click');
        // document.getElementById('uploadpersonalphotodialog').style.display = 'none';
        $("#uploadpersonalphotodialog").ojDialog("close");
      }



      uploadpersonalphoto = function (event) {
        closepersonalimageuploder();
        showdialog();
        var reader = new FileReader();
        var mimetype = event.target.files[0].type;
        reader.onload = function () {
          var uploadheader = {
            "in_employeekey": self.profile().employee_key(),
            "in_phototype": "Personal Picture",
            "in_value": "NA",
            "in_mimetype": mimetype
          }
          debuglog(uploadheader);

          var imagedata = reader.result.split('base64,')[1];

          // SEND TO SERVER
          $.ajax({
            url: baseurl + 'UpdatePhoto',
            headers: uploadheader,
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: imagedata,
            success: function (data) {
              self.getpersonalphotos();
              //alert("Information saved successfully!");
              hidedialog();

            }
          }).fail(function (xhr, textStatus, err) {
            alert(err);
            loadpage();
          });
        };
        reader.readAsDataURL(event.target.files[0]);
      };

      // OPEN EDIT WINDOW FOR PROJECT TO EDIT
      editproject = function (event, ui) {
        self.project_employee_customer_profile_key(event.employee_customer_profile_key());
        self.project_industry(event.industry());
        self.project_customer_name(event.customer_name());
        self.project_customer_division(event.customer_division());
        self.project_type_of_work(event.type_of_work());
        self.project_artifacts_url(event.artifacts_url());
        self.project_summary(event.summary());
        self.project_description(event.description());
        self.project_outcome(event.outcome());
        $("#editprojectwindow").ojDialog("open");
      }

      // OPEN WINDOW TO CREATE PROJECT
      newproject = function () {
        self.project_employee_customer_profile_key('');
        self.project_industry('');
        self.project_customer_name('');
        self.project_customer_division('');
        self.project_type_of_work('');
        self.project_artifacts_url('');
        self.project_summary('');
        self.project_description('');
        self.project_outcome('');
        $("#editprojectwindow").ojDialog("open");
      }

      saveproject = function (event, ui) {
        showdialog();
        var project = {
          employee_customer_profile_key: self.project_employee_customer_profile_key(),
          industry: self.project_industry(),
          customer_name: self.project_customer_name(),
          customer_division: self.project_customer_division(),
          type_of_work: self.project_type_of_work(),
          artifacts_url: self.project_artifacts_url(),
          summary: self.project_summary(),
          description: self.project_description(),
          outcome: self.project_outcome(),
          employee_key: self.profile().employee_key()
        }

        var method = project.employee_customer_profile_key === "" ? 'POST' : 'PUT';
        debuglog(ko.toJSON(project));
        $.ajax({
          url: baseurl + 'UpdateCustomerProfile',
          cache: false,
          type: method,
          contentType: 'application/json; charset=utf-8',
          data: ko.toJSON(project),
          success: function (data) {
            self.getProfile(self.uuid);
            //alert("Information saved successfully!");
            hidedialog();
          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
          self.getProfile(self.uuid);

        });
        $("#editprojectwindow").ojDialog("close");
      }

      deleteproject = function (value) {
        showdialog();
        var projectid = value.employee_customer_profile_key();
        var url = baseurl + 'CustomerProfile/' + projectid;
        //console.log(url);
        $.ajax({
          url: url,
          cache: false,
          type: 'DELETE',
          success: function (data) {
            self.getProfile(self.uuid);
            alert("Deleted successfully!");
            hidedialog();
          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
          self.getProfile(self.uuid);

        });
      }


      // LINKS
      saveLinks = function () {

        var updatedSkillList = ko.observableArray([]);
        var requestdata = ko.observable();

        for (var i = 0; i < self.links().length; i++) {
          updatedSkillList.push(self.links()[i]);
        }
        updatedSkillList.push({
          employee_profile_key: '',
          category: 'Links',
          value: self.newSkill(),
          url: self.linkurl()
        });

        requestdata = ({
          employee_key: self.profile().employee_key(),
          category: 'Links',
          profileUpdates: updatedSkillList
        });

        debuglog(ko.toJSON(requestdata));

        // SEND TO SERVER
        $.ajax({
          url: baseurl + 'UpdateProfile',
          cache: false,
          type: 'POST',
          contentType: 'application/json; charset=utf-8',
          data: ko.toJSON(requestdata),
          success: function (data) {
            self.getProfile(self.uuid);
            //alert("Information saved successfully!");
            self.newSkill("");
            self.linkurl('');
            hidedialog();
          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
          self.getProfile(self.uuid);

        });
      }

      deleteLinks = function (event, ui) {
        var skillid = event.employee_profile_key();
        var updatedSkillList = ko.observableArray([]);
        var requestdata = ko.observable();

        for (var i = 0; i < self.links().length; i++) {
          var item = self.links()[i];
          if (item.employee_profile_key() != skillid) {
            updatedSkillList.push(self.links()[i]);
          }
        }

        requestdata = ({
          employee_key: self.profile().employee_key(),
          category: 'Links',
          profileUpdates: updatedSkillList
        });

        debuglog(ko.toJSON(requestdata));

        // SEND TO SERVER
        $.ajax({
          url: baseurl + 'UpdateProfile',
          cache: false,
          type: 'POST',
          contentType: 'application/json; charset=utf-8',
          data: ko.toJSON(requestdata),
          success: function (data) {
            self.getProfile(self.uuid);
            //alert("Information saved successfully!");
            self.newSkill("");
            hidedialog();
          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
          self.getProfile(self.uuid);

        });
      }



      // OUTSIDE ACHIEVEMENTS
      saveAchievements = function () {

        var updatedSkillList = ko.observableArray([]);
        var requestdata = ko.observable();

        for (var i = 0; i < self.achivements().length; i++) {
          updatedSkillList.push(self.achivements()[i]);
        }
        updatedSkillList.push({
          employee_profile_key: '',
          category: 'Achievements',
          value: self.newSkill(),
          url: self.achievementurl()
        });

        requestdata = ({
          employee_key: self.profile().employee_key(),
          category: 'Achievements',
          profileUpdates: updatedSkillList
        });

        debuglog(ko.toJSON(requestdata));

        // SEND TO SERVER
        $.ajax({
          url: baseurl + 'UpdateProfile',
          cache: false,
          type: 'POST',
          contentType: 'application/json; charset=utf-8',
          data: ko.toJSON(requestdata),
          success: function (data) {
            self.getProfile(self.uuid);
            //alert("Information saved successfully!");
            self.newSkill("");
            self.achievementurl('');
            hidedialog();
          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
          self.getProfile(self.uuid);

        });
      }

      deleteAchievements = function (event, ui) {
        var skillid = event.employee_profile_key();
        var updatedSkillList = ko.observableArray([]);
        var requestdata = ko.observable();

        for (var i = 0; i < self.achivements().length; i++) {
          var item = self.achivements()[i];
          if (item.employee_profile_key() != skillid) {
            updatedSkillList.push(self.achivements()[i]);
          }
        }

        requestdata = ({
          employee_key: self.profile().employee_key(),
          category: 'Achievements',
          profileUpdates: updatedSkillList
        });

        debuglog(ko.toJSON(requestdata));

        // SEND TO SERVER
        $.ajax({
          url: baseurl + 'UpdateProfile',
          cache: false,
          type: 'POST',
          contentType: 'application/json; charset=utf-8',
          data: ko.toJSON(requestdata),
          success: function (data) {
            self.getProfile(self.uuid);
            //alert("Information saved successfully!");
            self.newSkill("");
            hidedialog();
          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
          self.getProfile(self.uuid);

        });
      }

      setssostatus = function (selector, visibility) {
        var nodes = document.querySelectorAll(selector),
          node,
          styleProperty = function (a, b) {
            return window.getComputedStyle ? window.getComputedStyle(a).getPropertyValue(b) : a.currentStyle[b];
          };

        [].forEach.call(nodes, function (a, b) {
          node = a;

          node.style.display = visibility;
        });
      }



      enlargephoto = function (event, ui) {
        // alert('photo');
        var url = event.currentTarget.src;
        self.enlargephotourl(url);
        document.getElementById('enlargephoto').style.display = 'block';
      }

      shareprofile = function () {
        window.location.href = "mailto:?subject=Sharing%20" + self.profile().name() + "%20Profile&body=Check profile " + profilelink;
      }

      editcancel = function () {
        self.getProfile(self.uuid);
      }

      clearhubfld = function () {
        self.center('');
      }
      clearpillarfld = function () {
        self.pillar('');
      }

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
          console.log('-------------------------');
          console.log(msg);
          console.log('-------------------------');
        }
      };

      //------------  END OF 1ST PHASE IMPLEMENTATION -------------//


      //--------------- Mentor and mentee -------------------//

      //~~~~~~~~~~~  Get Skill List ~~~~~~~~~~~~//
      self.getSkills = function () {
        self.categoryskillmap = new Map();
        self.groupData = ko.observableArray([]);
        self.selectedOption = ko.observable();
        $.getJSON(baseurl + "GetEmployeeSkill").
          then(function (skills) {
            for (var i = 0; i < skills.items.length; i++) {
              var skill = skills.items[i];
              var entry = self.categoryskillmap.get(skill.category);
              if (entry != undefined) {
                entry.push(skill.skill);
              } else {
                var subskill = ko.observableArray([]);
                subskill.push(skill.skill);
                self.categoryskillmap.set(skill.category, subskill);
              }
            }

            self.categoryskillmap.forEach(function (skills, category) {
              var categoryObj = ko.observable();
              var categoryskillarray = ko.observableArray([]);
              categoryObj = {
                label: category,
                children: categoryskillarray
              };

              for (var i = 0; i < skills().length; i++) {
                var skillobj = {
                  value: skills()[i]
                };
                categoryskillarray.push(skillobj);
              }
              self.skillarray.push(categoryObj);
            });
          });
      }
      //~~~~~~~~~~~~~~~~   END OF THE METHOD  ~~~~~~~~~~~~~~~~//

      //~~~~~~~~~~   GET RECOMMENDED MENTOR LIST   ~~~~~~~~~~~//
      getRecommendedMentors = function () {
        showdialog();
        var learningskills = self.profile().learnings();
        var commasepskills = '';
        try {
          for (var i = 0; i < learningskills.length; i++) {
            if (learningskills[i].value().length > 0) {
              commasepskills += commasepskills.length > 0 ? ',' + learningskills[i].value() : learningskills[i].value();
            }
          }

          while (commasepskills.indexOf('/') != -1) {
            commasepskills = commasepskills.replace('/', '$');
          }


          var url = baseurl + "GetMentorListsSkill/" + commasepskills + "/" + self.profile().employee_key();
          console.log(url)
          if (commasepskills.length > 0) {
            $.getJSON(url).
              then(function (mentors) {
                self.recommendedMentors([]);
                $.each(mentors.items, function (data) {
                  if (this.employee_key != self.profile().employee_key()) {
                    var imageurl = self.defaultimage;
                    if (!this.profile_photo_url.endsWith("GetPhoto/")) {
                      imageurl = this.profile_photo_url;
                    }
                    var mentor = {
                      employee_key: this.employee_key,
                      profile_photo_url: imageurl,
                      name: this.display_name,
                      skill: this.skill,
                      uuid: this.uuid
                    }
                    self.recommendedMentors.push(mentor);
                  }

                });

                hidedialog();
                debuglog(self.recommendedMentors().length + " recommended mentors fetched");
              });
          } else {
            self.recommendedMentors([]);
          }
        } catch (err) {
          hidedialog();
        }
      }
      //~~~~~~~~~~~~~~~~   END OF THE METHOD   ~~~~~~~~~~~~~~~//

      //~~~~~~~~~~~~~~~  SELECT MENTOR METHOD  ~~~~~~~~~~~~~~~// 
      selectMentor = function (data, elem) {
        if (self.associatedmentors().length < 2) {
          showdialog();
          var mentor = {
            employee_key: self.profile().employee_key(),
            mentor: data.employee_key,
            primary: 'Y',
            skill: ''
          }
          debuglog(ko.toJSON(mentor));
          // SEND TO SERVER
          $.ajax({
            url: baseurl + 'MentorUpdate',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(mentor),
            success: function (data) {
              getAssociatedMentors();
              getRecommendedMentors();
              hidedialog();
            }
          }).fail(function (xhr, textStatus, err) {
            getAssociatedMentors();
            getRecommendedMentors();
            hidedialog();
            alert(err);
          });
        } else {
          alert("You can select upto 2 mentors");
        }
      }
      //~~~~~~~~~~~~~~~~   END OF THE METHOD   ~~~~~~~~~~~~~~~//

      //~~~~~~~~~~~~~~~ GET ASSOCIATED MENTORS ~~~~~~~~~~~~~~~// 
      getAssociatedMentors = function () {
        showdialog();
        var url = baseurl + "GetMentorList/" + self.profile().employee_key();
        console.log(url);
        $.getJSON(url).
          then(function (mentors) {
            self.associatedmentors([]);
            self.removementorreason([]);
            var count = 0;
            $.each(mentors.items, function (data) {
              if (count < 2) {
                var imageurl = self.defaultimage;
                if (!this.profile_photo_url.endsWith("GetPhoto/")) {
                  imageurl = this.profile_photo_url;
                }
                var mentor = {
                  ml_key: this.ml_key,
                  mentor: this.mentor,
                  profile_photo_url: imageurl,
                  name: this.display_name,
                  uuid: this.uuid
                }
                self.associatedmentors.push(mentor);
                count++;
              }
            });
            hidedialog();
            debuglog(self.associatedmentors().length + " mentors fetched");
          });
      }
      //~~~~~~~~~~~~~~~~   END OF THE METHOD   ~~~~~~~~~~~~~~~//

      //~~~~~~~~~~~~~~~ GET ASSOCIATED MENTEES ~~~~~~~~~~~~~~~// 
      getAssociatedMentees = function () {
        showdialog();
        var url = baseurl + "GetMenteeList/" + self.profile().employee_key();
        console.log(url);
        $.getJSON(url).
          then(function (mentors) {
            self.associatedmentees([]);
            $.each(mentors.items, function (data) {
              var imageurl = self.defaultimage;
              if (!this.profile_photo_url.endsWith("GetPhoto/")) {
                imageurl = this.profile_photo_url;
              }
              var mentor = {
                mentor: this.mentor,
                profile_photo_url: imageurl,
                name: this.display_name,
                uuid: this.uuid
              }
              self.associatedmentees.push(mentor);
            });
            hidedialog();
            debuglog(self.associatedmentees().length + " mentees fetched");
          });
      }
      //~~~~~~~~~~~~~~~~   END OF THE METHOD   ~~~~~~~~~~~~~~~//

      //~~~~~~~~~~~~~~~~~~~~ GO TO PROFILE   ~~~~~~~~~~~~~~~~~//
      gotoprofile = function (data, elem) {

        var link = window.location.href.split('#')[0] + "#" + data.uuid;
        pushscreen(link);

      }
      //~~~~~~~~~~~~~~~~   END OF THE METHOD   ~~~~~~~~~~~~~~~//

      popscreen = function () {
        self.profileHistory().pop();
        loadscreen();
      }

      pushscreen = function (link) {
        self.profileHistory().push(link);
        loadscreen();
      }

      loadscreen = function () {
        var length = self.profileHistory().length;
        var link = self.profileHistory()[length - 1];
        console.log('loading screen ::: ' + link);
        window.open(link, "_self");
        window.location.reload();
      }

      // --------------- EDIT DIALOG FOR SKILLS -----------------//
      openskilldialog = function () {
        $("#skilldialog").ojDialog("open");
        self.newSkill([]);
        self.newSkill().push('Select');
      }
      closeskilldialog = function () {
        $("#skilldialog").ojDialog("close");
      }
      //------------------------------  END  ------------------------------// 
      // --------------- EDIT DIALOG FOR LEARNING SKILLS -----------------//
      openlearningskilldialog = function () {
        $("#learningskilldialog").ojDialog("open");
        self.newSkill([]);
        self.newSkill().push('Select');
      }
      closelearningskilldialog = function () {
        $("#learningskilldialog").ojDialog("close");
      }
      //------------------------------  END  ------------------------------//
      // --------------- EDIT DIALOG FOR PROFILE LOCATION -----------------//
      openeditprofiledialog = function () {
        $("#editprofiledialog").ojDialog("open");

      }
      closeeditprofiledialog = function () {
        $("#editprofiledialog").ojDialog("close");
      }

      //------------------------------  END  ------------------------------//

      //------------------   MENTOR REGISTRATION ALERT  -------------------//
      showMentorRegAlert = function () {
        document.getElementById('mentorregembedalert').style.display = 'block';
      }
      //------------------------------  END  ------------------------------//

      // GET THE SKILLS
      self.getSkills();

    }

    return new DashboardViewModel();
  }
);
