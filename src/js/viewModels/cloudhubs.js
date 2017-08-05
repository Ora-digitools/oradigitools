/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtabs', 'ojs/ojconveyorbelt'],
  function (oj, ko, $) {

    function AboutViewModel() {

      var self = this;
      showhubmembers = function (event, ui) {
        var selectedhub = ui.currentTarget.id;
        self.router = oj.Router.rootInstance;
        self.router.store(selectedhub);
        self.router.go('profileslist');
      }
    }


    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new AboutViewModel();
  }
);
