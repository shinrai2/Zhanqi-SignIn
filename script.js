$(document).ready(function() {
	var rex = /\"RoomId\":(\d+),/;
	var myDate = new Date();
	var ifSignToday = myDate.getMonth()*30 + myDate.getDate();
	if(getCookie("ifSignToday")!=ifSignToday) {
		$.getJSON('https://www.zhanqi.tv/api/user/follow.listsbypage?page=1&nums=10', function(json){
			for(var i=0;i<json.data.list.length;i++){
    			$.ajax({ 
    				url: "https://www.zhanqi.tv/api/actives/signin/fans.sign", 
    				type: "post", 
    				data: { roomId: json.data.list[i].roomId }, 
    				contentType: "application/x-www-form-urlencoded; charset=utf-8" 
    			});
		 	}
		});
		console.info("Sign in Complete.");
		document.cookie = "ifSignToday="+ifSignToday; 
	}
	function getCookie(name){ 
		var strCookie=document.cookie; 
		var arrCookie=strCookie.split("; "); 
		for(var i=0;i<arrCookie.length;i++){ 
			var arr=arrCookie[i].split("="); 
			if(arr[0]==name)return arr[1]; 
		} 
		return ""; 
	} 
	var timer_int=self.setInterval(function() {
		$.getJSON('https://www.zhanqi.tv/api/user/task.get', function(json){
			if(json.data.length!=0) {
				for(var i=0;i<json.data.length;i++) {
					var tmp = json.data[i].progress.current - json.data[i].progress.total;
					console.info(json.data[i].name+":\t"+tmp);
					if(tmp >=0) {
						$.ajax({ 
    						url: "https://www.zhanqi.tv/api/user/task.complete", 
    						type: "post", 
    						data: { taskId: json.data[i].id }, 
    						contentType: "application/x-www-form-urlencoded; charset=utf-8" 
    					});
					}
				}
			}
			else {
				console.info("tasks Complete,Stop looping.");
				self.clearInterval(timer_int);
			}
		});
	},30000); 
});