function parse_assignment(left_name, parser){
	if(!parser.current_function){
		if(parser.global_function.variables[left_name]){
			console.log('глобальная переменная ' + left_name + ' уже создана')
			return
		}

		var left_variable ={
			name:    left_name,
			address: Object.keys( parser.global_function.variables ).length - 1
		}

		left_variable.is_global = 1
		parser.global_function.variables[left_name] = left_variable
	}
	else{
		var left_variable = find_variable(left_name, parser)

		if(!left_variable){

			left_variable = {
				name:    left_name,
				address: Object.keys( parser.current_function.variables ).length
			}

			parser.current_function.variables[left_name] = left_variable
		}
	}

	parser.read_byte()

	var right_expression = parse_expression(parser)

	var assignment = {
		type:          'assignment',
		left_operand:  left_variable,
		expression:    right_expression
	}

	if(!parser.current_function)
		parser.global_function.body.push(assignment)
	else
		parser.current_block.push(assignment)

	return 1
}