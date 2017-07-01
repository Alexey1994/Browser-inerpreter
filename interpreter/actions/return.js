function interprete_return(return_action, interpreter){
	var value = calculate_expression(return_action.expression, interpreter)
	console.log('RETURN: ' + value)
	interpreter.return_value = value
}