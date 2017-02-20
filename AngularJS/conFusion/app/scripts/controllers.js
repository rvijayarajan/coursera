'use strict';

var app = angular.module('confusionApp');
app.controller('MenuController', function($scope, menuFactory) {
    
    $scope.dishes = menuFactory.getDishes();
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

app.controller('DishDetailController', function ($scope, menuFactory) {
	
	$scope.dish = menuFactory.getDish(3);
	
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