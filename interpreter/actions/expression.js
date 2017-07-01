function calculate_arguments(arguments, interpreter){
	var values = []

	for(var i=0; i<arguments.length; ++i){
		values.push(calculate_expression(arguments[i], interpreter))
	}

	return values
}

function calculate_operand_value(operand, interpreter){
	if(operand.type == 'const_number')
		return operand.value

	if(operand.type == 'variable')
		return interpreter.stack[ interpreter.variables_begin + operand.variable.address ]

	if(operand.type == 'function call'){
		execute(operand.current_function, calculate_arguments(operand.arguments, interpreter), interpreter)
		return interpreter.return_value
	}
}

function calculate_unary_operators(value, unary_operators, interpreter){
	for(var i=0; i<unary_operators.length; ++i){
		var unary_operator = unary_operators[i]

		value = interpreter.unary_operators[ unary_operator ](value)
	}

	return value
}

function calculate_expression(expression, interpreter){

	var operation  = expression[0].binary_operator
	var left_value = calculate_operand_value(expression[0].operand, interpreter)
	var result     = calculate_unary_operators(left_value, expression[0].unary_operators, interpreter)

	for(var i=1; i<expression.length; ++i){
		var tail = expression[i]

		var left_value = calculate_operand_value(tail.operand, interpreter)
		left_value = calculate_unary_operators(left_value, tail.unary_operators, interpreter)
		result = interpreter.binary_operators[ operation ](result, left_value)
		operation  = tail.binary_operator
	}

	return result
}