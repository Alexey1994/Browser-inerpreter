function skip_spaces(stream){
	while( !end_of_stream(stream) && is_space(head_stream(stream)) )
		read_stream_byte(stream)
}

function read_word(stream){
	var word = ''

	skip_spaces(stream)

	while( !end_of_stream(stream) && is_letter(head_stream(stream)) ){
		word += head_stream(stream)
		read_stream_byte(stream)
	}

	return word
}

function read_number(stream){
	var number = ''

	skip_spaces(stream)

	while( !end_of_stream(stream) && is_digit(head_stream(stream)) ){
		number += head_stream(stream)
		read_stream_byte(stream)
	}

	return number
}