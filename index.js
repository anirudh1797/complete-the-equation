(function (game_arr, final_answer, time, result, score) {

	var game_arr = game_arr;
	var final_answer = final_answer;
	var time = time;
	var win = result;
	var score = score;

	var timer;
	var player = "";

	var build_player = function () {
		document.getElementById("game-player").innerHTML = player;
	}

	var handle_keypad_button_click = function (button) {
		if (button.target.innerHTML !== "backspace" && button.target.innerHTML !== "reset") {
			game_arr.push(button.target.innerHTML);
		} else if (button.target.innerHTML == "backspace") {
			game_arr.pop();
		} else if (button.target.innerHTML == "reset") {
			game_arr = [];
		}
		build_input_value(game_arr);
	};

	var show_game_div = function () {
		document.getElementById("start-div").style.display = "none";
		document.getElementById("build-div").style.display = "none";
		document.getElementById("game-div").style.display = "inline-block";
	}

	var get_final_answer = function () {
		return eval(game_arr.toString().split(",").join(""));
	}

	var get_game_span = function () {
		var game_span = document.getElementById("game-span");
		game_span.innerHTML = "";
		return game_span;
	}

	var build_game_button = function (game_span) {
		var game_button = document.createElement("button");
		game_button.id = "game-button";
		game_button.innerHTML = "Run Game"
		game_span.appendChild(game_button);
		game_button.removeEventListener("click", run_game);
		game_button.addEventListener('click', run_game);
	}

	var is_operator_input = function (input) {
		return (input == "+" || input == "-" || input == "*" || input == "/" || input == "(" || input == ")");
	}

	var build_game_child = function () {
		var game_child = document.createElement("span");
		game_child.className = "game-child";
		return game_child;
	}

	var build_game_input = function (game_child) {
		var game_input = document.createElement("input");
		game_input.className = "game-input";
		game_child.appendChild(game_input);
	}

	var build_game_text = function (text, game_child) {
		var game_text = document.createElement("span");
		game_text.innerHTML = text;
		game_child.appendChild(game_text);
	}

	var build_equal_to = function (game_child) {
		var equal_to = document.createElement("span");
		equal_to.innerHTML = " = ";
		game_child.appendChild(equal_to);
	}

	var build_final_answer = function (game_child) {
		var final_answer_span = document.createElement("span");
		final_answer_span.innerHTML = " " + final_answer + " ";
		game_child.appendChild(final_answer_span);
	}

	var disable_game_button = function () {
		document.getElementById("game-button").disabled = true;
	}

	var build_end_game = function (game_score, game_time, game_result, game_result_text) {
		show_result_div();
		set_score(game_score);
		build_game_score();
		set_time(game_time);
		build_timer();
		set_result(game_result);
		build_result(game_result_text);
		clearInterval(timer);
		disable_game_button();
	}

	var set_final_answer = function (final_answer) {
		final_answer = final_answer;
	}

	var get_player = function () {
		game_player = document.getElementById("players").selectedIndex == 0 ? "player2" : document.getElementById("players").selectedIndex == 1 ? "player1" : "player2";
		return game_player;
	}

	var reset_game = function () {
		set_final_answer(0);
		player = "";
		set_score(0);
		set_time(60);
		set_result(true);
		game_arr = [];
		build_input_value();
	}

	var show_build_div = function () {
		document.getElementById("start-div").style.display = "none";
		document.getElementById("build-div").style.display = "inline-block";
	}

	var is_game_button = function (button) {
		return (button.id == "build-button" || button.id == "game-button" || button.id == "play-again" || button.id == "start-button");
	}

	var add_events_to_buttons = function () {
		var buttons = document.getElementsByTagName("button");
		buttons = Array.from(buttons);
		buttons.forEach(function (button) {
			if (!is_game_button(button)) {
				button.removeEventListener("click", handle_keypad_button_click);
				button.addEventListener("click", handle_keypad_button_click);
			}
		});
	}

	var set_time = function (game_time) {
		time = game_time;
	}

	var set_score = function (score) {
		score = score;
	}

	var set_result = function (result) {
		win = result;
	}

	var show_result_div = function () {
		document.getElementById("game-div").style.display = "none";
		document.getElementById("result-div").style.display = "inline-block";
	}

	var build_result = function (text) {
		document.getElementById("result").innerHTML = text;
	}

	var build_timer = function () {
		document.getElementById("game-time").innerHTML = "timer: " + time;
	}

	var build_game_score = function () {
		document.getElementById("game-score").innerHTML = "score: " + score;
	}

	var build_input_value = function () {
		document.getElementById("build-input").value = game_arr.toString().split(",").join("");
	}

	var show_game_div = function () {
		document.getElementById("start-div").style.display = "none";
		document.getElementById("build-div").style.display = "none";
		document.getElementById("game-div").style.display = "inline-block";
	}

	var re_show_start_div = function () {
		document.getElementById("result-div").style.display = "none";
		document.getElementById("start-div").style.display = "inline-block";
	}

	var play_again = function () {
		re_show_start_div();
	}

	var run_game = function () {
		var game_children = document.getElementsByClassName("game-child");
		var game_child_count = 0;
		while (game_child_count < game_children.length) {
			var game_child = game_children[game_child_count].children[0];
			if (game_child.className == "game-input") {
				if (game_child.value !== game_arr[game_child_count]) {
					build_end_game(0, 0, false, "you lose!");
					return;
				}
			}
			game_child_count++;
		}
		score = time;
		build_end_game(score, 0, true, "you win!");
	}

	var generate_game = function () {
		try {
			final_answer = get_final_answer();
			player = get_player();
			show_game_div();
			build_player();
			var game_span = get_game_span();
			for (var t = 0; t < game_arr.length; t++) {
				var game_child = build_game_child();
				if (is_operator_input(game_arr[t])) {
					build_game_input(game_child);
				} else {
					build_game_text(game_arr[t], game_child);
				}
				if (t == game_arr.length - 1) {
					build_equal_to(game_child);
					build_final_answer(game_child);
				}
				game_span.appendChild(game_child);
			}
			build_game_button(game_span);
			timer = setInterval(function () {
				time = time - 1;
				if (time == 0) {
					clearInterval(timer);
					set_result(false);
					set_score(0);
					set_time(0);
					show_result_div();
					build_result("times up!");
				}
				build_timer();
				build_game_score();
			}, 1000);
		} catch (e) {
			alert("incorrect equation");
			game_arr = [];
			build_input_value();
		}
	}

	var start_game = function () {
		show_build_div();
		reset_game();
		add_events_to_buttons();
	}

	var start_button = document.getElementById("start-button");
	var play_again_button = document.getElementById("play-again");
	var build_button = document.getElementById("build-button");

	start_button.addEventListener('click', start_game);
	build_button.addEventListener('click', generate_game);
	play_again_button.addEventListener("click", play_again);

})([], 0, 60, true, 0);
