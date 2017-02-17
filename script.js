$(document).ready(function() {
	var rex = /\"RoomId\":(\d+),/;
	var myDate = new Date();
	var ifSignToday = myDate.getMonth()*30 + myDate.getDate();
	if(getCookie("ifSignToday")!=ifSignToday) {
		$.getJSON('https://www.zhanqi.tv/api/user/follow.listsbypage?page=1&nums=10', function(json){
			// alert(JSON.stringify(json));
			for(var i=0;i<json.data.list.length;i++){
    			// roomId
    			$.ajax({ 
    				url: "https://www.zhanqi.tv/api/actives/signin/fans.sign", 
    				type: "post", 
    				data: { roomId: json.data.list[i].roomId }, 
    				contentType: "application/x-www-form-urlencoded; charset=utf-8" 
    			});
		 	}
		});
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
});