var socket = io();

socket.on('connect',() =>{
    console.log('client connected to server');
});

socket.on('disconnect',() =>{
    console.log('disconnected from server');
});

socket.on('newMessage',(message)=>{
    var formattedDate = moment(message.createdAt).format("h:mm a");
    var template = jQuery('#template').html();
    var html = Mustache.render(template,{
        text : message.text,
        from : message.from,
        createdAt : formattedDate
    });
    jQuery('#listitem').append(html);
});

socket.on('newLocationMessage',(message)=>{
    var formattedDate = moment(message.createdAt).format("h:mm a");
    // var li = jQuery('<li></li>');
    // var a= jQuery('<a target="_blank">Link</a>');

    // li.text(`${message.from}, ${formattedDate} : ${message.text}`);
    // a.attr('href',message.url);
    // li.append(a);
    var template = jQuery('#location-template').html();
    var html = Mustache.render(template,{
        from : message.from,
        createdAt : formattedDate,
        url : message.url
    });
    jQuery('#listitem').append(html);
})

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from : 'User',
        text : jQuery('[name=message]').val()
    },function() {

    });
});


    var locationButton = jQuery('#location');
    locationButton.on('click',function() {
        if(!navigator.geolocation) {
            return alert('No permission');
        }
        navigator.geolocation.getCurrentPosition( function(position){
            socket.emit('createLocationMessage',{
                lat : position.coords.latitude,
                lon : position.coords.longitude
            });
        },function(){
             alert();
        });
    });
