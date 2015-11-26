首先安装npm     
npm install -g cordova gulp ionic    
npm install
bower install    
gulp   
inoic serve //浏览器中打开    
ionic run android //安卓应用    
    

##备注：    
微信插件安装:    
cordova plugin add https://github.com/xu-li/cordova-plugin-wechat --variable wechatappid=wx259bf7170c4b9daa --save   

##gulp 压缩angular注意事项
明确申明依赖事项  
angular.module('havefun.controllers').controller('accountController', ['$scope',function($scope) {  
而不能用  
angular.module('havefun.controllers').controller('accountController', function($scope) {  



###截图预览

##首页  
![index](https://github.com/liming881227/ionic-project/blob/master/img/index.png)  
  
##任务  
![index](https://github.com/liming881227/ionic-project/blob/master/img/tasks.png)  
![index](https://github.com/liming881227/ionic-project/blob/master/img/task.png)  

![upload](https://github.com/liming881227/ionic-project/blob/master/img/upload.png)  
##我的  
![me](https://github.com/liming881227/ionic-project/blob/master/img/me.png)    
##分享  
![share](https://github.com/liming881227/ionic-project/blob/master/img/share.png)  

##联系我  
liming881227@163.com  