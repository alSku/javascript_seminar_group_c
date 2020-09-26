require( 'dotenv' ).config()
const express = require( 'express' )
const bbb = require( 'bigbluebutton-js' )
const app = express()

const bbbHost = process.env.BBB_URL
const bbbSecret = process.env.BBB_SECRET
const port = process.env.BBB_BRIDGE_PORT

let api = bbb.api( bbbHost, bbbSecret )
let http = bbb.http

// api module itself is responsible for constructing URLs
let meetingCreateUrl = api.administration.create( 'My Meeting', '1', {
    duration: 2,
    attendeePW: 'secret',
    moderatorPW: 'supersecret',
} )

// http method should be used in order to make calls
http( meetingCreateUrl ).then( ( result ) => {
    console.log( result )

    let moderatorUrl = api.administration.join( 'moderator', '1', 'supersecret' )
    let attendeeUrl = api.administration.join( 'attendee', '1', 'secret' )
    console.log( `Moderator link: ${moderatorUrl}\nAttendee link: ${attendeeUrl}` )

    let meetingEndUrl = api.administration.end( '1', 'supersecret' )
    console.log( `End meeting link: ${meetingEndUrl}` )
} )
