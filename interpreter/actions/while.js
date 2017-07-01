function interprete_while(while_action, interpreter){
	var expression_value = calculate_expression(while_action.expression, interpreter)

	console.log('WHILE: ' + expression_value)

	while(expression_value){
		if(!execute_body(while_action.body, interpreter))
			return

		expression_value = calculate_expression(while_action.expression, interpreter)
	}

	return 1
}