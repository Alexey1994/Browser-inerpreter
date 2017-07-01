function parse_while(parser){
	var new_while = {
		type:       'while',
		expression: parse_expression(parser),
		body:       []
	}

	if(!new_while.expression)
		return

	if(!parser.current_block){
		console.log('while не в теле функции')
		return
	}

	parser.current_block.push(new_while)

	parser.blocks.push(parser.current_block)
	parser.current_block = new_while.body

	return 1
}