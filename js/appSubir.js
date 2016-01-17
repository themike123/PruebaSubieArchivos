var url_server = 'http://192.168.0.100:8080/';
var app = angular.module('subir',[])


app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);


app.service('fileUpload', ['$http', function ($http) {

    this.uploadFileToUrl = function(nombre, file, uploadUrl){
        var fd = new FormData();
        fd.append('photo', file);
        fd.append('nombre', nombre)
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
            if(response.type){
                console.log("El archivo se subio con exito");
            }
            else
                console.log("Ocurrio un error al subir el archivo");
        })
        .error(function(){
            console.log("Ocurrio un error al subir el archivo");
        });
    }

}]);


app.controller('subirController', ['$scope', '$http', 'fileUpload', function($scope, $http, fileUpload){

    $scope.entregable = function(filename, file) {
        if(filename == '' || file == undefined){
            console.log("No eligio el archivo");
            console.log("file:"+file);
            console.log("filename:"+filename);
        }
        var uploadUrl = url_server+"guardar";
          fileUpload.uploadFileToUrl(filename, file, uploadUrl);
    }

}]);
