// window.uploadUrl = "http://www.myfynx.com/newfynx/index.php/json/uploadImage";
// window.uploadUrl = "http://130.211.164.166/uploadfile/upload";
window.uploadUrl = "http://vignesh.com:81/uploadfile/upload";
angular.module('phonecatControllers', ['templateservicemod', 'infinite-scroll', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider', 'angularFileUpload', 'angularMoment','angular-loading-bar','ngImgCrop'])


  .controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout,cfpLoadingBar) {
    //Used to name the .html file
    // cfpLoadingBar.start();
    $scope.template = TemplateService.changecontent("home");
    $scope.menutitle = NavigationService.makeactive("Home");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    // console.log('navigation', $scope.navigation)
    // var session = NavigationService.session(function (data) {
    //   console.log('session now: ', data);
    //   if(data.accesslevel == "client") {
    //     $scope.navigation[2].link = "companyprofile"
    //   }
    //   else if(data.accesslevel == "lancer") {
    //     $scope.navigation[2].link = "profile"
    //   }
    // })
    if($scope.navigation)
    $scope.mySlides = [
      'img/banners/1.jpg',
      'img/banners/2.jpg',
      'img/banners/3.jpg',
      'img/banners/4.jpg'
    ];
  })

  .controller('ChangePasswordCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("changepassword");
    $scope.menutitle = NavigationService.makeactive("Change Password");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.submitPassword = function (formData) {
      if(formData.new != formData.confirm) {
        $scope.notSame = true;
      }
      else {
        NavigationService.changePassword(formData, function (data) {
          console.log('changed: ', data);
        });
      }
    };
  })

  .controller('AboutCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("aboutus");
    $scope.menutitle = NavigationService.makeactive("About Us");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.mySlides = [
      'img/banners/1.jpg',
    ];
  })

  .controller('EditJobCtrl', function($stateParams, $state, $scope, TemplateService,
    NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("editjob");
    $scope.menutitle = NavigationService.makeactive("Edit Job");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();


    // $stateParams.jobDetail
    NavigationService.getEachJob($stateParams.id, function (data) {
      console.log('edit job data: ', data);
      $scope.jobDetail = data;
    });

    $scope.editJob = function (formValid, jobData) {
      NavigationService.session(function (data) {
        console.log('session: ', data);
        if(data && formValid.$valid) {
          NavigationService.editJob(jobData._id, jobData, function (data) {
            console.log('response edit job: ', data);
            if(data.value) {
              $state.go('profile');
            }
          });
        }
      });
    };

    $scope.selectOption = function (value) {
      $scope.jobDetail.experience = value;
      console.log('experience edit: ', $scope.jobDetail.experience);
    };

  })

  .controller('JobListingCtrl', function($scope, TemplateService, NavigationService,
    $timeout,$uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("joblisting");
    $scope.menutitle = NavigationService.makeactive("Job Listing");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    // $scope.joblist = {"count": 1500}
    // $scope.jobNumber = [
    // {
    //   "id":1,
    //   "title":"efjowefjoiwefj",
    //   "image":"img/resgration.png",
    //   "company": "BobCorn",
    //   "jobPayment": "Hourly",
    //   "payment": "Rs. 1000-2000",
    //   "timeCommitment": "40 hours weekly",
    //   "postingDate": "Fri Feb 19 2016 13:43:11 GMT+0530 (IST)",
    //   "expiryDate": "Fri Feb 26 2016 13:43:11 GMT+0530 (IST)",
    //   "description": "This is an awesome job! you should try it!!",
    //   "city":"Mumbai",
    //   "jobRole":"developer"
    //   },

    //   {
    //     "id":2,
    //     "title":"efjowefjoiwefj",
    //     "image":"img/resgration.png",
    //     "company": "AapCot",
    //     "jobPayment": "Hourly",
    //     "payment": "Rs. 1000-2000",
    //     "timeCommitment": "40 hours weekly",
    //     "postingDate": "Fri Feb 19 2016 13:43:11 GMT+0530 (IST)",
    //     "expiryDate": "Fri Feb 26 2016 13:43:11 GMT+0530 (IST)",
    //     "description": "This is an awesome job! you should try it!!",
    //     "city":"Delhi",
    //     "jobRole":"designer"
    //   }];
    // $scope.jobNumber = {}
    // $scope.jobNumber.pageNumber = 1;
    // $scope.jobNumber.data = []
    $scope.getJobs = function (data, page) {
      NavigationService.findAllJobs(data, page, function (data) {
        $scope.joblist = data.data;
        $scope.count = data.total;
      });
    };

    // var data = {};
    if($.jStorage.get('isSearch')){
      data.city = _.startCase($.jStorage.get('searchData.city'));
      data.category = _.startCase($.jStorage.get('searchData.category'));
      NavigationService.findAllJobs(data, 1, function (data) {
        $scope.joblist = data.data;
        $scope.count = data.total;
      });
    }

    // var page = 1;
    // NavigationService.findAllJobs(page, function (data) {
    //   $scope.joblist = data.data;
    //   // console.log('joblist: ', $scope.joblist);
    //   // $scope.jobNumber[0] = $scope.joblist.data[0];
    //   // $scope.jobNumber[1] = $scope.joblist.data[1];
    // });
    // $scope.getJobs(page);
    var data = $.jStorage.get('searchJobs');
    $scope.joblist = data.data;
    $scope.count = data.total;
    console.log('job data: ', data.data);

    // $scope.getDetails = function (id) {
    //   NavigationService.getEachJobDetail(id, function (data) {
    //     // body...
    //   })
    // }

    $scope.search = function (data, page) {
      data.city = _.startCase(data.city);
      data.category = _.startCase(data,category);
      NavigationService.findAllJobs(data, page, function (data) {
        $scope.joblist = data.data;
        $scope.count = data.total;
      });
    };

    $scope.loadMore = function () {
      if($scope.joblist.pagenumber < $scope.joblist.totalpages && $scope.joblist.pagenumber) {
        // var last = $scope.joblist.totalpages;
        console.log('joblist length: ', $scope.joblist.data.length);
        console.log('last: ', last);
        console.log('jobNumber: ', $scope.jobNumber);
        // for (var i = 1; i <= 2; i++) {
            // console.log('in the if statement')
            ++$scope.joblist.pagenumber;
            $scope.getJobs($scope.joblist.pagenumber);
          // }
        // console.log('job number: ', $scope.jobNumber)
      }
    };

    $scope.mySlides = [
      'img/landing.jpg',
    ];

    // $scope.applyForJob = function (job) {
    //   console.log('in the applyForJob function: ', job);
    //   NavigationService.jobApply(job, function (data) {
    //     console.log('apply for job: ', data);
    //   });
    // };

    $scope.openpop = function(job) {
      $scope.message = "";
      NavigationService.jobApply(job, function (data) {
        console.log('apply for job: ', data);
        // if(data.value) {
          $scope.message = data.comment;
        // }
      });
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/message.html",
        scope: $scope
      });
    };
    // $scope.joblist = [
    //   {
    //     img: "img/resgration.png",
    //     name: "Bobcorn",
    //     money: "1000-2000",
    //     hours: "40",
    //     lastpost: "2 months ago",
    //     month: "Jan 26,2016",
    //     description:"  I am looking for a mobile app developer to work on various IOS and Android apps. The first project would be to develop a mobile app for both IOS and Android where we will provide."
    //   },
    //   {
    //     img: "img/resgration.png",
    //     name: "Bobcorn",
    //     money: "1000-2000",
    //     hours: "40",
    //     lastpost: "2 months ago",
    //     month: "Jan 26,2016",
    //     description:"  I am looking for a mobile app developer to work on various IOS and Android apps. The first project would be to develop a mobile app for both IOS and Android where we will provide."
    //   },
    //   {
    //     img: "img/resgration.png",
    //     name: "Bobcorn",
    //     money: "1000-2000",
    //     hours: "40",
    //     lastpost: "2 months ago",
    //     month: "Jan 26,2016",
    //     description: "  I am looking for a mobile app developer to work on various IOS and Android apps. The first project would be to develop a mobile app for both IOS and Android where we will provide."
    //   },
    // ];
  })
  .controller('JobDetailCtrl', function($state, $stateParams, $scope, TemplateService,
    NavigationService, $timeout,$uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("job-detail");
    $scope.menutitle = NavigationService.makeactive("Job Listing");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.openpop = function(job) {
      $scope.message = "";
      NavigationService.jobApply(job, function (data) {
        console.log('apply for job: ', data);
        $scope.message = data.comment;
        // if(data.value) {

        // }
        // else {
        //   $scope.successApplyJob = false
        // }
      });

      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/message.html",
        scope: $scope
      });
    };

    $scope.search = function (data) {
      $.jStorage.set('isSearch', true);
      $.jStorage.set('searchData', data);
      $state.go('joblisting');
    };

    // $scope.jobDetail = {
    //   "company": "BobCorn",
    //   "roleRequired": "Mobile App Developer",
    //   "city": "Mumbai",
    //   "jobPayment": "hourly",
    //   "payment": "Rs. 1000-2000",
    //   "timeCommitment": "40 hours weekly",
    //   "postingDate": "Fri Feb 19 2016 13:43:11 GMT+0530 (IST)",
    //   "expiryDate": "Fri Feb 26 2016 13:43:11 GMT+0530 (IST)",
    //   "jobDescription": "This is an awesome job! you should try it!!",
    //   "companyDescription": "This is an awesome company! you should try it!!",
    //   "exposure": "WorldWideWeb",
    //   "jobResponsibilities": "You are going to have alot of responsibilities!!",
    //   "image":"img/joblist.jpg"
    // }
    console.log('stateParams: ', $stateParams.job);
    NavigationService.getEachJobDetail($stateParams.id, $stateParams.job, function (data) {
      $scope.jobDetail = data;
      // $scope.job = $stateParams.job;
      console.log('job detail: ', $scope.jobDetail);
    });

    // $scope.getDetails = function (id) {
    //   NavigationService.getEachJobDetail(id, function (data) {
    //     // body...
    //   })
    // }

    $scope.mySlides = [
      'img/landing.jpg',
    ];
  })

  .controller('JobSearchCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("job-search");
    $scope.menutitle = NavigationService.makeactive("Job Search");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })
  .controller('TermsConditionsCtrl', function($scope, TemplateService, NavigationService,
    $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("termsconditions");
    $scope.menutitle = NavigationService.makeactive("Terms and Conditions");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })

  .controller('SearchCtrl', function($uibModal, $scope, TemplateService, NavigationService,
    $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("search");
    $scope.menutitle = NavigationService.makeactive("Search");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    // $scope.jobs = {
    // "count": 30,
    // "lastPage": 3
    // };

    // $scope.pageOfJobs = [{
    //         "image": "img/search.png",
    //         "name": "Sonia Nehwal",
    //         "role": "Graphic Designer",
    //         "experience": 2,
    //         "city": "Mumbai"
    //     },

    //     {
    //         "image": "img/search.png",
    //         "name": "Rital Naik",
    //         "role": "Design Student",
    //         "experience": 1,
    //         "city": "Bangalore"
    //     },

    //     {
    //         "image": "img/search.png",
    //         "name": "Pranit Sahu",
    //         "role": "Design Intern",
    //         "experience": 3,
    //         "city": "Mangalore"
    //     },

    //     {
    //         "image": "img/search.png",
    //         "name": "Deepak Shah",
    //         "role": "Senior Graphic Designer",
    //         "experience": 5,
    //         "city": "Mysore"
    //     },

    //     {
    //         "image": "img/search.png",
    //         "name": "Rahul Kane",
    //         "role": "UI/UX designer",
    //         "experience": 4,
    //         "city": "Delhi"
    //     }
    // ]
    var page = 1;
    $scope.experience = 0;
    // $scope.pageOfJobs = [];
    $scope.job = $.jStorage.get('jobCategory');
    console.log('job info: ', $scope.job);
    var data = $scope.job;
    NavigationService.getAllFreelancers(data, page, function (data) {
      $scope.jobs = data;
      console.log('all freelancers: ', $scope.jobs);
      for(var l=0; l<data.length; l++){
        console.log('data: ', data[l]);
        for(var k=0; k<data[l].experience.length; k++) {
          console.log('experience: ', data[l].experience[k]);
          $scope.experience += data[l].experience[k].duration;
        }
        console.log('experience: ', $scope.experience);
      }
      // $scope.pageOfJobs[0] = $scope.jobs.data[0];
      // $scope.pageOfJobs[1] = $scope.jobs.data[1];
      // console.log('all freelancers2: ', $scope.pageOfJobs);
    });
    $scope.pageOfJobs = 1;
    $scope.loadMoreTwo = function () {
      // console.log('In the load more two function')
      // console.log('jobs length: ', $scope.jobs.data.length)
      // if($scope.pageOfJobs.length < $scope.jobs.data.length)
      // {
      //   console.log('all freelancers1: ', $scope.pageOfJobs);
      //   var last = $scope.pageOfJobs.length;
      //   console.log('last: ', last);
      //   for (var i = 0; i < 2; i++) {
      //     $scope.pageOfJobs.push($scope.jobs.data[last + i]);
      //   }
      //   console.log('job number: ', $scope.pageOfJobs);
      // }
    };

    // $scope.shortlist = function (lancer, job) {
    //   NavigationService.getShortlist(lancer, job, function (data) {
    //     console.log('shortlist response: ', data);
    //   })
    // }

    $scope.openpop = function(lancer, job) {
      $scope.message = "";
      NavigationService.getShortlist(lancer, job, function (data) {
        console.log('apply for job: ', data);
        // if(data.value) {
        $scope.message = data.comment;
        // }
      });
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/message.html",
        scope: $scope
      });
    };

    $scope.openInterview = function (lancer, job) {
      $scope.lancer = lancer;
      $scope.job = job;
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/interview.html",
        scope: $scope
      });
    };

    $scope.set = function (formData, lancer, job) {
      NavigationService.setInterview(formData, lancer, job, function (data) {
        console.log('set interview response: ', data);
        if(data) {
          $scope.message = data.comment;
          $uibModal.open({
            animation: true,
            templateUrl: "views/modal/message.html",
            scope: $scope
          });
        }
      });
    };
    // $scope.jobs = [
    //   {
    //     img: "img/search.png",
    //     name: "Sania Mirza",
    //     prof: "Graphic designer",
    //     exp: "1"
    //   },
    //   {
    //     img: "img/search.png",
    //     name: "Rital Nalk",
    //     prof: "Graphic designer",
    //     exp: "4"
    //   },
    //   {
    //     img: "img/search.png",
    //     name: "Pranit Sahu",
    //     prof: "Graphic designer",
    //     exp: "2"
    //   },
    //   {
    //     img: "img/search.png",
    //     name: "Deepak Shah",
    //     prof: "Graphic designer",
    //     exp: "3"
    //   },
    // ];
  })
  .controller('SearchcategoryCtrl', function($state, $scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("search-category");
    $scope.menutitle = NavigationService.makeactive("Search Job");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    // $scope.cityOptions = ["mumbai", "delhi"]
    // $scope.categoryOptions = ["Design", "Websites IT Software", "Mobile", "Data Entry", "Product Sourcing", "Sales & Marketing", "Business Accounting & Legal"]
    $scope.cityOptions = [];
    NavigationService.getCityOptions(function (data) {
      _.each(data, function(value) {
        if(value.state) {
          flag = _.findIndex($scope.cityOptions, function(o) {
            console.log(o);
            console.log(value.state);
            return o == value.state;
          });
          // console.log(flag);
          if(flag == -1) {
            $scope.cityOptions.push(value.state);
          }
        }
        if(value.city) {
          flag2 = _.findIndex($scope.cityOptions, function(o) {
            return o == value.city;
          });
          console.log('flag 2', flag2);
          if(flag2 == -1) {
            $scope.cityOptions.push(value.city);
          }
        }
      // console.log('cityOptions: ', $scope.cityOptions);
      });
    });

    NavigationService.getCategoryOptions(function (data) {
      // $scope.categoryOptions = data;
      $scope.categoryOptions = [];
      _.each(data, function (value) {
        flag = _.findIndex($scope.categoryOptions, function(o) {
          console.log(o);
          console.log(value.designation);
          return o == value.designation;
        });
        // console.log(flag);
        if(flag == -1) {
          $scope.categoryOptions.push(value.designation);
        }
        // $scope.categoryOptions.push(value.designation)
      });
      // console.log('categoryOptions: ', $scope.categoryOptions);
    });

    $scope.getJobs = function () {
      console.log('dropdown data: ', data);
      NavigationService.findAllJobs(data, 1, function (data) {
        // $scope.joblist = data.data;
        // $scope.count = data.total;
        console.log('jobs data: ', data);
        if(data) {
          $.jStorage.set('searchJobs', data);
          $state.go('joblisting');
        }
      });
    };

    var data ={};
    $scope.showCitySelect = function (city) {
      console.log('testing city: ', city);
      data.city = city;
    };

    $scope.showCategorySelect = function (category) {
      console.log('testing category: ', category);
      data.category = category;
    };
  })
  .controller('RegistrationCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("registration");
    $scope.menutitle = NavigationService.makeactive("Registration");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })
  .controller('ProfileCtrl', function($scope, TemplateService, NavigationService, $timeout,
    $state, $uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("profile");
    $scope.menutitle = NavigationService.makeactive("Profile");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.myImage='';
        $scope.myCroppedImage='';

        var handleFileSelect=function(evt) {
          var file=evt.currentTarget.files[0];
          var reader = new FileReader();
          reader.onload = function (evt) {
            $scope.$apply(function($scope){
              $scope.myImage=evt.target.result;
            });
          };
          reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
    // $scope.myProfile = {
    //   "personalDetails": {
    //       "userId": "priyanka123",
    //       "name": "Priyanka Kumbhar",
    //       "email": "avicci@gmail.com",
    //       "contactNo": "+918087120163",
    //       "address": "Mayur Nagar, Aarey Colony, etc etc"
    //   },

    //   "education": [{
    //       "examination": "hsc",
    //       "percentage": "60%",
    //       "institution": "Bkc college, mumbai"
    //   }, {
    //       "examination": "be",
    //       "percentage": "60%",
    //       "institution": "RCOE"
    //   }],

    //   "workExperience": [{
    //           "company": "babycorn",
    //           "duration": "6 years",
    //           "responsibilities": "jrfkhekhfkerf,ejfefiuefh,oejfoejfoif",
    //           "designation": "Developer"
    //       },

    //       {
    //           "company": "capsicum",
    //           "duration": "6 years",
    //           "responsibilities": "jrfkhekhfkerf,ejfefiuefh,oejfoejfoif",
    //           "designation": "Developer"
    //       }
    //   ]}
    $scope.education = [];
    $scope.experience = [];
    $scope.displayPic = "";
    $scope.personalDetails = {};
    NavigationService.getMyProfilePage(function (data) {
      // $scope.myProfile = data;
      console.log('profile data1: ', data.company);
      $scope.data = data;
      if(data.accesslevel == 'lancer' || !data.company) {
        console.log('inside accesslevel if');
        $scope.profilepic = data.profilepic;
        $scope.personalDetails= {"name": data.name, "email": data.email, "contactNo": data.contactNo, "location": data.location};
        if(!data.education) {
          $scope.education = [{examination: "", percentage: "", institution: ""}];
        }
        else if(data.education) {
         $scope.education = data.education;
         console.log('education:', $scope.education);
        }

        if(!data.experience) {
          $scope.experience = [{company:"", duration:"", responsibilities:"", designation: ""}];
        }
        else if(data.experience) {
         $scope.experience = data.experience;
         console.log('experience:', $scope.experience);
        }
      }
      else if(data.accesslevel == 'client'){
        $scope.company = data;
        // $scope.data = data;
        console.log('company: ', $scope.company);
      }
      console.log('profile data: ', data);
      console.log('personal details: ', $scope.personalDetails);
    });

    $scope.submitPD = function (value) {
      console.log('personal details1: ', value);
      NavigationService.submitEdit(value, $scope.education, $scope.experience, $scope.profilepic, function (data) {
        console.log('personal details: ', data);
      });
    };

    $scope.submitDP = function (value) {
      console.log('In the submitPD');
      console.log('displayPic1: ', value);
      // globalfunction.onFileSelect($files, function(image) {
        // if (whichone == 1) {
        //   $scope.vendors.logourl = image;
        //   if (uploadtype == 'single') {
        //       $scope.displayPic = image[0];
        //   }
        // }
        // else if (whichone == 2) {
        //   $scope.vendors.bannerurl = image;
        //   if (uploadtype == 'single') {
        //       $scope.displayPic = image[0];
        //   }
        // }
        NavigationService.submitEdit($scope.personalDetails, $scope.education, $scope.experience,
          value, function (data) {
          console.log('displayPic: ', data);
        });
      // }


    };

    $scope.submitEdu = function (value) {
      if(value[value.length - 1].examination === "") {
        console.log('in the if of submitEDU');
        value.pop();
      }
      console.log('education: ', value);
      NavigationService.submitEdit($scope.personalDetails, value,
        $scope.experience, $scope.profilepic, function (data) {
        console.log('education response: ', data);
      });
    };

    $scope.submitExp = function (value) {
      if(value[value.length - 1].company === "") {
        value.pop();
      }
      console.log('experience: ', value);
      NavigationService.submitEdit($scope.personalDetails, $scope.education, value, $scope.profilepic, function (data) {
        console.log('experience response: ', data);
      });
    };

    // $scope.submitExp = function (value) {
    //   console.log('experience: ', value);
    //   NavigationService.submitEdit($scope.personalDetails, $scope.education, value, $scope.displayPic, function (data) {
    //     console.log('experience response: ', data);
    //   });
    // };

    $scope.togglePD = function (value) {
      if(value) {
        $scope.isEditPD = false;
      }
      else {
        $scope.isEditPD = true;
      }
    };

    $scope.toggleEdu = function (education, value) {
      console.log('education: ', education);
      if(education[education.length - 1].examination === "") {
        $scope.education.pop();
        $scope.toggleEdu(education, value);
      }
      else if(value) {
        $scope.isEditEdu= false;
      }
      else {
        $scope.isEditEdu = true;
      }
    };

    $scope.toggleExp = function (experience, value) {
      console.log('education: ', experience);
      if(experience[experience.length - 1].company === "") {
        $scope.experience.pop();
        $scope.toggleExp(experience, value);
      }
      else if(value) {
        $scope.isEditExp = false;
      }
      else {
        $scope.isEditExp = true;
      }
    };

    $scope.toggleCD = function (value) {
      if(value) {
        $scope.isEditCD = false;
      }
      else {
        $scope.isEditCD = true;
      }
    };

    $scope.toggleDescription = function (value) {
      if(value) {
        $scope.isEditDescription = false;
      }
      else {
        $scope.isEditDescription = true;
      }
    };

    $scope.showEditPD = function (value) {
      console.log('In show edit');
      if(value == 'showTrue') {
        $scope.isEditPD = true;
      }
      else {
        $scope.isEditPD = false;
      }
    };

    $scope.showEditEdu = function(value) {
      if(value == 'showTrue') {
        $scope.isEditEdu = true;
      }
      else {
        $scope.isEditEdu = false;
      }
    };

    $scope.addNewEdu = function() {
      edu = {examination: "", percentage: "", institution: ""};
      $scope.education.push(edu);
    };

    $scope.popOneEdu = function () {
      $scope.education.pop();
    };

    $scope.showEditExp = function(value) {
      if(value == 'showTrue') {
        $scope.isEditExp = true;
      }
      else {
        $scope.isEditExp = false;
      }
    };

    $scope.addNewExp = function() {
      exp = {company:"", duration:"", responsibilities:"", designation: ""};
      $scope.experience.push(exp);
    };

    $scope.popOneExp = function () {
      $scope.experience.pop();
    };

    $scope.editJobDetail = function (id) {
      // $scope.jobDetail = jobDetail;
      $state.go('editjob', {id: id});
    };
    // Company Profile
    $scope.company = {};
    // NavigationService.getMyProfilePage(function (data) {
    //
    // })

    NavigationService.getJob(function (data) {
      console.log('in the get job nav');
      if(data.accesslevel == 'client') {
        console.log('job details: ', $scope.jobs);
        $scope.jobs = data.company.job;
      }
    });

    $scope.sureDelete = function (jobDetail) {
      $scope.job = jobDetail;
      console.log('job detail are you sure: ', $scope.job);
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/areyousure.html",
        scope: $scope
      });
    };

    $scope.deleteJob = function (id) {
      NavigationService.deleteJob(id, function (data) {
        console.log('delete job: ', data);
        if(data.value) {
          location.reload();
        }
      });
    };

    // $scope.editJob = function () {

    // }

    $scope.job = function () {
      NavigationService.session(function (data) {
        console.log('data: ', data);
        if(data && data.accesslevel == 'client') {
          $state.go('newjob');
        }
        else {
          console.log('Please Log in First');
        }
      });
    };

    $scope.EditCD = function (value) {
      if(value == 'showTrue') {
        $scope.isEditCD = true;
      }
      else {
       $scope.isEditCD = false;
      }
    };

    $scope.EditDescription = function (value) {
      if(value == 'showTrue') {
        $scope.isEditDescription = true;
      }
      else {
       $scope.isEditDescription = false;
      }
    };

    $scope.submitCD = function (formData, formValid) {
      if(formValid.$valid) {
        NavigationService.submitEditClient(formData, function (data) {
          console.log('response edit client: ', data);
          if(data.value) {
            console.log('In the if statement');
            $scope.isEditCD = false;
            $scope.isEditDescription = false;
          }
        });
      }
    };

    $scope.submitLogo = function (value, formValid) {
      // if(formValid.$valid) {
        console.log('uploader: ', value);
        NavigationService.submitEditClient(value, function (data) {
          console.log('response edit client: ', data);
          if(data.value) {
            console.log('In the if statement');
            $scope.isEditCD = false;
            $scope.isEditDescription = false;
          }
        });
      // }
    };
    // $scope.submitEdit = function () {
    //   NavigationService.submitEdit($scope.personalDetails, $scope.education, $scope.experience, $scope.displayPic, function (data) {
    //       if(data.value) {
    //         console.log('Submitted Successfully!')
    //       }
    //   })
    // }

    // NavigationService.findAllJobs(function (data) {
    //   $scope.notifications = data;
    //   console.log('notifications: ', $scope.notifications);
    //   // $scope.jobNumber[0] = $scope.joblist.data[0];
    //   // $scope.jobNumber[1] = $scope.joblist.data[1];
    // });

    // $scope.notifications = [{
    //         "id":1,
    //         "title":"efjowefjoiwefj",
    //         "image":"img/resgration.png",
    //         "company": "BobCorn",
    //         "jobPayment": "Hourly",
    //         "payment": "Rs. 1000-2000",
    //         "timeCommitment": "40 hours weekly",
    //         "postingDate": "Fri Feb 19 2016 13:43:11 GMT+0530 (IST)",
    //         "expiryDate": "Fri Feb 26 2016 13:43:11 GMT+0530 (IST)",
    //         "description": "This is an awesome job! you should try it!!",
    //         "city":"Mumbai",
    //         "jobRole":"developer"
    //     },

    //     {
    //         "id":2,
    //         "title":"efjowefjoiwefj",
    //         "image":"img/resgration.png",
    //         "company": "AapCot",
    //         "jobPayment": "Hourly",
    //         "payment": "Rs. 1000-2000",
    //         "timeCommitment": "40 hours weekly",
    //         "postingDate": "Fri Feb 19 2016 13:43:11 GMT+0530 (IST)",
    //         "expiryDate": "Fri Feb 26 2016 13:43:11 GMT+0530 (IST)",
    //         "description": "This is an awesome job! you should try it!!",
    //         "city":"Delhi",
    //         "jobRole":"designer"
    //     },

    //     {
    //         "id":3,
    //         "title":"efjowefjoiwefj",
    //         "image":"img/resgration.png",
    //         "company": "BindCity",
    //         "jobPayment": "Hourly",
    //         "payment": "Rs. 1000-2000",
    //         "timeCommitment": "40 hours weekly",
    //         "postingDate": "Fri Feb 19 2016 13:43:11 GMT+0530 (IST)",
    //         "expiryDate": "Fri Feb 26 2016 13:43:11 GMT+0530 (IST)",
    //         "description": "This is an awesome job! you should try it!!",
    //         "city":"Bangalore",
    //         "jobRole":"developer"
    //     },

    //     {
    //         "id":4,
    //         "title":"efjowefjoiwefj",
    //         "image":"img/resgration.png",
    //         "company": "CapLoft",
    //         "jobPayment": "Hourly",
    //         "payment": "Rs. 1000-2000",
    //         "timeCommitment": "40 hours weekly",
    //         "postingDate": "Fri Feb 19 2016 13:43:11 GMT+0530 (IST)",
    //         "expiryDate": "Fri Feb 26 2016 13:43:11 GMT+0530 (IST)",
    //         "description": "This is an awesome job! you should try it!!",
    //         "city":"Hyderabad",
    //         "jobRole":"developer"
    //     },
    //     {
    //         "id":5,
    //         "title":"efjowefjoiwefj",
    //         "image":"img/resgration.png",
    //         "company": "CapLoft",
    //         "jobPayment": "Hourly",
    //         "payment": "Rs. 1000-2000",
    //         "timeCommitment": "40 hours weekly",
    //         "postingDate": "Fri Feb 19 2016 13:43:11 GMT+0530 (IST)",
    //         "expiryDate": "Fri Feb 26 2016 13:43:11 GMT+0530 (IST)",
    //         "description": "This is an awesome job! you should try it!!",
    //         "city":"Mangalore",
    //         "jobRole":"Architect"
    //     },
    //     {
    //         "id":6,
    //         "title":"efjowefjoiwefj",
    //         "image":"img/resgration.png",
    //         "company": "CapLoft",
    //         "jobPayment": "Hourly",
    //         "payment": "Rs. 1000-2000",
    //         "timeCommitment": "40 hours weekly",
    //         "postingDate": "Fri Feb 19 2016 13:43:11 GMT+0530 (IST)",
    //         "expiryDate": "Fri Feb 26 2016 13:43:11 GMT+0530 (IST)",
    //         "description": "This is an awesome job! you should try it!!",
    //         "city":"Mysore",
    //         "jobRole":"Architect"
    //     },
    //     {
    //         "id":7,
    //         "title":"efjowefjoiwefj",
    //         "image":"img/resgration.png",
    //         "company": "CapLoft",
    //         "jobPayment": "Hourly",
    //         "payment": "Rs. 1000-2000",
    //         "timeCommitment": "40 hours weekly",
    //         "postingDate": "Fri Feb 19 2016 13:43:11 GMT+0530 (IST)",
    //         "expiryDate": "Fri Feb 26 2016 13:43:11 GMT+0530 (IST)",
    //         "description": "This is an awesome job! you should try it!!",
    //         "city":"Chennai",
    //         "jobRole":"developer"
    //     },
    //     {
    //         "id":8,
    //         "title":"efjowefjoiwefj",
    //         "image":"img/resgration.png",
    //         "company": "CapLoft",
    //         "jobPayment": "Hourly",
    //         "payment": "Rs. 1000-2000",
    //         "timeCommitment": "40 hours weekly",
    //         "postingDate": "Fri Feb 19 2016 13:43:11 GMT+0530 (IST)",
    //         "expiryDate": "Fri Feb 26 2016 13:43:11 GMT+0530 (IST)",
    //         "description": "This is an awesome job! you should try it!!",
    //         "city":"Latur",
    //         "jobRole":"Businessman"
    //     }]
  })

  .controller('SearchresultCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("search-result");
    $scope.menutitle = NavigationService.makeactive("Search Result");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })

  .controller('CompanyProfileCtrl', function($state, $scope,  TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("company-profile");
    $scope.menutitle = NavigationService.makeactive("My Profile");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.company = {};
    NavigationService.getMyProfilePage(function (data) {
      $scope.company = data;
      console.log('company: ', $scope.company);
    });

    // jobIds = $scope.company.job;
    // $scope.jobs = []
    // for(var i=0; i<jobIds.length(); i++) {

    // }

    NavigationService.getJob(function (data) {
      $scope.jobs = data.company.job;
    });

    $scope.job = function () {
      NavigationService.session(function (data) {
        console.log('data: ', data);
        if(data && data.accesslevel == 'client') {
          $state.go('newjob');
        }
        else {
          console.log('Please Log in First');
        }
      });
    };

    $scope.EditCD = function (value) {
      if(value == 'showTrue') {
        $scope.isEditCD = true;
      }
      else {
       $scope.isEditCD = false;
      }
    };

    $scope.EditDescription = function (value) {
      if(value == 'showTrue') {
        $scope.isEditDescription = true;
      }
      else {
       $scope.isEditDescription = false;
      }
    };

    $scope.submitCD = function (formData, formValid) {
      if(formValid.$valid) {
        NavigationService.submitEditClient(formData, function (data) {
          console.log('response edit client: ', data);
          if(data.value) {
            console.log('In the if statement');
            $scope.isEditCD = false;
            $scope.isEditDescription = false;
          }
        });
      }
    };

    // $scope.company = {
    //   "companyDetails": {
    //       "email": "avicci@gmail.com",
    //       "companyName": "AapCot",
    //       "name": "Priyanka Kumbhar",
    //       "contactNo": "8087120163",
    //       "address": "Aarey Colony",
    //       "experience":"As a UI Designer in wohlig technology. 4 year of exprience"
    //   },

    //   "description": "Lorem ipsum dolor It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",

    //   "jobs": [{
    //           "title": "program manager",
    //           "description": "part time from office with skills in business, development, sales, training, education, sales, training, education, management, learning and development, 6-8 years of work experience for prepmyskills.com"

    //       },

    //       {
    //           "title": "program manager",
    //           "description": "part time from office with skills in business, development, sales, training, education, sales, training, education, management, learning and development, 6-8 years of work experience for prepmyskills.com"

    //       },

    //       {
    //           "title": "program manager",
    //           "description": "part time from office with skills in business, development, sales, training, education, sales, training, education, management, learning and development, 6-8 years of work experience for prepmyskills.com"

    //       },

    //       {
    //           "title": "program manager",
    //           "description": "part time from office with skills in business, development, sales, training, education, sales, training, education, management, learning and development, 6-8 years of work experience for prepmyskills.com"

    //       }
    //   ]}
  })

  .controller('PostjobCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("post-job");
    $scope.menutitle = NavigationService.makeactive("View Applicants");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    NavigationService.getCategoryOptions(function (data) {
      $scope.categoryOptions = data;
      console.log('categoryOptions: ', $scope.categoryOptions);
    });

    $scope.getValue = function (value) {
      console.log('selected value: ', value);
      $.jStorage.set('jobCategory', value);
    };

    // $scope.categoryOptions = ["Design", "Websites IT Software", "Mobile", "Data Entry", "Product Sourcing", "Sales & Marketing", "Business Accounting & Legal"]
  })

  .controller('NewjobCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("newjob");
    $scope.menutitle = NavigationService.makeactive("New Job");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.newJob = function (formValid, jobData) {
      NavigationService.session(function (data) {
        console.log('session: ', data);
        if(data && formValid.$valid) {
          NavigationService.postNewJob(jobData, function (data) {
            console.log('response new job: ', data);
          });
        }
      });
    };
  })

  .controller('ResumeCtrl', function($uibModal, $stateParams, $scope, TemplateService,
    NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("resume");
    $scope.menutitle = NavigationService.makeactive("Resume");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    // $scope.resume = $stateParams.data;
    // console.log('Resume: ', $scope.resume);
    $scope.resume = {};
    NavigationService.getResume($stateParams.id, function (data) {
      $scope.resume = data;
      console.log('Resume: ', $scope.resume);
    });
    console.log('lancer controller: ', $stateParams.lancer);
    console.log('job controller: ', $stateParams.job);
    $scope.message = "";
    $scope.openpop = function (data) {
      NavigationService.getShortlist($scope.resume, $.jStorage.get('jobCategory'), function (data) {
        $scope.message = data.comment;
      });
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/message.html",
        scope: $scope
      });
    };

  })

  .controller('Commmunity', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("community");
    $scope.menutitle = NavigationService.makeactive("Commmunity");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })
.controller('RegisterLancerCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("registerlancer");
    $scope.menutitle = NavigationService.makeactive("Register Lancer");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.register = "Here it is!";

    $scope.login = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/login.html",
        controller: "RegisterLancerCtrl",
        //  scope: $scope
      });
    };
    // $scope.login = {}
    $scope.submitLogin = function (loginData) {
      console.log(loginData);
      loginData.accesslevel="lancer";
      NavigationService.login(loginData, function (data) {
        console.log('response: ', data);
        // $scope.wrongCredentials = false;
        if(data.value === false) {
          console.log('In the if statement');
          $scope.wrongCredentials = true;
        }
        // $uibModal.dismiss('cancel')
        else {
          NavigationService.session(function (data) {
            if(data.accesslevel == 'lancer'){
              console.log('In the else statement');
              $scope.wrongCredentials = false;
              // $uibModal.dismiss();
              // var flag4 = $scope.navigation.link.indexOf('registerlancer')
              // if(flag4 == -1) {
              //   $scope.navigation.splice(1,1);
              // }
              $state.go('searchcategory');
            }
          });
        }
      });
    };

    $scope.forgotpop = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/forgotpop.html",
        controller: "RegisterLancerCtrl"
      });
    };

    $scope.submitEmail = function (email) {
      console.log('forgotpop: ', email);
      NavigationService.forgot(email, function (data) {
        console.log('response forgot: ', data);
        if(data.value === true) {
          $scope.success = true;
          $uibModal.open({
            animation: true,
            templateUrl: "views/modal/login.html",
            controller: "RegisterLancerCtrl"
          });
        }
      });
    };



    // $scope.submitForm = function(formregistration,formValid) {

    // };

    // $scope.formregistration = {};
    $scope.signUpLancer = function (formregistration,formValid) {
      console.log('picture: ', formregistration.picture);
      console.log('resume: ', formregistration.resume);
      if(formValid.$valid){
        $scope.completeRegister = true;
        NavigationService.signUpLancer(formregistration, function (data) {
          console.log('registerlancer response: ', data);
          if(data.value) {
            $state.go('searchcategory');
          }
        });
      }
      else {

      }
    };

    // $scope.uploader = new FileItem();

    // // $scope.uploader.onSuccess(function () {
    // //   console.log('successfully uploaded!');
    // // })

    $scope.mySlides = [
      '../img/landing.jpg',
    ];
  })

  .controller('RegisterClientCtrl', function($state, $scope, TemplateService, NavigationService, $timeout,$uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("registerclient");
    $scope.menutitle = NavigationService.makeactive("register Client");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    // $scope.registration = {};
    // $scope.companyDetails = {};
    $scope.signUpClient = function (formData, formValid) {
      // companyDetails = formData.company;
      // console.log(companyDetails)
      if(formValid.$valid){
        NavigationService.signUpClient(formData, function (data) {
          console.log(data);
          if(data.value === true) {
            $state.go('postjob');
          }
          else {
            console.log('Error: ', data.comment);
          }
        });
      }
    };

    $scope.login = function() {
      $uibModal. open({
        animation: true,
        templateUrl: "views/modal/login.html",
        controller: "RegisterClientCtrl"
      });
    };

    // $scope.uploadFile = function(){
    //  var file = $scope.formregistration.image;

    //  console.log('file is' );
    //  console.dir(file);

    //  fileUpload.uploadFileToUrl(file, uploadUrl);
    // };
    $scope.submitLogin = function (loginData) {
      loginData.accesslevel="client";
      console.log(loginData);
      NavigationService.login(loginData, function (data) {
        console.log('response: ', data);
        // $scope.wrongCredentials = false;
        if(data.value === false) {
          console.log('In the if statement');
          $scope.wrongCredentials = true;
        }
        // $uibModal.dismiss('cancel')
        else {
          console.log('In the else statement');
          // $scope.modal.dismiss('cancel');
          NavigationService.session(function (data) {
            console.log('session response: ', data);
            if(data.accesslevel == "client") {
              console.log('In the if statement!!!');
              $scope.wrongCredentials = false;
              // var flag3 = $scope.navigation.link.indexOf('registerlancer');
              // if(flag3 == -1) {
              //   $scope.navigation.splice(1,1);
              // }
              $state.go('postjob');
            }
          });

        }
      });
    };

    // $scope.submitLogin = function (loginData) {
    //   console.log(loginData)
    //   NavigationService.login(loginData, function (data) {
    //     console.log('response: ', data)
    //   })
    // }

    $scope.forgotpop = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/forgotpop.html",
        controller: "RegisterClientCtrl"
      });
    };
  })

  .controller('UploadCtrl', function($scope, $upload, $timeout) {

    var uploadres = [];
    //imageupload
    var imagejstupld = "";
    $scope.usingFlash = FileAPI && FileAPI.upload !== null;
    $scope.fileReaderSupported = window.FileReader !== null && (window.FileAPI === null || FileAPI.html5 !== false);
    $scope.uploadRightAway = true;
    $scope.changeAngularVersion = function() {
      window.location.hash = $scope.angularVersion;
      window.location.reload(true);
    };
    $scope.hasUploader = function(index) {
      return $scope.upload[index] !== null;
    };
    $scope.abort = function(index) {
      $scope.upload[index].abort();
      $scope.upload[index] = null;
    };
    $scope.angularVersion = window.location.hash.length > 1 ? (window.location.hash.indexOf('/') === 1 ?
      window.location.hash.substring(2) : window.location.hash.substring(1)) : '1.2.20';
      // $scope.uploader.onSuccess(function () {
      //   console.log('successfully uploaded!')
      // });

    $scope.onFileSelect = function($files, whichone, callback) {
      $scope.isloading = true;
      $scope.noPhoto = false;
      // $scope.imageAccess = false;
      $scope.selectedFiles = [];
      $scope.progress = [];
      console.log($files);
      if ($scope.upload && $scope.upload.length > 0) {
        for (var i = 0; i < $scope.upload.length; i++) {
          if ($scope.upload[i] !== null) {
            $scope.upload[i].abort();
          }
        }
      }
      $scope.upload = [];
      $scope.uploadResult = uploadres;
      $scope.selectedFiles = $files;
      $scope.dataUrls = [];
      for (var j = 0; j < $files.length; j++) {
        var $file = $files[j];
        console.log('files: ', $file);
        if ($scope.fileReaderSupported && ($file.type.indexOf('image') || $file.type.indexOf('application')) > -1) {
          var fileReader = new FileReader();
          fileReader.readAsDataURL($files[j]);
          var loadFile = function(fileReader, index) {
            fileReader.onload = function(e) {
              $timeout(function() {
                $scope.dataUrls[index] = e.target.result;
              });
            };
          }(fileReader, j);
        }
        $scope.progress[j] = -1;
        if ($scope.uploadRightAway) {
          $scope.start(j,whichone);
        }
      }
    };

    $scope.start = function(index,whichone) {
      // cfpLoadingBar.start();
      $scope.progress[index] = 0;
      $scope.errorMsg = null;
      $scope.howToSend = 1;
      if ($scope.howToSend == 1) {
        $scope.upload[index] = $upload.upload({
          url: uploadUrl,
          method: "POST",
          headers: {
            'Content-Type': 'Content-Type'
          },
          data: {
            myModel: $scope.myModel
          },
          file: $scope.selectedFiles[index],
          fileFormDataName: 'file'
        });
        $scope.upload[index].then(function(response) {
          $timeout(function() {
            // cfpLoadingBar.complete();
            $scope.uploadResult.push(response.data);
            console.log('upload response: ', response.data);
            if(response.data) {
              $scope.isloading = false;
              $scope.noPhoto =true;
              console.log('is loading: ', $scope.isloading);
              console.log('noPhoto: ', $scope.noPhoto);
              // if(response.data.files) {
              //   $scope.noPhoto
              // }
            }
            // else {

            // }
            if(whichone ==1){
              console.log('image access: ', $scope.imageAccess);
              if($scope.imageAccess == 'lancer') {
                $scope.formregistration.picture=response.data.files[0].fd;
              }
              else if($scope.imageAccess == 'client'){
                $scope.registration.image=response.data.files[0].fd;
              }
              else if($scope.imageAccess == 'editLancer'){
                $scope.profilepic=response.data.files[0].fd;
                $scope.done = true;
              }
              else if($scope.imageAccess == 'editClient'){
                $scope.company.image=response.data.files[0].fd;
                $scope.done = true;
              }
            }else{
              $scope.formregistration.resume=response.data.files[0].fd;
              $scope.formregistration.filename=response.data.files[0].filename;
            }
          });
        }, function(response) {
          if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
        }, function(evt) {
          $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
        $scope.upload[index].xhr(function(xhr) {});
      } else {
        var fileReader = new FileReader();
        fileReader.onload = function(e) {
          $scope.upload[index] = $upload.http({
            url: uploadUrl,
            headers: {
              'Content-Type': $scope.selectedFiles[index].type
            },
            data: e.target.result
          }).then(function(response) {
            $scope.uploadResult.push(response.data);
          }, function(response) {
            if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
          }, function(evt) {
            $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          });
        };
        fileReader.readAsArrayBuffer($scope.selectedFiles[index]);
      }
    };

    // $scope.uploadFile = function(){
    //  var file = $scope.formregistration.picture;

    //  console.log('file is' );
    //  console.dir(file);

    //  var uploadUrl = "http://localhost/me/img/fileUpload";
    //  fileUpload.uploadFileToUrl(file, uploadUrl);
    // };
    // $scope.uploader = new FileUploader();

    // console.log('uploader: ', $scope.uploader);

    // $scope.upload = function () {
    //   console.log('uploader: ', $scope.uploader);
    // }
    // $scope.uploadComplete = function (content) {
    //   // $scope.response = JSON.parse(content); // Presumed content is a json string!
    //   // $scope.response.style = {
    //   //   color: $scope.response.color,
    //   //   "font-weight": "bold"
    //   // };
    //   console.log(content);

    //   // Clear form (reason for using the 'ng-model' directive on the input elements)
    //   // $scope.fullname = '';
    //   // $scope.gender = '';
    //   // $scope.color = '';
    //   // Look for way to clear the input[type=file] element
    // };
  })

  .controller('LandingCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("landing");
    $scope.menutitle = NavigationService.makeactive("Landing");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    TemplateService.header = "";

  })
  .controller('SuccessstoriesCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("successstories");
    $scope.menutitle = NavigationService.makeactive("Success Stories");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    // TemplateService.header = "";

    NavigationService.getTestimonials(function (data) {
      $scope.testimonials = data;
      console.log('testimonials: ', $scope.testimonials);
    });

    // $scope.testimonials = [{
    //   image: "img/search.png",
    //   name: "seema yadav",
    //   designation: "Manager",
    //   company: "aapcot",
    //   comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    // }, {
    //   image: "img/search.png",
    //   name: "seema yadav",
    //   designation: "Manager",
    //   company: "aapcot",
    //   comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    // }];
  })

.controller('headerctrl', function($scope, $state, TemplateService, NavigationService) {
  $scope.template = TemplateService;
  $scope.navigation = NavigationService.getnav('general');
  // $scope.isSession = true;
  // var flag4 = $scope.navigation.link.indexOf('registerlancer')
  console.log('navigation: ', $scope.navigation);
  console.log('session variable: ', $scope.isSession);
  NavigationService.session(function (data) {
    console.log('session data: ', data);
    if(data.name) {
      $scope.isSession = true;
      $scope.profile = data;
      if(data.accesslevel == 'lancer') {
        $scope.navigation = NavigationService.getnav('lancer');  
      }
      else if(data.accesslevel == 'client') {
        $scope.navigation = NavigationService.getnav('client');  
      }
    }
  });
  console.log('session variable2: ', $scope.isSession);
  $scope.slideclass = "slide-out";
  $scope.slidemenu = function() {
    if($scope.slideclass == "slide-out")
      $scope.slideclass = "slide-in";
    else
      $scope.slideclass = "slide-out";
  };

  $scope.logout = function () {
    NavigationService.logout(function (data) {
      console.log('logout response: ', data);
      if(data.value) {
        $scope.isSession = false;
        $scope.navigation = NavigationService.getnav('general');
        $state.go('home');
      }
    });
  };

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
    // console.log('state changed!!')
    // console.log('event: ', event)
    // console.log('toState: ', toState.name)
    // console.log('toParams: ', toParams)
    // console.log('fromState: ', fromState)
    // console.log('fromParams: ', fromParams)
    NavigationService.session(function (data) {
      if(data.name) {
        $scope.isSession = true;
      }
      if(!$scope.isSession) {
        $scope.navigation.splice(4,1);
        console.log('session variable: ', $scope.isSession);
        if(toState.name !== 'home') {
          if(toState.name !== 'searchcategory' &&
            toState.name !== 'successstories' &&
            toState.name !== 'registerlancer' &&
            toState.name !== 'registerclient' &&
            toState.name !== 'about'){
              alert('Please sign up or login first');
              $state.go('home');
          }
        }
      }
    });
  });

})

;
