'use strict';

var app = angular.module('confusionApp',[]);
app.controller('MenuController', function($scope) {
    var dishes=[
                 {
                   name:'Uthapizza',
                   image: 'images/uthapizza.png',
                   category: 'mains',
                   label:'Hot',
                   price:'4.99',
                   description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
                   comment: ''
                },
                {
                   name:'Zucchipakoda',
                   image: 'images/zucchipakoda.png',
                   category: 'appetizer',
                   label:'',
                   price:'1.99',
                   description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
                   comment: ''
                },
                {
                   name:'Vadonut',
                   image: 'images/vadonut.png',
                   category: 'appetizer',
                   label:'New',
                   price:'1.99',
                   description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
                   comment: ''
                },
                {
                   name:'ElaiCheese Cake',
                   image: 'images/elaicheesecake.png',
                   category: 'dessert',
                   label:'',
                   price:'2.99',
                   description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
                   comment: ''
                }
                ];

    $scope.dishes = dishes;
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    
    $scope.select = function(setTab) {
        $scope.tab = setTab;
        if (setTab === 2) {
          $scope.filtText = "appetizer";
        }    
        else if (setTab === 3) {
          $scope.filtText = "mains";
        }
        else if (setTab === 4) {
          $scope.filtText = "dessert";
        }
        else {
          $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
    };
});

app.controller('ContactController', function ($scope) {
    $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
    };
	var channels = [
		{value:"tel", label:"Tel."}, 
		{value:"Email",label:"Email"}
	];
	$scope.channels = channels;
	$scope.invalidChannelSelection = false;
});

app.controller('FeedbackController', function ($scope) {
    $scope.sendFeedback = function() {
		console.log($scope.feedback);
		if ($scope.feedback.agree && ($scope.feedback.mychannel === "")&& !$scope.feedback.mychannel) {
			$scope.invalidChannelSelection = true;
			console.log('incorrect');
		}
		else {
			$scope.invalidChannelSelection = false;
			$scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
			$scope.feedback.mychannel="";

			$scope.feedbackForm.$setPristine();
			console.log($scope.feedback);
		}
	};
});

app.controller('DishDetailController', function ($scope) {
	var dish={
				name:'Uthapizza',
				image: 'images/uthapizza.png',
				category: 'mains', 
				label:'Hot',
				price:'4.99',
				description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
				comments: [
				{
				   rating:5,
				   comment:"Imagine all the eatables, living in conFusion!",
				   author:"John Lemon",
				   date:"2012-10-16T17:57:28.556094Z"
				},
				{
				   rating:4,
				   comment:"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
				   author:"Paul McVites",
				   date:"2014-09-05T17:57:28.556094Z"
				},
				{
				   rating:3,
				   comment:"Eat it, just eat it!",
				   author:"Michael Jaikishan",
				   date:"2015-02-13T17:57:28.556094Z"
				},
				{
				   rating:4,
				   comment:"Ultimate, Reaching for the stars!",
				   author:"Ringo Starry",
				   date:"2013-12-02T17:57:28.556094Z"
				},
				{
				   rating:2,
				   comment:"It's your birthday, we're gonna party!",
				   author:"25 Cent",
				   date:"2011-12-02T17:57:28.556094Z"
				}

				]
			};
	
	$scope.dish = dish;
	
});

app.controller('DishCommentController', function ($scope) {
	
	var comment = {
		rating: 5,
		comment: '',
		author: '',
		date: ''
	};
	$scope.comments = comment;
	
	$scope.submitComment = function () {
		 $scope.comments.date = new Date().toISOString();
		 $scope.comments.rating = Number($scope.comments.rating);
		 $scope.dish.comments.push($scope.comments);
		 $scope.commentForm.$setPristine();
		 $scope.comments = { rating: 5, comment: '', author: '', date: '' };
	};
});