$(function() {
	var p1_btn = document.getElementById("p1_btn");
	var dis_tim = 2000;
	var timeout = undefined;
	p1_btn.addEventListener('touchstart', function() {
		timeout = setTimeout(togglePage2(), dis_tim);
	}, false);
	p1_btn.addEventListener('touchend', function() {
		clearTimeout(timeout);
	});

	function togglePage2(){
		$('.part_1').removeClass('animate');
		$('.part_1').fadeOut(500);
		$('.part_2').fadeIn(500);
    	$('.part_2').addClass('animate');
	}

	setTimeout(function() {
		$(".part_1").addClass("animate");
	}, 500);

	var p2_note = document.querySelector('.part_2').querySelectorAll('.note');
	for(var i = 0; i < 3; i++){
		(function(t){
			var item = p2_note[t];
			item.onclick = function(){
				$(item).prev().css('display', 'block');
				togglePage3(t);
			};
		})(i);
	}

	function togglePage3(t){
		$('.part_2').removeClass('animate');
		$('.part_2').fadeOut(500);
		$('.part_3').fadeIn(500);
		$('.part_3').addClass('animate');
		$($('.part_3 .head_bg')[t]).removeClass('hide');
		addKeyTouchFun();
	}

	function addKeyTouchFun(){
		var key = document.getElementById("key");
		var max_length = 4;
		var dis_touch = '';
		key.addEventListener('touchstart', function(event){
			console.log('开始拖动', event);
		});

		key.addEventListener('touchmove', function(event){
			event.preventDefault();
			console.log('滑动继续');
			dis_touch = event.targetTouches[0].pageX / 100;
			if(dis_touch > max_length) {
				dis_touch = max_length;
			}
			$(key).css('transition', 'none').css('transform', 'translateX(' + dis_touch + 'rem');
		});

		key.addEventListener('touchend', function(event){
			console.log('停止滑动', event);
			var dis_touch = event.changedTouches[0].pageX / 100;
			if(dis_touch < max_length) {
				dis_touch = 0;
				$(key).css('transition', 'all 0.5s').css('transform', 'translateX(' + dis_touch + 'rem');
			}else {
				//过度页
			}
		});
	}


});