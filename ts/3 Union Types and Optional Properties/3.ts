/**
 To do this, we’d like to implement a function called placeToString(),
 which has the following input and output:

 Input should be a Place. Example: 'work'.
 Return value should be a string (with an emoji) that will be used for the label UI. Example: ' Work'.

 Here are the examples:
 */


type Place = 'home' | 'work' | { custom: string }

function placeToString(place: Place): string {
    if (place === 'home') {
        return 'Home'
    } else if (place === 'work') {
        return 'Work'
    } else {
        return ' ' + place.custom
    }
}

placeToString('home')
// -> returns 'Home'

placeToString('work')
// -> returns 'Work'

placeToString({custom: 'Gym'})
// -> returns ' Gym'

placeToString({custom: 'Supermarket'})
// -> returns ' Supermarket'
























