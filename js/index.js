$(function() {
	var p1_btn = document.getElementById("p1_btn");
	var dis_tim = 2000;
	var timeout = undefined;
	p1_btn.addEventListener('touchstart', function() {
		timeout = setTimeout(togglePage(), dis_tim);
	}, false);
	p1_btn.addEventListener('touchend', function() {
		clearTimeout(timeout);
	});

	function togglePage(){
		$('.part_1').fadeOut(800);
    	$('.part_2').fadeIn(800);
	}

	setTimeout(function() {
		$("#container").addClass("animate");
	}, 500);

});