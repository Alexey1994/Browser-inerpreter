function interprete_assignment(assignment, interpreter){
	var left_operand = assignment.left_operand

	if(left_operand.is_global){
		interpreter.stack[left_operand.address + 1] = calculate_expression(assignment.expression, interpreter)
		console.log('ASSIGNMENT: ' + assignment.left_operand.name + ' = ' + interpreter.stack[left_operand.address + 1])
	}
	else{
		interpreter.stack[ left_operand.address + interpreter.variables_begin ] = calculate_expression(assignment.expression, interpreter)
		console.log('ASSIGNMENT: ' + assignment.left_operand.name + ' = ' + interpreter.stack[ left_operand.address + interpreter.variables_begin ])
	}

	return 1
}