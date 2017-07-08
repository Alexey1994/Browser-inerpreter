function is_digit(character){
	if(character >= '0' && character <= '9')
		return 1
}

function is_letter(character){
	if( (character >= 'a' && character <= 'z') || (character >= 'A' && character <= 'Z') || character == '_')
		return 1
}

function is_space(character){
	if(character == ' ' || character == '\r' || character == '\n' || character == '\t')
		return 1
}