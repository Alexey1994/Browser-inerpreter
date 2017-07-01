function push(value, interpreter){
	interpreter.stack[ interpreter.stack_head ] = value
	++interpreter.stack_head
}

function pop(interpreter){
	var value = interpreter.stack[ interpreter.stack_head ]
	--interpreter.stack_head
	return value
}

function allocate_function(current_function, interpreter){
	push(interpreter.variables_begin, interpreter)

	interpreter.variables_begin = interpreter.stack_head
	interpreter.stack_head += Object.keys( current_function.variables ).length
}

function deallocate_function(interpreter){
	interpreter.stack_head = interpreter.variables_begin - 1
	interpreter.variables_begin = pop(interpreter)
}

function execute_body(body, interpreter){
	for(var i=0; i<body.length; ++i){
		current_action = body[i]

		var action_function = interpreter.actions[current_action.type]

		if(!action_function(current_action, interpreter))
			return
	}

	return 1
}

function execute(current_function, arguments, interpreter){
	allocate_function(current_function, interpreter)

	for(var i=0; i<arguments.length; ++i){
		interpreter.stack[ interpreter.variables_begin + i ] = arguments[i]
	}

	execute_body(current_function.body, interpreter)
	deallocate_function(interpreter)
}

function interprete(functions){
	var main = functions['main']
	var interpreter ={
		stack:           new Array(1000),
		stack_head:      0,
		functions:       functions,
		variables_begin: 0,
		return_value:    0,

		actions: {
			'assignment': interprete_assignment,
			'return':     interprete_return,
			'if':         interprete_if,
			'while':      interprete_while
		},

		binary_operators: {
			'+': interprete_plus,
			'-': interprete_minus,
			'*': interprete_multiply,
			'/': interprete_divide
		},

		unary_operators: {
			'unary_minus': interprete_unary_minus
		}
	}

	for(var i=0; i<interpreter.stack.length; ++i)
		interpreter.stack[i] = 0

	execute(functions['global function'], [], interpreter)
	execute(main, [], interpreter)

	console.log(interpreter.stack)
}