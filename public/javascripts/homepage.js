$(document).ready(() => {
	$('#icon').click(() => {
		if (click_is == 1) return
		$('#icon').animate({
			width: "" + (width>height?height:width) + "px",
			height: "" + (width>height?height:width) + "px",
			width: "" + width + "px",
			height: "" + height + "px",
			borderRadius: "0%",
		}, "fast", () => {
			$('#GlyphiconOff').animate({
				fontSize: "0px"
			}, "fast")
		})
		click_is = 1
	})
	
	var signup_click = 0
	var signin_click = 1


	$('#signupBtn').click(() => {
		if (signup_click == 0) {
			$('#signup').slideDown('fast')
			$('#signin').slideUp('fast')
			signup_click = 1
			signin_click = 0
		}
		else if (signup_click == 1) {
			var type = $('#inputGroupSelect02').val()
			if (type === 'Student') {
				$.post("/signup", {
					Email: 		$('#Email').val(),
					Name: 		$('#Name').val(),
					Gender: 	$('#Gender').val(),
					School: 	$('#School').val(),
					Type: 		$('#inputGroupSelect02').val(), 
					Major: 		$('#MajorStudent').val(),
					Class: 		$('#ClassStudent').val(),
					StudentNo: 	$('#StudentNo').val(),
					Passwd: 	$('#pwdStudent').val()
				}, (res) => {
					
				})
			}
			else if (type === 'Teacher') {
				$.post('/signup', {
					Email: 		$('#Email').val(),
					Name: 		$('#Name').val(),
					Gender: 	$('#Gender').val(),
					School: 	$('#School').val(),
					Type: 		$('#inputGroupSelect02').val(), 
					Major: 		$('#MajorTeacher').val(),
					TeacherNo: 	$('#TeacherNo').val(),
					Passwd: 	$('pwdTeacher').val()
				}, (res) => {
					
				})
			}
			$('#exampleModal').modal('hide')
		}
	})

	$('#signinBtn').click(() => {
		if (signin_click == 0) {
			$('#signup').slideUp('fast')
			$('#signin').slideDown('fast')
			signin_click = 1
			signup_click = 0
		}
		else if (signin_click == 1) {
			var re = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/
			if (!re.test($('#ID').val())) {
				$('#warning').text('Email is wrong')
				$('#warning').slideDown('fast')
			}
			$.post("/signin", {
				type: $('#inputGroupSelect01').val(),
				No: $('#ID').val(),
				Passwd: $('#pwd').val()
			}, (res) => {
				if (res === 'false') 
					alert ('Sign in failed \n nPlease check id and password')
				else { 
				}
				//if (res === 'false') alert("Sing in failed\nPlease check the userid and password")
				//else {
				//	$.cookie('id', res, { expires: 7, path: 'cookie/'})
				//}
			})
			$('#exampleModal').modal('hide')
		}
	})
})

$(window).resize(() => {
	ChangeWindowSize()
	if (click_is == 0) {
		ChangeIconSize()
		ShowIcon()
	}
	else ShowIconAfter()
})

$(() => {
	click_is = 0
	ChangeWindowSize()
	ChangeIconSize()
	ShowIcon()
})

function ShowIcon() {
	$('#icon').animate({
		width: length_wh,
		height: length_wh
	}, "fast", () => {
		$("#icon").css({
			"min-width": "150px",
			"min-height": "150px"
		})
	})
	$('#GlyphiconOff').animate({
		fontSize: font_size
	}, "fast")
}

function ShowIconAfter() {
	$("#icon").css({
		"width": "100%",
		"height": "100%"
	})
}

function ChangeWindowSize() {
	width = $(window).width()
	height = $(window).height()
	//console.log(width)
	//console.log(height)
}

function ChangeIconSize() {
	if (width > height) {
		length_wh = "" + ((height*0.33>150)?(height*0.33):150) + "px"
		font_size = "" + ((height*0.33>150)?(height*0.33):150)*0.6 + "px"
	}
	else {
		length_wh = "" + ((width*0.2>150)?(width*0.2):150) + "px" 
		font_size = "" + ((width*0.33>150)?(width*0.33):150)*0.6 + "px"
	}
}

function selected() {
	var select = $('#inputGroupSelect02').val();
	if (select === 'Teacher') {
		$('#signupTeacher').slideDown('fast')
		$('#signupStudent').slideUp('fast')
	}
	else if (select === 'Student') {
		$('#signupStudent').slideDown('fast')
		$('#signupTeacher').slideUp('fast')
	}
}