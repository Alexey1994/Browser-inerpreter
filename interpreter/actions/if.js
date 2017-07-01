function interprete_if(if_action, interpreter){
	var expression_value = calculate_expression(if_action.expression, interpreter)

	console.log('IF: ' + expression_value)

	if(expression_value){
		if(!execute_body(if_action.body, interpreter))
			return
	}

	return 1
}