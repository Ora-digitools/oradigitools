/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 * 
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojslider', 'ojs/ojknockout', 'ojs/ojtabs', 'ojs/ojconveyorbelt', 'ojs/ojfilmstrip', 'ojs/ojradioset', 'ojs/ojbutton', 'ojs/ojdialog', 'ojs/ojmoduleanimations', 'ojs/ojanimation', 'ojs/ojselectcombobox'],
  function (oj, ko, $) {

    function DashboardViewModel() {

      var self = this;

      /* fadein animations effect for tab content */
      self.effect = ko.observable('fadeIn');
      self.ratting = ko.observable(1);
      self.newSkill = ko.observable('');
      self.linkurl = ko.observable('');
      self.center = ko.observable('');
      self.pillar = ko.observable('');
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


      self.profile({
        profileicon: ko.observable('https://raw.githubusercontent.com/Ora-digitools/oradigitools/master/UI_Assets/Profile-list-page/default-user-icon.png'), //'https://raw.githubusercontent.com/Ora-digitools/oradigitools/master/UI_Assets/Profile-list-page/default-user-icon.png',
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
        ou: ko.observable(),
        cost_center: ko.observable(),
        pillar: ko.observable(),
        center: ko.observable(),
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
        openmodal: function () {
          $("#editimage1").ojDialog("open");
        }

      });


      self.getFilters = function () {
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
                  desc_text: ko.observable(skill.desc_text)
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


            var imageurl = 'https://raw.githubusercontent.com/Ora-digitools/oradigitools/master/UI_Assets/Profile-list-page/default-user-icon.png';
            if (!profiles.items[0].profile_photo_url.endsWith("GetPhoto/")) {
              imageurl = profiles.items[0].profile_photo_url;
            }

            self.profile().profileicon(imageurl);
            self.profile().employee_key(profiles.items[0].employee_key);
            self.profile().title(profiles.items[0].title);
            self.profile().name(profiles.items[0].display_name);
            self.profile().work_email(profiles.items[0].work_email);
            self.profile().work_phone(profiles.items[0].work_phone != undefined ? profiles.items[0].work_phone : profiles.items[0].mobile_phone);
            self.profile().mobile_phone(profiles.items[0].mobile_phone != undefined ? profiles.items[0].mobile_phone : profiles.items[0].work_phone);
            self.profile().city(profiles.items[0].city);
            self.profile().state(profiles.items[0].state);
            self.profile().country(profiles.items[0].country);
            self.profile().uuid(profiles.items[0].uuid);
            self.profile().ou(profiles.items[0].ou);
            self.profile().cost_center(profiles.items[0].cost_center);
            self.profile().pillar(profiles.items[0].pillar);
            self.center(profiles.items[0].center);
            self.pillar(profiles.items[0].pillar);
            self.profile().center(profiles.items[0].center);
            self.profile().mgr_email(profiles.items[0].mgr_email);
            self.profile().mgr_display_name(profiles.items[0].mgr_display_name);
            self.profile().profile_summary(profiles.items[0].profile_summary);
            self.profile().flatSkills(skills_string);
            self.profile().flatlearnings(learnings_string);
            self.profile().flatinterests(interests_string);
            self.profile().flatachivements(achivement_string);
            self.profile().flatlinks(link_string);
            console.log("profile created");
            debuglog(ko.toJSON(self.profile()));
            hidedialog();

          });
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
        loadpage();
      };

      loadpage = function () {
        showdialog();
        self.uuid = localStorage.getItem('uuid');
        self.getFilters();
        self.getProfile(self.uuid);
        self.getpersonalphotos();
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
        self.personalphotoslist([]);
        self.achivements([]);
        self.links([]);
        self.skills_interests([]);
        self.skills_learning([]);
        self.skills_skills([]);
      }


      //------- SAVE PROFILE LOCATION INFORMATION ------------
      saveprofilepillarinfo = function () {
        if (self.profile().pillar().length > 0 && self.profile().center().length > 0) {
          showdialog();
          var location = {
            employee_key: self.profile().employee_key(),
            pillar: self.pillar(),
            center: self.center()
          };
          debuglog(ko.toJSON(location));
          $.ajax({
            url: baseurl + 'ExtendedProfile',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(location),
            success: function (data) {
              alert("Information saved successfully!");
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
              alert("Information saved successfully!");
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

      //-----  SAVE SKILL LIST FOR USER -----
      saveSkills = function () {

        var updatedSkillList = ko.observableArray([]);
        var requestdata = ko.observable();

        for (var i = 0; i < self.skills_skills().length; i++) {
          updatedSkillList.push(self.skills_skills()[i]);
        }


        updatedSkillList.push({
          employee_profile_key: '',
          value: self.newSkill(),
          rating: self.ratting()
        });

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
            alert("Information saved successfully!");
            self.newSkill("");
            self.rating(1);
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
            alert("Information saved successfully!");
            self.newSkill("");
            self.rating(1);
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

        for (var i = 0; i < self.skills_learning().length; i++) {
          updatedSkillList.push(self.skills_learning()[i]);
        }


        updatedSkillList.push({
          employee_profile_key: '',
          value: self.newSkill()
        });

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
            alert("Information saved successfully!");
            self.newSkill("");
            self.rating(1);
            hidedialog();
          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
          self.getProfile(self.uuid);

        });
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
            alert("Information saved successfully!");
            self.newSkill("");
            self.rating(1);
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
            alert("Information saved successfully!");
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
            alert("Information saved successfully!");
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
              alert("Deleted successfully!");
              hidedialog();
            }
          }).fail(function (xhr, textStatus, err) {
            alert(err);
            self.getProfile(self.uuid);

          });
        }
      }

      updateicon = function (event) {
        $("#editimage1").ojDialog("close");
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
              alert("Information saved successfully!");
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




      uploadpersonalphoto = function (event) {
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
              alert("Information saved successfully!");
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
            alert("Information saved successfully!");
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
            alert("Information saved successfully!");
            self.newSkill("");
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
            alert("Information saved successfully!");
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
          value: self.newSkill()
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
            alert("Information saved successfully!");
            self.newSkill("");
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
            alert("Information saved successfully!");
            self.newSkill("");
            hidedialog();
          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
          self.getProfile(self.uuid);

        });
      }



      editclose = function () {
        self.center(self.profile().center());
        self.pillar(self.profile().pillar());
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
    }

    return new DashboardViewModel();
  }
);
