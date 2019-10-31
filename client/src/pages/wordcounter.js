export function wordCounter(speech) { const words = speech.split(' ');
    let fillerWords = {
        basically: 0,
        so: 0,
        like: 0,
        really: 0,
        especially:0,
        therefore: 0,
        okay: 0,
        very: 0,
        totally: 0,
        truly: 0,
        literally: 0,
        actually: 0,
        seriously: 0,
        right: 0,
        but: 0,
    }
    let i;
    for (i = 0; i < words.length; i++) {
        switch (words[i]) {
            case 'basically':
                fillerWords.basically++;
                break;
            case 'so':
                fillerWords.so++;
                break;
            case 'like':
                fillerWords.like++;
                break;
            case 'really':
                fillerWords.really++;
                break;
            case 'especially':
                fillerWords.especially++;
                break;
            case 'therefore':
                fillerWords.therefore++;
                break;
            case 'okay':
                fillerWords.okay++;
                break;
            case 'very':
                fillerWords.very++;
                break;
            case 'totally':
                fillerWords.totally++;
                break;
            case 'truly':
                fillerWords.truly++;
                break;
            case 'literally':
                fillerWords.literally++;
                break;
            case 'actually':
                fillerWords.actually++;
                break;
            case 'seriously':
                fillerWords.seriously++;
                break;
            case 'but':
                fillerWords.but++;
                break;
            case 'right':
                fillerWords.right++;
                break;
          default:
            break;
        }
    }
    return fillerWords;
}


