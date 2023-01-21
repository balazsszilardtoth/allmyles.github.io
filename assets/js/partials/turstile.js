window.onloadTurnstileCallback = function() {
	turnstile.render('#myWidget', {
		sitekey: '0x4AAAAAAACFi4Df3aq41Qm3',
		callback: function(token) {
			console.log(`Challenge Success ${token}`);
		},
	});
};
