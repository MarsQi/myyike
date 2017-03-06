/**
 * Created by Administrator on 2017/2/14.
 */
var Yike = angular.module('Yike',["ngRoute"]);

//配置route
Yike.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/today",{templateUrl:'./views/today.html',controller:'TodayCtrl'})
        .when("/older",{templateUrl:'./views/older.html',controller:'OlderCtrl'})
        .when("/author",{templateUrl:'./views/author.html',controller:'AuthorCtrl'})
        .when("/catergory",{templateUrl:'./views/category.html'})
        .when("/like",{templateUrl:'./views/like.html'})
        .when("/settings",{templateUrl:'./views/settings.html'})
        .otherwise({redirectTo:"/today"})
}]);

//设置控制器
Yike.controller("NavsCtrl",["$scope",function($scope){
    $scope.navs = [
        {text:'今日一刻',icon:'icon-home',link:'#/today'},
        {text:'往期内容',icon:'icon-file-empty',link:'#/older'},
        {text:'热门作者',icon:'icon-pencil',link:'#/author'},
        {text:'栏目浏览',icon:'icon-menu',link:'#/catergory'},
        {text:'我的喜欢',icon:'icon-heart',link:'#/like'},
        {text:'设置',icon:'icon-cog',link:'#/settings'},
    ]
}])
//设置today控制器
Yike.controller("TodayCtrl",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
    $rootScope.loaded = false;
    $rootScope.title = "今日一刻";
    $rootScope.id = 0;
    $http({
        url:'./api/today.php'
    }).success(function(info){
        //console.log(info);
        $scope.date = info.date;
        $scope.posts = info.posts;
        $rootScope.loaded = true;
    })
}]);

//设置older控制器
Yike.controller("OlderCtrl",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
    $rootScope.title = "往期内容";
    $rootScope.id = "1";
    $rootScope.loaded = false;
    $http({
        url:'./api/older.php'
    }).success(function(info){
        //console.log(info);
        $rootScope.loaded = true;
        $scope.date = info.date;
        $scope.posts = info.posts;

    })
}]);

//设置热门作者控制器
Yike.controller("AuthorCtrl",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
    $rootScope.loaded = false;
    $rootScope.title = "热门作者";
    $rootScope.id = "2";
    $http({
        url:'./api/author.php'
    }).success(function(info){
        console.log(info);
        $rootScope.loaded = true;
        $scope.rec = info.rec.authors;
        $scope.all = info.all.authors;
    })
}])

Yike.run(['$rootScope',function($rootScope){
    //设置默认
    $rootScope.collapsed = false;
    //设置点击后切换 ! 取反
    $rootScope.collapse = function(){
        $rootScope.collapsed = !$rootScope.collapsed;
        //获取DOM元素集合dd集合
        var Domlist = document.querySelectorAll(".navs dd");

        if($rootScope.collapsed){
            for(var i =0;i<Domlist.length;i++){
                Domlist[i].style.transform = "translate(0)";
                Domlist[i].style.transitionDelay = "0.2s";
                Domlist[i].style.transitionDuration = (i+1)*0.15+'s';
            }
        }else{
            for(var j =Domlist.length-1;j>0;j--){
                Domlist[j].style.transform = "translate(-100%)";
                Domlist[j].style.transitionDelay = "";
                Domlist[j].style.transitionDuration = (Domlist.length-j)*0.15+'s';
            }
        }
    };
}])