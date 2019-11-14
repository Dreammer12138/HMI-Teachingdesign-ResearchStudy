$('#icon').click(function() {
	if (click_is == 1) return
	$('#icon').animate({
		width: "" + (width>height?height:width) + "px",
		height: "" + (width>height?height:width) + "px",
		width: "" + width + "px",
		height: "" + height + "px",
		borderRadius: "0%",
	}, "fast", function() {
		$('#GlyphiconOff').animate({
			fontSize: "0px"
		}, "fast")
	})
	click_is = 1
})

$(window).resize(function() {
	ChangeWindowSize()
	if (click_is == 0) {
		ChangeIconSize()
		ShowIcon()
	}
	else ShowIconAfter()
})

$(function() {
	click_is = 0
	ChangeWindowSize()
	ChangeIconSize()
	ShowIcon()
})



function ShowIcon() {
	$('#icon').animate({
		width: length_wh,
		height: length_wh
	}, "fast", function() {
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
	//	$('#icon').css({
	//		"width": "" + height*0.33 + "px",
	//		"height": "" + height*0.33 + "px"
	//	})
	else {
		length_wh = "" + ((width*0.2>150)?(width*0.2):150) + "px" 
		font_size = "" + ((width*0.33>150)?(width*0.33):150)*0.6 + "px"
	}

	//	$('#icon').css({
	//		"width": "" + width*0.2 + "px",
	//		"height": "" + width*0.2 + "px"
	//	})
}