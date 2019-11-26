$(document).ready(() => {
	signined = 0

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
			var re = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/		//正则匹配邮箱地址
			if (!re.test($('#Email').val())) {
				$('#warning').text('Email is wrong')
				$('#warning').slideDown('fast')
			}
			var isnot_num_re = /^.*[^\d].*$/

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
					if(res === "OK") {
					//	$('#signup').slideDown('fast')
					//	$('#signin').slideUp('fast')
					//	signup_click = 1
					//	signin_click = 0
						$('#success').text('Sign Up Successfully, Please Sign In')
						$('#success').slideDown('fast')
						$('#warning').slideUp('fast')
						$("input").val("")
						$('select').val("Choose...")
					}
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
					Passwd: 	$('#pwdTeacher').val()
				}, (res) => {
					if(res === "OK") {
					//	$('#signup').slideDown('fast')
					//	$('#signin').slideUp('fast')
					//	signup_click = 1
					//	signin_click = 0
						$('#success').text('Sign Up Successfully, Please Sign In')
						$('#success').slideDown('fast')
						$('#warning').slideUp('fast')
						$("input").val("")
						$('select').val("Choose...")
					}
				})
			}
			//$('#exampleModal').modal('hide')
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
					signined = 1
					hideHomepage()
					ShowNav()
				}
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
	if (signined == 1) {
		if (width <= 480) { 
			if (navSite !== "top") {
				$('#Usernav').animate({
					width: "0%"
				}, 'fast', () => {
					$('#Usernav').css({
						'height': '0%',
						'width':  '100%'
					})
					$('#Usernav').animate({
						height: '5%'
					}, 'fast')
				})
				navSite = "top"
			}
		}
		else {
			if (navSite !== "right") {
				$('#Usernav').animate({
					height: '0%'
				}, 'fast', () => {
					$('#Usernav').css({
						'width': '0%',
						'height': '100%'
					})
					$('#Usernav').animate({
						width: '20%'
					}, 'fast')
				})
				navSite = "right"
			} 
		}
	}
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

function hideHomepage() {
	if ($(window).width() <= 480) {
		$('#page').animate({
			bottom: "100%" 
		}, 'slow')
	}
	else {
		$('#page').animate({
			right: "100%"
		}, 'slow')
	}
}

function ShowNav() {
	if ($(window).width() <= 480) {
		$('#Usernav').animate({
			width: 	"100%",
			height: "5%", 
		}, 'fast')
		navSite = "top"
	}
	else {
		$('#Usernav').animate({
			width: 	"20%",
			height: "100%"
		}, 'fast')
		navSite = "right"
	}
}