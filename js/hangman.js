$(function() {
	var keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
	 			"p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	var buttons = [], dash = [],
		input, word, wordLen, lives = 6, count = 1;

	  if ($(".keyboard").empty) {
        for (var i = 0; i < keys.length; i++)
            buttons.push('<button class="btn btn-info keys">' + keys[i].toUpperCase() + '</button>');
     
        $(".keyboard").html(buttons.join(""));
    }

    $(".submit").on("click", function() {
    	input = $(".input").val();
    	wordLen = input.length;

    	$(".input").val("");
    	$(".submit").addClass("disabled");

    	if(wordLen != 0) {

	    	for(var i = 0; i < wordLen; i++)
	    		dash.push('<span class="dash"> _ </span>');

	    	$("#data").css("display", "none");
	    	$("#lives").text("Lives left: " + lives).css("display", "block");
	    	$("#line").html(dash.join("")).css("display", "block");
            $(".sectionOne div").removeClass("background").addClass("back");
            $(".back img").removeAttr("src").attr("src", "images/hangman" + count + ".png"); 
            count++;
    	}
    });

	$(".keyboard button").on("click", function() {
    		var word = $(this).html().toLowerCase();
			
			if(lives > 0) {
				
				if(input.indexOf(word) == -1) {
    				$(this).removeClass("btn-info").addClass("btn-danger"); console.log(lives);
    				lives-= 1;
    				$("#lives").text("Lives left: " + lives).css("display", "block");
                    $("#background img").removeAttr("src");
    				$(this).addClass("disabled");

                    $(".back img").removeAttr("src").attr("src", "images/hangman" + count + ".png"); 
                    count++;
    			}
    			else {
	    			for(var i = 0; i < wordLen; i++)
	    				if(input[i] == word)
	    					dash[i] = '<span class="dash">' + input[i].toUpperCase() + '</span>';
	    			$("#line").html(dash.join("")).css("display", "block");
	    			$(this).removeClass("btn-info").addClass("btn-success");
    			}

    			if(lives == 0) {
    				$("#lives").html("Game Over <br> Given Word: " + input.toUpperCase());
    				$("#line").css("display", "none");
    			}

    			if(dash.indexOf('<span class="dash"> _ </span>') == -1) {
    				$("#lives").html("You guessed it right!");
    				lives = 0;
    			}
    		}
    	});

    $(".reset").click(function() {
    	lives = 6;
    	dash = [];
        count = 1;
        input = undefined;

        $(".keyboard button").each(function() {
        	$(this).removeClass("btn-success btn-danger disabled").addClass("btn-info");
        });

        $(".submit").removeClass("disabled");
        $("#lives, #line").css("display","none");
        $("#data").css("display","block");
        $(".input").val("");
        $(".sectionOne div").removeClass("back").addClass("background");
        $(".background img").removeAttr("src").attr("src", "images/hangman.png");
    });
});