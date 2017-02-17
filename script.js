$(document).ready(function() {
	var rex = /\"RoomId\":(\d+),/;
	$.getJSON('https://www.zhanqi.tv/api/user/follow.listsbypage?page=1&nums=10', function(json){
		// alert(JSON.stringify(json));
		for(var i=0;i<json.data.list.length;i++){
    		// roomId
    		$.ajax({ url: "https://www.zhanqi.tv/api/actives/signin/fans.sign", type: "post", data: { roomId: json.data.list[i].roomId }, contentType: "application/x-www-form-urlencoded; charset=utf-8" });
    	}
	});
});