function create_parser(stream){
	return {
		stream:           stream,
		blocks:           [],
		current_block:    undefined,
		functions:        {},
		global_function: {
			name:      'global space',
			arguments: [],
			variables: {},
			body:      []
		},
		current_function: undefined,

		unary_operators: {
			'-': 'unary_minus'
		},

		binary_operators: {
			'+': '+',
			'-': '-',
			'/': '/',
			'*': '*'
		},

		head: function(){
			return head_stream(stream)
		},

		parse_word: function(){
			return read_word(this.stream)
		},

		parse_number: function(){
			return read_number(this.stream)
		},

		skip_spaces: function(){
			skip_spaces(this.stream)
		},

		read_byte: function(){
			read_stream_byte(this.stream)
		},

		end: function(){
			return end_of_stream(this.stream)
		}
	}
}

var keywords = {
	'function': parse_function,
	'while':    parse_while,
	'if':       parse_if,
	'end':      parse_end,
	'return':   parse_return
}

function parse(stream){
	var parser = create_parser(stream)

	while(!end_of_stream(stream)){
		var word             = parser.parse_word()
		var keyword_function = keywords[word]

		if(keyword_function){
			if(!keyword_function(parser))
				break
		}
		else{
			parser.skip_spaces()

			if(parser.head() != '='){
				console.log('ошибка: токен ' + word + ' не правилен')
				break
			}

			if(!parse_assignment(word, parser))
				return
		}
	}

	if(parser.current_block){
		console.log('отсутствует end')
		return
	}

	parser.functions['global function'] = parser.global_function

	return parser.functions
}