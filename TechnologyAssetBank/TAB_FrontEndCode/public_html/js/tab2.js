/* Tab2.js is a replacement method that incorporates advanced animation when assets on the page
 * change on search.
 * */

$(document).ready(function () {
//Holds json for all assets to prevent multiple JSON calls
var holder = null;    
//Holds json for the categories
var cat_holder = null;   
//holds the content type data from JSON feed
var content_type_holder = null;
//contains the current value of the contentType being displayed defaults to all
var currentContentType="ALL";
//Boolean to determine if we are viewing Work in Progress
var wip = false;
//Contains the id of the currently showing category menu. 
var activeCategory='0';
//holder for keeping context of the current asset being viewed
var curAsset = null;
//isMax is a boolean denoting the mode of the categories menu. Max = true show the icon and text.
var isMax=true;
//isMobile detects clicks in elements only present when the @CSS media queries are active.
var isMobile=false;
//isSubCategory determines if the viewer is looking at a sub-Category menu. 
var isSubCategoryActive = false;
//if a sub Category is active but no sub-category is clicked this is false. This enables the mobile app
//to understand if the full screen pull down menu should be up or down.
var isSubCategorySecondClick = false;
//assetId_holder keeps a list of all IDs for merging and effects on asset transition
var assetId_holder = [];


/*Gathers Category information from JSON endpoint*/
$.getJSON('http://innovate.us.oracle.com/tab/resources/view/categories/all', function (data) { 
//$.getJSON('http://localhost:7101/tab/resources/view/categories/all', function (data) { 
/*$.getJSON('js/categories.json', function (data) {*/
        console.log("Retrieving categories JSON File");
        cat_holder =data;
        buildcategorymenu('0');
});


/*Gathers Content Type from the JSON endpoint*/
$.getJSON('http://innovate.us.oracle.com/tab/resources/view/assettypes', function (data) { 
/*$.getJSON('js/assetType.json', function (data) {*/
        console.log("Retrieving content types from JSON File");
        content_type_holder =data;
        buildContentType(); 
});

/*Gathers Asset information from JSON endpoint.*/ 
$.getJSON('http://innovate.us.oracle.com/tab/resources/view/assets/all', function (data) {
/*$.getJSON('js/assets.json', function (data) {*/
        console.log("Retrieving Assets JSON File");
        holder = data;
        buildAssetWall();
        hideWIP();
});

/* Function buildContentType constructs the LOV dropdown for
 * asset content type based off a the assettypes json list.
 */
function buildContentType() {
    ct_holder="<select id=\"contentType\" class=\"green-arrow\">";
    
    $.each(content_type_holder.assetTypes, function(index, at) {
    ct_holder = ct_holder+"<option value=\""+at.name+"\">&nbsp;"+at.name+"</option>";
    });
    
    ct_holder = ct_holder+"</select>";
    $('#contentType').replaceWith(ct_holder);
}

/* When a user types anything into the Filter Results input box, hide any assets that don't match 
 * the words in the Filter Results box, searching the asset name and description, case insensitive */
$("#filter").keyup(function() {
filterTab();
});

/*When a user filters on a content type we will capture the change and
 * filter the list of assets accordingly.*/
 $('body').on('change', '#contentType', function(){
      console.log("Iniside category click change. Selected value is: " + this.value);
      currentContentType=this.value;
      //take the current active category and update the assets filting the content type.
      updateAssets(activeCategory);
    
    //There is probably a better way to log this with an additional field in the
    //json endpoint but until then ...  
    switch(this.value) {
    case 'ALL':
    log("17",null,activeCategory);
    break;
    case 'Demo':
    log("18",null,activeCategory);
    break;
    case 'Hands-on Workshop':
    log("19",null,activeCategory);
    break;
    case 'Architecture Workshop':
    log("20",null,activeCategory);
    break;
    case 'Utility':
    log("21",null,activeCategory);
    break;
    case 'Tech Sales Content':
    log("22",null,activeCategory);
    break;
    default:
     log("23",null,activeCategory);
      break;
    }
    
      
 });
 

/* Each Item in the menu has the same class categorychange.
 * When the item is clicked we pull a custom attribute from the HTML with the category id.
 * Then call a function to update the HTML for the assets on the page.
 * */
$(document.body).on('click', '.categorychange' , function() {
   console.log("Iniside category click change.");
   updateAssets($(this).attr('cat_id'));
   buildcategorymenu($(this).attr('cat_id'));
   close_detail_view();
   //set the background color for active
   $(".categorychange[cat_id='"+$(this).attr('cat_id')+"']").children('img').css('background','#F29111');
   log("3",null,$(this).attr('cat_id'));
   
} );


/*This function builds the category menu for calls based on user clicks and initial loads.
 * */
function buildcategorymenu(v_cat_id) {
var sub_cat_count =0;
var v_parent_holder=null;
var menu_holder ='';
//When the category id is set to zero show all high level categories.
    if (v_cat_id === 0 || v_cat_id === '0' ) {
      menu_holder = '<ul id="nav_menu">'+'<li><a class="categorychange" href="#" cat_id="0"><img class="logo_img" src="images/logo-new1.png"></img></a></li>' +'<li><a class="categorychange all_ass" href="#" cat_id="0" >All Assets:</a></li>'; 
        $.each(cat_holder.categories, function(index, category) {
            menu_holder = menu_holder+'<li><a class="categorychange" href="#" cat_id="'+category.id+'" ><img class="cat_icon" src="'+category.iconUrl+'"/><span class="textme">'+category.categoryName+'</span></a>';
           
            /*process sub-categories if they exist for a main category*/
            if (!category.subcategoryList || !category.subcategoryList.length){
              //console.log(category.categoryName + ' Does not have subcategory.');
            }
            else {
                    $.each(category.subcategoryList, function(index, sub_category) {
                      sub_cat_count = 1;
                    });
            }
            menu_holder = menu_holder + '</li>';
            
         });
        menu_holder = menu_holder+'<li><a class="categorychange" href="http://innovate.us.oracle.com/ecal/" ><img class="cat_icon" src="images/ecal_icon_1.png"><span class="textme">Our Methods</span></a></li></ul>';
        //reset mobile booleans for display
        isSubCategoryActive = false;
        isSubCategorySecondClick =false;
    }
    //show only the core category clicked and return to main screen.
    else {
          menu_holder = '<ul id="nav_menu">'+'<li><a class="categorychange" href="#" cat_id="0"><img class="logo_img" src="images/logo-new1.png"></img></a></li>'; 
        $.each(cat_holder.categories, function(index, category) {
            
            //if a main category build menu with sub-categories
            if (v_cat_id === category.id) {
                menu_holder=menu_holder+'<li><a class="categorychange" href="#" cat_id="0" class="all_ass">All Categories:</a></li>';
                isSubCategoryActive = true;
                //process sub-categories if they exist for a main category
                if (!category.subcategoryList || !category.subcategoryList.length){
                      menu_holder = menu_holder+'<li><a class="categorychange" href="#" cat_id="'+category.id+'" ><img class="cat_icon" src="'+category.iconUrl+'"/><span class="textme">'+category.categoryName+'</span></a>';
                }
                else {
                    menu_holder = menu_holder+'<li><a class="categorychange" href="#" cat_id="'+category.id+'" ><img class="cat_icon" src="'+category.iconUrl+'"/><span class="textme">'+category.categoryName+'</span></a>';

                        $.each(category.subcategoryList, function(index, sub_category) {
                          menu_holder = menu_holder+'<li><a class="categorychange" href="#" cat_id="'+sub_category.id+'" ><img class="cat_icon sub_cat" src="'+sub_category.iconUrl+'"/><span class="textme">'+sub_category.categoryName+'</span></a></li>';
                          sub_cat_count = 1;
                        });
                }
                menu_holder = menu_holder + '</li>';
            }
            //check and display sub-category only click
           else {
                //if has sub-categories
               if (!category.subcategoryList || !category.subcategoryList.length){
                  //console.log(category.categoryName + ' Does not have subcategory.');
                  
                }
                else {
                      $.each(category.subcategoryList, function(index, sub_category) {
                         if (v_cat_id === sub_category.id) {
                          sub_cat_count = 2;
                          v_parent_holder =sub_category.parentCategoryId;
                         }
                        });
                }
            }
            
         });
        menu_holder = menu_holder+'</ul>';
    
    }
         
//if a main category is clicked does not have a sub-category keep on main menu. 
if (sub_cat_count==0) {
 //recursive call to build category menu wholistically
 buildcategorymenu('0');
}
else if(sub_cat_count==2) {
 buildcategorymenu(v_parent_holder);
}
else {
  $('#nav_menu').replaceWith(menu_holder);
  
 //If the user is viewing the minimal menu then apply CSS changes.
 if(!isMax){
   minCategories();
 }
 else {
   maxCategories();
 }
 
 /*if in mobile mode after category click we need close the hamburger menu
  * and insure proper resets in detail mode.
  * */
if (isMobile) {
     //if we are looking at a Sub-Category in mobile mode we need keep the menu open for additional sub category clicks.
     if (isSubCategoryActive) {
       //if there is a sub category we want to show the menu fullscreen until the second click, then enable drill to assets
       if (!isSubCategorySecondClick) {
           open_hamburger();
           isSubCategorySecondClick =true;  
       }
       //if a user clickes in a sub-category, we need to let the app close the menu and flip the hamburger menu signal.
       else {
           $('#hamburger_close').hide();
           $('#hamburger').show(); 
       }
     }
     //if a user clickes a main category, we need to let the app close the menu and flip the hamburger menu signal.
     else {
       $('#hamburger_close').hide();
       $('#hamburger').show(); 
     }
}

}

}

/*On toggle switch flip the boolean value of the wip variable then reset page
 *CSS changes.
 */
$('body').on('change', '#myonoffswitch', function(){ 
   if(wip) {
       wip=false;
       if($('#asset_details').is(':visible')) {
        close_detail_view();
       }
       $("#myonoffswitch").removeClass("red-arrow").addClass("green-arrow");
       $("html").removeClass("wip_bg").addClass("in_prod_bg");
       log("9",null,activeCategory);
   }
   else {
      wip=true;
       //if the asset details is visible and someone changes the state we need to close the detail window
       //and open the panel view
       if($('#asset_details').is(':visible')) {
        close_detail_view();
       }
       
       $("#myonoffswitch").removeClass("green-arrow").addClass("red-arrow");
       $("html").removeClass("in_prod_bg").addClass("wip_bg");
       log("8",null,activeCategory);
   }
   
   //take the previous active category and update the assets showing on toggle.
   updateAssets(activeCategory);
} );



/* Min-menu is a div that when clicked changes the category navigation to display
 * the icons only without the category names. 
 * */
 $(document.body).on('click', '#min-menu' , function() {
   if(isMax){
     $('#min-menu span').html('>');
     isMax =false;
     buildcategorymenu(activeCategory);
     log("10",null,null);
   }
   else {
    $('#min-menu span').html('<');
    isMax =true;
    buildcategorymenu(activeCategory);
    log("11",null,null);
   }
} );

/*Min-Categories alters the page CSS so that the left hand menu is styled with only the icons showing.
 * */
function minCategories() {
$("#nav_menu").css({"width":"80px"});
$("#nav_menu li:nth-child(2)").css({"font-size":"15px","text-align":"center","padding": "8px 0"});
$("header").css({"width":"98%"});
$("#modeme").css({"margin-left":"8%"});
$("#asset_holder").css({"width":"93%"});
$("#asset_details").css({"width":"96%"});
$(".logo_img").attr("src", "images/min_cat_holder_icon1.png");
$("#nav_menu li a span").html('');
$("#nav_menu li a img").removeClass("sub_cat");
}
/*Max-Categories alters the page CSS so that the left hand menu is styled with only the icons and text on
 * a category refresh.
 * */
function maxCategories() {
$("header").removeAttr('style');
$("#asset_holder").removeAttr('style');
$("#asset_details").removeAttr('style');
}

/* When the How it works link is clicked these events fire. */
$('#how').on('click', function() {
   $('#assetrequest').hide();
   $('#asset_holder').hide();
   $('#blackout').show();
   $('#howdetails').show();
   log("6",null,null);
} );

/* When the Asset Request link is pressed these events fire. */
$('#request').on('click', function() {
    $('#howdetails').hide();
    $('#asset_holder').hide();
    $('#blackout').show();
    $('#assetrequest').show();
    $('#from').val(emailaddress);
    log("7",null,null);
} );

/*When a asset request email is made do this.*/
$('#sendEmail').submit(function(){
    var p_url="assetRequest.jsp?from="+emailaddress+"&body="+$("#assetRequestMessage").val();
    var http = new XMLHttpRequest();
    http.open("GET", p_url, true);
    http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                    //alert(http.responseText);
            }
    }
    http.send(null);
}); 

/* When X is clicked on how or request popups these events fire.*/
$(document.body).on('click', '.close-btn' , function() {
   $('#blackout').hide();
   $('#asset_holder').show();
} );

/* When a user slects a asset, this code showcases the asset details.
 * */
 $(document.body).on('click', '.asset_click' , function() {
   getAssetDetails($(this).attr('asset_id'));
   curAsset = $(this).attr('asset_id');
   $('#asset_holder').hide();
   $('#asset_details').show();
    $('html, body').animate({ scrollTop: 0 }, 0);
    log("2",$(this).attr('asset_id'),activeCategory);
} );

/* When a user is finished viewing the asset details this code closes the window.*/
$(document.body).on('click', '#c_details' ,  function() {
   close_detail_view();
} );


/*Since there are multiple calls to actions that reset the page to the core list of assets
 * this function makes the action easily repeatable. 
 * */
function close_detail_view(){
 $('#asset_details').hide();
 $('#asset_holder').show();
}

/*function to log a asset detail view*/
$(document.body).on('click', '.white_asset_button' ,  function() {
  log("5",curAsset,activeCategory);
} );

$(document.body).on('click', '.green_asset_button' ,  function() {
  //since the same css is used on both the links, we will pull the text value and log accordingly
  if ($(this).text()==='Get Asset') {
    log("4",curAsset,activeCategory);  
  }
  else {
    log("5",curAsset,activeCategory);
  }
});

/* In Mobility mode when the hamburger menu is clicked we need to perform these actions.*/
$(document.body).on('click', '#hamburger' ,  function() {
   isMobile=true;
   open_hamburger();   
   log("12",null,null);
} );

$(document.body).on('click', '#hamburger_close' ,  function() {
   close_hamburger();    
   log("13",null,null);
} );

function close_hamburger() {
   $('#nav_menu').hide();
   $('#hamburger_close').hide();
   $("header").show();
   $('#asset_holder').show();
   $('#hamburger').show(); 
}

function open_hamburger() {
$('#nav_menu').show();
   $('#hamburger').hide(); 
   $("header").hide();
   $('#asset_holder').hide();
   $('#hamburger_close').show(); 
    
}

/*When a user needs to view a assets details the code below is called to 
 * parse through the JSON, gather the required detail information and 
 * dynamically build the div based on the asset being WIP or developed.
 * */
function getAssetDetails(v_assetId) {
var htmlStr = '<div id="showasset">';
 
$.each(holder.assets, function(index, asset) {
      if (v_assetId === asset.id) {
          if (asset.inDevelopment === 'N') {
          htmlStr = htmlStr+'<div id="c_details" class="close-btn_details"><a href="#" class="grey_but">X</a></div>'+
           ' <div id="asset_details_column1">'+
               '<h1>'+asset.name+'</h1>'+                 
               '<h3 class="prod_subline"><em>Created by </em><strong> '+asset.createdBy+' </strong> <em> on </em><strong> '+asset.postedOnFmt+'</strong>.</h3>'+
              '<span>'+asset.description+'</span>'+
              '<div id="asset_actions">'+
               '<a target="_asset" href="'+asset.assetUrl+'" class="green_asset_button" >Get Asset</a>'+                 
               '<a href="mailto:'+asset.contact+'?Subject=Technology%20Asset%20Bank%20Request" class="green_asset_button" >Contact</a>'+
              '</div></div>'+            
            '<img src="'+asset.imageUrl+'" alt="img01">';

             $("#asset_details").removeClass("wip_asset_bg").addClass("available_asset_bg");
          }
          else {
             var wip_asset_holder = '';
             if (asset.assetUrl.length < 15){
              //console.log(category.categoryName + ' Does not have a asset url.');
            }
            else {
            wip_asset_holder ='<a target="_asset" href="'+asset.assetUrl+'" class="white_asset_button" >Preview Asset</a>';
            }
          
             htmlStr = htmlStr+'<div id="c_details" class="close-btn_details"><a href="#"  class="white_but">X</a></div>'+
              ' <div id="asset_details_column1">'+
               '<h1>'+asset.name+'</h1>'+                 
               '<h3 class="wip_subline"><em>Development lead by </em><strong> '+asset.createdBy+' </strong> <em> with a tenative completion date of </em><strong> '+asset.postedOnFmt+'</strong>.</h3>'+
              '<span>'+asset.description+'</span>'+
              '<div id="asset_actions">'+wip_asset_holder+
               '<a href="mailto:'+asset.contact+'?Subject=Technology%20Asset%20Bank%20Request" class="white_asset_button" >Contact</a>'+
              '</div></div>'+            
            '<img src="'+asset.imageUrl+'" alt="img01">';
            
            $("#asset_details").removeClass("available_asset_bg").addClass("wip_asset_bg");
          }
      }
});
htmlStr = htmlStr+ '</div>';
$('#showasset').replaceWith(htmlStr);
}


/*Function updateAssets() inputs a category id, filters through JSON to find
 * the assets inside that category and update the website html. The WIP boolean
 * and the currentContentType variables apply if selected from the dropdowns.
 */
function updateAssets(v_id){
    activeCategory=v_id;
    //array holder for the assets we need to showcase
    var assets_to_show = [];
    //array to animate and the removal of the assets not needed from the prior state
    var difference = [];
    //capture json into a temp variable
    var temp_holder;
    

   /* WIP Asset filter Code */
    if (wip) {
       try {
       temp_holder = jQuery.grep(holder.assets, function (elements, index) {
            return elements.inDevelopment === 'Y';
        });
       }
       catch(err) {
        console.log("Error inside Category Filter.");
        console.log(err);
       }
    }
    else {
        temp_holder = jQuery.grep(holder.assets, function (elements, index) {
            return elements.inDevelopment === 'N';
        });
    }

    /* Category Asset filter Code */
    if (v_id === '0') {
   // console.log('All Categories Selected. Not filtering on Category');
    }
    else{
        try{
           temp_holder = jQuery.grep(temp_holder, function (element, index) {
                 res = jQuery.grep(element.categories, function (element2, index2) {
                 return element2.id === v_id;
             });
              return (res.length != 0);
            });
        }
        catch(err) {
            console.log("Error inside Category Filter.");
            console.log(err);
        }   
    }
 
  
   /*Category Type filter Code*/
   if (currentContentType!=="ALL") {
   // console.log('Content Type is not ALL so we need to filter the values.');
    try {
        temp_holder = jQuery.grep(temp_holder, function (elements, index) {
            return elements.assetType === currentContentType;
        });
    }
    catch(err) {
        console.log("Error inside Content Type Filter.");
        console.log(err);
    }
   }
   
   //Purely for animation purposes we need to create an array with the IDs
   //of visible elements.
   $.each(temp_holder, function(index, asset) {
                assets_to_show.push(asset.id); 
     });
   
   //merge the lists of visible assets to all assets and turn off assets not needed with desired effect.
   jQuery.grep(assetId_holder, function(el) {
        if (jQuery.inArray(el, assets_to_show) == -1) difference.push(el);
   });
   

      //loop through and make all assets currently showing that are not part of selected category the fadeout.
   $.each(difference, function( index, hide ) {
     //if mobile animation not needed.
     //the 'hidden' class is used by the keyword filter to avoid changing the state of assets that are already invisible due to being in a different category or asset type
     $(".asset_click[asset_id=\""+hide+"\"]").addClass('hidden');
     if (isMobile){
     $(".asset_click[asset_id=\""+hide+"\"]").hide();
     }
     else {
     $(".asset_click[asset_id=\""+hide+"\"]:visible").fadeOut(300, function(){$('#filter').keyup();});//this keyup event causes the keyword filter to re-analyze visible assets and hide ones that don't match the filter terms
     }
    });
   
   
   //loop through an asset that should be showing after the category selection is not visibile make it visible.
   $.each(assets_to_show, function( index, asset_to_show ) {
     //if mobile animation not needed.
     //the 'hidden' class is used by the keyword filter to avoid changing the state of assets that are already invisible due to being in a different category or asset type
     $(".asset_click[asset_id=\""+asset_to_show+"\"]").removeClass('hidden');
       if (isMobile){
        $(".asset_click[asset_id=\""+asset_to_show+"\"]").show();
       }
       else {
         $(".asset_click[asset_id=\""+asset_to_show+"\"]").not(':visible').show();
       }
    });
    //this keyup event causes the keyword filter to re-analyze visible assets and hide ones that don't match the filter terms
    $('#filter').keyup();
   
}

//Build the wall with all the assets showing. 
function buildAssetWall() {
htmlStr='<ul id="display" class="grid cs-style-1">';
$.each(holder.assets, function(index, asset) {
  htmlStr=htmlStr+getAssetHTML(asset.imageUrl,asset.name,asset.id);
  assetId_holder.push(asset.id);
});
htmlStr=htmlStr+'</ul>';
$("#asset_holder").addClass("asset_holder_center");
$('#display').replaceWith(htmlStr).hide();

//Once asset wall build completes check for a searchterm in the url. And filter wall if, term exists.
urlSearchCheck();
}

//loop through and filter out WIP assets
function hideWIP(){
 $.each(holder.assets, function(index, asset) {
    if (asset.inDevelopment === 'Y') {
     //console.log("We need to hide element: "+asset.id);
     $(".asset_click[asset_id=\""+asset.id+"\"]").hide();
    }
    else {
     $(".asset_click[asset_id=\""+asset.id+"\"]").show();
    }
 });
}

/*The function getAssetHTML fields values and constructs the display of the asset
 * element on the main page. It is called recursively as we parse the JSON.*/
function getAssetHTML(v_image,v_name,v_id){
  return '<li class="asset_click" asset_id="'+v_id+'">'+
                '<figure>'+
                '<img class="asset_img" alt="img01" src="'+v_image+'">'+
                '<img class="asset_img_cover" alt="img01" src="http://innovate.us.oracle.com:81/tab/greenoverlay.png">'+
                '<h3>'+v_name+'</h3>'+
                '</figure>'+
          '</li>';
}

 
 /* ReadCookie --
  * Is a function that looks to see if the individual has a corporate cookie and if so save it to a variable for loggin.
  */
var emailaddress ="anonymous@oracle.com";
 
 function ReadCookie() {  
   var hasCorporateCookie=false;
   var hasTabCookie=false;
   var cookiename="none";
   
   var cookie = getCookie(" ORA_UCM_INFO");
        if (!cookie) {
           // cookie doesn't exist
        } else {
          emailaddress=cookie.split('~')[4];
          hasCorporateCookie=true;
          //write/refresh local cookie in case future access does not have corporate cookie
          writeCookie(emailaddress);
          //log that the page view found the corporate cookie. 
          log("14",null,null);
   }
      
   var cookie2 = getCookie("TAB");
        if (!cookie2) {
           // cookie doesn't exist
        } else {
          emailaddress=cookie2;
          hasTabCookie=true;
        }
   
   //if no corporate cookie or site ookie exists get the username
  if (!hasCorporateCookie && !hasTabCookie) {
     console.log("No Cookies found for user.  ");
     $("#getEmail").show();    
   } 
   else {
     // console.log("Cookies found time to log.");
      //log the page view
      log("1",null,null);
      //check for mobile vieing
      checkMobile();
      //log a view of all assets
      log("3",null,activeCategory);
   }
}

/*Function getcookie looks for a cookie of a particular name and
 * if found returns the value.*/
function getCookie(cName) {
    var cVal = document.cookie.match('(?:^|;) ?' + cName + '=([^;]*)(?:;|$)');
    if (!cVal) {
      return "";
    } else {
      return cVal[1];
    }
  }


/*If a user does not have the coproate cookie we prompt them to enter a email address.
 * When the user presses the submit but the actions below fire. 
 * */
$( "#enterEmail" ).submit(function( event ) {
  console.log("Your email address is: "+$("#myAddress").val());
  emailaddress =$("#myAddress").val();
  writeCookie(emailaddress);
  //hide the prompt
  $("#getEmail").hide();
  //log the page view
  log("1","null",null);
  //log a view of all assets
  log("3",null,activeCategory);
  //log that the page view required them to enter a email address. 
  log("14",null,null);
  //Check for mobile mode
  checkMobile();
  //pause the actions before the page refreshes.
  event.preventDefault();
});

/*This function writes a cookie for the website to remember the user SSO id if the 
 * corporate cookie is not present.*/
function writeCookie(v_emailAddress){
  var theDate = new Date();
  var oneYearLater = new Date( theDate.getTime() + 31536000000 );
  var expiryDate = oneYearLater.toGMTString();
  document.cookie="TAB=" + v_emailAddress+ ";";
  document.cookie = "expires=" + expiryDate + ";";
}

/*Function determines if the user is interacting with the application in mobile  mode.*/
function checkMobile() {
if ($('#mobileheader').is(':visible')) {   
  log("16",null,null);
}
}


/*
 * function log consumes data from the webpage and submits the data to the REST endpoint to log user activity.
 */
function log(v_action_id,v_assetId,v_categoryId) {
var holder ={"actionId": v_action_id, "ssoId": emailaddress, "assetId": v_assetId, "categoryId": v_categoryId};
var jsonString =JSON.stringify(holder);
/*console.log(jsonString);*/

jQuery.ajax ({
    url: "http://innovate.us.oracle.com/tab/resources/log",
    type: "POST",
    data: jsonString,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(){
        //
    }
});
}



/*Function to get the page parameters from the url.
 * For example the paramater jsonId could be read from a url like this 
 * index.html?jsonId=123456798&pin=datascience */
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

/*This function looks for a searchterm in the core url passed in as a parameter. If found it executes a search on the page.
 * 
 * */
function urlSearchCheck() {
var searchterm = getUrlParameter('search');

//if the core page has a parameter called searchterm then we need to load the .json and search
if (!searchterm || !searchterm.length){
console.log('No Tab URL searchterm found.');
}
else {
console.log('Tab URL search term found, value is: '+ searchterm);
$('#filter').val(searchterm);
setTimeout(function(){ 
console.log("Executing search from url term.");
filterTab();
}, 2000);

}

}

/* The function filter TAB captures a searchterm and transforms assets presented on the page to the ones containing the
 * term. Chip abstracted this function so one could search a key term from the url or from entering a word in the 
 * filter value of the page. 
 * */

function filterTab() {
$.each(holder.assets, function(index, asset) {
        var asset_elem = $('#display').children("li[asset_id="+asset.id+"]");
        //the filtered class is added by this function so that we only unhide what we have hidden due to the filter, not assets from other categories or types
        //the hidden class is added by the updateAssets() function, again to ensure we don't show any assets here that should be hidden for category or type restrictions
        if(asset_elem.hasClass('filtered') && !asset_elem.hasClass('hidden')) {
            asset_elem.show();
            asset_elem.removeClass('filtered');
        }
        else if (asset_elem.hasClass('filtered') ) {
            asset_elem.removeClass('filtered');
        }
        
        if(!asset_elem.hasClass('hidden') && $('#filter').val().trim().length > 0) {
        
          var terms = $('#filter').val().split(" ");
          $.each(terms, function(index, term) {
              if (asset.name.toLowerCase().indexOf(term.toLowerCase()) < 0 && asset.description.toLowerCase().indexOf(term.toLowerCase()) < 0) {
                asset_elem.hide();
                asset_elem.addClass('filtered');
              }
          });
        
        }
    });
    
    var shown = $('#display').children('li:visible').length;
    var notshown = $('.filtered').length;
    if(notshown > 0 && shown > 0) {
        var filtertext = 'Showing '+shown+ ' assets of '+ (shown + notshown)+ '. ('+notshown+' assets filtered)';
        filtertext = filtertext.replace(' 1 assets', ' 1 asset')
        filtertext = filtertext.replace('(1 assets', '(1 asset')
        $('#filtertext').text(filtertext);
    }
    else if(shown == 0) {
        $('#filtertext').text('All assets filtered ('+notshown+'). Please try different keywords.');
    }
    else {
        $('#filtertext').text('');
    }
}


//at the completion of page load read the page cookie
ReadCookie();
});