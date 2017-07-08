function parse_arguments(parser){
	parser.skip_spaces()

	if(parser.head() != '('){
		console.log('отсутствует (')
		return
	}

	parser.read_byte()
	parser.skip_spaces()

	var arguments = []

	while(!parser.end() && parser.head() != ')'){
		var argument_name = parser.parse_word()
		var argument_variable = {
			name:    argument_name,
			address: Object.keys( parser.current_function.variables ).length
		}
		
		arguments.push(argument_variable)
		parser.current_function.variables[argument_name] = argument_variable

		parser.current_function

		if(parser.head() == ',')
			parser.read_byte()

		parser.skip_spaces()
	}

	if(parser.head() != ')'){
		console.log('отсутствует )')
		return
	}

	parser.read_byte()

	return arguments
}

function parse_function(parser){

	if(parser.current_function){
		console.log('функция не может находиться внутри другой функции')
		return
	}

	parser.skip_spaces()

	var function_name = parser.parse_word()

	var new_function  = {
		name:      function_name,
		variables: {},
		body:      []
	}

	parser.blocks.push(parser.current_block)
	parser.current_block = new_function.body

	parser.functions[function_name] = new_function
	parser.current_function = new_function

	var arguments = parse_arguments(parser)

	if(!arguments)
		return

	new_function.arguments = arguments

	return 1
}