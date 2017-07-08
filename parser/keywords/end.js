function parse_end(parser){
	if(!parser.blocks.length){
		console.log('лишний end')
		return
	}

	parser.current_block = parser.blocks.pop()

	if(!parser.blocks.length)
		parser.current_function = undefined

	return 1
}