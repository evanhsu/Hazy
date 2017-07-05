module.exports = Object.assign( {}, require('./__proto__'), {

    data: [
        'boom',
        'dga',
        'disc-mania',
        'discraft',
        'dynamic',
        'innova',
        'latitude',
        'legacy',
        'millenium',
        'westside'
    ],

    events: {
        byopBtn: 'click',
        ezFinder: 'click'
    },

    onByopBtnClick() {
        this.emit( 'navigate', 'byop' )
    },
    
    onEzFinderClick() {
        this.emit( 'navigate', 'shop' )
    }

} )
