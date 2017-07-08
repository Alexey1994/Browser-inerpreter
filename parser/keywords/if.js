function parse_if(parser){
	var new_if = {
		type:       'if',
		expression: parse_expression(parser), //parse_expression
		body:       []
	}

	if(!new_if.expression)
		return

	if(!parser.current_block){
		console.log('if не в теле функции')
		return
	}

	parser.current_block.push(new_if)

	parser.blocks.push(parser.current_block)
	parser.current_block = new_if.body

	return 1
}