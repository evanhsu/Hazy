#!/usr/bin/env node

const lineReader = require('readline').createInterface( {
  input: require('fs').createReadStream( `${__dirname}/../bootstrap/omnispearBullshit.lol` )
} )

const data = { }

let currentDisc = { },
    currentState = 1

lineReader.on( 'line', line => {
    if( line.length < 2 || line.indexOf( `<br />` ) !== -1 || /^[0-9]/.test(line) ) return

    if( currentState === 1 ) {
        let [ title, ...description ] = line.split('\t')
        Object.assign( currentDisc, { title, description: description.join(' ') } )
        currentState++
    } else if( currentState === 2 ) {
        const result = /<div class="chartGreen">(-?[0-9]+)<\/div><div class="chartRed">(-?[0-9]+)<\/div><div class="chartBlue">(-?[0-9]+)<\/div><div class="chartYellow">(-?[0-9]+)<\/div>/.exec(line)
        if( result !== null ) {
            Object.assign( currentDisc, { speed: result[1], glide: result[2], turn: result[3], fade: result[4] } )
            data[ currentDisc.title.replace(' ','-').toLowerCase() ] = JSON.parse( JSON.stringify( currentDisc ) )
            currentDisc = { }
            currentState = 1
        } else {
            const anotherResult = /.*alt="Disc Flight Path">(.*)/i.exec( line )
            if( anotherResult === null ) {
                currentDisc.description = `${currentDisc.description} ${line}`
            } else {
                currentDisc.description = `${currentDisc.description} ${anotherResult[1]}`
            }
        }
    }
} )

lineReader.on( 'close', () => {
    console.log(data)
    process.exit(0)
} );
