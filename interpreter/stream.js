function create_stream(source, read_byte, end_of_stream){
	return {
		source:        source,
		read_byte:     read_byte,
		end_of_stream: end_of_stream,
		head:          read_byte(source)
	}
}

function head_stream(stream){
	return stream.head
}

function read_stream_byte(stream){
	var current_byte = head_stream(stream)

	stream.head = stream.read_byte(stream.source)

	return current_byte
}

function end_of_stream(stream){
	return stream.end_of_stream(stream.source)
}