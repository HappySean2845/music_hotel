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
		$('.part_1').fadeOut(500);
    $('.part_2').fadeIn(500);
	}

	setTimeout(function() {
		$("#container").addClass("animate");
	}, 500);

	
	
	var p2_note = document.querySelector('.part_2').querySelectorAll('.note');
	for(var i = 0; i < 3; i++){
		(function(t){
			var item = p2_note[t];
			item.onclick = function(){
				$(item).prev().css('display', 'block');
			};
		})(i);
	}

});