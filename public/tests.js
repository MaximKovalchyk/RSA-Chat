//rsa enc/decr
QUnit.test( "encrypt/decrypt", function( assert ) {
	var crypt = new JSEncrypt({default_key_size: 1024});
    crypt.getKey();
	var text = 'text';
	var msg = crypt.encrypt(text);
	assert.ok( text != msg);
	assert.ok( text == crypt.decrypt(msg), "Passed!" );
});
//need server

//add user & get users list; 
QUnit.test( "add user & get users list", function( assert ) {
	var socket = io();
	var done = assert.async();
	var User_test_name = 'test_user';
	
	socket.emit('add_user', {
		name: User_test_name,
		publicKey: 'test_key'
	});
	socket.emit('get_users_list');
	socket.on('get_users', function(u_list) {
		assert.ok(User_test_name in u_list, "Passed!" );
		done();
	});
});

//send msg
QUnit.test( "Send message", function( assert ) {
	var socket = io();
	var done = assert.async();
	var text = 'hello';

	socket.emit('add_user', {
		name: 'test_user_1',
		publicKey: 'test_key'
	});
	socket.emit('add_user', {
		name: 'test_user_2',
		publicKey: 'test_key'
	});
	
	socket.emit('chat message', {msg: text, name: 'test_user_1'});

	socket.on('chat message', function(msg) {
		assert.ok(msg == text);
		done();
	});
});

