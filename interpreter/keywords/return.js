function parse_return(parser){
	var new_return = {
		type:       'return',
		expression: parse_expression(parser)
	}

	if(!new_return.expression)
		return

	parser.current_block.push(new_return)

	return 1
}