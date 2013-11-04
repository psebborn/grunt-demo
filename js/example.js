var myModule = function() {
	var url = window.location.href;
	console.log(url);
	
	function dummyFailure() {
		// This is a contrived example, to fail JSHint's check for ====
		var isZoocha = url.indexOf('zoocha.com');
		if(isZoocha === -1) {
			return true;
		} else {
			return false;
		}
	}
	init();
};