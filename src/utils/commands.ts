export const commands: { [key: string]: { [key: string]: string } } = {
    'ArrowDown': {
        '1': '4',
        '2': '5',
        '3': '6',
        '4': '7',
        '5': '8',
        '6': '9',
        '7': 'clear',
        '8': 'clear',
        '9': '0',
        'clear': 'accept',
        '0': 'accept',
        'accept': 'accept',
        'exit': 'exit'
    },
    'ArrowUp': {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '1',
        '5': '2',
        '6': '3',
        '7': '4',
        '8': '5',
        '9': '6',
        'clear': '7',
        '0': '9',
        'accept': 'clear',
        'exit': 'exit'
    },
    'ArrowLeft': {
        '1': '1',
        '2': '1',
        '3': '2',
        '4': '4',
        '5': '4',
        '6': '5',
        '7': '8',
        '8': '7',
        '9': '8',
        'clear': 'clear',
        '0': 'clear',
        'exit': '3',
        'accept': 'accept',

    },
    'ArrowRight': {
        '1': '2',
        '2': '3',
        '3': 'exit',
        '4': '5',
        '5': '6',
        '6': 'exit',
        '7': '8',
        '8': '9',
        '9': 'exit',
        'clear': '0',
        '0': 'exit',
        'accept': 'exit',
        'exit': 'exit'

    }
}