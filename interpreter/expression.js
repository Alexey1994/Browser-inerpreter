function parse_unary_operators(parser){
	var unary_operators = []

	parser.skip_spaces()

	do{
		var unary_operator = parser.unary_operators[parser.head()]

		if(!unary_operator)
			break

		parser.read_byte()
		unary_operators.push(unary_operator)
	}
	while(!parser.end())

	return unary_operators
}

function find_variable(name, parser){
	var variable = parser.current_function.variables[name]

	if(variable)
		return variable

	return parser.global_function.variables[name]
}

function parse_function_call(name, parser){
	var current_function = parser.functions[ name ]

	if(!current_function){
		console.log('функция ' + name + ' не определена')
		return
	}

	parser.read_byte()

	var arguments = []

	while(!parser.end() && parser.head() != ')'){
		var argument = parse_expression(parser)

		if(parser.head() == ',')
			parser.read_byte()

		arguments.push(argument)
	}

	if(parser.head() != ')'){
		console.log('отсутствует )')
		return
	}

	parser.read_byte()

	if(arguments.length != current_function.arguments.length){
		console.log('не совпадает количество аргументов вызываемой функции ' + name)
		return
	}

	return {
		type:             'function call',
		current_function: current_function,
		arguments:        arguments
	}
}

function parse_operand(parser){
	parser.skip_spaces()

	if( is_digit(parser.head()) )
		return {
			type:  'const_number',
			value: parseInt(parser.parse_number())
		}
	else{
		var name     = parser.parse_word()

		parser.skip_spaces()

		if(parser.head() == '('){
			return parse_function_call(name, parser)
		}

		var variable = find_variable(name, parser)

		if(!variable){
			console.log('переменная ' + name + ' не определена')
			return
		}

		return {
			type:     'variable',
			variable: variable,
			name:     name
		}
	}
}

function parse_binary_operator(parser){
	var binary_operator

	parser.skip_spaces()
	binary_operator = parser.binary_operators[parser.head()]

	if(binary_operator)
		parser.read_byte()

	return binary_operator
}

function parse_expression(parser){
	var expression      = []

	do{
		var unary_operators = parse_unary_operators(parser)
		var operand         = parse_operand(parser)
		var binary_operator = parse_binary_operator(parser)

		expression.push({
			unary_operators: unary_operators,
			operand:         operand,
			binary_operator: binary_operator
		})

		if(!binary_operator)
			return expression
	}
	while(!parser.end())

	return expression
}