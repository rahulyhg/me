// window.uploadUrl = "http://www.myfynx.com/newfynx/index.php/json/uploadImage";
window.uploadUrl = "http://192.168.0.126:1337/uploadfile/upload";
angular.module('phonecatControllers', ['templateservicemod', 'infinite-scroll', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider', 'angularFileUpload', 'angularMoment'])


.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("home");
    $scope.menutitle = NavigationService.makeactive("Home");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.mySlides = [
      {
        img: "img/banners/1.jpg",
        line1: 'Time is at a premium,',
        line2: 'so are the minds respecting it.'
      },
      {
        img: "img/banners/2.jpg",
        line1: 'Passion is the fuel,',
        line2: 'So are the minds driven by it.'
      },
      {
        img: "img/banners/3.jpg",
        line1: 'Flexible Multi-takers are a necessity,',
        line2: 'not an option.'
      },
      {
        img: "img/banners/4.jpg",
        line1: 'Talent returning is value returning back.'
      }
    ];
  })
  .controller('AboutCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("aboutus");
    $scope.menutitle = NavigationService.makeactive("About");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.mySlides = [
      'img/landing.jpg',
    ];
  })
  .controller('JobListingCtrl', function($scope, TemplateService, NavigationService, $timeout) {
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
    $scope.getJobs = function (page) {
      NavigationService.findAllJobs(page, function (data) {
        $scope.joblist = data.data;
        $scope.count = data.total;
      });
    }
    var page = 1;
    // NavigationService.findAllJobs(page, function (data) {
    //   $scope.joblist = data.data;
    //   // console.log('joblist: ', $scope.joblist);
    //   // $scope.jobNumber[0] = $scope.joblist.data[0];
    //   // $scope.jobNumber[1] = $scope.joblist.data[1];
    // });
    $scope.getJobs(page);
    $scope.loadMore = function () {
      if($scope.joblist.pagenumber < $scope.joblist.totalpages) {
        // var last = $scope.joblist.totalpages;
        console.log('joblist length: ', $scope.joblist.data.length)
        console.log('last: ', last)
        console.log('jobNumber: ', $scope.jobNumber)
        // for (var i = 1; i <= 2; i++) {
            // console.log('in the if statement')
            ++$scope.joblist.pagenumber;
            $scope.getJobs($scope.joblist.pagenumber)
          // }
        // console.log('job number: ', $scope.jobNumber)
      }
    }

    $scope.mySlides = [
      'img/landing.jpg',
    ];

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
  .controller('JobDetailCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("job-detail");
    $scope.menutitle = NavigationService.makeactive("Job Listing");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

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

    NavigationService.getEachJobDetail(function (data) {
      $scope.jobDetail = data;
      console.log('job detail: ', $scope.jobDetail);
    });

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

  .controller('SearchCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("search");
    $scope.menutitle = NavigationService.makeactive("Search");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.jobs = {
    "count": 30,
    "lastPage": 3
    }

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

    $scope.pageOfJobs = []
    NavigationService.getAllFreelancers(function (data) {
      $scope.jobs = data;
      console.log('all freelancers: ', $scope.jobs);
      $scope.pageOfJobs[0] = $scope.jobs.data[0];
      $scope.pageOfJobs[1] = $scope.jobs.data[1];
      console.log('all freelancers2: ', $scope.pageOfJobs);
    });

    $scope.loadMoreTwo = function () {
      // console.log('In the load more two function')
      // console.log('jobs length: ', $scope.jobs.data.length)
      if($scope.pageOfJobs.length < $scope.jobs.data.length-1)
      {
        console.log('all freelancers1: ', $scope.pageOfJobs);
        var last = $scope.pageOfJobs.length;
        console.log('last: ', last);
        for (var i = 0; i < 2; i++) {
          $scope.pageOfJobs.push($scope.jobs.data[last + i]);
        }
        console.log('job number: ', $scope.pageOfJobs)
      }
    }

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
  .controller('SearchcategoryCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("search-category");
    $scope.menutitle = NavigationService.makeactive("Search Category");
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
            $scope.cityOptions.push(value.state)
          }
        }
        if(value.city) {
          flag2 = _.findIndex($scope.cityOptions, function(o) {
            return o == value.city;
          });
          console.log('flag 2', flag2)
          if(flag2 == -1) {
            $scope.cityOptions.push(value.city)
          }
        }
      console.log('cityOptions: ', $scope.cityOptions);
      });
    })

    NavigationService.getCategoryOptions(function (data) {
      // $scope.categoryOptions = data;
      $scope.categoryOptions = []
      _.each(data, function (value) {
        flag = _.findIndex($scope.categoryOptions, function(o) {
          console.log(o);
          console.log(value.designation);
          return o == value.designation;
        });
        // console.log(flag);
        if(flag == -1) {
          $scope.categoryOptions.push(value.designation)
        }
        // $scope.categoryOptions.push(value.designation)
      })
      console.log('categoryOptions: ', $scope.categoryOptions);
    })
  })
  .controller('RegistrationCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("registration");
    $scope.menutitle = NavigationService.makeactive("Registration");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })
  .controller('ProfileCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("profile");
    $scope.menutitle = NavigationService.makeactive("Profile");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

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
    $scope.education = []
    $scope.experience = []
    $scope.displayPic = ""
    $scope.personalDetails = {}
    NavigationService.getMyProfilePage(function (data) {
      // $scope.myProfile = data;
      $scope.displayPic = data.profilepic;
      $scope.personalDetails= {"name": data.name, "email": data.email, "contactNo": data.contactNo, "address": data.location}
      if(!data.education) {
        $scope.education = [{examination: "", percentage: "", institution: ""}]
      }
      else if(data.education) {
       $scope.education = data.education;
      }

      if(!data.experience) {
        $scope.experience = [{company:"", duration:"", responsibilities:"", designation: ""}]
      }
      else if(data.experience) {
       $scope.experience = data.experience;
      }
      console.log(data)
    })

    // $scope.showEditPD = function (value) {
    //   console.log('In show edit');
    //   if(value == 'showTrue') {
    //     $scope.isEditPD = true;
    //   }
    //   else {
    //     $scope.isEditPD = false;
    //   }
    // }

    $scope.showEditEdu = function(value) {
      if(value == 'showTrue') {
        $scope.isEditEdu = true;
      }
      else {
        $scope.isEditEdu = false;
      }
    }

    $scope.addNewEdu = function() {
      edu = {examination: "", percentage: "", institution: ""}
      $scope.education.push(edu);
    }

    $scope.showEditExp = function(value) {
      if(value == 'showTrue') {
        $scope.isEditExp = true;
      }
      else {
        $scope.isEditExp = false;
      }
    }

    $scope.addNewExp = function() {
      exp = {company:"", duration:"", responsibilities:"", designation: ""}
      $scope.experience.push(exp);
    }

    $scope.submitEdit = function () {
      NavigationService.submitEdit($scope.personalDetails, $scope.education, $scope.experience, $scope.displayPic, function (data) {
          if(data.value) {
            console.log('Submitted Successfully!')
          }
      })
    }

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

  .controller('CompanyProfileCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("company-profile");
    $scope.menutitle = NavigationService.makeactive("Company Profile");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    NavigationService.getCompanyProfile(function (data) {
      $scope.company = data;
      console.log('company: ', $scope.company);
    })

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
    $scope.menutitle = NavigationService.makeactive("Post Job");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    NavigationService.getCategoryOptions(function (data) {
      $scope.categoryOptions = data;
      console.log('categoryOptions: ', $scope.categoryOptions);
    })

    // $scope.categoryOptions = ["Design", "Websites IT Software", "Mobile", "Data Entry", "Product Sourcing", "Sales & Marketing", "Business Accounting & Legal"]
  })

  .controller('NewjobCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("newjob");
    $scope.menutitle = NavigationService.makeactive("New Job");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })

  .controller('ResumeCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("resume");
    $scope.menutitle = NavigationService.makeactive("Resume");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    NavigationService.getResume(function (data) {
      $scope.resume = data;
      console.log('Resume: ', $scope.resume);
    })
  })

  .controller('Commmunity', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("community");
    $scope.menutitle = NavigationService.makeactive("Commmunity");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })
.controller('RegisterLancerCtrl', function($scope, TemplateService, NavigationService, $timeout,$uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("registerlancer");
    $scope.menutitle = NavigationService.makeactive("Register Lancer");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.login = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/login.html",
        controller: "RegisterLancerCtrl"
      })
    };

    $scope.forgotpop = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/forgotpop.html",
        controller: "RegisterLancerCtrl"
      })
    };



    $scope.submitForm = function(formregistration,formValid) {
      if(formValid.$Valid){
        $scope.completeRegister = true;
      }
      else {

      }
    };

    $scope.formregistration = {};
    $scope.signUpLancer = function () {
      console.log('picture: ', $scope.formregistration.picture.name);
      console.log('resume: ', $scope.formregistration.resume.name);

      NavigationService.signUpLancer($scope.formregistration, function (data) {
        console.log(data);
      })
    }

    // $scope.uploader = new FileItem();

    // // $scope.uploader.onSuccess(function () {
    // //   console.log('successfully uploaded!');
    // // })

    $scope.mySlides = [
      '../img/landing.jpg',
    ];
  })

  .controller('RegisterClientCtrl', function($scope, TemplateService, NavigationService, $timeout,$uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("registerclient");
    $scope.menutitle = NavigationService.makeactive("register Client");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.registration = {};
    $scope.companyDetails = {};
    $scope.signUpClient = function () {
      $scope.companyDetails = $scope.registration.company;
      console.log($scope.companyDetails)
      NavigationService.signUpClient($scope.registration, $scope.companyDetails, function (data) {
        console.log(data);
      })
    }

    // $scope.uploadFile = function(){
    //  var file = $scope.formregistration.image;

    //  console.log('file is' );
    //  console.dir(file);

    //  fileUpload.uploadFileToUrl(file, uploadUrl);
    // };
    $scope.login = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/login.html",
        controller: "RegisterClientCtrl"
      })
    };

    $scope.forgotpop = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/forgotpop.html",
        controller: "RegisterClientCtrl"
      })
    };
  })

  .controller('UploadCtrl', function($scope, $upload, $timeout) {

    var uploadres = [];
    //imageupload
    var imagejstupld = "";
    $scope.usingFlash = FileAPI && FileAPI.upload != null;
    $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
    $scope.uploadRightAway = true;
    $scope.changeAngularVersion = function() {
      window.location.hash = $scope.angularVersion;
      window.location.reload(true);
    };
    $scope.hasUploader = function(index) {
      return $scope.upload[index] != null;
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

    $scope.onFileSelect = function($files,whichone) {
      $scope.isloading = true;
      $scope.selectedFiles = [];
      $scope.progress = [];
      console.log($files);
      if ($scope.upload && $scope.upload.length > 0) {
        for (var i = 0; i < $scope.upload.length; i++) {
          if ($scope.upload[i] != null) {
            $scope.upload[i].abort();
          }
        }
      }
      $scope.upload = [];
      $scope.uploadResult = uploadres;
      $scope.selectedFiles = $files;
      $scope.dataUrls = [];
      for (var i = 0; i < $files.length; i++) {
        var $file = $files[i];
        console.log('files: ', $file)
        if ($scope.fileReaderSupported && ($file.type.indexOf('image') || $file.type.indexOf('application')) > -1) {
          var fileReader = new FileReader();
          fileReader.readAsDataURL($files[i]);
          var loadFile = function(fileReader, index) {
            fileReader.onload = function(e) {
              $timeout(function() {
                $scope.dataUrls[index] = e.target.result;
              });
            }
          }(fileReader, i);
        }
        $scope.progress[i] = -1;
        if ($scope.uploadRightAway) {
          $scope.start(i,whichone);
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
            console.log(response.data.value);
            if(whichone ==1){
              $scope.formregistration.picture=response.data.files[0].fd;
              $scope.registration.picture=response.data.files[0].fd;
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
        }
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
    })

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

.controller('headerctrl', function($scope, TemplateService) {
  $scope.template = TemplateService;

  $scope.slideclass = "slide-out"
  $scope.slidemenu = function() {
    if($scope.slideclass == "slide-out")
    $scope.slideclass = "slide-in";
    else
    $scope.slideclass = "slide-out"
  }

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });

})

;
